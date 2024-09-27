#!/bin/sh

aws lambda create-event-source-mapping --function-name ProcessSQSRecord  --batch-size 10 \
--event-source-arn arn:aws:sqs:eu-central-1:581425740433:QueueForLambda.fifo