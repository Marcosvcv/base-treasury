# TreasuryRegistry Contract

Smart contract for registering and managing treasury addresses on Base.

## Overview

The `TreasuryRegistry` contract provides a public, on-chain registry for treasury addresses and their metadata. This enables:

- Public discoverability of treasuries
- Composable treasury data
- Verification system for trusted treasuries

## Functions

### `registerTreasury(address treasury, string name, string category)`
Register a new treasury address with metadata.

### `updateTreasury(address treasury, string name, string category)`
Update treasury metadata (only by original registrant).

### `verifyTreasury(address treasury, bool verified)`
Verify/unverify a treasury (only by owner).

### `getTreasury(address treasury)`
Get treasury information.

### `getTreasuryCount()`
Get total number of registered treasuries.

### `getAllTreasuries()`
Get all treasury addresses.

## Development

```bash
# Install dependencies
forge install

# Build
forge build

# Test
forge test

# Deploy to Base Sepolia
forge script script/Deploy.s.sol:DeployScript --rpc-url base_sepolia --broadcast --verify

# Deploy to Base Mainnet
forge script script/Deploy.s.sol:DeployScript --rpc-url base_mainnet --broadcast --verify
```

## Environment Variables

Create a `.env` file:

```bash
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

