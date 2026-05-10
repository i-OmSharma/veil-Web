variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "lambda_function_name" {
  type = string
}

variable "api_id" {
  type = string
}

variable "distribution_id" {
  type = string
}

variable "metrics_table_name" {
  type = string
}

variable "feedback_table_name" {
  type = string
}

variable "lambda_timeout_ms" {
  description = "Lambda timeout in ms — alarms fire at 83% of this value"
  type        = number
  default     = 30000
}

variable "alarm_actions" {
  description = "SNS topic ARNs to notify on alarm. Empty = alarm visible in console only."
  type        = list(string)
  default     = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
