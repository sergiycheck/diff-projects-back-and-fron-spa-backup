create role for lambda [role](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/roles/details/lambda-sqs-role?section=permissions)
[arn](arn:aws:iam::581425740433:role/lambda-sqs-role)

deploy output

```json
{
  "FunctionName": "ProcessSQSRecord",
  "FunctionArn": "arn:aws:lambda:eu-central-1:581425740433:function:ProcessSQSRecord",
  "Runtime": "nodejs18.x",
  "Role": "arn:aws:iam::581425740433:role/lambda-sqs-role",
  "Handler": "index.handler",
  "CodeSize": 899,
  "Description": "",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2024-01-11T09:49:02.956+0000",
  "CodeSha256": "KiyVG+inVAhoAVHnxXDvrsl+Q4a85+TEhLNzgSokz4o=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "b29bdd50-0608-4631-9632-ab2af7b4caf6",
  "State": "Pending",
  "StateReason": "The function is being created.",
  "StateReasonCode": "Creating",
  "PackageType": "Zip",
  "Architectures": ["x86_64"],
  "EphemeralStorage": {
    "Size": 512
  },
  "SnapStart": {
    "ApplyOn": "None",
    "OptimizationStatus": "Off"
  },
  "RuntimeVersionConfig": {
    "RuntimeVersionArn": "arn:aws:lambda:eu-central-1::runtime:d949ec0248c1b8fbc8cbc6df1c986e05fb933506b51d53be82d46f9a37125bea"
  },
  "LoggingConfig": {
    "LogFormat": "Text",
    "LogGroup": "/aws/lambda/ProcessSQSRecord"
  }
}
```
