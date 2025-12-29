#!/bin/bash

# Deploy TreasuryRegistry to Base Sepolia
# Usage: ./scripts/deploy-sepolia.sh

set -e

echo "🚀 Deploying TreasuryRegistry to Base Sepolia..."
echo ""

cd contracts

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: contracts/.env file not found"
    echo "Please create contracts/.env with:"
    echo "  PRIVATE_KEY=your_private_key"
    echo "  BASESCAN_API_KEY=your_api_key"
    exit 1
fi

# Load environment variables
source .env

# Check required variables
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY not set in contracts/.env"
    exit 1
fi

if [ -z "$BASESCAN_API_KEY" ]; then
    echo "⚠️  Warning: BASESCAN_API_KEY not set. Contract will not be verified."
fi

echo "📦 Building contracts..."
forge build

echo ""
echo "🚀 Deploying to Base Sepolia..."
forge script script/DeploySepolia.s.sol:DeploySepolia \
  --rpc-url base_sepolia \
  --broadcast \
  ${BASESCAN_API_KEY:+--verify} \
  -vvv

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the contract address from above"
echo "2. Update environment files:"
echo "   - indexer/.env: TREASURY_REGISTRY_ADDRESS"
echo "   - backend/.env: TREASURY_REGISTRY_ADDRESS"
echo "   - frontend/.env.local: NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS"
echo "3. Verify contract on Basescan (if not auto-verified)"
echo "4. Register your first treasury!"

