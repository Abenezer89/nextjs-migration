'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import JobPostingProgress from '@/components/employer/JobPostingProgress';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Edit2 } from 'lucide-react';

export default function ReviewPage() {
  const router = useRouter();
  
  // TODO: Replace with actual data from global state or API
  const jobData = {
    details: {
      title: 'Software Engineer',
      department: 'Engineering',
      jobType: 'Full-time',
      location: 'San Francisco, CA',
      remote: true
    },
    description: {
      overview: 'We are looking for a talented software engineer to join our team...',
      responsibilities: [
        'Design and implement new features',
        'Write clean, maintainable code',
        'Collaborate with cross-functional teams'
      ],
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience in software development',
        'Strong knowledge of JavaScript and TypeScript'
      ]
    },
    compensation: {
      showSalary: true,
      minSalary: 120000,
      maxSalary: 180000,
      currency: 'USD',
      period: 'yearly',
      benefits: [
        'Health insurance',
        '401(k) matching',
        'Unlimited PTO'
      ]
    },
    screening: {
      enabled: true,
      questions: [
        {
          text: 'How many years of experience do you have in software development?',
          type: 'text',
          required: true,
          dealBreaker: true
        }
      ]
    }
  };

  const handleBack = () => {
    router.push('/employer/post-job/screening');
  };

  const handlePublish = () => {
    // TODO: Save and publish job posting
    router.push('/employer/post-job/success');
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: jobData.compensation.currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/employer" className="text-job-primary hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <JobPostingProgress currentStep={5} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Review Job Posting</h2>
              
              <div className="space-y-8">
                {/* Job Details Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Job Details</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push('/employer/post-job/details')}
                      className="text-job-primary"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Job Title</p>
                      <p className="font-medium">{jobData.details.title}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium">{jobData.details.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Job Type</p>
                      <p className="font-medium">{jobData.details.jobType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">
                        {jobData.details.location}
                        {jobData.details.remote && ' (Remote available)'}
                      </p>
                    </div>
                  </div>
                </section>
                
                {/* Job Description Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Job Description</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push('/employer/post-job/description')}
                      className="text-job-primary"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-2">Overview</p>
                      <p>{jobData.description.overview}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 mb-2">Responsibilities</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {jobData.description.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 mb-2">Requirements</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {jobData.description.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
                
                {/* Compensation Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Compensation</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push('/employer/post-job/compensation')}
                      className="text-job-primary"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    {jobData.compensation.showSalary ? (
                      <div>
                        <p className="text-gray-500 mb-2">Salary Range</p>
                        <p>
                          {formatSalary(jobData.compensation.minSalary)} - {formatSalary(jobData.compensation.maxSalary)} {jobData.compensation.period}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Salary information is not displayed</p>
                    )}
                    
                    <div>
                      <p className="text-gray-500 mb-2">Benefits</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {jobData.compensation.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
                
                {/* Screening Questions Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Screening Questions</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push('/employer/post-job/screening')}
                      className="text-job-primary"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  {jobData.screening.enabled ? (
                    <div className="space-y-4 text-sm">
                      {jobData.screening.questions.map((question, index) => (
                        <div key={index}>
                          <p className="font-medium mb-1">Question {index + 1}</p>
                          <p>{question.text}</p>
                          <div className="flex gap-4 mt-1 text-gray-500">
                            <span>Type: {question.type}</span>
                            {question.required && <span>Required</span>}
                            {question.dealBreaker && <span>Deal Breaker</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No screening questions enabled</p>
                  )}
                </section>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back: Screening
              </Button>
              <Button onClick={handlePublish}>
                Publish Job
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Before Publishing</h3>
              
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Review all sections carefully before publishing your job posting.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-job-text">Review Checklist</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Verify job details accuracy</li>
                    <li>Check for typos and grammar</li>
                    <li>Confirm salary range</li>
                    <li>Review screening questions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-job-text">Next Steps</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Job will be live after publishing</li>
                    <li>You can edit after publishing</li>
                    <li>Track applications in dashboard</li>
                    <li>Share on social media</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 