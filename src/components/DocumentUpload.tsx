
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Hash, Users, Plus, X, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documentHash, setDocumentHash] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [signers, setSigners] = useState<string[]>(['']);
  const [signatureFields, setSignatureFields] = useState<number>(0);
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const { toast } = useToast();

  const addSigner = () => {
    setSigners([...signers, '']);
  };

  const removeSigner = (index: number) => {
    if (signers.length > 1) {
      setSigners(signers.filter((_, i) => i !== index));
    }
  };

  const updateSigner = (index: number, value: string) => {
    const newSigners = [...signers];
    newSigners[index] = value;
    setSigners(newSigners);
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setDocumentHash('');
    generateDocumentHash(selectedFile);
    // Simulate detecting signature fields in PDF
    const mockFields = Math.floor(Math.random() * 8) + 1; // 1-8 fields
    setSignatureFields(mockFields);
  }, []);

  const generateDocumentHash = async (file: File) => {
    setIsGeneratingHash(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setDocumentHash(hashHex);
      
      toast({
        title: "Document hash generated",
        description: "Your document has been hashed and is ready for signing.",
      });
    } catch (error) {
      toast({
        title: "Error generating hash",
        description: "Failed to generate document hash. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingHash(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Employment Agreement, Grant Proposal"
          />
        </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Required Signers</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSigner}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Signer</span>
            </Button>
          </div>
          
          <div className="space-y-2">
            {signers.map((signer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={signer}
                  onChange={(e) => updateSigner(index, e.target.value)}
                  placeholder="Enter email address or wallet address"
                  className="flex-1"
                />
                {signers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSigner(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                handleFileSelect(selectedFile);
              }
            }}
            accept=".pdf"
          />
          
          {file ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <FileText className="h-12 w-12 text-green-600 mx-auto" />
                <p className="text-lg font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              {signatureFields > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <FileCheck className="h-5 w-5" />
                    <span className="font-medium">
                      {signatureFields} signature field{signatureFields !== 1 ? 's' : ''} detected
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-lg font-medium text-gray-900">
                Drop your document here
              </p>
              <p className="text-sm text-gray-500">
                or click to browse files
              </p>
              <p className="text-xs text-gray-400">
                PDF files only
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Hash className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-sm">Document Hash</span>
            </div>
            
            {isGeneratingHash ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-sm text-gray-600">Generating hash...</span>
              </div>
            ) : documentHash ? (
              <div className="bg-white p-3 rounded border">
                <code className="text-xs font-mono break-all text-gray-800">
                  {documentHash}
                </code>
              </div>
            ) : null}
          </div>
        )}

        {file && documentHash && (
          <Button className="w-full" size="lg">
            Proceed to Signing
          </Button>
        )}
      </div>
  );
};
