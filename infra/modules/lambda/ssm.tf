resource "aws_ssm_parameter" "resend_api_key" {
  name  = "/${var.project_name}/${var.environment}/resend-api-key"
  type  = "SecureString"
  value = var.resend_api_key

  tags = var.tags
}
