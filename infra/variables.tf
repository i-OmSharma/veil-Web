# Required: must be set in terraform.tfvars — no default to force explicit config
variable "aws_region" {
    description = "AWS region for veil infra"
    type        = string
}

# Required: passed to all modules as resource name prefix
variable "project_name" {
    description = "Project name used as resource prefix"
    type        = string
}

# Required: deployment environment (dev/staging/prod)
variable "environment" {
    description = "Deployment environment"
    type        = string
}

# Required: verified SES sender address
variable "from_email" {
    description = "SES verified sender email"
    type        = string
}
