import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isConnected) {
      navigate('/');
    } else if (!requireAuth && isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, requireAuth, navigate]);

  if (requireAuth && !isConnected) {
    return null;
  }

  if (!requireAuth && isConnected) {
    return null;
  }

  return <>{children}</>;
};