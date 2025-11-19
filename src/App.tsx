import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import SelectUser from "./pages/SelectUser";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Atividades from "./pages/Atividades";
import Metas from "./pages/Metas";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/select-user" element={<SelectUser />} />
          <Route path="/app/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/app/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/app/activities" element={<AppLayout><Atividades /></AppLayout>} />
          <Route path="/app/goals" element={<AppLayout><Metas /></AppLayout>} />
          <Route path="/app/reports" element={<AppLayout><Relatorios /></AppLayout>} />
          <Route path="/app/settings" element={<AppLayout><Configuracoes /></AppLayout>} />
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
