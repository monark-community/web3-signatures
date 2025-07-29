import { VerificationTool } from '@/components/VerificationTool';
import { Header } from '@/components/Header';

const DashboardVerify = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Signatures</h1>
          <p className="text-gray-600 mb-8">Verify the authenticity of signed documents</p>
          
          <VerificationTool />
        </div>
      </div>
    </div>
  );
};

export default DashboardVerify;