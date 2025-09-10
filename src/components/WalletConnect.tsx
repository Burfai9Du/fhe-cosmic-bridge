import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Wallet, 
  Zap, 
  Copy, 
  ExternalLink, 
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance, 
  useSwitchChain,
  useChainId
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { formatEther } from 'viem';

const WalletConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrl = `https://sepolia.etherscan.io/address/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const switchToSepolia = () => {
    switchChain({ chainId: sepolia.id });
  };

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsOpen(false);
  };

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-lg mx-auto mb-8 bg-card/80 backdrop-blur-lg border-border/50 shadow-cosmic">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="font-medium">Wallet Connected</span>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  {connector?.name || 'Wallet'}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={disconnect}>
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Address</p>
                <p className="font-mono text-sm">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyAddress}
                  className="h-8 w-8"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={openExplorer}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {balance?.symbol || 'ETH'} Balance
                </p>
                <p className="font-semibold">
                  {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
                </p>
              </div>
              <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                {balance?.symbol || 'ETH'}
              </Badge>
            </div>

            {chainId !== sepolia.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={switchToSepolia}
                className="w-full text-xs"
              >
                Switch to Sepolia
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto mb-8 bg-card/80 backdrop-blur-lg border-border/50 shadow-cosmic">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <Wallet className="w-12 h-12 mx-auto text-primary animate-pulse-glow" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-6">
          Connect your Web3 wallet to start bridging assets across chains
        </p>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose a wallet to connect to the FHE Cosmic Bridge
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleConnect(connector)}
                  disabled={isPending}
                >
                  <div className="flex items-center space-x-3">
                    {isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wallet className="h-3 w-3" />
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-medium">{connector.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {connector.type === 'injected' ? 'Browser Extension' : 
                         connector.type === 'walletConnect' ? 'Mobile & Desktop' :
                         'Hardware Wallet'}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
              
              {error && (
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">
                    {error.message}
                  </span>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground text-center pt-2">
                Don't have a wallet? Install MetaMask or another Web3 wallet to get started.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;