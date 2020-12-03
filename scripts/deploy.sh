#!/bin/bash

filename="hb-$1.js"

exists=$(aws s3 ls s3://pickzen-resources/clients/hungrybark/theme/$filename --profile $2)

if [ -z "$exists" ]; then
  echo "  Uploading $filename"
  aws s3 cp ./build/$filename s3://pickzen-resources/clients/hungrybark/theme/$filename --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --profile $2
else
  echo "  Ignoring $filename"
fi

filename="hb-$1.css"

exists=$(aws s3 ls s3://pickzen-resources/clients/hungrybark/theme/$filename --profile $2)

if [ -z "$exists" ]; then
  echo "  Uploading $filename"
  aws s3 cp ./build/$filename s3://pickzen-resources/clients/hungrybark/theme/$filename --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --profile $2
else
  echo "  Ignoring $filename"
fi