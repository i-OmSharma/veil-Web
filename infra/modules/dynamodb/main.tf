locals {
  prefix = "${var.project_name}-${var.environment}"
}

resource "aws_dynamodb_table" "metrics" {
  name         = "${local.prefix}-metrics"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "metric_key"

  attribute {
    name = "metric_key"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = var.tags
}

resource "aws_dynamodb_table" "feedback" {
  name         = "${local.prefix}-feedback"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "email"
  range_key    = "timestamp"

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = var.tags
}
