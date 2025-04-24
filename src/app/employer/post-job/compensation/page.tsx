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
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Plus, Trash2 } from 'lucide-react';

export default function CompensationPage() {
  const router = useRouter();
  const [showSalary, setShowSalary] = useState(true);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('USD');
  const [salaryPeriod, setSalaryPeriod] = useState('yearly');
  const [benefits, setBenefits] = useState(['']);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      const newBenefits = [...benefits];
      newBenefits.splice(index, 1);
      setBenefits(newBenefits);
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  // Function to validate form before proceeding to next step
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (showSalary) {
      if (!salaryMin.trim()) {
        newErrors.salaryMin = 'Minimum salary is required';
      } else if (isNaN(parseFloat(salaryMin))) {
        newErrors.salaryMin = 'Must be a valid number';
      }
      
      if (!salaryMax.trim()) {
        newErrors.salaryMax = 'Maximum salary is required';
      } else if (isNaN(parseFloat(salaryMax))) {
        newErrors.salaryMax = 'Must be a valid number';
      }
      
      if (
        salaryMin && 
        salaryMax && 
        !isNaN(parseFloat(salaryMin)) && 
        !isNaN(parseFloat(salaryMax)) && 
        parseFloat(salaryMin) > parseFloat(salaryMax)
      ) {
        newErrors.salaryRange = 'Minimum salary cannot be greater than maximum salary';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // TODO: Save form data to global state or API
      router.push('/employer/post-job/screening');
    }
  };

  const handleBack = () => {
    router.push('/employer/post-job/description');
  };

  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/employer" className="text-job-primary hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <JobPostingProgress currentStep={3} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Compensation</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Display Salary Range</h3>
                    <p className="text-sm text-gray-500">
                      Job posts with salary ranges get more applicants
                    </p>
                  </div>
                  <Switch 
                    checked={showSalary} 
                    onCheckedChange={setShowSalary} 
                  />
                </div>
                
                {showSalary && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="salaryMin" className={errors.salaryMin ? 'text-red-500' : ''}>
                        Minimum <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex">
                        <Select 
                          value={salaryCurrency} 
                          onValueChange={setSalaryCurrency}
                        >
                          <SelectTrigger className="w-24 rounded-r-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="salaryMin"
                          value={salaryMin}
                          onChange={(e) => {
                            setSalaryMin(e.target.value);
                            if (errors.salaryMin || errors.salaryRange) {
                              const newErrors = { ...errors };
                              delete newErrors.salaryMin;
                              delete newErrors.salaryRange;
                              setErrors(newErrors);
                            }
                          }}
                          placeholder="e.g. 50000"
                          className={`rounded-l-none ${errors.salaryMin ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                      </div>
                      {errors.salaryMin && (
                        <p className="text-sm text-red-500 mt-1">{errors.salaryMin}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="salaryMax" className={errors.salaryMax ? 'text-red-500' : ''}>
                        Maximum <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex">
                        <Select 
                          value={salaryCurrency} 
                          onValueChange={setSalaryCurrency}
                          disabled // Keep consistent with min currency
                        >
                          <SelectTrigger className="w-24 rounded-r-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="salaryMax"
                          value={salaryMax}
                          onChange={(e) => {
                            setSalaryMax(e.target.value);
                            if (errors.salaryMax || errors.salaryRange) {
                              const newErrors = { ...errors };
                              delete newErrors.salaryMax;
                              delete newErrors.salaryRange;
                              setErrors(newErrors);
                            }
                          }}
                          placeholder="e.g. 70000"
                          className={`rounded-l-none ${errors.salaryMax ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                      </div>
                      {errors.salaryMax && (
                        <p className="text-sm text-red-500 mt-1">{errors.salaryMax}</p>
                      )}
                    </div>
                    
                    {errors.salaryRange && (
                      <p className="text-sm text-red-500">{errors.salaryRange}</p>
                    )}
                    
                    <div>
                      <Label htmlFor="salaryPeriod">Period</Label>
                      <Select value={salaryPeriod} onValueChange={setSalaryPeriod}>
                        <SelectTrigger id="salaryPeriod">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yearly">Per Year</SelectItem>
                          <SelectItem value="monthly">Per Month</SelectItem>
                          <SelectItem value="hourly">Per Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Benefits & Perks</h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder={`e.g. Health insurance, 401(k), Flexible working hours`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                      disabled={benefits.length === 1}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBenefit}
                  className="mt-2 border-dashed border-gray-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Benefit
                </Button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back: Job Description
              </Button>
              <Button onClick={handleNext}>
                Next: Screening Questions
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Tips for Compensation</h3>
              
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Being transparent about compensation helps attract qualified candidates.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-job-text">Salary Range Tips</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Research market rates for similar roles</li>
                    <li>Consider experience levels</li>
                    <li>Account for location factors</li>
                    <li>Be competitive but realistic</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-job-text">Popular Benefits</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Health insurance</li>
                    <li>Retirement plans</li>
                    <li>Paid time off</li>
                    <li>Remote work options</li>
                    <li>Professional development</li>
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