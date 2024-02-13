pipeline {
    agent any 

    environment {
        DOCKER_REGISTRY = 'https://hub.docker.com/'
        DOCKER_CREDENTIALS_ID = 'docker_login'
        DOCKER_IMAGE_NAME = 'tharuninfo/erpui'
    }

    stages {
        stage("Env Variables") {
            steps {
                echo "The current build number is ${env.BUILD_NUMBER}"
                echo "Another method is to use \${BUILD_NUMBER}, which is ${BUILD_NUMBER}"
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
        stage('Create Version File') {
             steps {
                       sh 'mkdir -p /var/lib/jenkins/workspace/docker_registry'
                     sh 'echo "1" > /var/lib/jenkins/workspace/docker_registry/version'
    }
}

        stage('Read and Increment Version') {
            steps {
                script {
                    def version = readFile('version').trim()
                    def incrementedVersion = version.toInteger() + 1
                    writeFile(file: 'version', text: incrementedVersion.toString())
                    env.DOCKER_IMAGE_TAG = "v${incrementedVersion}"
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build Docker image with tag
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}-${env.BUILD_NUMBER} ."
                    
                    // Push Docker image to Docker Hub
                    sh "docker push ${DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}-${env.BUILD_NUMBER}"
                }
            }
        }
    }
}