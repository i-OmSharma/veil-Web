output "lambda_name" {
  value = module.lambda.lambda_name
}

output "api_url" {
    description = "API Gateway URL"
    value = module.apigateway.api_url
}