locals {
  prefix = "${var.project_name}-${var.environment}"
}

resource "aws_cloudwatch_log_group" "apigw_access" {
  name              = "/aws/apigateway/${local.prefix}"
  retention_in_days = 30

  tags = var.tags
}

resource "aws_apigatewayv2_api" "api" {
  name          = "${local.prefix}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.allowed_origins
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
    max_age       = 300
  }

  tags = var.tags
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn
  payload_format_version = "2.0"
}

# ROUTES

resource "aws_apigatewayv2_route" "download" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /download"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "stats" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /api/stats"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "feedback" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /api/feedback"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "visit" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /api/visit"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "options" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "OPTIONS /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# STAGE — explicit deployments prevent accidental production changes

resource "aws_apigatewayv2_stage" "default" {
  api_id        = aws_apigatewayv2_api.api.id
  name          = "$default"
  auto_deploy   = false
  deployment_id = aws_apigatewayv2_deployment.current.id

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.apigw_access.arn
    format = jsonencode({
      requestId          = "$context.requestId"
      sourceIp           = "$context.identity.sourceIp"
      httpMethod         = "$context.httpMethod"
      routeKey           = "$context.routeKey"
      status             = "$context.status"
      protocol           = "$context.protocol"
      responseLength     = "$context.responseLength"
      integrationLatency = "$context.integrationLatency"
      responseLatency    = "$context.responseLatency"
      errorMessage       = "$context.error.message"
      userAgent          = "$context.identity.userAgent"
    })
  }

  tags = var.tags
}

resource "aws_apigatewayv2_deployment" "current" {
  api_id = aws_apigatewayv2_api.api.id

  triggers = {
    redeployment = sha1(join(",", [
      jsonencode(aws_apigatewayv2_integration.lambda),
      jsonencode(aws_apigatewayv2_route.download),
      jsonencode(aws_apigatewayv2_route.stats),
      jsonencode(aws_apigatewayv2_route.feedback),
      jsonencode(aws_apigatewayv2_route.visit),
      jsonencode(aws_apigatewayv2_route.options),
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}
