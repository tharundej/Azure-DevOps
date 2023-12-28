pipeline {
    agent {label 'DevOps'}
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
                checkout scmGit(branches: [[name: '*/main_dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'Info_Github', url: 'https://github.com/Infobell-IT-Solutions-India/ERP_FE.git']])
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
}
