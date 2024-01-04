pipeline {
    agent {label 'DevOps'}

    environment {
        DOCKER_REGISTRY = 'https://hub.docker.com/'
        DOCKER_CREDENTIALS_ID = 'dockerlogin'
    }

    stages {
        stage("Env Variables") {
            steps {
                echo "The current build number is ${env.BUILD_NUMBER}"
                echo "Another method is to use \${BUILD_NUMBER}, which is ${BUILD_NUMBER}"
            }
        }

        stage('Clean Workspace') {
            steps {
                dir('/opt/jenkins/workspace/') {
                    echo 'Before Cleaning workspace...'
                    sh 'ls -al'
                    sh 'rm -rf *'
                    deleteDir()
                    echo 'Workspace cleaned.'
                    sh 'ls -al'
                }
            }
        }

        stage("Git clone") {
            steps {
                checkout scmGit(branches: [[name: '*/main_dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'Info_Github', url: 'https://github.com/Infobell-IT-Solutions-India/ERP_FE.git']])
            }
        }

       stage('Docker Hub Login') {
    steps {
        script {
            // Use withCredentials to bind Docker credentials to environment variables
            withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {

                // Log in to Docker registry using --password-stdin
                sh "echo ${DOCKER_PASSWORD} | docker login --username=${DOCKER_USERNAME} --password-stdin https://index.docker.io/v1/"
            }
        }
    }
}

        stage('Docker Compose Stop Delete') {
            steps {
                script {
                    sh '''
                         docker ps
                         docker rm -f node_test || true
                         echo y | docker system prune -a
                         echo y | docker image prune -a
                    '''
                }
            }
        }

        stage('List Running Containers After Docker Compose') {
            steps {
                script {
                    sh '''
                         docker-compose up -d &&
                         docker ps
                    '''
                }
            }
        }
    }

    post {
        success {
            // This block will be executed only if the build is successful
            script {
                echo 'Build successful, performing cleanup...'
                // Additional cleanup steps go here
                sh "docker logout ${DOCKER_REGISTRY}" // Log out from Docker registry after the build
            }
        }
    }
}
    
        stage('Ok') {
            steps {
                // Your build steps go here
                echo "Ok"
            }
        }
    

    post {
        success {
            emailext (
                bcc: 'bcc@example.com', 
                cc: 'cc@example.com', 
                from: 'jenkins@example.com', 
                replyTo: 'jenkins@example.com', 
                subject: 'Build Successful', 
                to: 'tharun@infobellit.com', 
                mimeType: 'text/html', 
                body: '<p>The build was successful.</p>'
            )
        }
        failure {
            emailext (
                bcc: 'bcc@example.com', 
                cc: 'cc@example.com', 
                from: 'jenkins@example.com', 
                replyTo: 'jenkins@example.com', 
                subject: 'Build Failed', 
                to: 'tharun@infobellit.com', 
                mimeType: 'text/html', 
                body: '<p>The build failed.</p>'
            )
        }
    }