locals {
  prefix = "${var.project_name}-${var.environment}"
}

# ── Lambda ──────────────────────────────────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "${local.prefix}-lambda-errors"
  alarm_description   = "Lambda invocation errors > 0 in 60s"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  statistic           = "Sum"
  period              = 60
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  alarm_actions = var.alarm_actions
  ok_actions    = var.alarm_actions

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "lambda_duration" {
  alarm_name          = "${local.prefix}-lambda-duration-high"
  alarm_description   = "Lambda p99 duration > 83% of timeout (${var.lambda_timeout_ms}ms)"
  namespace           = "AWS/Lambda"
  metric_name         = "Duration"
  extended_statistic  = "p99"
  period              = 300
  evaluation_periods  = 3
  datapoints_to_alarm = 2
  threshold           = floor(var.lambda_timeout_ms * 0.83)
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "lambda_throttles" {
  alarm_name          = "${local.prefix}-lambda-throttles"
  alarm_description   = "Lambda throttles detected — reserved concurrency may be too low"
  namespace           = "AWS/Lambda"
  metric_name         = "Throttles"
  statistic           = "Sum"
  period              = 60
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

# ── API Gateway ──────────────────────────────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "apigw_5xx" {
  alarm_name          = "${local.prefix}-apigw-5xx"
  alarm_description   = "API Gateway 5XX errors > 5 in 60s"
  namespace           = "AWS/ApiGateway"
  metric_name         = "5XXError"
  statistic           = "Sum"
  period              = 60
  evaluation_periods  = 1
  threshold           = 5
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    ApiId = var.api_id
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "apigw_latency" {
  alarm_name          = "${local.prefix}-apigw-latency"
  alarm_description   = "API Gateway p99 integration latency > 25s"
  namespace           = "AWS/ApiGateway"
  metric_name         = "IntegrationLatency"
  extended_statistic  = "p99"
  period              = 300
  evaluation_periods  = 2
  threshold           = 25000
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    ApiId = var.api_id
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

# ── CloudFront ───────────────────────────────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx" {
  alarm_name          = "${local.prefix}-cloudfront-5xx-rate"
  alarm_description   = "CloudFront 5XX error rate > 5% over 5 minutes"
  namespace           = "AWS/CloudFront"
  metric_name         = "5xxErrorRate"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  threshold           = 5
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DistributionId = var.distribution_id
    Region         = "Global"
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

# ── DynamoDB ─────────────────────────────────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "dynamodb_throttles_metrics" {
  alarm_name          = "${local.prefix}-dynamodb-metrics-throttles"
  alarm_description   = "DynamoDB throttled requests on metrics table"
  namespace           = "AWS/DynamoDB"
  metric_name         = "ThrottledRequests"
  statistic           = "Sum"
  period              = 60
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = var.metrics_table_name
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "dynamodb_throttles_feedback" {
  alarm_name          = "${local.prefix}-dynamodb-feedback-throttles"
  alarm_description   = "DynamoDB throttled requests on feedback table"
  namespace           = "AWS/DynamoDB"
  metric_name         = "ThrottledRequests"
  statistic           = "Sum"
  period              = 60
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = var.feedback_table_name
  }

  alarm_actions = var.alarm_actions

  tags = var.tags
}
