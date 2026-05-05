output "metrics_table" {
  value = aws_dynamodb_table.metrics.name
}

output "feedback_table" {
  value = aws_dynamodb_table.feedback.name
}