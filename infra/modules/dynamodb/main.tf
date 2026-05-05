resource "aws_dynamodb_table" "metrics" {
  name         = "${var.project_name}-metrics"
  billing_mode = "PAY_PER_REQUEST"
  # underscore required — hyphens break Lambda SDK attribute key access
  hash_key     = "metric_key"

  attribute {
    name = "metric_key"
    type = "S"
  }
}

resource "aws_dynamodb_table" "feedback" {
    name = "${var.project_name}-feedback"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "email"
  range_key = "timestamp"

    attribute {
      name = "email"
      type = "S"
    }

    attribute {
      name = "timestamp"
      type = "N"
    }
}




