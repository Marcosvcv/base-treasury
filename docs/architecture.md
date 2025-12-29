# BaseTreasury Architecture

## Overview

BaseTreasury is a comprehensive treasury analytics platform built for the Base ecosystem. It consists of several interconnected components that work together to provide transparent treasury insights.

## System Architecture

```
┌─────────────────┐
│   Frontend       │  Next.js + React + Wagmi
│   (Dashboard)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend API   │  Express.js + TypeScript
│   (REST API)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────┐
│ Indexer │ │ Registry │
│         │ │ Contract │
└─────────┘ └──────────┘
    │
    ▼
┌─────────┐
│  Base   │
│ Network │
└─────────┘
```

## Components

### 1. Smart Contracts (`contracts/`)

**TreasuryRegistry.sol**
- On-chain registry for treasury addresses
- Stores metadata (name, category, verification status)
- Enables public discoverability and composability

### 2. Indexer (`indexer/`)

**Responsibilities:**
- Listen to Base network for transactions
- Process transactions involving registered treasuries
- Classify transactions by spending category
- Calculate metrics (burn rate, runway, etc.)

**Components:**
- `TxListener`: Monitors blockchain for relevant transactions
- `Classifier`: Categorizes transactions based on rules
- `MetricsEngine`: Computes treasury metrics

### 3. Backend API (`backend/`)

**Endpoints:**
- `GET /treasury/:address/overview` - Treasury overview
- `GET /treasury/:address/spending` - Spending breakdown
- `GET /treasury/:address/runway` - Runway analysis
- `GET /treasury/:address/recipients` - Top recipients
- `GET /treasuries/top` - Top treasuries

### 4. Frontend (`frontend/`)

**Pages:**
- Home page with overview
- Treasury analytics dashboard
- Spending timeline
- Category breakdown
- Recipient analysis

**Tech Stack:**
- Next.js 14 (App Router)
- React 18
- Wagmi + RainbowKit for wallet connection
- Tailwind CSS for styling

### 5. SDK (`sdk/js/`)

JavaScript/TypeScript library for integrating BaseTreasury into other applications.

## Data Flow

1. **Registration**: Treasury addresses are registered on-chain via `TreasuryRegistry`
2. **Indexing**: Indexer monitors Base network and processes transactions
3. **Classification**: Transactions are categorized using rule-based classification
4. **Metrics**: Metrics engine calculates treasury health indicators
5. **API**: Backend exposes data via REST API
6. **Dashboard**: Frontend visualizes data for users

## Classification Rules

Transactions are classified using YAML-based rules in `classification/rules.yaml`. Rules can be:
- Value-based (min/max ETH)
- Receiver type (EOA vs Contract)
- Address-based (known service addresses)
- Note-based (transaction memos)

## Metrics

### Treasury Health Metrics

- **Total Assets**: Current balance of treasury
- **Monthly Burn**: Average monthly spending
- **Runway**: Estimated months until treasury is depleted
- **Category Distribution**: Spending by category
- **Top Recipients**: Most frequent/valuable recipients

## Future Enhancements

- Database integration (PostgreSQL)
- Real-time updates via WebSockets
- GraphQL API
- Multi-chain support
- Advanced analytics and predictions

