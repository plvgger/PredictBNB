# BNB Prediction Market

A decentralized prediction market platform built on BNB Smart Chain, inspired by Polymarket. Users can create and trade on prediction markets using BNB.

## Features

- 🎯 **Create Markets**: Users can create prediction markets on any topic
- 💰 **Trade with BNB**: All transactions use BNB on BSC for low fees
- 🔒 **Decentralized**: Smart contracts handle all market logic
- ⚡ **Fast & Cheap**: Built on BSC for quick transactions and low costs
- 🎨 **Modern UI**: Clean, responsive interface similar to Polymarket

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Wagmi** & **RainbowKit** for Web3 integration
- **React Query** for state management

### Smart Contracts
- **Solidity** for contract development
- **Hardhat** for development and deployment
- **OpenZeppelin** for security standards

### Blockchain
- **BNB Smart Chain** for low fees and fast transactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet
- BNB for gas fees

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bnb-prediction-market
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` and add your:
- WalletConnect Project ID (get from https://cloud.walletconnect.com/)
- Private key for deployment (optional, for testing)

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Smart Contract Deployment

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to BSC testnet:
```bash
npm run deploy:testnet
```

3. Deploy to BSC mainnet:
```bash
npm run deploy:mainnet
```

## How It Works

### Market Creation
1. Users connect their wallet
2. Create a new market with a question and possible outcomes
3. Set an end time for the market
4. Pay a small BNB fee to create the market

### Trading
1. Browse available markets
2. Select an outcome you believe will happen
3. Buy shares using BNB
4. Share prices reflect market probability

### Resolution
1. Markets resolve automatically at the end time
2. Winning shares can be redeemed for BNB
3. A small fee (2%) is taken by the platform

## Smart Contract Features

- **Market Creation**: Create prediction markets with multiple outcomes
- **Liquidity Provision**: Add liquidity to markets
- **Share Trading**: Buy/sell shares in market outcomes
- **Market Resolution**: Resolve markets and determine winners
- **Fee Collection**: Collect platform fees from winnings

## Security

- Uses OpenZeppelin's security standards
- ReentrancyGuard protection
- Pausable functionality for emergencies
- Owner-only market resolution (can be made more decentralized)

## Roadmap

- [ ] Decentralized market resolution (oracle integration)
- [ ] Advanced trading features (limit orders, etc.)
- [ ] Mobile app
- [ ] Governance token
- [ ] Cross-chain support
- [ ] API for third-party integrations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This is a prediction market platform for entertainment and educational purposes. Please gamble responsibly and understand the risks involved in trading prediction markets.
