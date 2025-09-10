import { Shield } from "lucide-react";

const CosmicHeader = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="bg-gradient-cosmic p-6 text-center relative">
        {/* Animated cosmic particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-foreground rounded-full animate-cosmic-fade" />
          <div className="absolute top-8 right-1/3 w-1 h-1 bg-secondary rounded-full animate-stellar-drift" />
          <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-cosmic-fade" style={{ animationDelay: '1s' }} />
          <div className="absolute top-6 right-1/4 w-1 h-1 bg-foreground rounded-full animate-stellar-drift" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-foreground animate-pulse-glow" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-secondary to-primary bg-clip-text text-transparent">
            Secured with FHE
          </h1>
          <Shield className="w-8 h-8 text-foreground animate-pulse-glow" />
        </div>
        
        <p className="mt-2 text-foreground/80 text-lg">
          Fully Homomorphic Encryption for Private Cross-Chain Transfers
        </p>
      </div>
    </header>
  );
};

export default CosmicHeader;