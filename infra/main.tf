module "dynamodb" {
    source = "./modules/dynamodb"
    project_name = var.project_name
    environment = var.environment
}

module "lambda" {
    source = "./modules/lambda"

    project_name = var.project_name
    metrics_table = module.dynamodb.metrics_table
    feedback_table = module.dynamodb.feedback_table
    from_email = var.from_email
}

module "apigateway" {
    source = "./modules/apigateway"

    project_name = var.project_name
    lambda_arn = module.lambda.lambda_arn
}

module "s3" {
  source = "./modules/s3"

  project_name = var.project_name
}

module "cloudfront" {
  source = "./modules/cloudfront"

  project_name    = var.project_name
  aws_region      = var.aws_region
  frontend_bucket = module.s3.frontend_bucket
  binaries_bucket = module.s3.binaries_bucket
  api_url         = module.apigateway.api_url
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = module.s3.frontend_bucket
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOAC"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "arn:aws:s3:::${module.s3.frontend_bucket}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = module.cloudfront.distribution_arn
        }
      }
    }]
  })
}

resource "aws_s3_bucket_policy" "binaries" {
  bucket = module.s3.binaries_bucket
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOAC"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "arn:aws:s3:::${module.s3.binaries_bucket}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = module.cloudfront.distribution_arn
        }
      }
    }]
  })
} 