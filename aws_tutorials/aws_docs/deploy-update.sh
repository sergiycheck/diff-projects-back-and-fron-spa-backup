# !/bin/sh

aws lambda update-function-code --function-name ProcessSQSRecord \
--zip-file fileb://function.zip \
--publish