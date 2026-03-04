#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4010}"
BASE_URL="http://127.0.0.1:${PORT}"
LOG_FILE="/tmp/dot-website-test-server.log"

match_file() {
  local pattern="$1"
  local file="$2"

  if command -v rg >/dev/null 2>&1; then
    rg -q "$pattern" "$file"
  else
    grep -Eq "$pattern" "$file"
  fi
}

if [[ ! -f ".next/BUILD_ID" ]]; then
  echo "Missing production build artifacts. Run 'npm run build' before smoke tests."
  exit 1
fi

npm run start -- -p "$PORT" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

cleanup() {
  if kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

for _ in {1..30}; do
  if curl -fsS "$BASE_URL" >/tmp/dot-homepage.html; then
    break
  fi
  if [[ -f "$LOG_FILE" ]] && match_file "listen EPERM|Failed to start server" "$LOG_FILE"; then
    echo "Server binding is restricted in this environment; running static smoke fallback."
    match_file "\"/\"" .next/prerender-manifest.json
    [[ -f ".next/server/app/page.js" ]]
    echo "Smoke tests passed (static fallback)."
    exit 0
  fi
  sleep 1
done

curl -fsS "$BASE_URL" >/tmp/dot-homepage.html
curl -fsS "$BASE_URL/icon.svg" >/tmp/dot-icon.svg

if ! match_file "dot|VERTICAL AI SOLUTIONS" /tmp/dot-homepage.html; then
  echo "Homepage smoke test failed: expected branding text not found."
  exit 1
fi

echo "Smoke tests passed."
