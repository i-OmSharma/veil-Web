output "metrics_table" {
  value = aws_dynamodb_table.metrics.name
}

output "feedback_table" {
  value = aws_dynamodb_table.feedback.name
}

output "metrics_table_arn" {
  value = aws_dynamodb_table.metrics.arn
}

output "feedback_table_arn" {
  value = aws_dynamodb_table.feedback.arn
}
