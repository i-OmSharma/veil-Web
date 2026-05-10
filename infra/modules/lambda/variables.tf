variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "metrics_table" {
  type = string
}

variable "feedback_table" {
  type = string
}

variable "metrics_table_arn" {
  type = string
}

variable "feedback_table_arn" {
  type = string
}

variable "from_email" {
  type = string
}

variable "resend_api_key" {
  type      = string
  sensitive = true
}

variable "tags" {
  type    = map(string)
  default = {}
}
