import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Share2, 
  Users, 
  BookOpen, 
  Megaphone, 
  ArrowRight, 
  Copy,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';

const JobPostSuccess: React.FC = () => {
  const jobUrl = "https://eshijobs.com/job/12345";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl);
    alert("Job URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Job Posted Successfully!</h1>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Your job posting for "Senior Software Engineer" is now live. You can share it with your network to attract more qualified candidates.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-6">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 border-gray-300 hover:border-twitter hover:text-twitter hover:bg-white"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent('Check out this job opportunity at TechCorp!')}`)}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 border-gray-300 hover:border-linkedin hover:text-linkedin hover:bg-white"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`)}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 border-gray-300 hover:border-facebook hover:text-facebook hover:bg-white"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`)}
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
              </div>
              
              <div className="flex items-center mb-8 max-w-xl mx-auto">
                <div className="flex-1 bg-gray-100 border border-gray-300 rounded-l-lg py-2 px-3 text-gray-700 truncate">
                  {jobUrl}
                </div>
                <Button 
                  onClick={copyToClipboard}
                  className="rounded-l-none bg-job-primary hover:bg-blue-700"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/employer/jobs/1">
                  <Button className="w-full sm:w-auto bg-job-primary hover:bg-blue-700">
                    View Job Posting
                  </Button>
                </Link>
                
                <Link to="/employer">
                  <Button variant="outline" className="w-full sm:w-auto border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Users className="h-5 w-5 text-job-primary" />
                    </div>
                    <CardTitle className="text-lg">Manage Applicants</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600">
                    Review and track applicants as they apply to your job posting. Filter and sort candidates based on qualifications.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/employer/jobs/1/applicants">
                    <Button variant="ghost" className="text-job-primary hover:bg-blue-50 -ml-2">
                      View Applicants
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <BookOpen className="h-5 w-5 text-job-primary" />
                    </div>
                    <CardTitle className="text-lg">Job Posting Tips</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600">
                    Learn best practices for screening candidates, conducting interviews, and making successful hires.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/employer/resources">
                    <Button variant="ghost" className="text-job-primary hover:bg-blue-50 -ml-2">
                      View Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-3 mr-4">
                  <Megaphone className="h-6 w-6 text-job-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800">Boost Your Job Posting</h3>
                  <p className="text-blue-700">
                    Promote your job to reach more qualified candidates
                  </p>
                </div>
              </div>
              
              <Link to="/employer/jobs/1/promote">
                <Button className="w-full md:w-auto bg-job-primary hover:bg-blue-700">
                  Boost This Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobPostSuccess;
