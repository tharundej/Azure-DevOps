pipeline {
    agent any
    stages{
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        stage("Git clone"){
            steps{
                checkout scmGit(branches: [[name: '*/main_dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'frontend_git', url: 'https://github.com/ani0310/BellHrms.git']])
            }
        }
         stage('Docker Compose Stop Delete') {
            steps {
                script {
                    sh '''
                        docker stop \$(docker ps -q) &&
                        docker kill \$(docker ps -q) &&
                        docker rm \$(docker ps -a -q) &&S
                        docker system prune -a
                    '''
                }
            }
        }
     stage('List Running Containers After Docker Compose') {
            steps {
                script {
                    sh '''docker-compose up -d &&
                          docker ps -a
                    '''      
                }
            }
        }
    }
}