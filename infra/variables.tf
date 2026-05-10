variable "aws_region" {
  description = "AWS region for veil infra"
  type        = string
}

variable "project_name" {
  description = "Project name used as resource prefix"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of: dev, staging, prod"
  }
}

variable "from_email" {
  description = "Resend verified sender email"
  type        = string
}

variable "resend_api_key" {
  description = "Resend API Key"
  type        = string
  sensitive   = true
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN in us-east-1 for CloudFront HTTPS"
  type        = string
}

variable "domain_aliases" {
  description = "Custom domain names served by CloudFront"
  type        = list(string)
  default     = []
}
