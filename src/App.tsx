import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Salaries from "./pages/Salaries";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import SearchResults from "./pages/SearchResults";
import JobApplication from "./pages/JobApplication";
import JobAlerts from "./pages/JobAlerts";

// Auth pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Employer pages
import EmployerDashboard from "./pages/employer/Dashboard";
import JobDetails from "./pages/employer/post-job/JobDetails";
import JobDescription from "./pages/employer/post-job/JobDescription";
import Compensation from "./pages/employer/post-job/Compensation";
import Screening from "./pages/employer/post-job/Screening";
import Review from "./pages/employer/post-job/Review";
import JobPostSuccess from "./pages/employer/jobs/Success";
import ViewApplicants from "./pages/employer/jobs/Applicants";
import EditCompanyProfile from "./pages/employer/EditCompanyProfile";
import JobPostingPricing from "./pages/employer/JobPostingPricing";
import EmployerSettings from "./pages/employer/Settings";

// Job Seeker pages
import JobSeekerSettings from "./pages/job-seeker/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Job Seeker Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/apply/:id" element={<JobApplication />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/job-alerts" element={<JobAlerts />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/settings" element={<JobSeekerSettings />} />
            
            {/* Employer Routes */}
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/employer/post-job/details" element={<JobDetails />} />
            <Route path="/employer/post-job/description" element={<JobDescription />} />
            <Route path="/employer/post-job/compensation" element={<Compensation />} />
            <Route path="/employer/post-job/screening" element={<Screening />} />
            <Route path="/employer/post-job/review" element={<Review />} />
            <Route path="/employer/jobs/success" element={<JobPostSuccess />} />
            <Route path="/employer/jobs/:id/applicants" element={<ViewApplicants />} />
            <Route path="/employer/edit-company-profile" element={<EditCompanyProfile />} />
            <Route path="/employer/pricing" element={<JobPostingPricing />} />
            <Route path="/employer/settings" element={<EmployerSettings />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
