
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import BusManagement from "./pages/bus/BusManagement";
import BusOperatorForm from "./pages/bus/BusOperatorForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          
          {/* Bus Management Routes */}
          <Route path="/bus-management" element={<AppLayout><BusManagement /></AppLayout>} />
          <Route path="/bus-management/add-operator" element={<AppLayout><BusOperatorForm /></AppLayout>} />
          <Route path="/bus-management/operators/:id" element={<AppLayout><BusOperatorForm /></AppLayout>} />
          
          {/* Add more routes here */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
