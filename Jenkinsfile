pipeline {
    agent any

    environment {
        IMAGE_NAME = "node-demo"
        CONTAINER_NAME = "node-demo-container"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop ${CONTAINER_NAME} || true'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm ${CONTAINER_NAME} || true'
            }
        }

        stage('Deploy New Container') {
            steps {
                sh 'docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:latest'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}