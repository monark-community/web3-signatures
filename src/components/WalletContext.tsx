import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(mockAddress);
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};