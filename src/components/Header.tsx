
import { Button } from '@/components/ui/button';
import { Shield, Wallet, User, LogOut, Upload, FileSignature, ShieldCheck } from 'lucide-react';
import { useWallet } from './WalletContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">SignChain</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          {isConnected ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <FileSignature className="h-4 w-4" />
                <span>Signatures</span>
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Verify</span>
              </Link>
            </>
          ) : (
            <>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors">
                Security
              </a>
            </>
          )}
        </nav>

        {isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {walletAddress?.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile & Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={connectWallet}
            className="flex items-center space-x-2"
          >
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        )}
      </div>
    </header>
  );
};
