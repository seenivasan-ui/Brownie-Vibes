#!/bin/bash
echo "🍫 Starting Brownie Vibes locally..."

# Check Docker
if ! command -v docker &>/dev/null; then
  echo "❌ Docker not found. Install from https://docker.com/get-started"
  exit 1
fi

# Copy env if missing
[ ! -f .env ] && cp .env.example .env && echo "📄 Created .env from example"

# Start
docker-compose up --build -d

echo ""
echo "✅ Brownie Vibes is running!"
echo "   🌐 Website:  http://localhost:3000"
echo "   📦 API:      http://localhost:8000"
echo "   📖 API Docs: http://localhost:8000/docs"
echo "   👑 Admin:    http://localhost:3000/admin"
echo ""
echo "   Login: monisha / brownievibes@2025"
