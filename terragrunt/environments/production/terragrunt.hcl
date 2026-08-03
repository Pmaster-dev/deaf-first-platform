# Production environment – Terragrunt configuration
include "root" {
  path = find_in_parent_folders("terragrunt.hcl")
}

inputs = {
  project_id   = "deaf-first-production"
  project_name = "deaf-first"
  region       = "us-central1"
  zone         = "us-central1-a"
  zones        = ["us-central1-a", "us-central1-b", "us-central1-c"]

  # Organisation
  organization_email = "architect@360magicians.com"

  # Networking
  vpc_cidr            = "10.2.0.0/16"
  public_subnet_cidr  = "10.2.1.0/24"
  private_subnet_cidr = "10.2.2.0/24"

  # Database – production-grade
  database_tier         = "db-n1-standard-1"
  enable_backups        = true
  storage_lifecycle_days = 90

  # Billing
  budget_amount       = 5000
  alert_threshold     = [0.5, 0.75, 0.9, 1.0]
  notification_emails = ["architect@360magicians.com"]

  # Cloud Run
  cloud_run_min_instances = 2
  cloud_run_max_instances = 10

  # Firestore
  firestore_location = "us-central"

  # Vertex AI
  vertex_ai_region = "us-central1"
  enable_vertex_ai = true

  # BigQuery
  bigquery_dataset_location = "US"
}
