pipeline {
    agent {
        docker {
            image 'python:alpine3.16'
            args '-p 8080:8080'
        }
    }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            steps {
                sh 'chmod +x envsetup.sh'
                sh 'bash ./envsetup.sh'
            }
        }
    }
}