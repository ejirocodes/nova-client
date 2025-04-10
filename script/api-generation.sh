#!/bin/bash
API_SERVER="${API_SERVER:-http://localhost:3024/api/v1/docs-yaml}"
OUTPUT_FOLDER="./app/lib/client"

rm -rf $OUTPUT_FOLDER
# Install from homebrew https://formulae.brew.sh/formula/openapi-generator
openapi-generator generate -i $API_SERVER \
-g typescript-axios \
-o $OUTPUT_FOLDER \
--skip-validate-spec

# Run lint only on ./packages/client/api folder
# pnpm lint --prefix $OUTPUT_FOLDER

# openapi-generator generate -i http://localhost:3434/swagger-yaml -g typescript-axios -o ./packages/client/api --skip-validate-spec