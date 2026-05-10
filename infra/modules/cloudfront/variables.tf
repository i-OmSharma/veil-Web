variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "frontend_bucket_domain" {
  description = "S3 bucket_regional_domain_name — required for OAC compatibility"
  type        = string
}

variable "frontend_bucket_arn" {
  type = string
}

variable "binaries_bucket_domain" {
  type = string
}

variable "binaries_bucket_arn" {
  type = string
}

variable "api_domain" {
  description = "API Gateway hostname only — no scheme (https://), no trailing slash (/)"
  type        = string

  validation {
    condition     = !startswith(var.api_domain, "https://") && !startswith(var.api_domain, "http://") && !endswith(var.api_domain, "/")
    error_message = "api_domain must be a bare hostname: no protocol, no trailing slash."
  }
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN — must be in us-east-1 for CloudFront"
  type        = string
}

variable "domain_aliases" {
  description = "Custom domain names for CloudFront (e.g. veils.systems, www.veils.systems)"
  type        = list(string)
  default     = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
