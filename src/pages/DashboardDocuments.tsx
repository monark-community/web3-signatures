import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { FileText, Download, Eye, Calendar, Users, Search, Filter, Folder, Plus, FolderOpen } from 'lucide-react';

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
      size: "245 KB",
      folder: "HR Documents"
    },
    {
      id: 2,
      title: "Non-Disclosure Agreement",
      hash: "0x9876...5432", 
      status: "Pending",
      signers: 1,
      createdAt: "2024-01-14",
      size: "189 KB",
      folder: "Legal"
    },
    {
      id: 3,
      title: "Service Agreement",
      hash: "0xabcd...efgh",
      status: "Verified",
      signers: 3,
      createdAt: "2024-01-12",
      size: "312 KB",
      folder: "Contracts"
    },
    {
      id: 4,
      title: "Project Proposal",
      hash: "0x5678...9012",
      status: "Signed",
      signers: 2,
      createdAt: "2024-01-10",
      size: "423 KB",
      folder: "Projects"
    }
  ];

  const folders = ["All Documents", "HR Documents", "Legal", "Contracts", "Projects"];

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
        <div className="max-w-4xl mx-auto">
          <SidebarProvider>
            <div className="flex gap-6 w-full">
              <Sidebar className="w-64">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center justify-between">
                      <span>Folders</span>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {folders.map((folder) => (
                          <SidebarMenuItem key={folder}>
                            <SidebarMenuButton className="flex items-center space-x-2">
                              {folder === "All Documents" ? (
                                <FolderOpen className="h-4 w-4" />
                              ) : (
                                <Folder className="h-4 w-4" />
                              )}
                              <span>{folder}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  
                  <SidebarGroup>
                    <SidebarGroupLabel>Filters</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <div className="space-y-4 px-3">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Status</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All statuses</SelectItem>
                              <SelectItem value="signed">Signed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Date Range</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="All time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All time</SelectItem>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="week">This week</SelectItem>
                              <SelectItem value="month">This month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
                    <p className="text-gray-600">Manage your signed and pending documents</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="Search documents..." 
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
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
                              <div className="flex items-center space-x-2 mt-1">
                                <Folder className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{doc.folder}</span>
                              </div>
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
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments;