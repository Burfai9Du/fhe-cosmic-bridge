import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-starlight/90">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-lg border-border/50 shadow-cosmic">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Search className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Cosmic Portal Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The cosmic bridge you're looking for doesn't exist in this dimension. 
            Let's get you back to the main portal.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-cosmic hover:bg-gradient-nebula text-foreground font-semibold"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Cosmic Bridge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
