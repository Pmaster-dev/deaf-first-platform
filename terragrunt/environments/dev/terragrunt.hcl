# Development environment – Terragrunt configuration
include "root" {
  path = find_in_parent_folders("terragrunt.hcl")
}

inputs = {
  project_id   = "deaf-first-dev"
  project_name = "deaf-first"
  region       = "us-central1"
  zone         = "us-central1-a"
  zones        = ["us-central1-a", "us-central1-b", "us-central1-c"]

  # Organisation
  organization_email = "architect@360magician.com"

  # Networking
  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidr  = "10.0.1.0/24"
  private_subnet_cidr = "10.0.2.0/24"

  # Database – minimal for dev
  database_tier         = "db-f1-micro"
  enable_backups        = false
  storage_lifecycle_days = 30

  # Billing
  budget_amount       = 500
  alert_threshold     = [0.8, 1.0]
  notification_emails = ["architect@360magician.com"]

  # Cloud Run – lower limits for dev
  cloud_run_min_instances = 0
  cloud_run_max_instances = 3

  # Firestore
  firestore_location = "us-central"

  # Vertex AI
  vertex_ai_region   = "us-central1"
  enable_vertex_ai   = true

  # BigQuery
  bigquery_dataset_location = "US"
}
