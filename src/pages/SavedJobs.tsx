
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkCheck, Search, Filter, Trash2, Calendar, Briefcase, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobs } from '@/data/jobs';
import { toast } from "@/components/ui/use-toast";

const SavedJobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // For demo purposes, we'll use some of the mock jobs as saved jobs
  const savedJobs = jobs.slice(0, 5);
  const archivedJobs = jobs.slice(5, 7);
  const appliedJobs = jobs.slice(7, 10);
  
  const filteredSavedJobs = savedJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRemove = (jobId: string) => {
    toast({
      title: "Job Removed",
      description: "This job has been removed from your saved jobs.",
    });
  };
  
  const handleArchive = (jobId: string) => {
    toast({
      title: "Job Archived",
      description: "This job has been moved to your archived jobs.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-job-text">Saved Jobs</h1>
            <p className="text-job-muted">Track and manage your job applications</p>
          </div>
          
          <Link to="/profile">
            <Button className="bg-job-primary hover:bg-blue-700">
              View Profile
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="saved" className="w-full mb-6">
          <TabsList className="bg-white border border-gray-200 rounded-lg">
            <TabsTrigger value="saved" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
              <BookmarkCheck size={16} className="mr-2" />
              Saved Jobs ({savedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
              <Briefcase size={16} className="mr-2" />
              Applied ({appliedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-blue-50 data-[state=active]:text-job-primary">
              <Clock size={16} className="mr-2" />
              Archived ({archivedJobs.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="animate-fade-in mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search saved jobs"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Calendar size={16} className="mr-2" />
                  Date Saved
                </Button>
              </div>
            </div>
            
            {filteredSavedJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredSavedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Link to={`/job/${job.id}`} className="text-xl font-semibold text-job-text hover:text-job-primary transition-colors">
                          {job.title}
                        </Link>
                        <div className="text-job-muted mt-1">{job.company}</div>
                        <div className="text-gray-700 mt-2">{job.location} {job.remote && '(Remote)'}</div>
                        
                        <div className="mt-3 text-sm text-gray-600 flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>Saved 3 days ago</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col gap-2 justify-end">
                        <Link to={`/apply/${job.id}`}>
                          <Button className="w-full bg-job-primary hover:bg-blue-700">
                            Apply Now
                          </Button>
                        </Link>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
                            onClick={() => handleArchive(job.id)}
                          >
                            <Clock size={16} />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleRemove(job.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No matching saved jobs</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any saved jobs matching "{searchQuery}".
                </p>
                <Button 
                  variant="outline"
                  className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No saved jobs yet</h3>
                <p className="text-gray-600 mb-6">
                  Start saving jobs you're interested in to keep track of them here.
                </p>
                <Link to="/">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="applied" className="animate-fade-in mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search applied jobs"
                    className="pl-10"
                  />
                </div>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Calendar size={16} className="mr-2" />
                  Date Applied
                </Button>
              </div>
            </div>
            
            {appliedJobs.length > 0 ? (
              <div className="space-y-4">
                {appliedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Link to={`/job/${job.id}`} className="text-xl font-semibold text-job-text hover:text-job-primary transition-colors">
                          {job.title}
                        </Link>
                        <div className="text-job-muted mt-1">{job.company}</div>
                        <div className="text-gray-700 mt-2">{job.location} {job.remote && '(Remote)'}</div>
                        
                        <div className="mt-3 flex items-center">
                          <span className="inline-flex items-center bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                            <Clock size={14} className="mr-1" />
                            Applied 5 days ago
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end items-center">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">Application Status</div>
                          <div className="text-green-600 font-medium">Under Review</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-6">
                  When you apply for jobs, they'll appear here so you can track your applications.
                </p>
                <Link to="/">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="archived" className="animate-fade-in mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search archived jobs"
                    className="pl-10"
                  />
                </div>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                
                <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                  <Calendar size={16} className="mr-2" />
                  Date Archived
                </Button>
              </div>
            </div>
            
            {archivedJobs.length > 0 ? (
              <div className="space-y-4">
                {archivedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Link to={`/job/${job.id}`} className="text-xl font-semibold text-job-text hover:text-job-primary transition-colors">
                          {job.title}
                        </Link>
                        <div className="text-job-muted mt-1">{job.company}</div>
                        <div className="text-gray-700 mt-2">{job.location} {job.remote && '(Remote)'}</div>
                        
                        <div className="mt-3 text-sm text-gray-600 flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>Archived 1 week ago</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                        >
                          Unarchive
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRemove(job.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No archived jobs</h3>
                <p className="text-gray-600 mb-6">
                  Jobs you archive will appear here. Archive jobs that you're no longer interested in but want to keep for reference.
                </p>
                <Link to="/">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Looking for more job opportunities?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse thousands of job listings tailored to your skills and preferences. 
            Set up job alerts to get notified about new positions that match your criteria.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-job-primary hover:bg-blue-700">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full sm:w-auto border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                Set Up Job Alerts
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedJobs;
