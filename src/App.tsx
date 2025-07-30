import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonarkBannerWrapper from "./components/MonarkDemoWrapper";
import { WalletProvider } from "./components/WalletContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardUpload from "./pages/DashboardUpload";
import DashboardDocuments from "./pages/DashboardDocuments";
import SignDocument from "./pages/SignDocument";
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
              <Route path="/" element={
                <ProtectedRoute requireAuth={false}>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/app" element={
                <ProtectedRoute>
                  <DashboardDocuments />
                </ProtectedRoute>
              } />
              <Route path="/app/upload" element={
                <ProtectedRoute>
                  <DashboardUpload />
                </ProtectedRoute>
              } />
              <Route path="/app/documents" element={
                <ProtectedRoute>
                  <DashboardDocuments />
                </ProtectedRoute>
              } />
              <Route path="/sign/doc/:docId" element={<SignDocument />} />
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
