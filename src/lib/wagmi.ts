import { createConfig, http } from 'wagmi'
import { sepolia, polygon, bsc, avalanche } from 'wagmi/chains'
import { 
  injected, 
  metaMask, 
  walletConnect, 
  coinbaseWallet,
  safe
} from 'wagmi/connectors'

// Get projectId from https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'e08e99d213c331aa0fd00f625de06e66'

// Create wagmi config with multiple wallet support
export const config = createConfig({
  chains: [sepolia, polygon, bsc, avalanche],
  connectors: [
    // Browser extension wallets
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: 'FHE Cosmic Bridge',
      appLogoUrl: 'https://example.com/logo.png',
    }),
    safe(),
    // WalletConnect for mobile wallets
    walletConnect({ 
      projectId,
      metadata: {
        name: 'FHE Cosmic Bridge',
        description: 'Encrypted cross-chain asset transfer',
        url: 'https://fhe-cosmic-bridge.vercel.app',
        icons: ['https://example.com/icon.png']
      }
    }),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.rpc.zama.ai'),
    [polygon.id]: http('https://polygon-rpc.com'),
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const supportedChains = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,
  },
  {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    chainId: 137,
  },
  {
    id: 56,
    name: 'BSC',
    symbol: 'BNB',
    chainId: 56,
  },
  {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    chainId: 43114,
  },
];

export const supportedTokens = [
  {
    id: 1,
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
  },
  {
    id: 2,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
  },
  {
    id: 3,
    symbol: 'USDT',
    name: 'Tether',
    decimals: 6,
  },
  {
    id: 4,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
  },
];
