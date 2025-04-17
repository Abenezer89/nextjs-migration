
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';
import { Job } from '@/types';
import { jobs } from '@/data/jobs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const JobApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: null as File | null,
    experience: '',
    linkedin: '',
    website: '',
    heardFrom: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const foundJob = jobs.find(j => j.id === id) || null;
        setJob(foundJob);
        setLoading(false);
      }, 500);
    };
    
    fetchJob();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, termsAccepted: checked }));
    
    if (errors.termsAccepted) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.termsAccepted;
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      // Submit application logic would go here
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted. The employer will contact you if you're selected for the next steps.",
      });
      
      // Redirect to jobs page after submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-job-primary hover:bg-blue-700">
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <Link to={`/job/${id}`} className="inline-flex items-center text-gray-600 hover:text-job-primary mb-6 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to job details
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
              <h1 className="text-2xl font-bold text-job-text mb-2">Apply for {job.title}</h1>
              <div className="text-job-muted mb-6">
                <span>{job.company}</span>
                <span className="mx-2">•</span>
                <span>{job.location}</span>
                {job.remote && <span className="mx-2">•</span>}
                {job.remote && <span>Remote</span>}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-job-primary text-white flex items-center justify-center mr-2">
                    {step}
                  </div>
                  <span className="font-medium">
                    {step === 1 ? 'Personal Information' : 'Additional Information'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Step {step} of 2
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className={errors.firstName ? 'text-red-500' : ''}>
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName" className={errors.lastName ? 'text-red-500' : ''}>
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className={errors.email ? 'text-red-500' : ''}>
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className={errors.phone ? 'text-red-500' : ''}>
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="resume" className={errors.resume ? 'text-red-500' : ''}>
                        Resume <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, 'resume')}
                          />
                          <label htmlFor="resume" className="cursor-pointer">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="mt-2">
                              <span className="text-job-primary font-medium">Click to upload</span> or drag and drop
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, or DOCX up to 5MB
                            </p>
                          </label>
                        </div>
                        {formData.resume && (
                          <div className="mt-2 flex items-center text-sm text-green-600">
                            <Check size={16} className="mr-1" />
                            {formData.resume.name}
                          </div>
                        )}
                        {errors.resume && (
                          <p className="text-sm text-red-500 mt-1">{errors.resume}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="coverLetter">
                        Cover Letter (Optional)
                      </Label>
                      <div className="mt-1">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="file"
                            id="coverLetter"
                            name="coverLetter"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, 'coverLetter')}
                          />
                          <label htmlFor="coverLetter" className="cursor-pointer">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="mt-2">
                              <span className="text-job-primary font-medium">Click to upload</span> or drag and drop
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, or DOCX up to 5MB
                            </p>
                          </label>
                        </div>
                        {formData.coverLetter && (
                          <div className="mt-2 flex items-center text-sm text-green-600">
                            <Check size={16} className="mr-1" />
                            {formData.coverLetter.name}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="button" className="bg-job-primary hover:bg-blue-700" onClick={handleContinue}>
                        Continue
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="experience" className={errors.experience ? 'text-red-500' : ''}>
                        Relevant Experience <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`min-h-32 ${errors.experience ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="Describe your relevant experience for this role..."
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500 mt-1">{errors.experience}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="linkedin">
                          LinkedIn Profile (Optional)
                        </Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="website">
                          Personal Website (Optional)
                        </Label>
                        <Input
                          id="website"
                          name="website"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="heardFrom">
                        How did you hear about this job? (Optional)
                      </Label>
                      <Input
                        id="heardFrom"
                        name="heardFrom"
                        placeholder="Job board, referral, company website, etc."
                        value={formData.heardFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        By submitting this application, your information will be shared with {job.company}. They may contact you via email or phone.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="termsAccepted" 
                        checked={formData.termsAccepted}
                        onCheckedChange={handleCheckboxChange}
                        className={errors.termsAccepted ? 'border-red-500 data-[state=checked]:bg-red-500' : ''}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="termsAccepted"
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                            errors.termsAccepted ? 'text-red-500' : ''
                          }`}
                        >
                          I agree to the terms and conditions <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-500">
                          I confirm that the information provided is accurate and complete.
                        </p>
                        {errors.termsAccepted && (
                          <p className="text-sm text-red-500">{errors.termsAccepted}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack} className="border-gray-300">
                        Back
                      </Button>
                      <Button type="submit" className="bg-job-primary hover:bg-blue-700">
                        Submit Application
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-lg mb-4">Job Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-gray-500 text-sm">Position</div>
                  <div className="font-medium">{job.title}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Company</div>
                  <div className="font-medium">{job.company}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="font-medium">{job.remote ? 'Remote' : job.location}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">Job Type</div>
                  <div className="font-medium">{job.jobType}</div>
                </div>
                
                {job.salary && (
                  <div>
                    <div className="text-gray-500 text-sm">Salary</div>
                    <div className="font-medium">{job.salary}</div>
                  </div>
                )}
              </div>
              
              <Separator className="mb-6" />
              
              <div>
                <h3 className="font-medium mb-3">Key Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="font-medium text-blue-800 mb-3">Application Tips</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Tailor your resume to highlight relevant experience</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Be specific about your achievements using numbers and data</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Proofread carefully before submitting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Missing component Fix
const Check = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default JobApplication;
