# BaseTreasury

[![Built for Base](https://img.shields.io/badge/Built%20for-Base-0052FF?style=flat-square)](https://base.org)
[![Deployed on Base](https://img.shields.io/badge/Deployed%20on-Base-0052FF?style=flat-square)](https://basescan.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Transparent on-chain treasury + spending intelligence for Base DAOs & protocols**

BaseTreasury is an **open-source treasury management & analytics layer** for Base DAOs, grants programs, and protocol teams — making spending transparent, explainable, and accountable **by default**.

## 🎯 Overview

BaseTreasury helps answer critical questions:
- "Where did this DAO spend funds?"
- "Is this grant program actually paying builders?"
- "Which protocols reinvest vs extract?"
- "How healthy is this treasury runway?"

### Why Base?

Base values:
- ✅ Transparency
- ✅ Public goods
- ✅ DAO tooling
- ✅ Grants accountability
- ✅ Infrastructure, not hype

**BaseTreasury fits perfectly** because:
- It helps Base Grants / ecosystem funds
- It increases trust in DAOs
- It's reusable by many protocols
- It's open-source and composable

## 🏗️ Architecture

```
Treasury address → tx ingestion → classification → insights → public dashboards
```

### Components

- **On-chain Registry**: `TreasuryRegistry.sol` - Public treasury discovery
- **Indexer**: Transaction ingestion and processing
- **Classification Engine**: Automatic spending categorization
- **Metrics Engine**: Runway, burn rate, concentration analysis
- **Backend API**: RESTful endpoints for treasury data
- **Frontend Dashboard**: Public analytics and visualization
- **SDK**: JavaScript/TypeScript library for integrations

## 📊 Features

### Treasury Analytics
- Total assets tracking
- Monthly burn rate calculation
- Runway estimation (months)
- Top recipients analysis
- Category distribution
- Reinvestment vs extraction metrics
- Protocol alignment score

### Spending Classification
Automatic categorization of transactions:
- Grants
- Salaries
- Development
- Liquidity
- Marketing
- Infrastructure
- Operations
- Unknown

### Public APIs
- `GET /treasury/:address/overview` - Treasury overview
- `GET /treasury/:address/spending` - Spending breakdown
- `GET /treasury/:address/runway` - Runway analysis
- `GET /treasury/:address/recipients` - Top recipients
- `GET /treasuries/top` - Top treasuries by size

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥18.x
- **Foundry** ([Install](https://book.getfoundry.sh/getting-started/installation))
- **Git**

### Installation

```bash
# Clone repository
git clone https://github.com/Marcosvcv/base-treasury.git
cd base-treasury

# Install all dependencies
npm run install:all
```

### Local Development

```bash
# Start local blockchain (Anvil)
cd contracts
anvil

# Deploy contracts (in another terminal)
forge script script/Deploy.s.sol:DeployScript --rpc-url http://localhost:8545 --broadcast

# Start indexer
cd ../indexer
npm run dev

# Start API
cd ../backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

## 📁 Project Structure

```
base-treasury/
├── contracts/              # Smart contracts (Foundry)
│   ├── src/
│   │   ├── TreasuryRegistry.sol
│   │   └── interfaces/
│   ├── test/
│   └── script/
├── indexer/                # Transaction indexer
│   ├── src/
│   │   ├── tx-listener.ts
│   │   ├── classifier.ts
│   │   └── metrics.ts
│   └── package.json
├── backend/                # REST API
│   ├── src/
│   │   ├── api.ts
│   │   └── db/
│   └── package.json
├── frontend/               # Next.js dashboard
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── package.json
├── sdk/                    # JavaScript SDK
│   └── js/
│       └── package.json
├── classification/         # Classification rules
│   └── rules.yaml
├── docs/                   # Documentation
│   ├── metrics.md
│   ├── categories.md
│   └── architecture.md
└── .github/
    └── workflows/          # CI/CD
```

## 🔗 Links

- **Chain ID**: 8453 (Base Mainnet), 84532 (Base Sepolia)
- **Explorer**: [Basescan](https://basescan.org)
- **Documentation**: [docs/](./docs/)
- **API Docs**: [docs/api.md](./docs/api.md)

## 📝 Roadmap

### Phase 1: MVP ✅
- [x] TreasuryRegistry contract
- [x] Transaction indexer
- [x] Basic classification (5 categories)
- [x] Single dashboard
- [x] Public API
- [x] 2-3 example treasuries

### Phase 2: Enhanced Analytics
- [ ] Advanced classification rules
- [ ] Multi-treasury comparison
- [ ] Historical trends
- [ ] Export functionality (CSV/JSON)
- [ ] Embeddable widgets

### Phase 3: Ecosystem Integration
- [ ] SDK for integrations
- [ ] GraphQL API
- [ ] Real-time updates
- [ ] Alert system
- [ ] Community-driven rules

### Phase 4: Advanced Features
- [ ] Multi-chain support
- [ ] Governance proposals tracking
- [ ] Grant effectiveness metrics
- [ ] Automated reports
- [ ] Mobile app

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built for [Base](https://base.org) ecosystem
- Inspired by the need for transparent treasury management
- Thanks to the Base community for feedback and support

---

**Built with ❤️ for Base**

