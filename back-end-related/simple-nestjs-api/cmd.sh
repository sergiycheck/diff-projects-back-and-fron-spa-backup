# !/bin/sh

# 1.
# create aws ecs repository

# aws ecr create-repository \
#     --repository-name repository-to-deploy-simple-nestjs-api \
#     --region eu-central-1
# result
# {
#     "repository": {
#         "repositoryArn": "arn:aws:ecr:eu-central-1:581425740433:repository/repository-to-deploy-simple-nestjs-api",
#         "registryId": "581425740433",
#         "repositoryName": "repository-to-deploy-simple-nestjs-api",
#         "repositoryUri": "581425740433.dkr.ecr.eu-central-1.amazonaws.com/repository-to-deploy-simple-nestjs-api",
#         "createdAt": "2024-02-26T12:48:24.832000+02:00",
#         "imageTagMutability": "MUTABLE",
#         "imageScanningConfiguration": {
#             "scanOnPush": false
#         },
#         "encryptionConfiguration": {
#             "encryptionType": "AES256"
#         }
#     }
# }

# 2.
# get the simple-nestjs-api with the repositoryURI
# docker tag simple-nestjs-api 581425740433.dkr.ecr.eu-central-1.amazonaws.com/repository-to-deploy-simple-nestjs-api

# 3 login to the ecr
# aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 581425740433.dkr.ecr.eu-central-1.amazonaws.com

# 4 push the image to the ecr
# docker push 581425740433.dkr.ecr.eu-central-1.amazonaws.com/repository-to-deploy-simple-nestjs-api