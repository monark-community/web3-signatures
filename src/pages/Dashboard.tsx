import { useState } from 'react';
import { DocumentUpload } from '@/components/DocumentUpload';
import { SignatureFlow } from '@/components/SignatureFlow';
import { VerificationTool } from '@/components/VerificationTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">Manage your documents and signatures</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upload" className="text-lg py-3">
                Upload Document
              </TabsTrigger>
              <TabsTrigger value="sign" className="text-lg py-3">
                Sign Documents
              </TabsTrigger>
              <TabsTrigger value="verify" className="text-lg py-3">
                Verify Signature
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-8">
              <DocumentUpload />
            </TabsContent>
            
            <TabsContent value="sign" className="space-y-8">
              <SignatureFlow />
            </TabsContent>
            
            <TabsContent value="verify">
              <VerificationTool />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;