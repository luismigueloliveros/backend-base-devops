pipeline {
    agent any
    environment {
        USERNAME = 'Luis Oliveros'
        API_KEY = 'admin123'
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
            stages {
               stage('Instalar dependencias') {
                   steps {
                       sh 'npm install'
                   }
               } 
                stage('ejecucion de test') {
                   steps {
                       sh 'npm run test'
                   }
               } 
                stage('ejecucion de build') {
                   steps {
                       sh 'npm run build'
                   }
               } 
            }
        }
        stage('Code Quality'){
            stages {
                stage('SonarQube analysis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli' 
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('Quality Gate'){
                    steps {
                        timeout (time: 10, unit: 'SECONDS'){
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('delivery'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest"
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                        sh 'docker push localhost:8082/backend-base-devops:latest'
                        sh "docker push localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('Deploy'){
            stages {
                stage('Deploy Kubernetes') {
                    agent {
                        docker {
                            image 'bitnami/kubectl:latest'
                            args '--entrypoint='
                        }
                    }
                    environment {
                        KUBECONFIG = credentials('kubeconfig-credentials')
                    }
                    steps {
                        script {
                            sh "kubectl set image deployment backend-base-devops-deployment backend-base-devops=172.26.63.148:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                        }
                    }
                }
            }
        }
    }
}