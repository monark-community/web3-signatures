import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { AppSidebar } from '@/components/AppSidebar';

const Dashboard = () => {

  const recentActivity = [
    {
      id: 1,
      action: "Document Signed",
      document: "Employment Contract",
      time: "2 hours ago",
      status: "completed",
      icon: CheckCircle
    },
    {
      id: 2,
      action: "Verification Request",
      document: "Service Agreement", 
      time: "5 hours ago",
      status: "pending",
      icon: Clock
    },
    {
      id: 3,
      action: "Document Uploaded",
      document: "NDA Agreement",
      time: "1 day ago", 
      status: "completed",
      icon: Upload
    },
    {
      id: 4,
      action: "Signature Pending",
      document: "Project Proposal",
      time: "2 days ago",
      status: "warning",
      icon: AlertCircle
    }
  ];

  const stats = [
    {
      title: "Total Documents",
      value: "24",
      change: "+3 this week",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Pending Signatures", 
      value: "5",
      change: "+2 new",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Verified Documents",
      value: "19",
      change: "+1 today",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-orange-600';
      case 'warning': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AppLayout 
      title="Dashboard" 
      description="Welcome back! Here's what's happening with your documents."
      sidebarContent={<AppSidebar />}
    >
      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest document activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <activity.icon className={`h-5 w-5 ${getStatusColor(activity.status)}`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.document}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;