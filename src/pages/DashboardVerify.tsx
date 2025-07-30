import { VerificationTool } from '@/components/VerificationTool';
import { AppLayout } from '@/components/AppLayout';

const DashboardVerify = () => {
  return (
    <AppLayout 
      title="Verify Signatures" 
      description="Verify the authenticity of signed documents"
    >
      <VerificationTool />
    </AppLayout>
  );
};

export default DashboardVerify;