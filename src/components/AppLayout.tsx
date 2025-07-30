import { ReactNode, useState } from 'react';
import { Header } from '@/components/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  sidebarContent?: ReactNode;
}

export const AppLayout = ({ title, description, children, sidebarContent }: AppLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {sidebarContent ? (
        <>
          <SidebarProvider>
            {/* Desktop sidebar - hidden on mobile */}
            <div className="hidden lg:flex w-80 border-r bg-gray-50 flex-shrink-0 flex-col">
              {sidebarContent}
            </div>
            
            {/* Mobile sidebar overlay */}
            {isMobileSidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="fixed inset-0 bg-black/20" onClick={() => setIsMobileSidebarOpen(false)} />
                <div className="relative w-80 max-w-[350px] border-r bg-gray-50 flex-shrink-0 flex flex-col shadow-xl">
                  {sidebarContent}
                </div>
              </div>
            )}
            
            {/* Content area takes remaining width */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              <div className="p-4 lg:p-6 border-b bg-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Mobile menu button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setIsMobileSidebarOpen(true)}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                      <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
                      <p className="text-gray-600 mt-1 text-sm lg:text-base">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4 lg:p-6 bg-gray-50">
                {children}
              </div>
            </div>
          </SidebarProvider>
        </>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <Header />
          <div className="p-4 lg:p-6 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">{description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 bg-gray-50">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};