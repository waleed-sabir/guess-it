# Multi-regional Deployment of a Highly Available Containerized Web Application on AWS

This project demonstrates deploying a containerized web application on AWS using Amazon EC2, ECR, and EKS across two regions. The setup includes using AWS CloudFront for global content delivery and Route 53 for DNS management, ensuring high availability and resilience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Deployment Steps](#deployment-steps)
  - [1. Set Up EC2 Instance for ECR and EKS Management](#1-set-up-ec2-instance-for-ecr-and-eks-management)
  - [2. Configure ECR with Cross-Region Replication](#2-configure-ecr-with-cross-region-replication)
  - [3. Deploy EKS Clusters](#3-deploy-eks-clusters)
  - [4. Set Up CloudFront and Route 53](#4-set-up-cloudfront-and-route-53)
- [Monitoring and Logging](#monitoring-and-logging)
- [Conclusion](#conclusion)

## Prerequisites

Before starting, ensure you have the following:

- An AWS account with appropriate IAM permissions
- AWS CLI installed and configured
- kubectl installed on the EC2 instance
- eksctl installed on the EC2 instance
- Docker installed on the EC2 instance
- Node.js and npm installed on the EC2 instance
- Domain name registered in AWS Route 53

## Architecture

![Architecture Diagram](https://github.com/waleed-sabir/guess-it/blob/dev/architecture-design.png)

## Deployment Steps

### 1. Set Up EC2 Instance for ECR and EKS Management

1. **Launch an EC2 Instance**

- Create an EC2 instance in the primary region.
- SSH into the EC2 instance and install Docker and the AWS CLI.
- Install eksctl on the EC2 instance for managing the EKS clusters.

2. **Authenticate Docker to Amazon ECR**

```sh
aws ecr get-login-password --region <primary-region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<primary-region>.amazonaws.com
```

3.  **Build and Push Docker Image**

- Build the Docker image locally on the EC2 instance.

```sh
docker build -t your-image-name .
```

- Tag and push the image to the ECR repository.

```sh
docker tag your-image-name:latest <account-id>.dkr.ecr.<primary-region>.amazonaws.com/your-repo-name:latest
docker push <account-id>.dkr.ecr.<primary-region>.amazonaws.com/your-repo-name:latest
```

### 2. Configure ECR with Cross-Region Replication

1. **Enable Cross-Region Replication**

- Set up cross-region replication from the primary region to the secondary region for the ECR repository via the AWS Management Console or CLI.

### 3. Deploy EKS Clusters

1. **EKS Cluster in Primary Region (AWS Console)**

- Create an EKS cluster in the primary region using the AWS Management Console. Follow the standard process, including VPC setup, node group creation, and IAM roles configuration.

2. **EKS Cluster in Secondary Region (eksctl)**

- Use `eksctl` to create an EKS cluster in the secondary region from the EC2 instance.

```sh
eksctl create cluster --name secondary-cluster --region <secondary-region> --nodegroup-name standard-workers --node-type t3.medium --nodes 3
```

3. **Deploy Application to EKS Clusters**

- Update kubeconfig for each cluster and deploy the application using Kubernetes manifests.

```sh
aws eks update-kubeconfig --region <region> --name <cluster-name>
kubectl apply -f k8s
```

### 4. Set Up CloudFront and Route 53

1. **Create CloudFront Distribution**

- Set up a CloudFront distribution with the Application Load Balancers (ALBs) of both EKS clusters as custom origins.
- Create an origin group and configure failover between the ALBs.

2. **Route 53 Custom Domain Configuration**

- Map the CloudFront distribution domain name to a custom domain name in Route 53.
- Configure an Alias record in Route 53 pointing to the CloudFront distribution.

## Monitoring and Logging

1. **Set Up CloudWatch for Logs and Metrics**

- Enable CloudWatch Logs for EKS pods and application logs.
- Set up key metrics like CPU usage, memory usage, and request count to monitor the health and performance of the infrastructure.

2. **Create CloudWatch Alarms**

- Configure CloudWatch Alarms for key metrics to notify you of critical issues. Use Amazon SNS for alarm notifications.

## Conclusion

By following these steps, you have successfully developed and deployed a containerized React.js web application on AWS. The application is globally accessible, highly available, and monitored for performance and health.
