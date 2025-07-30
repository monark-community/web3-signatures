
import { Button } from '@/components/ui/button';
import { Shield, Wallet, User, LogOut, Upload, FileSignature, ShieldCheck, Languages, Palette, FileText, Home } from 'lucide-react';
import { useWallet } from './WalletContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentUpload } from './DocumentUpload';

export const Header = () => {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 h-[72px]">
      <div className="px-6 py-4 flex items-center justify-between h-full w-full">
        <Link 
          to={isConnected ? "/app" : "/"} 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">SignChain</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 flex-1 ml-8">
          {isConnected ? (
            <div className="flex items-center space-x-4">
            </div>
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
          <div className="flex items-center space-x-4">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      <User className="h-4 w-4" />
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
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/preferences')}>
                <User className="h-4 w-4 mr-2" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Languages className="h-4 w-4 mr-2" />
                Language
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Palette className="h-4 w-4 mr-2" />
                Theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
