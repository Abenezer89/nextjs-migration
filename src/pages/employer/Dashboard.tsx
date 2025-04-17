
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Users, 
  BarChart, 
  Calendar, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  FileText,
  FileSearch,
  Building,
  Award
} from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  // Mock data
  const activeJobs = [
    { id: '1', title: 'Senior Payroll Specialist', applicants: 12, views: 243, posted: '6 days ago', status: 'active' },
    { id: '2', title: 'Operations Technical Analyst', applicants: 5, views: 118, posted: '2 days ago', status: 'active' },
  ];
  
  const draftJobs = [
    { id: 'draft1', title: 'Marketing Coordinator', lastEdited: '1 day ago', progress: 75 },
  ];
  
  const closedJobs = [
    { id: '3', title: 'Frontend Developer', applicants: 23, views: 457, posted: '30 days ago', status: 'closed' },
  ];
  
  const recentApplicants = [
    { id: 'a1', name: 'Alex Johnson', role: 'Senior Payroll Specialist', applied: '2 days ago', status: 'New' },
    { id: 'a2', name: 'Jamie Smith', role: 'Operations Technical Analyst', applied: '3 days ago', status: 'Reviewed' },
    { id: 'a3', name: 'Taylor Williams', role: 'Senior Payroll Specialist', applied: '5 days ago', status: 'Interview' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-job-text">Employer Dashboard</h1>
              <p className="text-job-muted">Manage your job postings and applicants</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to="/employer/post-job/details">
                <Button className="bg-job-primary hover:bg-blue-700">
                  <PlusCircle size={16} className="mr-2" />
                  Post a New Job
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Active Jobs</CardTitle>
                <CardDescription>Currently live job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-job-primary">{activeJobs.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Applicants</CardTitle>
                <CardDescription>Across all job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-job-primary">40</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Views</CardTitle>
                <CardDescription>Impressions on your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-job-primary">818</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Job Postings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="active">
                    <TabsList className="mb-4">
                      <TabsTrigger value="active" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
                        Active ({activeJobs.length})
                      </TabsTrigger>
                      <TabsTrigger value="drafts" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
                        Drafts ({draftJobs.length})
                      </TabsTrigger>
                      <TabsTrigger value="closed" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
                        Closed ({closedJobs.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="active" className="space-y-4">
                      {activeJobs.map(job => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <Link to={`/employer/jobs/${job.id}`} className="text-lg font-medium text-job-primary hover:underline">
                                {job.title}
                              </Link>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Users size={14} className="mr-1" />
                                  {job.applicants} applicants
                                </div>
                                <div className="flex items-center">
                                  <BarChart size={14} className="mr-1" />
                                  {job.views} views
                                </div>
                                <div className="flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  Posted {job.posted}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3 md:mt-0">
                              <Link to={`/employer/jobs/${job.id}/applicants`}>
                                <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                                  View Applicants
                                </Button>
                              </Link>
                              <Link to={`/employer/jobs/${job.id}/edit`}>
                                <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center py-2">
                        <Link to="/employer/jobs">
                          <Button variant="ghost" className="text-job-primary hover:bg-blue-50">
                            View All Jobs
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="drafts" className="space-y-4">
                      {draftJobs.map(job => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <Link to={`/employer/post-job/continue/${job.id}`} className="text-lg font-medium text-job-primary hover:underline">
                                {job.title}
                              </Link>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  Last edited {job.lastEdited}
                                </div>
                                <div className="flex items-center">
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                    <div 
                                      className="h-full bg-job-primary rounded-full" 
                                      style={{ width: `${job.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="ml-2">{job.progress}% complete</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3 md:mt-0">
                              <Link to={`/employer/post-job/continue/${job.id}`}>
                                <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                                  Continue Editing
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {draftJobs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          You don't have any draft jobs.
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="closed" className="space-y-4">
                      {closedJobs.map(job => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <Link to={`/employer/jobs/${job.id}`} className="text-lg font-medium text-job-primary hover:underline">
                                {job.title}
                              </Link>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Users size={14} className="mr-1" />
                                  {job.applicants} applicants
                                </div>
                                <div className="flex items-center">
                                  <BarChart size={14} className="mr-1" />
                                  {job.views} views
                                </div>
                                <div className="flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  Closed {job.posted}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3 md:mt-0">
                              <Link to={`/employer/jobs/${job.id}/applicants`}>
                                <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                                  View Applicants
                                </Button>
                              </Link>
                              <Link to={`/employer/jobs/${job.id}/repost`}>
                                <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                                  Repost
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {closedJobs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          You don't have any closed jobs.
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Users size={20} className="text-job-primary" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">Jamie Smith</span> applied to{" "}
                            <Link to="/employer/jobs/2" className="text-job-primary hover:underline">
                              Operations Technical Analyst
                            </Link>
                          </p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <CheckCircle2 size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">Senior Payroll Specialist</span> job posting is now live
                          </p>
                          <p className="text-sm text-gray-500">6 days ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                          <BarChart size={20} className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            Your job postings have received <span className="font-medium">52 new views</span> in the last 24 hours
                          </p>
                          <p className="text-sm text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Recent Applicants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplicants.map(applicant => (
                      <div key={applicant.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                        <Link to={`/employer/applicants/${applicant.id}`} className="block">
                          <div className="font-medium text-job-primary hover:underline">{applicant.name}</div>
                          <div className="text-gray-600 text-sm">{applicant.role}</div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">Applied {applicant.applied}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              applicant.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                              applicant.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-green-100 text-green-700'
                            }`}>
                              {applicant.status}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-4">
                    <Link to="/employer/applicants">
                      <Button variant="ghost" className="text-job-primary hover:bg-blue-50">
                        View All Applicants
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Employer Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/employer/post-job/details">
                      <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                        <PlusCircle size={16} className="mr-2" />
                        Post a New Job
                      </Button>
                    </Link>
                    <Link to="/employer/applicants">
                      <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                        <FileSearch size={16} className="mr-2" />
                        Browse Resumes
                      </Button>
                    </Link>
                    <Link to="/employer/company-profile">
                      <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                        <Building size={16} className="mr-2" />
                        Edit Company Profile
                      </Button>
                    </Link>
                    <Link to="/employer/reports">
                      <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                        <BarChart size={16} className="mr-2" />
                        Analytics & Reports
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                        <Award size={16} className="mr-2" />
                        Upgrade Plan
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmployerDashboard;
