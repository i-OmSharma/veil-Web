#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAMBDA_DIR="$SCRIPT_DIR/../../lambda/veil-handler"

cd "$LAMBDA_DIR"
npm ci --omit=dev
rm -f function.zip
zip -r function.zip . \
  --exclude "*.git*" \
  --exclude "*.env*" \
  --exclude "*.md"
echo "Built: $LAMBDA_DIR/function.zip"
