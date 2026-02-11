terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

module "ecr" {
  source  = "./modules/ecr"
  project = var.project
}

module "ecs_fargate" {
  source = "./modules/ecs-fargate"

  project            = var.project
  container_port     = var.container_port
  ecr_repository_url = module.ecr.repository_url
  vpc_id             = var.vpc_id
  subnet_ids         = var.subnet_ids
}
