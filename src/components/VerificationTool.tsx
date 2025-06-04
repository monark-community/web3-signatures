
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Clock, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerificationResult {
  isValid: boolean;
  documentHash: string;
  signers: Array<{
    address: string;
    timestamp: number;
    blockNumber: number;
  }>;
  title: string;
  originalFilename: string;
}

export const VerificationTool = () => {
  const [searchHash, setSearchHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!searchHash.trim()) {
      toast({
        title: "Hash required",
        description: "Please enter a document hash to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      // Mock verification result
      const mockResult: VerificationResult = {
        isValid: true,
        documentHash: searchHash,
        signers: [
          {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            timestamp: Date.now() - 86400000, // 1 day ago
            blockNumber: 18450123,
          },
          {
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            timestamp: Date.now() - 43200000, // 12 hours ago
            blockNumber: 18450567,
          },
        ],
        title: 'Employment Agreement - John Doe',
        originalFilename: 'employment_agreement_john_doe.pdf',
      };

      setVerificationResult(mockResult);
      setIsVerifying(false);

      toast({
        title: "Verification complete",
        description: "Document signatures have been verified on the blockchain.",
      });
    }, 1500);
  };

  const handleFileUpload = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setSearchHash(hashHex);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Verify Document Signature</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="hash-input">Document Hash</Label>
            <Input
              id="hash-input"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Enter document hash (SHA-256)"
              className="font-mono"
            />
          </div>

          <div className="text-center text-gray-500">
            <p className="text-sm mb-2">or</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="verify-file-input"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
            />
            
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload document to verify</p>
            <Button
              variant="outline"
              onClick={() => document.getElementById('verify-file-input')?.click()}
            >
              Choose File
            </Button>
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={isVerifying || !searchHash.trim()}
            className="w-full"
            size="lg"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Verifying...
              </>
            ) : (
              'Verify Signature'
            )}
          </Button>
        </div>

        {verificationResult && (
          <div className="border-t pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Verification Results</h3>
                <Badge className={verificationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {verificationResult.isValid ? 'Valid' : 'Invalid'}
                </Badge>
              </div>

              {verificationResult.isValid && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800 mb-2">
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Document Verified</span>
                    </div>
                    <p className="text-sm text-green-700">
                      This document has been cryptographically signed and verified on the blockchain.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-600">Document Title</p>
                      <p className="text-sm">{verificationResult.title}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-600">Original Filename</p>
                      <p className="text-sm">{verificationResult.originalFilename}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Signatures ({verificationResult.signers.length})</span>
                    </h4>
                    
                    <div className="space-y-3">
                      {verificationResult.signers.map((signer, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="font-mono text-sm">{signer.address}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(signer.timestamp).toLocaleString()}</span>
                                </span>
                                <span>Block #{signer.blockNumber}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Verified
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600 mb-1">Document Hash</p>
                    <code className="text-xs font-mono break-all text-gray-800">
                      {verificationResult.documentHash}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
