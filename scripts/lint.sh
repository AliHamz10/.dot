#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="src"

if rg -n "console\\.log|debugger" "$SOURCE_DIR"; then
  echo "Lint failed: remove debug statements from production source files."
  exit 1
fi

echo "Lint passed: no debug statements found in $SOURCE_DIR/."
