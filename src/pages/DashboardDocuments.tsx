import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Calendar, Users } from 'lucide-react';

const DashboardDocuments = () => {
  // Mock documents data
  const documents = [
    {
      id: 1,
      title: "Employment Contract",
      hash: "0x1234...5678",
      status: "Signed",
      signers: 2,
      createdAt: "2024-01-15",
      size: "245 KB"
    },
    {
      id: 2,
      title: "Non-Disclosure Agreement",
      hash: "0x9876...5432", 
      status: "Pending",
      signers: 1,
      createdAt: "2024-01-14",
      size: "189 KB"
    },
    {
      id: 3,
      title: "Service Agreement",
      hash: "0xabcd...efgh",
      status: "Verified",
      signers: 3,
      createdAt: "2024-01-12",
      size: "312 KB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Verified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
          <p className="text-gray-600 mb-8">Manage your signed and pending documents</p>
          
          <div className="grid gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-xl">{doc.title}</CardTitle>
                        <CardDescription className="font-mono text-sm">
                          Hash: {doc.hash}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{doc.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{doc.signers} signers</span>
                      </div>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments;