# WhiteHelment Project

This repository provides a complete solution for deploying a Kubernetes cluster with Terraform and Ansible, along with comprehensive monitoring, networking, and application deployment capabilities.

## Project Overview

WhiteHelment is a DevOps automation project designed to streamline the deployment and management of Kubernetes clusters on AWS. The project brings together industry-standard tools in a cohesive pipeline to provide a fully automated infrastructure provisioning and application deployment workflow.

This solution handles everything from infrastructure creation using Terraform to Kubernetes cluster configuration with Ansible, and finally application deployment using Helm charts. The project also includes monitoring capabilities, service mesh functionality with Istio, and ingress traffic management.

## Repository Structure

```
WhiteHelment/
├── Ansible/                  # Ansible configuration for K8s cluster setup
│   ├── Deployment-playbook.yaml
│   ├── ansible.cfg
│   ├── inventory.aws_ec2.yml
│   ├── playbook.yml
│   └── roles/
├── ArgoCD/                   # ArgoCD configuration for GitOps
│   └── argocd.yml
├── Dockerfile                # Containerization for the sample app
├── Helm-Charts/              # Helm charts for various components
│   ├── app-helm-chart/
│   ├── argo-cd/
│   ├── kube-prometheus-stack/
│   └── nginx-ingress-controller/
├── Jenkinsfile               # CI/CD pipeline definition
├── README.md                 # Project documentation
├── Terraform/                # IaC for AWS infrastructure
│   ├── main.tf
│   ├── modules/
│   ├── outputs.tf
│   ├── terraform.tfvars
│   └── variables.tf
├── app.js                    # Sample Express application
├── package.json              # Node.js dependencies
├── public/                   # Static assets
│   └── class-photo.jpg
└── tests/                    # Application test suite
```

## Technologies Used

- **Infrastructure as Code**: Terraform for AWS resource provisioning
- **Configuration Management**: Ansible for Kubernetes cluster configuration
- **Containerization**: Docker for application packaging
- **Container Orchestration**: Kubernetes
- **CI/CD**: Jenkins pipeline for automation
- **Package Management**: Helm for K8s resources deployment
- **Monitoring**: Prometheus/Grafana stack
- **Ingress Controller**: NGINX
- **GitOps**: ArgoCD
- **Application**: Express.js (Node.js)


## Customizations and Important Notes

### Helm Chart Sources Updated
The Helm repositories for the following components have been updated to ensure reliable, up-to-date deployments:

- `kube-prometheus-stack`
- `NGINX Ingress Controller`

### ArgoCD Service Exposure
The ArgoCD service has been configured as a `NodePort` service. This allows external access to the ArgoCD web interface via:
```bash
http://<node-ip>:30080
```
## Prerequisites

- AWS Account with appropriate permissions
- Jenkins server with necessary plugins
- AWS CLI configured
- Docker and Docker Hub account
- Terraform installed (v1.0+)
- Ansible installed (v2.9+)
- kubectl configured

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/m3bdlkawy/Whitehelment.git
cd Whitehelment
```

### 2. Configure AWS Credentials

Set up your AWS credentials either through environment variables or AWS CLI configuration.

### 3. Configure Jenkins

1. Install required Jenkins plugins:
   - AWS Credentials Plugin
   - Docker Pipeline Plugin
   - Terraform Plugin
   - Ansible Plugin

2. Add the following credentials to Jenkins:
   - AWS-Credinitial: AWS access key and secret
   - dockerhub-credentials: Docker Hub username and password
   - github-token: GitHub access token
   - private-key: SSH key for EC2 access

### 4. Update Configuration Files

1. Update Terraform variables in `Terraform/terraform.tfvars`
2. Configure Ansible inventory in `Ansible/inventory.aws_ec2.yml`
3. Review and modify Helm chart values in the `Helm-Charts` directory

## Usage

### Manual Deployment

1. **Initialize and Apply Terraform**:
   ```bash
   cd Terraform
   terraform init
   terraform validate
   terraform apply
   ```

2. **Run Ansible Playbooks**:
   ```bash
   cd ../Ansible
   ansible-playbook -i inventory.aws_ec2.yml playbook.yml
   ansible-playbook -i inventory.aws_ec2.yml Deployment-playbook.yaml
   ```

### CI/CD Pipeline

The included Jenkinsfile defines a complete CI/CD pipeline with the following stages:

1. Clone Repository
2. Build Docker Image
3. Push to Docker Hub
4. Terraform Init & Apply
5. Wait for EC2 Initialization
6. Infrastructure Setup with Ansible
7. Helm Deployment with Ansible

To use the CI/CD pipeline:
1. Configure a Jenkins pipeline job pointing to this repository
2. Ensure all required credentials are available in Jenkins
3. Run the pipeline

## Sample Application

The repository includes a simple Express.js application that displays team members. The application is containerized using Docker and can be deployed to the Kubernetes cluster.

To run the application locally:

```bash
npm install
npm test
node app.js
```

The application will be available at http://localhost:4200

## Contributing

Contributions to WhiteHelment are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Mohamed Abd El Kawy** - DevOps Engineer with a background in civil engineering, specializing in cloud infrastructure and containerization technologies.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- The team at WhiteHelment for their contributions
- The open-source community for providing the tools that make this project possible

## Official Documentation Links

Below are the official documentation sources for the major technologies and tools used in this project. Refer to these links for detailed usage instructions, troubleshooting, and advanced configuration:

- **Terraform**: [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- **Ansible**: [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)
- **Docker**: [Docker Documentation](https://www.docker.com/products/docker-desktop/)
- **Kubernetes**: [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- **Jenkins**: [Jenkins Documentation](https://www.jenkins.io/doc/)
- **Helm**: [Helm Documentation](https://helm.sh/docs/)
- **Prometheus & Grafana**: [Grafana Documentation](https://grafana.com/docs/)
- **NGINX Ingress Controller**: [NGINX Ingress Controller Documentation](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/basic-configuration/)
- **ArgoCD**: [ArgoCD Overview & Tutorial](https://spacelift.io/blog/argocd)
- **Express.js**: [Express.js Introduction (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction)
