import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import Donate from "./pages/Donate";
import ElectionForm from "./pages/ElectionForm";
import SituationRoom from "./pages/SituationRoom";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import CompleteProfile from "./pages/Regsitration";
import AdminLogin from "./pages/Admin";
import DashboardOverview from "./pages/Admin-dashboard";
import UsersPage from "./components/dashboard/users/UsersPage";
import AgentLogin from "./pages/Agent";
import AgentDashboard from "./pages/Agent-dashboard";
import SubmissionsPage from "./pages/Agent-submission";
import AgentPortalAuth from "./pages/Agent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/join" element={<Onboarding />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/election-form" element={<ElectionForm />} />
            <Route path="/situation-room" element={<SituationRoom />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/Agent" element={<AgentLogin />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/agent-submissions" element={<SubmissionsPage />} />
            <Route path="/admin-dashboard" element={<DashboardOverview />} />
            <Route path="/update-profile" element={<CompleteProfile />} />
            <Route path="/agent-login" element={<AgentPortalAuth />} />

            <Route path="/blog" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
