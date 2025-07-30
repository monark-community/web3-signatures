import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { FileText, Download, Eye, Calendar, Users, Search, Folder, Plus, FolderOpen, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppLayout } from '@/components/AppLayout';
import { AppSidebar } from '@/components/AppSidebar';

const DashboardDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Documents');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');

  // Extended mock documents data
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
    },
    {
      id: 5,
      title: "Partnership Agreement",
      hash: "0xdef0...1234",
      status: "Pending",
      signers: 4,
      createdAt: "2024-01-09",
      size: "567 KB",
      folder: "Legal"
    },
    {
      id: 6,
      title: "Consulting Contract",
      hash: "0x2468...ace0",
      status: "Signed",
      signers: 2,
      createdAt: "2024-01-08",
      size: "298 KB",
      folder: "Contracts"
    },
    {
      id: 7,
      title: "Software License Agreement",
      hash: "0x1357...bdf2",
      status: "Verified",
      signers: 1,
      createdAt: "2024-01-07",
      size: "178 KB",
      folder: "Legal"
    },
    {
      id: 8,
      title: "Marketing Campaign Brief",
      hash: "0x9753...1468",
      status: "Pending",
      signers: 3,
      createdAt: "2024-01-06",
      size: "445 KB",
      folder: "Projects"
    },
    {
      id: 9,
      title: "Employee Handbook",
      hash: "0x8642...0975",
      status: "Signed",
      signers: 1,
      createdAt: "2024-01-05",
      size: "1.2 MB",
      folder: "HR Documents"
    },
    {
      id: 10,
      title: "Vendor Agreement",
      hash: "0x7531...9642",
      status: "Verified",
      signers: 2,
      createdAt: "2024-01-04",
      size: "356 KB",
      folder: "Contracts"
    },
    {
      id: 11,
      title: "Research Collaboration Agreement",
      hash: "0x4680...2357",
      status: "Pending",
      signers: 5,
      createdAt: "2024-01-03",
      size: "789 KB",
      folder: "Projects"
    },
    {
      id: 12,
      title: "Data Processing Agreement",
      hash: "0x1928...3746",
      status: "Signed",
      signers: 2,
      createdAt: "2024-01-02",
      size: "267 KB",
      folder: "Legal"
    },
    {
      id: 13,
      title: "Performance Review Template",
      hash: "0x5940...8173",
      status: "Verified",
      signers: 1,
      createdAt: "2024-01-01",
      size: "134 KB",
      folder: "HR Documents"
    },
    {
      id: 14,
      title: "Supply Chain Agreement",
      hash: "0x2847...6051",
      status: "Pending",
      signers: 3,
      createdAt: "2023-12-30",
      size: "498 KB",
      folder: "Contracts"
    },
    {
      id: 15,
      title: "Innovation Project Proposal",
      hash: "0x7395...1284",
      status: "Signed",
      signers: 4,
      createdAt: "2023-12-29",
      size: "623 KB",
      folder: "Projects"
    }
  ];

  const folders = ["All Documents", "HR Documents", "Legal", "Contracts", "Projects"];

  // Filter documents based on search and filters
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Search filter
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.hash.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Folder filter
      const matchesFolder = selectedFolder === 'All Documents' || doc.folder === selectedFolder;
      
      // Status filter
      const matchesStatus = selectedStatus === 'all' || doc.status.toLowerCase() === selectedStatus;
      
      // Date range filter
      const docDate = new Date(doc.createdAt);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - docDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let matchesDateRange = true;
      switch (selectedDateRange) {
        case 'today':
          matchesDateRange = daysDiff === 0;
          break;
        case 'week':
          matchesDateRange = daysDiff <= 7;
          break;
        case 'month':
          matchesDateRange = daysDiff <= 30;
          break;
        default:
          matchesDateRange = true;
      }
      
      return matchesSearch && matchesFolder && matchesStatus && matchesDateRange;
    });
  }, [documents, searchQuery, selectedFolder, selectedStatus, selectedDateRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'default';
      case 'Pending': return 'secondary';
      case 'Verified': return 'default';
      default: return 'outline';
    }
  };

  const sidebarContent = (
    <>
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
                <SidebarMenuButton 
                  className={`flex items-center space-x-2 w-full justify-start ${
                    selectedFolder === folder ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                  onClick={() => setSelectedFolder(folder)}
                >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
    </>
  );

  return (
    <AppLayout 
      title="My Documents" 
      description={`${filteredDocuments.length} of ${documents.length} documents`}
      sidebarContent={<AppSidebar />}
    >
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find documents.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((doc) => (
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
                  <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg z-50">
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
      )}
    </AppLayout>
  );
};

export default DashboardDocuments;