pipeline {
    agent any
    stages{
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        stage(Git clone){
            steps{
                checkout scmGit(branches: [[name: '*/main_dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'frontend_git', url: 'https://github.com/ani0310/BellHrms.git']])
            }
        }

    }
}    