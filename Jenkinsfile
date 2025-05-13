pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS-Credinitial')
        AWS_SECRET_ACCESS_KEY = credentials('AWS-Credinitial')
        DOCKER_IMAGE          = "m3bdlkawy/whitehelment"
        DOCKER_REGISTRY       = "https://index.docker.io/v1/"
        TF_WORKING_DIR        = "Terraform"
        ANSIBLE_WORKING_DIR   = "Ansible"
    }

    options {
        retry(1)
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Clone Repository') {
            steps {
                git(
                    credentialsId: 'github-token',
                    branch: 'main',
                    url: 'https://github.com/m3bdlkawy/Whitehelment.git',
                    poll: true
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build(
                        "${DOCKER_IMAGE}:${env.BUILD_NUMBER}",
                        "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} ."
                    )
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry(env.DOCKER_REGISTRY, 'dockerhub-credentials') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir(env.TF_WORKING_DIR) {
                    script {
                        sh 'terraform init -input=false'
                        sh 'terraform validate'
                        sh 'terraform apply -auto-approve'
                    }
                }
            }
        }

        stage('Wait for EC2 Initialization') {
            steps {
                script {
                    echo "Waiting for EC2 initialization..."
                    retry(3) {
                        sleep(time: 120, unit: 'SECONDS')
                    }
                }
            }
        }

        stage('Infrastructure Setup with Ansible') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'private-key',
                        keyFileVariable: 'SSH_KEY_PATH',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    dir(env.ANSIBLE_WORKING_DIR) {
                        script {
                            sh """
                            ansible-playbook -i inventory_aws_ec2.yaml playbook.yml \
                            --private-key $SSH_KEY_PATH \
                            -u $SSH_USER \
                            -e ansible_python_interpreter=/usr/bin/python3
                            """
                        }
                    }
                }
            }
        }

        stage('Helm Deployment with Ansible') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'private-key',
                        keyFileVariable: 'SSH_KEY_PATH', 
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    dir(env.ANSIBLE_WORKING_DIR) {
                        script {
                            sh """
                            ansible-playbook -i inventory_aws_ec2.yaml Deployment-playbook.yaml \
                            --private-key $SSH_KEY_PATH \
                            -u $SSH_USER \
                            -e ansible_python_interpreter=/usr/bin/python3
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                docker.withRegistry(env.DOCKER_REGISTRY, 'dockerhub-credentials') {
                    dockerImage.cleanup()
                }
            }
        }
        success {
            emailext body: 'Deployment completed successfully!', subject: 'SUCCESS: Deployment Notification', to: 'abdelkawy212@gmail.com'
        }
        failure {
            emailext body: 'Deployment failed! Check Jenkins logs for details.', subject: 'FAILURE: Deployment Notification', to: 'abdelkawy212@gmail.com'
        }
        unstable {
            emailext body: 'Deployment marked as unstable!', subject: 'UNSTABLE: Deployment Notification', to: 'abdelkawy212@gmail.com'
        }
    }
}
