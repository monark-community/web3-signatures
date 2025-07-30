import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SignatureFlow } from '@/components/SignatureFlow';

const SignDocument = () => {
  const { docId } = useParams();

  // Mock document data - in real app, this would be fetched based on docId
  const document = {
    id: docId,
    title: 'Service Agreement Contract',
    description: 'A comprehensive service agreement outlining terms and conditions for professional services.',
    uploadedBy: '0x1234...5678',
    uploadedAt: '2024-01-15',
    status: 'pending',
    requiredSignatures: 3,
    currentSignatures: 1,
    expiresAt: '2024-02-15'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">DocuSign</span>
              </div>
            </div>
            <Badge variant={document.status === 'signed' ? 'default' : 'secondary'}>
              {document.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{document.title}</CardTitle>
                    <p className="text-gray-600 mt-2">{document.description}</p>
                  </div>
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Document ID:</span>
                    <p className="font-mono">{document.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Uploaded by:</span>
                    <p className="font-mono">{document.uploadedBy}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <p>{document.uploadedAt}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Expires:</span>
                    <p>{document.expiresAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Document preview would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">Click to view full document</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signature Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Signature Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {document.currentSignatures}/{document.requiredSignatures}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(document.currentSignatures / document.requiredSignatures) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Time Remaining</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">22 days</p>
                <p className="text-sm text-gray-600">Until expiration</p>
              </CardContent>
            </Card>

            {/* Signature Flow */}
            <SignatureFlow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignDocument;