# FHE Cosmic Bridge

A fully homomorphic encryption (FHE) powered cross-chain bridge that enables private asset transfers across multiple blockchains while keeping transaction amounts encrypted.

## Features

- **🔒 Private Transfers**: Transaction amounts are encrypted using FHE technology
- **⚡ Cross-Chain**: Bridge assets between Ethereum, Polygon, BSC, and Avalanche
- **🌌 Cosmic Security**: Advanced cryptographic protocols protect your transactions
- **🎨 Modern UI**: Beautiful, responsive interface with cosmic theme
- **🔗 Web3 Integration**: Full wallet connectivity with RainbowKit and Wagmi

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Web3**: Wagmi, RainbowKit, Viem
- **Blockchain**: Hardhat, FHEVM
- **Encryption**: Zama FHE technology

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Burfai9Du/fhe-cosmic-bridge.git
cd fhe-cosmic-bridge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Development

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to Sepolia testnet:
```bash
npm run deploy
```

3. Run tests:
```bash
npm run test
```

## Project Structure

```
fhe-cosmic-bridge/
├── contracts/          # Smart contracts
├── scripts/           # Deployment scripts
├── src/
│   ├── components/    # React components
│   ├── lib/          # Utilities and configurations
│   ├── pages/        # Page components
│   └── hooks/        # Custom React hooks
├── public/           # Static assets
└── docs/            # Documentation
```

## Smart Contract

The `CosmicBridge` contract implements FHE-encrypted cross-chain transfers:

- **Encrypted Amounts**: All transaction amounts are encrypted using FHE
- **Multi-Chain Support**: Supports Ethereum, Polygon, BSC, and Avalanche
- **Token Support**: ETH, USDC, USDT, and WBTC
- **Reputation System**: User reputation tracking for enhanced security

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Zama for FHE technology
- RainbowKit for wallet connectivity
- shadcn/ui for beautiful components
