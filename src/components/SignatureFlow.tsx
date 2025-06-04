
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PenTool, Clock, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Signer {
  id: string;
  address: string;
  status: 'pending' | 'signed' | 'rejected';
  timestamp?: number;
  signature?: string;
}

export const SignatureFlow = () => {
  const [signers, setSigners] = useState<Signer[]>([
    { id: '1', address: '0x1234...5678', status: 'pending' },
    { id: '2', address: 'Your Wallet', status: 'pending' },
  ]);
  const [isSigningInProgress, setIsSigningInProgress] = useState(false);
  const { toast } = useToast();

  const handleSign = async () => {
    setIsSigningInProgress(true);
    
    // Simulate signing process
    setTimeout(() => {
      setSigners(prev => prev.map(signer => 
        signer.address === 'Your Wallet' 
          ? { 
              ...signer, 
              status: 'signed', 
              timestamp: Date.now(),
              signature: '0xabcd...ef01' 
            }
          : signer
      ));
      
      setIsSigningInProgress(false);
      
      toast({
        title: "Document signed successfully!",
        description: "Your signature has been recorded on the blockchain.",
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PenTool className="h-5 w-5" />
          <span>Signature Flow</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Multi-Signer Document</span>
          </h3>
          <p className="text-sm text-gray-600">
            This document requires signatures from all parties before it becomes valid.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Signers ({signers.filter(s => s.status === 'signed').length}/{signers.length})</h4>
          
          {signers.map((signer) => (
            <div key={signer.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {signer.status === 'signed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{signer.address}</p>
                  {signer.timestamp && (
                    <p className="text-xs text-gray-500">
                      Signed on {new Date(signer.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              
              <Badge className={getStatusColor(signer.status)}>
                {signer.status}
              </Badge>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Your Signature</h4>
            <p className="text-sm text-gray-600 mb-4">
              Click below to sign this document with your connected wallet. This will create 
              an immutable record on the blockchain.
            </p>
            
            <Button 
              onClick={handleSign}
              disabled={isSigningInProgress || signers.find(s => s.address === 'Your Wallet')?.status === 'signed'}
              className="w-full"
              size="lg"
            >
              {isSigningInProgress ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Signing Document...
                </>
              ) : signers.find(s => s.address === 'Your Wallet')?.status === 'signed' ? (
                'Document Signed ✓'
              ) : (
                'Sign Document'
              )}
            </Button>
          </div>

          {signers.every(s => s.status === 'signed') && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Document Fully Executed</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                All required signatures have been collected. The document is now legally binding.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
