
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobPostingProgress from '@/components/employer/JobPostingProgress';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  Edit, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Review: React.FC = () => {
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  
  // Mock job data that would normally be passed through context or state
  const jobData = {
    title: "Senior Software Engineer",
    department: "Engineering",
    company: "TechCorp",
    location: "San Francisco, CA",
    remote: true,
    jobType: "Full-time",
    description: "We are looking for a Senior Software Engineer to join our engineering team. The ideal candidate will have experience in building modern web applications using React and TypeScript.",
    responsibilities: [
      "Develop and maintain user interfaces for web applications",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and well-tested code",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging trends and technologies",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and HTML/CSS",
      "Experience with modern frontend tools and libraries",
      "Knowledge of responsive design and cross-browser compatibility",
      "Excellent problem-solving skills",
    ],
    salary: {
      min: "120000",
      max: "160000",
      currency: "USD",
      period: "yearly"
    },
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) with 4% company match",
      "Unlimited PTO",
      "Remote work options",
      "Professional development budget",
    ],
    screening: [
      {
        id: "1",
        text: "How many years of experience do you have with React?",
        type: "text",
        required: true,
        dealBreaker: false
      },
      {
        id: "2",
        text: "Are you authorized to work in the United States?",
        type: "yesno",
        required: true,
        dealBreaker: true
      }
    ]
  };
  
  const handlePostJob = () => {
    setPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Job Posted Successfully",
        description: "Your job has been published and is now live.",
      });
      navigate('/employer/jobs/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Link to="/employer" className="text-job-primary hover:underline mb-6 inline-block">
            &larr; Back to Dashboard
          </Link>
          
          <JobPostingProgress currentStep={5} />
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Review & Post</h2>
                <p className="text-gray-500">Review your job posting before publishing</p>
              </div>
              
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Preview
              </Badge>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-job-text">{jobData.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center text-job-muted">
                      <Briefcase size={16} className="mr-1" />
                      <span>{jobData.company}</span>
                    </div>
                    
                    <div className="flex items-center text-job-muted">
                      <MapPin size={16} className="mr-1" />
                      <span>{jobData.location} {jobData.remote && '(Remote)'}</span>
                    </div>
                    
                    <div className="flex items-center text-job-muted">
                      <Calendar size={16} className="mr-1" />
                      <span>{jobData.jobType}</span>
                    </div>
                    
                    <div className="flex items-center text-job-primary font-medium">
                      <DollarSign size={16} className="mr-1" />
                      <span>
                        ${parseInt(jobData.salary.min).toLocaleString()} - ${parseInt(jobData.salary.max).toLocaleString()} a year
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Apply Now
                  </Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{jobData.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobData.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-700">{responsibility}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobData.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="screening">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-job-primary" />
                    <span>Application Questions ({jobData.screening.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    {jobData.screening.map((question, index) => (
                      <div key={question.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 text-sm font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{question.text}</div>
                            <div className="flex mt-1 text-sm">
                              <span className="text-gray-500">
                                {question.type === 'text' ? 'Text answer' : 
                                 question.type === 'yesno' ? 'Yes/No answer' : 
                                 'Multiple choice'}
                              </span>
                              <span className="mx-2">•</span>
                              <span className={question.required ? 'text-red-500' : 'text-gray-500'}>
                                {question.required ? 'Required' : 'Optional'}
                              </span>
                              {question.dealBreaker && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span className="text-orange-500">Deal breaker</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-base font-medium">Job Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-gray-500">
                    Title, location, type
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/employer/post-job/details">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-job-primary">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-base font-medium">Job Description</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-gray-500">
                    Description, requirements
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/employer/post-job/description">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-job-primary">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-base font-medium">Compensation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-gray-500">
                    Salary, benefits
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/employer/post-job/compensation">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-job-primary">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 mb-6">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <AlertDescription className="text-blue-700">
                  <p className="font-medium mb-1">Before you post</p>
                  <p>Your job will be live immediately after posting. Make sure all information is accurate and complete.</p>
                </AlertDescription>
              </div>
            </Alert>
            
            <div className="flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handlePostJob}
                disabled={posting}
              >
                {posting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    Post Job Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Review;
