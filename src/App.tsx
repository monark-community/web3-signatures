import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonarkBannerWrapper from "./components/MonarkDemoWrapper";
import { WalletProvider } from "./components/WalletContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardUpload from "./pages/DashboardUpload";
import DashboardSignatures from "./pages/DashboardSignatures";
import DashboardVerify from "./pages/DashboardVerify";
import DashboardDocuments from "./pages/DashboardDocuments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MonarkBannerWrapper>
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/upload" element={<DashboardUpload />} />
              <Route path="/dashboard/signatures" element={<DashboardSignatures />} />
              <Route path="/dashboard/verify" element={<DashboardVerify />} />
              <Route path="/dashboard/documents" element={<DashboardDocuments />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </MonarkBannerWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
