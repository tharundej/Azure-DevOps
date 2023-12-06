pipeline {
    agent {label "dev"}
    stages{
         stage("Env Variables") {
            steps {
                echo "The current build number is ${env.BUILD_NUMBER}"
                echo "Another method is to use \${BUILD_NUMBER}, which is ${BUILD_NUMBER}"
            }
        }
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
                        docker ps  | xargs docker stop node_n  | xargs docker rm node_n &&
                        docker system prune -a 
                    '''
                }
            }
        }
     stage('List Running Containers After Docker Compose') {
            steps {
                script {
                    sh '''docker-compose up --bulid &&
                          docker ps
                    '''      
                }
            }
        }
    }
}