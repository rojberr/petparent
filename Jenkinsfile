pipeline {
    agent {
        docker {
            image 'python:alpine3.16'
            args '-e notimportant=env'
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