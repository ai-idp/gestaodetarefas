variable "project" {
  description = "Project name used for ECR repository naming"
  type        = string
}

variable "image_tag_mutability" {
  description = "Image tag mutability setting"
  type        = string
  default     = "MUTABLE"
}

variable "scan_on_push" {
  description = "Enable image scanning on push"
  type        = bool
  default     = true
}

variable "force_delete" {
  description = "Force delete repository even if it contains images"
  type        = bool
  default     = true
}

variable "image_retention_count" {
  description = "Number of images to retain in the repository"
  type        = number
  default     = 10
}
