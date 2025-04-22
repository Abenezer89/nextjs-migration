'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Job } from '@/types';
import { jobs } from '@/data/jobs';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function JobDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!id) return;
    
    const fetchJob = async () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const foundJob = jobs.find(j => j.id === id) || null;
        setJob(foundJob);
        
        // Find similar jobs based on job title or company
        if (foundJob) {
          const similar = jobs
            .filter(j => 
              j.id !== foundJob.id && 
              (j.title.includes(foundJob.title.split(' ')[0]) || 
               j.company === foundJob.company)
            )
            .slice(0, 3);
          
          setSimilarJobs(similar);
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchJob();
  }, [id]);

  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button className="bg-job-primary hover:bg-blue-700">
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-job-primary mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to jobs
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={job.remote ? "outline" : "secondary"} className={`${job.remote ? 'border-blue-300 bg-blue-50 text-job-primary' : ''} rounded-full text-xs`}>
                      {job.remote ? 'Remote' : job.location}
                    </Badge>
                    <span className="text-job-muted text-sm">{job.postedDate}</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-job-text mb-2">{job.title}</h1>
                  
                  <div className="flex items-center">
                    <span className="text-lg text-job-muted">{job.company}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-job-muted">{job.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <Button 
                    className="bg-job-primary hover:bg-blue-700 w-full sm:w-auto"
                    onClick={handleApply}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
              
              {job.salary && (
                <div className="mb-6">
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 rounded-full">
                    {job.salary}
                  </Badge>
                  <Badge variant="outline" className="ml-2 rounded-full border-gray-300">
                    {job.jobType}
                  </Badge>
                </div>
              )}
              
              <Separator className="mb-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-700">{responsibility}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                </div>
                
                {job.benefits && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <Button 
                  className="bg-job-primary hover:bg-blue-700 w-full sm:w-auto"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  className="ml-0 mt-3 sm:ml-3 sm:mt-0 w-full sm:w-auto border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                >
                  Save Job
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">About {job.company}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {job.company} is a leading company in its industry, dedicated to innovation and excellence. 
                With a strong focus on employee growth and development, we offer a collaborative and 
                inclusive work environment where every voice is valued.
              </p>
              
              <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                View Company Profile
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Job Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 text-sm">Job Type</div>
                    <div className="font-medium">{job.jobType}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-500 text-sm">Location</div>
                    <div className="font-medium">{job.remote ? 'Remote' : job.location}</div>
                  </div>
                  
                  {job.salary && (
                    <div>
                      <div className="text-gray-500 text-sm">Salary</div>
                      <div className="font-medium">{job.salary}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-gray-500 text-sm">Posted</div>
                    <div className="font-medium">{job.postedDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {similarJobs.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Similar Jobs</h3>
                  
                  <div className="space-y-4">
                    {similarJobs.map(similarJob => (
                      <Link 
                        key={similarJob.id} 
                        href={`/job/${similarJob.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-job-primary hover:underline">{similarJob.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{similarJob.company}</div>
                        <div className="flex items-center mt-2">
                          <Badge variant={similarJob.remote ? "outline" : "secondary"} className={`${similarJob.remote ? 'border-blue-300 bg-blue-50 text-job-primary' : ''} rounded-full text-xs`}>
                            {similarJob.remote ? 'Remote' : similarJob.location}
                          </Badge>
                          <span className="ml-2 text-sm text-gray-500">{similarJob.postedDate}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 