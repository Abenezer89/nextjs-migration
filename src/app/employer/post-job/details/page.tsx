'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import JobPostingProgress from '@/components/employer/JobPostingProgress';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

export default function JobDetailsPage() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Function to validate form before proceeding to next step
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!department) newErrors.department = 'Department is required';
    if (!jobType) newErrors.jobType = 'Job type is required';
    if (!location && !isRemote) newErrors.location = 'Location is required if not remote';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // TODO: Save form data to global state or API
      router.push('/employer/post-job/description');
    }
  };

  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/employer" className="text-job-primary hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <JobPostingProgress currentStep={1} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Job Details</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="jobTitle" className={errors.jobTitle ? 'text-red-500' : ''}>
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => {
                      setJobTitle(e.target.value);
                      if (errors.jobTitle) {
                        const newErrors = { ...errors };
                        delete newErrors.jobTitle;
                        setErrors(newErrors);
                      }
                    }}
                    placeholder="e.g. Senior Software Engineer"
                    className={errors.jobTitle ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.jobTitle && (
                    <p className="text-sm text-red-500 mt-1">{errors.jobTitle}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="department" className={errors.department ? 'text-red-500' : ''}>
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={department}
                    onValueChange={(value) => {
                      setDepartment(value);
                      if (errors.department) {
                        const newErrors = { ...errors };
                        delete newErrors.department;
                        setErrors(newErrors);
                      }
                    }}
                  >
                    <SelectTrigger id="department" className={errors.department ? 'border-red-500 focus-visible:ring-red-500' : ''}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-red-500 mt-1">{errors.department}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="jobType" className={errors.jobType ? 'text-red-500' : ''}>
                    Job Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={jobType}
                    onValueChange={(value) => {
                      setJobType(value);
                      if (errors.jobType) {
                        const newErrors = { ...errors };
                        delete newErrors.jobType;
                        setErrors(newErrors);
                      }
                    }}
                  >
                    <SelectTrigger id="jobType" className={errors.jobType ? 'border-red-500 focus-visible:ring-red-500' : ''}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jobType && (
                    <p className="text-sm text-red-500 mt-1">{errors.jobType}</p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox 
                      id="isRemote" 
                      checked={isRemote}
                      onCheckedChange={(checked) => {
                        setIsRemote(checked as boolean);
                        if (checked && errors.location) {
                          const newErrors = { ...errors };
                          delete newErrors.location;
                          setErrors(newErrors);
                        }
                      }}
                    />
                    <Label htmlFor="isRemote">This is a remote position</Label>
                  </div>
                  
                  {!isRemote && (
                    <div>
                      <Label htmlFor="location" className={errors.location ? 'text-red-500' : ''}>
                        Location <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (errors.location) {
                            const newErrors = { ...errors };
                            delete newErrors.location;
                            setErrors(newErrors);
                          }
                        }}
                        placeholder="e.g. New York, NY"
                        className={errors.location ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleNext}>
                    Next: Job Description
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Tips for Job Details</h3>
              
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Using a clear, specific job title helps attract qualified candidates.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-job-text">Popular Job Titles</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-gray-50">Software Engineer</Badge>
                    <Badge variant="outline" className="bg-gray-50">Product Manager</Badge>
                    <Badge variant="outline" className="bg-gray-50">Data Scientist</Badge>
                    <Badge variant="outline" className="bg-gray-50">UX Designer</Badge>
                    <Badge variant="outline" className="bg-gray-50">Marketing Manager</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-job-text">Avoid These Terms</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Ninja, Guru, Rockstar</li>
                    <li>Gender-specific terms</li>
                    <li>Abbreviations that aren't industry standard</li>
                    <li>Terms that might exclude qualified candidates</li>
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