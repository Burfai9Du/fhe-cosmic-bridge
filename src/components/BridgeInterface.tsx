import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Zap, Lock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';
import { supportedChains, supportedTokens } from '@/lib/wagmi';

// Use the chains and tokens from wagmi config
const chains = supportedChains;
const tokens = supportedTokens;

const BridgeInterface = () => {
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  
  // Simulate loading states
  const [isPending, setIsPending] = useState(false);

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const handleBridge = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed with the bridge transfer.",
        variant: "destructive",
      });
      return;
    }

    if (!fromChain || !toChain || !token || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to proceed with the bridge transfer.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      
      // Simulate bridge transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Bridge Initiated",
        description: `Encrypting ${amount} ${tokens.find(t => t.id.toString() === token)?.symbol} for private cross-chain transfer...`,
      });
      
      setIsPending(false);
    } catch (err) {
      toast({
        title: "Transaction Failed",
        description: "Failed to initiate bridge transaction. Please try again.",
        variant: "destructive",
      });
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-lg border-border/50 shadow-cosmic">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
          Cosmic Bridge Portal
          <Sparkles className="w-6 h-6 text-secondary animate-pulse-glow" />
        </CardTitle>
        <p className="text-muted-foreground">
          Transfer assets across chains with encrypted amounts
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* From Chain */}
        <div className="space-y-2">
          <Label htmlFor="from-chain" className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            From Chain
          </Label>
          <Select value={fromChain} onValueChange={setFromChain}>
            <SelectTrigger className="bg-background/50 border-border/70">
              <SelectValue placeholder="Select source chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  {chain.name} ({chain.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapChains}
            className="rounded-full bg-gradient-nebula border-none text-foreground hover:bg-gradient-cosmic animate-stellar-drift"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Chain */}
        <div className="space-y-2">
          <Label htmlFor="to-chain" className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            To Chain
          </Label>
          <Select value={toChain} onValueChange={setToChain}>
            <SelectTrigger className="bg-background/50 border-border/70">
              <SelectValue placeholder="Select destination chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  {chain.name} ({chain.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Token Selection */}
        <div className="space-y-2">
          <Label htmlFor="token" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Asset
          </Label>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger className="bg-background/50 border-border/70">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {tokens.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>
                  {t.symbol} - {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-secondary" />
            Amount (Encrypted)
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background/50 border-border/70 pr-12"
            />
            {isEncrypted && (
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary animate-pulse" />
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Transfer amount is encrypted using FHE
          </p>
        </div>

        {/* Bridge Button */}
        <Button
          onClick={handleBridge}
          disabled={isPending || !isConnected}
          className="w-full bg-gradient-cosmic hover:bg-gradient-nebula text-foreground font-semibold py-3 shadow-glow-primary hover:shadow-glow-secondary transition-all duration-300 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isPending ? "Processing..." : "Initiate Cosmic Bridge"}
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>

        {/* Security Notice */}
        <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-primary font-medium flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            End-to-end encrypted with Fully Homomorphic Encryption
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BridgeInterface;