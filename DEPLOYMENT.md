# BaseTreasury Deployment Guide

This guide walks you through deploying BaseTreasury to Base networks.

## Prerequisites

1. **Node.js** ≥18.x
2. **Foundry** installed ([Install Foundry](https://book.getfoundry.sh/getting-started/installation))
3. **Base Sepolia ETH** for testnet deployment
4. **Base Mainnet ETH** for mainnet deployment
5. **Basescan API Key** ([Get one here](https://basescan.org/apis))

## Step 1: Environment Setup

### Contracts Environment

Create `contracts/.env`:

```bash
PRIVATE_KEY=your_private_key_here
BASE_MAINNET_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key_here
```

### Indexer Environment

Create `indexer/.env`:

```bash
BASE_RPC_URL=https://mainnet.base.org
TREASURY_REGISTRY_ADDRESS=0x... # After deployment
```

### Backend Environment

Create `backend/.env`:

```bash
PORT=3001
BASE_RPC_URL=https://mainnet.base.org
TREASURY_REGISTRY_ADDRESS=0x... # After deployment
CORS_ORIGINS=http://localhost:3000,https://basetreasury.org
```

### Frontend Environment

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS=0x... # After deployment
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CHAIN_ID=8453 # 8453 for mainnet, 84532 for sepolia
```

**Get WalletConnect Project ID:**
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID

## Step 2: Deploy Contracts

### Deploy to Base Sepolia (Testnet)

```bash
cd contracts

# Load environment variables
source .env

# Deploy to Sepolia
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url base_sepolia \
  --broadcast \
  --verify \
  -vvv
```

After deployment, save the contract address and update your environment files.

### Deploy to Base Mainnet

⚠️ **Warning**: Only deploy to mainnet after thorough testing on Sepolia!

```bash
cd contracts

# Load environment variables
source .env

# Deploy to Mainnet
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url base_mainnet \
  --broadcast \
  --verify \
  -vvv
```

### Verify Contract on Basescan

The `--verify` flag should automatically verify your contract. If it doesn't, you can verify manually:

```bash
forge verify-contract \
  --chain-id 84532 \
  --num-of-optimizations 200 \
  --watch \
  --constructor-args $(cast abi-encode "constructor()") \
  --etherscan-api-key $BASESCAN_API_KEY \
  <CONTRACT_ADDRESS> \
  src/TreasuryRegistry.sol:TreasuryRegistry
```

## Step 3: Update Environment Variables

After deployment, update all `.env` files with the deployed contract address:

- `indexer/.env`: `TREASURY_REGISTRY_ADDRESS`
- `backend/.env`: `TREASURY_REGISTRY_ADDRESS`
- `frontend/.env.local`: `NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS`

## Step 4: Start Services

### Start Indexer

```bash
cd indexer
npm run dev
```

The indexer will start listening for transactions involving registered treasuries.

### Start Backend API

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:3001`

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Step 5: Deploy Frontend to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow the prompts
```

### Option 2: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_CHAIN_ID`
5. Deploy!

### Environment Variables in Vercel

Add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://api.basetreasury.org
NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CHAIN_ID=8453
```

## Step 6: Deploy Backend API

### Option 1: Railway

1. Go to [Railway](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Set root directory to `backend`
5. Add environment variables
6. Deploy!

### Option 2: Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set root directory to `backend`
5. Add environment variables
6. Deploy!

### Option 3: Self-hosted

```bash
cd backend
npm run build
npm start
```

## Step 7: Register First Treasury

After deployment, register your first treasury:

```javascript
// Using ethers.js
const registry = new ethers.Contract(
  TREASURY_REGISTRY_ADDRESS,
  abi,
  signer
);

await registry.registerTreasury(
  "0x...", // Treasury address
  "My DAO Treasury", // Name
  "DAO" // Category
);
```

## Troubleshooting

### Contract deployment fails

- Check you have enough ETH for gas
- Verify RPC URL is correct
- Ensure private key has funds

### Verification fails

- Check Basescan API key is correct
- Wait a few minutes after deployment before verifying
- Try manual verification

### Frontend won't connect

- Check WalletConnect Project ID is set
- Verify chain ID matches your network
- Ensure contract address is correct

### Indexer not processing transactions

- Check RPC URL is accessible
- Verify contract address is correct
- Check indexer logs for errors

## Next Steps

1. Register example treasuries
2. Monitor indexer for transactions
3. Share your deployment with the community!
4. Update README with deployment links

## Support

For issues or questions:
- Open an issue on GitHub
- Check documentation in `/docs`
- Join Base community Discord

