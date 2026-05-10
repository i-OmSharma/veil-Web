locals {
  prefix        = "${var.project_name}-${var.environment}"
  function_name = "${local.prefix}-lambda"
}

resource "aws_lambda_function" "veil" {
  function_name = local.function_name

  filename         = "${path.root}/../lambda/veil-handler/function.zip"
  source_code_hash = filebase64sha256("${path.root}/../lambda/veil-handler/function.zip")
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  timeout          = 30
  memory_size      = 256

  role = aws_iam_role.lambda_role.arn

  environment {
    variables = {
      METRICS_TABLE            = var.metrics_table
      FEEDBACK_TABLE           = var.feedback_table
      FROM_EMAIL               = var.from_email
      SSM_PARAM_RESEND_API_KEY = aws_ssm_parameter.resend_api_key.name
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]

  tags = var.tags
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = 30

  tags = var.tags
}
