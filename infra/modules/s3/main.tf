# FRONTEND BUCKET
resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }
}

# ACL disabled — BucketOwnerEnforced is AWS default since 2023, must be explicit in Terraform
resource "aws_s3_bucket_ownership_controls" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# BINARIES BUCKET
resource "aws_s3_bucket" "binaries" {
  bucket = "${var.project_name}-binaries"
}

# ACL disabled — BucketOwnerEnforced is AWS default since 2023, must be explicit in Terraform
resource "aws_s3_bucket_ownership_controls" "binaries" {
  bucket = aws_s3_bucket.binaries.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# All 4 attributes required — CloudFront handles access, keep everything blocked
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_public_access_block" "binaries" {
  bucket = aws_s3_bucket.binaries.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}