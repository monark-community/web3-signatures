
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documentHash, setDocumentHash] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setDocumentHash('');
    generateDocumentHash(selectedFile);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Upload Document</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
            accept=".pdf,.doc,.docx,.txt"
          />
          
          {file ? (
            <div className="space-y-2">
              <FileText className="h-12 w-12 text-green-600 mx-auto" />
              <p className="text-lg font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
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
                Supports PDF, DOC, DOCX, TXT
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
      </CardContent>
    </Card>
  );
};
