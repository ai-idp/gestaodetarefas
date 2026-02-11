variable "project" {
  description = "Project name"
  type        = string
  default     = "gestaodetarefas"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 8080
}

variable "vpc_id" {
  description = "VPC ID for ECS deployment"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for ECS tasks"
  type        = list(string)
}
