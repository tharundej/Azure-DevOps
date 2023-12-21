pipeline {
    agent {label 'Staging'}
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
                checkout scmGit(branches: [[name: '*/main_stage']], extensions: [], userRemoteConfigs: [[credentialsId: 'frontend_git', url: 'https://github.com/ani0310/BellHrms.git']])
            }
        }
         stage('Docker Compose Stop Delete') {
            steps {
                script {
                     sh '''
                         docker ps
                         // docker stop  ui_erp:8.0
                         // docker rm  ui_erp:8.0
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
}
