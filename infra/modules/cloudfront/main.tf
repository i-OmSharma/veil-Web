resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "${var.project_name}-s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  default_root_object = "index.html"

  # DEFAULT → frontend
  origin {
    domain_name              = "${var.frontend_bucket}.s3.${var.aws_region}.amazonaws.com"
    origin_id                = "frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  # API origin
  origin {
    domain_name = replace(var.api_url, "https://", "")
    origin_id   = "api"
  }

  # binaries origin
  origin {
    domain_name              = "${var.binaries_bucket}.s3.${var.aws_region}.amazonaws.com"
    origin_id                = "binaries"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  default_cache_behavior {
    target_origin_id = "frontend"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # DOWNLOAD ROUTE → Lambda /download?os=
  ordered_cache_behavior {
    path_pattern     = "/download"
    target_origin_id = "api"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }
  }

  # API ROUTE
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    target_origin_id = "api"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  # BINARIES ROUTE
  ordered_cache_behavior {
    path_pattern     = "/releases/*"
    target_origin_id = "binaries"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
