import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { FileText, Download, Eye, Calendar, Users, Search, Filter, Folder, Plus, FolderOpen, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
      case 'Signed': return 'default';
      case 'Pending': return 'secondary';
      case 'Verified': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <Sidebar className="w-64 border-r bg-gray-50">
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center justify-between mb-3">
                  <span>Folders</span>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {folders.map((folder) => (
                      <SidebarMenuItem key={folder}>
                        <SidebarMenuButton className="flex items-center space-x-2 w-full justify-start">
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
                <SidebarGroupLabel className="mb-3">Search & Filters</SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="space-y-4">
                    <div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          placeholder="Search documents..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
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
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b bg-white">
              <h1 className="text-2xl font-semibold text-gray-900">My Documents</h1>
              <p className="text-gray-600 mt-1">Manage your signed and pending documents</p>
            </div>
            
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate text-sm">
                            {doc.title}
                          </h3>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={getStatusColor(doc.status)} className="text-xs">
                          {doc.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{doc.size}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{doc.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{doc.signers}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400">
                        <Folder className="h-3 w-3 mr-1" />
                        <span>{doc.folder}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DashboardDocuments;