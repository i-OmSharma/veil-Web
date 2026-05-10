output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "distribution_arn" {
  value = aws_cloudfront_distribution.cdn.arn
}

output "distribution_id" {
  value = aws_cloudfront_distribution.cdn.id
}

output "frontend_oac_id" {
  value = aws_cloudfront_origin_access_control.frontend.id
}

output "binaries_oac_id" {
  value = aws_cloudfront_origin_access_control.binaries.id
}

output "cf_logs_bucket_id" {
  value = aws_s3_bucket.cf_logs.id
}
