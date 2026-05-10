locals {
  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.tags
}

module "lambda" {
  source = "./modules/lambda"

  project_name       = var.project_name
  environment        = var.environment
  metrics_table      = module.dynamodb.metrics_table
  feedback_table     = module.dynamodb.feedback_table
  metrics_table_arn  = module.dynamodb.metrics_table_arn
  feedback_table_arn = module.dynamodb.feedback_table_arn
  from_email         = var.from_email
  resend_api_key     = var.resend_api_key
  tags               = local.tags
}

module "apigateway" {
  source = "./modules/apigateway"

  project_name      = var.project_name
  environment       = var.environment
  lambda_arn        = module.lambda.lambda_arn
  lambda_invoke_arn = module.lambda.lambda_invoke_arn
  tags              = local.tags
}

module "s3" {
  source = "./modules/s3"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.tags
}

module "cloudfront" {
  source = "./modules/cloudfront"

  project_name           = var.project_name
  environment            = var.environment
  frontend_bucket_domain = module.s3.frontend_bucket_domain
  frontend_bucket_arn    = module.s3.frontend_bucket_arn
  binaries_bucket_domain = module.s3.binaries_bucket_domain
  binaries_bucket_arn    = module.s3.binaries_bucket_arn
  api_domain             = trimsuffix(replace(module.apigateway.api_url, "https://", ""), "/")
  tags                   = local.tags
}

module "monitoring" {
  source = "./modules/monitoring"

  project_name         = var.project_name
  environment          = var.environment
  lambda_function_name = module.lambda.lambda_name
  api_id               = module.apigateway.api_id
  distribution_id      = module.cloudfront.distribution_id
  metrics_table_name   = module.dynamodb.metrics_table
  feedback_table_name  = module.dynamodb.feedback_table
  tags                 = local.tags
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = module.s3.frontend_bucket_id

  depends_on = [module.s3]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOAC"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${module.s3.frontend_bucket_arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = module.cloudfront.distribution_arn
        }
      }
    }]
  })
}

resource "aws_s3_bucket_policy" "binaries" {
  bucket = module.s3.binaries_bucket_id

  depends_on = [module.s3]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOAC"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${module.s3.binaries_bucket_arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = module.cloudfront.distribution_arn
        }
      }
    }]
  })
}
