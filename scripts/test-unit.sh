#!/usr/bin/env bash
set -euo pipefail

rm -rf .test-dist
npm run test:unit:build

test_files=()
while IFS= read -r file; do
  test_files+=("$file")
done < <(find .test-dist/tests/unit -type f -name "*.test.js" | sort)

if [[ ${#test_files[@]} -eq 0 ]]; then
  echo "No unit test files were generated."
  exit 1
fi

node --test "${test_files[@]}"
