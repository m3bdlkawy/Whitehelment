variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "ami" {
  type    = string
  default = "ami-0f9de6e2d2f067fca"
}

variable "instance_type" {
  type    = string
  default = "t2.medium"
}
