output "lambda_arn" {
  value = aws_lambda_function.veil.arn
}

output "lambda_name" {
  value = aws_lambda_function.veil.function_name
}