import { DocumentUpload } from '@/components/DocumentUpload';
import { AppLayout } from '@/components/AppLayout';

const DashboardUpload = () => {
  return (
    <AppLayout 
      title="Upload Document" 
      description="Upload and prepare your document for signing"
    >
      <DocumentUpload />
    </AppLayout>
  );
};

export default DashboardUpload;