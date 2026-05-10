locals {
  prefix = "${var.project_name}-${var.environment}"
}

# FRONTEND BUCKET
resource "aws_s3_bucket" "frontend" {
  bucket = "${local.prefix}-frontend"

  tags = var.tags
}

resource "aws_s3_bucket_server_side_encryption_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# BINARIES BUCKET
resource "aws_s3_bucket" "binaries" {
  bucket = "${local.prefix}-binaries"

  tags = var.tags
}

resource "aws_s3_bucket_server_side_encryption_configuration" "binaries" {
  bucket = aws_s3_bucket.binaries.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_versioning" "binaries" {
  bucket = aws_s3_bucket.binaries.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "binaries" {
  bucket = aws_s3_bucket.binaries.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "binaries" {
  bucket = aws_s3_bucket.binaries.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
