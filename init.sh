#!/bin/bash
# init.sh — Run at the start of every agent session
# Installs deps, starts dev server, verifies app is serving

set -e

echo "=== dylanwu-site init ==="

# Install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start dev server in background if not already running
if ! lsof -i :3000 > /dev/null 2>&1; then
  echo "Starting dev server..."
  npm run dev &
  sleep 5
fi

# Verify app is serving
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
  echo "✓ App is serving on http://localhost:3000"
else
  echo "✗ App failed to start — check for errors"
  exit 1
fi

echo "=== Ready to develop ==="
