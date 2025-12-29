# BaseTreasury Quick Start Guide

Get BaseTreasury up and running in 5 minutes!

## Prerequisites

- Node.js ≥18.x
- Foundry ([Install](https://book.getfoundry.sh/getting-started/installation))
- Base Sepolia ETH (for testnet)

## Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
cd contracts && forge install && cd ..
cd indexer && npm install && cd ..
cd backend && npm install && cd ..
cd frontend && npm install --legacy-peer-deps && cd ..
cd sdk/js && npm install && cd ../..
```

## Step 2: Set Up Environment Variables

### Contracts

Create `contracts/.env`:

```bash
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

### Frontend

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CHAIN_ID=84532
```

Get WalletConnect Project ID: https://cloud.walletconnect.com

## Step 3: Deploy Contract (Base Sepolia)

```bash
./scripts/deploy-sepolia.sh
```

Or manually:

```bash
cd contracts
forge script script/DeploySepolia.s.sol:DeploySepolia \
  --rpc-url base_sepolia \
  --broadcast \
  --verify \
  -vvv
```

Save the contract address!

## Step 4: Update Environment Files

Add the contract address to:
- `indexer/.env`: `TREASURY_REGISTRY_ADDRESS=0x...`
- `backend/.env`: `TREASURY_REGISTRY_ADDRESS=0x...`
- `frontend/.env.local`: `NEXT_PUBLIC_TREASURY_REGISTRY_ADDRESS=0x...`

## Step 5: Start Services

### Terminal 1: Indexer

```bash
cd indexer
npm run dev
```

### Terminal 2: Backend

```bash
cd backend
npm run dev
```

### Terminal 3: Frontend

```bash
cd frontend
npm run dev
```

## Step 6: Open Frontend

Visit: http://localhost:3000

## Step 7: Register a Treasury

Use the frontend or call the contract directly:

```javascript
const registry = new ethers.Contract(
  TREASURY_REGISTRY_ADDRESS,
  abi,
  signer
);

await registry.registerTreasury(
  "0x...", // Treasury address
  "My DAO", // Name
  "DAO"     // Category
);
```

## Next Steps

- Deploy to Base Mainnet (see [DEPLOYMENT.md](./DEPLOYMENT.md))
- Deploy frontend to Vercel
- Deploy backend to Railway/Render
- Register more treasuries
- Share with the community!

## Troubleshooting

**Contracts won't compile?**
```bash
cd contracts
forge install
forge build
```

**Frontend won't start?**
```bash
cd frontend
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run dev
```

**API errors?**
- Check backend is running on port 3001
- Verify contract address is correct
- Check RPC URL is accessible

## Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Open an issue on GitHub
- Check `/docs` for more documentation

