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
                bat 'docker build -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop %CONTAINER_NAME% || exit 0'
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm %CONTAINER_NAME% || exit 0'
            }
        }

        stage('Deploy New Container') {
            steps {
                bat 'docker run -d --name %CONTAINER_NAME% -p 3000:3000 %IMAGE_NAME%:latest'
            }
        }
    }
}