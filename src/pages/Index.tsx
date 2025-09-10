import CosmicHeader from "@/components/CosmicHeader";
import BridgeInterface from "@/components/BridgeInterface";
import WalletConnect from "@/components/WalletConnect";
import TransactionHistory from "@/components/TransactionHistory";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <CosmicHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Cosmic Bridge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of cross-chain transfers with fully homomorphic encryption. 
            Your transaction amounts remain private while bridging assets across multiple blockchains 
            through our secure cosmic portal.
          </p>
        </div>
        
        <WalletConnect />
        <BridgeInterface />
        <TransactionHistory />
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-3 text-primary">🔒 Private Transfers</h3>
              <p className="text-muted-foreground">
                Transfer amounts are encrypted using FHE technology, ensuring complete privacy.
              </p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-3 text-secondary">⚡ Cross-Chain</h3>
              <p className="text-muted-foreground">
                Bridge assets seamlessly between Ethereum, Polygon, BSC, and Avalanche.
              </p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-3 text-primary">🌌 Cosmic Security</h3>
              <p className="text-muted-foreground">
                Advanced cryptographic protocols protect your transactions in the cosmic void.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
