import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, ArrowRight, ExternalLink } from "lucide-react";

// Mock data for demonstration
const mockTransactions = [
  {
    id: "tx_001",
    fromChain: "Ethereum",
    toChain: "Polygon",
    token: "USDC",
    amount: "***",
    status: "completed",
    timestamp: "2024-01-15 14:32",
    txHash: "0xabc123...def456"
  },
  {
    id: "tx_002", 
    fromChain: "BSC",
    toChain: "Avalanche",
    token: "WBTC",
    amount: "***",
    status: "pending",
    timestamp: "2024-01-15 13:45",
    txHash: "0x789xyz...012abc"
  }
];

const TransactionHistory = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-12 bg-card/80 backdrop-blur-lg border-border/50 shadow-cosmic">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="w-5 h-5 text-primary" />
          Cross-Chain Transaction History
        </CardTitle>
        <p className="text-muted-foreground">
          Track your encrypted cross-chain transfers (amounts remain private)
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    {tx.fromChain}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                    {tx.toChain}
                  </Badge>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">{tx.amount} {tx.token}</p>
                  <p className="text-muted-foreground">{tx.timestamp}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge 
                  variant={tx.status === "completed" ? "default" : "secondary"}
                  className={
                    tx.status === "completed" 
                      ? "bg-primary/20 text-primary border-primary/30" 
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }
                >
                  {tx.status}
                </Badge>
                
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {mockTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet. Start your first cross-chain transfer!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;