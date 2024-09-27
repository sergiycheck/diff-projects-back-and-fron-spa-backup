#!/bin/sh

aws lambda invoke --function-name ProcessSQSRecord \
--payload file://$PWD/test/sh/input.json out --log-type Tail \
--query 'LogResult' --output text \
--cli-binary-format raw-in-base64-out | base64 --decode