#!/bin/bash
# Quick price update script
# Usage: ./update-prices.sh "Classic Fudge Brownie" 15
ITEM="$1"
PRICE="$2"
if [ -z "$ITEM" ] || [ -z "$PRICE" ]; then
  echo "Usage: ./update-prices.sh \"Item Name\" NewPrice"
  echo "Example: ./update-prices.sh \"Classic Fudge Brownie\" 15"
  exit 1
fi
echo "📦 Use the owner dashboard at http://localhost:3000/admin"
echo "   Or commit a change to frontend/lib/api.ts → DEFAULT_MENU"
echo "   git add . && git commit -m \"Update $ITEM price to ₹$PRICE\" && git push"
