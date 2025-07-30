import { Upload, FileText, ShieldCheck, User, LogOut, Search, Calendar, Filter, Folder, FolderOpen, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DocumentUpload } from '@/components/DocumentUpload';
import { VerificationTool } from '@/components/VerificationTool';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWallet } from '@/components/WalletContext';

interface AppSidebarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
  selectedDateRange?: string;
  onDateRangeChange?: (range: string) => void;
  selectedFolder?: string;
  onFolderChange?: (folder: string) => void;
}

export function AppSidebar({ 
  searchQuery = '', 
  onSearchChange, 
  selectedStatus = 'all',
  onStatusChange,
  selectedDateRange = 'all',
  onDateRangeChange,
  selectedFolder = 'All Documents',
  onFolderChange
}: AppSidebarProps) {
  const { walletAddress, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const folders = [
    { name: 'All Documents', count: 24, icon: FileText },
    { name: 'Contracts', count: 8, icon: Folder },
    { name: 'Agreements', count: 6, icon: Folder },
    { name: 'Invoices', count: 4, icon: Folder },
    { name: 'Legal', count: 3, icon: Folder },
    { name: 'Personal', count: 3, icon: Folder },
  ];

  return (
    <>
      {/* Logo Section - Fixed at top */}
      <div className="p-4 border-b flex-shrink-0">
        <Link 
          to="/app" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DocuSign</span>
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Request Signature
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Request Signature</span>
                  </DialogTitle>
                </DialogHeader>
                <DocumentUpload />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify Signatures
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Verify Signatures</span>
                  </DialogTitle>
                </DialogHeader>
                <VerificationTool />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Filters</h3>
          <div className="space-y-3">
            {/* Status Filter */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Date Range</label>
              <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Folders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Folders</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => onFolderChange?.(folder.name)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-sm hover:bg-gray-100 transition-colors ${
                  selectedFolder === folder.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {folder.name === selectedFolder ? (
                    <FolderOpen className="h-4 w-4" />
                  ) : (
                    <folder.icon className="h-4 w-4" />
                  )}
                  <span>{folder.name}</span>
                </div>
                <span className="text-xs text-gray-500">{folder.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Menu - Fixed at bottom */}
      <div className="p-4 border-t flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {walletAddress ? walletAddress.slice(0, 2).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'User'}
                  </div>
                  <div className="text-xs text-gray-500">Wallet Connected</div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}