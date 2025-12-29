#!/bin/bash

# Deploy TreasuryRegistry to Base Mainnet
# Usage: ./scripts/deploy-mainnet.sh
# WARNING: This deploys to mainnet. Make sure you've tested on Sepolia first!

set -e

echo "⚠️  WARNING: This will deploy to Base MAINNET"
echo "Make sure you've:"
echo "  1. Tested on Sepolia"
echo "  2. Reviewed the contract code"
echo "  3. Have enough ETH for gas"
echo ""
read -p "Type 'yes' to continue: " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🚀 Deploying TreasuryRegistry to Base Mainnet..."
echo ""

cd contracts

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: contracts/.env file not found"
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
echo "🚀 Deploying to Base Mainnet..."
export CONFIRM_MAINNET=yes

forge script script/DeployMainnet.s.sol:DeployMainnet \
  --rpc-url base_mainnet \
  --broadcast \
  ${BASESCAN_API_KEY:+--verify} \
  -vvv

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the contract address from above"
echo "2. Update environment files with the contract address"
echo "3. Verify contract on Basescan"
echo "4. Register your first treasury"
echo "5. Share with the Base community! 🎉"

