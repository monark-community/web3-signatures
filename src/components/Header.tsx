
import { Button } from '@/components/ui/button';
import { Shield, Wallet } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // TODO: Implement actual wallet connection
    setIsConnected(!isConnected);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">SignChain</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors">
            Security
          </a>
        </nav>

        <Button 
          onClick={handleConnectWallet}
          variant={isConnected ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          <Wallet className="h-4 w-4" />
          <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
        </Button>
      </div>
    </header>
  );
};
