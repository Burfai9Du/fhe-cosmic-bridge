const StarsBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating star particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-foreground rounded-full animate-cosmic-fade"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Larger glowing particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute w-2 h-2 bg-primary rounded-full animate-stellar-drift opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Nebula particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute w-3 h-3 bg-secondary rounded-full animate-pulse-glow opacity-40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;