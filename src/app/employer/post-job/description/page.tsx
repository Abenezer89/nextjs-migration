'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import JobPostingProgress from '@/components/employer/JobPostingProgress';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Plus, Trash2 } from 'lucide-react';

export default function JobDescriptionPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    }
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
    
    if (errors.responsibilities) {
      const newErrors = { ...errors };
      delete newErrors.responsibilities;
      setErrors(newErrors);
    }
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
    
    if (errors.requirements) {
      const newErrors = { ...errors };
      delete newErrors.requirements;
      setErrors(newErrors);
    }
  };

  // Function to validate form before proceeding to next step
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!description.trim()) newErrors.description = 'Job description is required';
    
    if (responsibilities.every(r => !r.trim())) {
      newErrors.responsibilities = 'At least one responsibility is required';
    }
    
    if (requirements.every(r => !r.trim())) {
      newErrors.requirements = 'At least one requirement is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // TODO: Save form data to global state or API
      router.push('/employer/post-job/compensation');
    }
  };

  const handleBack = () => {
    router.push('/employer/post-job/details');
  };

  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/employer" className="text-job-primary hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <JobPostingProgress currentStep={2} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Job Description</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="description" className={errors.description ? 'text-red-500' : ''}>
                    Overview <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Provide a brief overview of the role and your company
                  </p>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) {
                        const newErrors = { ...errors };
                        delete newErrors.description;
                        setErrors(newErrors);
                      }
                    }}
                    placeholder="Describe the position and what makes your company a great place to work..."
                    className={`min-h-32 ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Responsibilities</h2>
              
              <div className="space-y-4">
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                      className={errors.responsibilities ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeResponsibility(index)}
                      disabled={responsibilities.length === 1}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {errors.responsibilities && (
                  <p className="text-sm text-red-500">{errors.responsibilities}</p>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addResponsibility}
                  className="mt-2 border-dashed border-gray-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Responsibility
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Requirements</h2>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                      className={errors.requirements ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                      disabled={requirements.length === 1}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {errors.requirements && (
                  <p className="text-sm text-red-500">{errors.requirements}</p>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addRequirement}
                  className="mt-2 border-dashed border-gray-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Requirement
                </Button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back: Job Details
              </Button>
              <Button onClick={handleNext}>
                Next: Compensation
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Tips for Job Description</h3>
              
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Be specific about what the role entails and what you're looking for in a candidate.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-job-text">Writing Tips</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Use clear, concise language</li>
                    <li>Focus on key responsibilities</li>
                    <li>Highlight growth opportunities</li>
                    <li>Be specific about requirements</li>
                    <li>Include day-to-day activities</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-job-text">What to Avoid</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Jargon or buzzwords</li>
                    <li>Unrealistic requirements</li>
                    <li>Vague descriptions</li>
                    <li>Discriminatory language</li>
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