import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ElectionCollation from "./pages/ElectionCollection"
import CommunityForum from "./pages/CommunityForum"
import MediaLibrary from "./pages/adminMedia";
import SituationRoom from "./pages/SituationRoom";
import AdminSettings from "./pages/adminSettings";
import Auth from "./pages/Auth";
import EventsActivities from "./pages/EventsActivities "
import AdminBlog from "./pages/adminBlog";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import Donate from "./pages/Donate";
import Agent from "./pages/adminAgent";
import UsersPages from "./pages/UserPages";
import ElectionForm from "./pages/ElectionForm";
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
        <ThemeProvider>
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

            <Route path="*" element={<NotFound />} />
            <Route path="/admin/Situation-room" element={<SituationRoom />} />
            <Route path="/situation/room" element={<CommunityForum />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<EventsActivities />} />
            <Route path="/admin/media" element={<MediaLibrary />} />
            <Route path="/admin/community-forum" element={<CommunityForum />} />
            <Route path="/admin/user-pages" element={<UsersPages />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/election-collation" element={<ElectionCollation />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={() => { }} />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/agent" element={<Agent />} />

            <Route path="/blog" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
