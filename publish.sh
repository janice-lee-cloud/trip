#!/bin/bash
# Build and push to GitHub so Pages can publish the public link.
set -e
cd "$(dirname "$0")"

NODE="./.tools/bin/node"
NPM="./.tools/bin/npm"
if [ ! -x "$NPM" ]; then
  NPM="npm"
fi

echo "→ Building for GitHub Pages…"
"$NPM" run build:pages

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
