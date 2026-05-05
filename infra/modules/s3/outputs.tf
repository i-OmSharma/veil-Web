output "frontend_bucket" {
  value = aws_s3_bucket.frontend.bucket
}

output "binaries_bucket" {
  value = aws_s3_bucket.binaries.bucket
}