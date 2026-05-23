#!/bin/bash
# Build and push to GitHub so Pages can publish the public link.
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

# npm scripts call "node" via PATH — use the bundled copy in .tools/bin
export PATH="$(pwd)/.tools/bin:$PATH"

if [ ! -d node_modules ]; then
  echo "Installing dependencies…"
  npm install
fi

echo "→ Building for GitHub Pages…"
npm run build:pages

echo ""
echo "→ Pushing to GitHub (you may be asked to sign in)…"
echo "   Username: janice-lee-cloud"
echo "   Password: paste a Personal Access Token (not your GitHub password)"
echo ""
git push -u origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  After push succeeds:"
echo "  1. github.com/janice-lee-cloud/trip → Settings → Pages"
echo "  2. Source: GitHub Actions"
echo "  3. Wait ~2 min, then open:"
echo ""
echo "     https://janice-lee-cloud.github.io/trip/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
