terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }

    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.1"
    }
  }

  backend "gcs" {
    bucket = "teamcknu-frontend-bucket"
    prefix = "terraform/state"
  }
}

provider "google" {
  # credentials = file(var.credentials_file)
  project = var.project
  region  = var.region
  zone    = var.zone
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
  # host = "npipe:////.//pipe//docker_engine" # for Windows

  registry_auth {
    address = "registry.hub.docker.com"
  }
}

# Enables the Cloud Run API
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
}

# Creates Google Cloud Run app
resource "google_cloud_run_service" "frontend_server" {
  name     = "frontend-server-dev"
  location = var.region

  template {
    spec {
      containers {
        image = "teamcknu/frontend:${var.docker_tag}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_project_service.run_api
  ]
}

# Allow unauthenticated users to invoke the service
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.frontend_server.location
  project  = google_cloud_run_service.frontend_server.project
  service  = google_cloud_run_service.frontend_server.name

  policy_data = data.google_iam_policy.noauth.policy_data

  depends_on = [
    google_cloud_run_service.frontend_server
  ]
}

output "service_url" {
  value = google_cloud_run_service.frontend_server.status[0].url
}
