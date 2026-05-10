output "frontend_bucket_id" {
  value = aws_s3_bucket.frontend.id
}

output "frontend_bucket_arn" {
  value = aws_s3_bucket.frontend.arn
}

output "frontend_bucket_domain" {
  description = "Regional domain name — always correct for OAC, handles us-east-1 edge case"
  value       = aws_s3_bucket.frontend.bucket_regional_domain_name
}

output "binaries_bucket_id" {
  value = aws_s3_bucket.binaries.id
}

output "binaries_bucket_arn" {
  value = aws_s3_bucket.binaries.arn
}

output "binaries_bucket_domain" {
  value = aws_s3_bucket.binaries.bucket_regional_domain_name
}
