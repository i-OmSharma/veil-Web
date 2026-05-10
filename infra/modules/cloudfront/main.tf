locals {
  prefix = "${var.project_name}-${var.environment}"

  # AWS managed cache policy IDs
  cache_policy_optimized = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  cache_policy_disabled  = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
  # Forwards all viewer headers except Host — required for API Gateway origins
  origin_policy_api = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # AllViewerExceptHostHeader
}

# CloudFront access logs bucket — separate from content buckets
resource "aws_s3_bucket" "cf_logs" {
  bucket = "${local.prefix}-cf-logs"

  tags = var.tags
}

# Log delivery requires BucketOwnerPreferred + log-delivery-write ACL
resource "aws_s3_bucket_ownership_controls" "cf_logs" {
  bucket = aws_s3_bucket.cf_logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "cf_logs" {
  depends_on = [
    aws_s3_bucket_ownership_controls.cf_logs,
    aws_s3_bucket_public_access_block.cf_logs,
  ]
  bucket = aws_s3_bucket.cf_logs.id
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket_public_access_block" "cf_logs" {
  bucket = aws_s3_bucket.cf_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "cf_logs" {
  bucket = aws_s3_bucket.cf_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "cf_logs" {
  bucket = aws_s3_bucket.cf_logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    filter {}

    expiration {
      days = 90
    }
  }
}

# Separate OAC per origin — cleaner audit trail
resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${local.prefix}-frontend-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_origin_access_control" "binaries" {
  name                              = "${local.prefix}-binaries-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  aliases             = var.domain_aliases

  # ACL must be applied to the logs bucket before CloudFront attempts log delivery
  depends_on = [aws_s3_bucket_acl.cf_logs]

  tags = var.tags

  logging_config {
    bucket          = aws_s3_bucket.cf_logs.bucket_domain_name
    include_cookies = false
    prefix          = "${local.prefix}/"
  }

  # Frontend — S3 REST endpoint via OAC
  origin {
    domain_name              = var.frontend_bucket_domain
    origin_id                = "frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  # API Gateway — custom_origin_config required for all non-S3 origins
  origin {
    domain_name = var.api_domain
    origin_id   = "api"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Binaries — S3 REST endpoint via OAC
  origin {
    domain_name              = var.binaries_bucket_domain
    origin_id                = "binaries"
    origin_access_control_id = aws_cloudfront_origin_access_control.binaries.id
  }

  # Default: SPA frontend with optimized caching
  default_cache_behavior {
    target_origin_id       = "frontend"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = local.cache_policy_optimized
    compress               = true
  }

  # /download* — catches /download and /download?os=linux etc.
  ordered_cache_behavior {
    path_pattern             = "/download*"
    target_origin_id         = "api"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = local.cache_policy_disabled
    origin_request_policy_id = local.origin_policy_api
    compress                 = true
  }

  # /api/* — API proxy, caching disabled, all methods
  ordered_cache_behavior {
    path_pattern             = "/api/*"
    target_origin_id         = "api"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = local.cache_policy_disabled
    origin_request_policy_id = local.origin_policy_api
    compress                 = true
  }

  # /releases/* — S3 binaries, aggressive caching
  ordered_cache_behavior {
    path_pattern           = "/releases/*"
    target_origin_id       = "binaries"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = local.cache_policy_optimized
    compress               = true
  }

  # SPA fallback — return index.html for S3 403/404
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
