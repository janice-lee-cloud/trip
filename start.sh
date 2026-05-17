#!/bin/bash
# Open the trip planner in Chrome, Safari, or your default browser.
set -e
cd "$(dirname "$0")"
NODE="./.tools/bin/node"
NPM="./.tools/bin/npm"

if [ ! -x "$NODE" ]; then
  echo "Setting up Node.js (first run only)…"
  ARCH=$(uname -m | sed 's/arm64/arm64/;s/x86_64/x64/')
  curl -fsSL "https://nodejs.org/dist/v22.15.0/node-v22.15.0-darwin-${ARCH}.tar.gz" -o /tmp/node-trip.tar.gz
  mkdir -p .tools
  tar -xzf /tmp/node-trip.tar.gz -C .tools --strip-components=1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies…"
  "$NPM" install
fi

echo ""
echo "  Trip planner → http://localhost:5173"
echo "  Press Ctrl+C to stop"
echo ""

# macOS: open in default browser
if command -v open >/dev/null 2>&1; then
  (sleep 2 && open "http://localhost:5173") &
fi

exec "$NPM" run dev -- --host 127.0.0.1 --port 5173
