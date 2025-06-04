
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DocumentUpload } from '@/components/DocumentUpload';
import { SignatureFlow } from '@/components/SignatureFlow';
import { VerificationTool } from '@/components/VerificationTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('sign');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sign" className="text-lg py-3">
              Sign Document
            </TabsTrigger>
            <TabsTrigger value="verify" className="text-lg py-3">
              Verify Signature
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sign" className="space-y-8">
            <DocumentUpload />
            <SignatureFlow />
          </TabsContent>
          
          <TabsContent value="verify">
            <VerificationTool />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
