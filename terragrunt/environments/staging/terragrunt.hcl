# Staging environment – Terragrunt configuration
include "root" {
  path = find_in_parent_folders("terragrunt.hcl")
}

inputs = {
  project_id   = "deaf-first-staging"
  project_name = "deaf-first"
  region       = "us-central1"
  zone         = "us-central1-a"
  zones        = ["us-central1-a", "us-central1-b", "us-central1-c"]

  # Organisation
  organization_email = "architect@360magician.com"

  # Networking
  vpc_cidr            = "10.1.0.0/16"
  public_subnet_cidr  = "10.1.1.0/24"
  private_subnet_cidr = "10.1.2.0/24"

  # Database
  database_tier         = "db-g1-small"
  enable_backups        = true
  storage_lifecycle_days = 60

  # Billing
  budget_amount       = 1000
  alert_threshold     = [0.75, 0.9, 1.0]
  notification_emails = ["architect@360magicians.com"]

  # Cloud Run
  cloud_run_min_instances = 1
  cloud_run_max_instances = 5

  # Firestore
  firestore_location = "us-central"

  # Vertex AI
  vertex_ai_region = "us-central1"
  enable_vertex_ai = true

  # BigQuery
  bigquery_dataset_location = "US"
}
