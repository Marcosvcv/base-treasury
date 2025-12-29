# Contributing to BaseTreasury

Thank you for your interest in contributing to BaseTreasury! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/base-treasury.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Setup

See the main [README.md](./README.md) for setup instructions.

## Code Style

- **Solidity**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **TypeScript/JavaScript**: Use ESLint configuration
- **Commits**: Use conventional commit messages

## Testing

- Contracts: `cd contracts && forge test`
- Indexer: `cd indexer && npm test`
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add tests for new features
4. Ensure code is properly formatted
5. Request review from maintainers

## Questions?

Open an issue or start a discussion on GitHub!

