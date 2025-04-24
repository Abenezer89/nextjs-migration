'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Briefcase, 
  DollarSign, 
  Settings, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface JobPostingProgressProps {
  currentStep: number;
  totalSteps?: number;
  jobId?: string;
}

const JobPostingProgress: React.FC<JobPostingProgressProps> = ({ 
  currentStep, 
  totalSteps = 5, 
  jobId 
}) => {
  const router = useRouter();
  
  const steps = [
    { 
      number: 1, 
      title: 'Job Details', 
      description: 'Title, location, and job type', 
      icon: FileText, 
      path: jobId ? `/employer/post-job/details/${jobId}` : '/employer/post-job/details'
    },
    { 
      number: 2, 
      title: 'Job Description', 
      description: 'Responsibilities and requirements', 
      icon: Briefcase,
      path: jobId ? `/employer/post-job/description/${jobId}` : '/employer/post-job/description'
    },
    { 
      number: 3, 
      title: 'Compensation', 
      description: 'Salary and benefits', 
      icon: DollarSign,
      path: jobId ? `/employer/post-job/compensation/${jobId}` : '/employer/post-job/compensation'
    },
    { 
      number: 4, 
      title: 'Screening', 
      description: 'Application questions', 
      icon: Settings,
      path: jobId ? `/employer/post-job/screening/${jobId}` : '/employer/post-job/screening'
    },
    { 
      number: 5, 
      title: 'Review & Post', 
      description: 'Finalize and publish', 
      icon: CheckCircle,
      path: jobId ? `/employer/post-job/review/${jobId}` : '/employer/post-job/review'
    }
  ];
  
  const handleNavigate = (path: string, stepNumber: number) => {
    // Only allow navigation to completed steps or the current step
    if (stepNumber <= currentStep) {
      router.push(path);
    }
  };
  
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create Job Posting</h2>
        <div className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</div>
      </div>
      
      <div className="relative mb-8">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${progressPercentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-job-primary transition-all duration-500"
          ></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1/2">
          {steps.map((step) => (
            <div 
              key={step.number}
              onClick={() => handleNavigate(step.path, step.number)}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2
                transition-all duration-300 
                ${step.number < currentStep 
                  ? 'bg-job-primary border-job-primary text-white cursor-pointer'
                  : step.number === currentStep
                  ? 'bg-white border-job-primary text-job-primary cursor-default'
                  : 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'}
              `}
            >
              {step.number < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span>{step.number}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {steps.map((step) => (
          <div 
            key={step.number}
            onClick={() => handleNavigate(step.path, step.number)}
            className={`
              text-center p-4 rounded-lg transition-all
              ${step.number < currentStep 
                ? 'bg-blue-50 cursor-pointer'
                : step.number === currentStep
                ? 'bg-blue-50 border-2 border-job-primary'
                : 'bg-gray-50 cursor-not-allowed'}
            `}
          >
            <step.icon
              className={`
                mx-auto w-6 h-6 mb-2
                ${step.number <= currentStep ? 'text-job-primary' : 'text-gray-400'}
              `}
            />
            <h3 className={`font-medium ${step.number <= currentStep ? 'text-job-text' : 'text-gray-400'}`}>
              {step.title}
            </h3>
            <p className={`text-xs ${step.number <= currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (currentStep > 1) {
              const prevStep = steps[currentStep - 2];
              router.push(prevStep.path);
            } else {
              router.push('/employer');
            }
          }}
          className="border-gray-300"
          disabled={currentStep === 1}
        >
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </Button>
        
        {currentStep < totalSteps && (
          <Button
            onClick={() => {
              const nextStep = steps[currentStep];
              router.push(nextStep.path);
            }}
            className="bg-job-primary hover:bg-blue-700"
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
        
        {currentStep === totalSteps && (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => router.push('/employer/post-job/success')}
          >
            Post Job
            <CheckCircle className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobPostingProgress;
