import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileSignature, ShieldCheck, FileText } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Upload Document",
      description: "Upload and prepare documents for signing",
      icon: Upload,
      path: "/dashboard/upload",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Sign Documents", 
      description: "Create blockchain signatures for your documents",
      icon: FileSignature,
      path: "/dashboard/signatures",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Verify Signatures",
      description: "Verify the authenticity of signed documents", 
      icon: ShieldCheck,
      path: "/dashboard/verify",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "My Documents",
      description: "Access and manage your signed documents",
      icon: FileText,
      path: "/dashboard/documents", 
      color: "bg-orange-100 text-orange-600"
    }
  ];

  // Redirect to upload by default
  useEffect(() => {
    navigate('/dashboard/upload');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">Choose what you'd like to do</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardItems.map((item, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;