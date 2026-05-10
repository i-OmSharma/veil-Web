output "api_url" {
  description = "HTTP API invoke URL for $default stage"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "api_id" {
  value = aws_apigatewayv2_api.api.id
}

output "execution_arn" {
  value = aws_apigatewayv2_api.api.execution_arn
}
