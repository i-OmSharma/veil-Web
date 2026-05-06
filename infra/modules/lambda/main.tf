resource "aws_lambda_function" "veil" {
  function_name = "${var.project_name}-lambda"

  filename = "${path.root}/../lambda/veil-handler/function.zip"
  handler = "index.handler"
  runtime     = "nodejs22.x"
  timeout     = 10
  memory_size = 128

  role = aws_iam_role.lambda_role.arn

  environment {
    variables = {
      METRICS_TABLE = var.metrics_table
      FEEDBACK_TABLE = var.feedback_table
      FROM_EMAIL = var.from_email
    }
  }
}