#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAMBDA_DIR="$SCRIPT_DIR/../../lambda/veil-handler"

cd "$LAMBDA_DIR"
npm install --omit=dev
rm -f function.zip
zip -r function.zip . --exclude "*.git*"
echo "Built: $LAMBDA_DIR/function.zip"
