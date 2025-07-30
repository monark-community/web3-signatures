import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';

interface AppLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  sidebarContent?: ReactNode;
}

export const AppLayout = ({ title, description, children, sidebarContent }: AppLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          {sidebarContent && (
            <Sidebar className="w-64 border-r bg-gray-50">
              <SidebarContent className="p-4">
                {sidebarContent}
              </SidebarContent>
            </Sidebar>
          )}
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                  <p className="text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};