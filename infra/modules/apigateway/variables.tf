variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "lambda_arn" {
  type = string
}

variable "lambda_invoke_arn" {
  type = string
}

variable "allowed_origins" {
  description = "CORS allowed origins. Restrict to CloudFront domain post-deploy."
  type        = list(string)
  default     = ["*"]
}

variable "tags" {
  type    = map(string)
  default = {}
}
