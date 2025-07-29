import { SignatureFlow } from '@/components/SignatureFlow';
import { Header } from '@/components/Header';

const DashboardSignatures = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Documents</h1>
          <p className="text-gray-600 mb-8">Create blockchain signatures for your documents</p>
          
          <SignatureFlow />
        </div>
      </div>
    </div>
  );
};

export default DashboardSignatures;