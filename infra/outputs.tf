output "lambda_name" {
  value = module.lambda.lambda_name
}

output "api_url" {
  description = "API Gateway invoke URL"
  value       = module.apigateway.api_url
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain — use this as your app URL until custom domain is wired"
  value       = module.cloudfront.cloudfront_domain
}

output "distribution_id" {
  description = "CloudFront distribution ID — needed for cache invalidation"
  value       = module.cloudfront.distribution_id
}
