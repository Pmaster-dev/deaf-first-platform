# Root Terragrunt configuration
# Provides shared remote state and common inputs for all environments.

locals {
  # Load the environment-specific variables
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env      = local.env_vars.locals.environment

  # Common GCS state bucket naming convention
  state_bucket = "deaf-first-${local.env}-terraform-state"
}

# Remote state configuration (GCS backend)
remote_state {
  backend = "gcs"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket = local.state_bucket
    prefix = "terraform/state"
  }
}

# Point all environments at the shared terraform module
terraform {
  source = "${get_repo_root()}/terraform"
}

# Inputs common to all environments
inputs = {
  environment = local.env
}
