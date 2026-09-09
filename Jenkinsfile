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

        stage('Check Source') {
            steps {
                sh '''
                    echo "===== Jenkins Workspace app.js ====="
                    cat app.js
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build --no-cache \
                        -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh '''
                    echo "===== app.js inside Docker Image ====="
                    docker run --rm ${IMAGE_NAME}:latest cat /app/app.js
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '''
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy New Container') {
            steps {
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p 3000:3000 \
                        ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker ps
                    echo "===== app.js inside Running Container ====="
                    docker exec ${CONTAINER_NAME} cat /app/app.js
                '''
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