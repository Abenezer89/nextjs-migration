'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Globe, Users, Star, Bookmark } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobs } from '@/data/jobs';
import { toast } from "@/components/ui/use-toast";

export default function CompanyDetail() {
  const params = useParams();
  const id = params?.id as string || 'Company';
  const [following, setFollowing] = useState(false);
  
  // This would normally be fetched from an API based on the ID
  // For now we'll just use a mock based on the jobs data
  const companyJobs = jobs.filter(job => job.company === id);
  const companyDetails = {
    name: id || 'Company',
    logo: id?.charAt(0) || 'C',
    description: `${id} is a leading company in its industry, dedicated to innovation and excellence. With a strong focus on employee growth and development, we offer a collaborative and inclusive work environment where every voice is valued.`,
    overview: `Founded in 2010, ${id} has been at the forefront of technological innovation, consistently pushing boundaries and setting new standards in our industry. Our mission is to create products that make a real difference in people's lives, and our team of talented professionals is dedicated to this goal.`,
    location: 'San Francisco, CA',
    website: 'https://www.example.com',
    size: '1,000-5,000 employees',
    industry: 'Technology',
    founded: '2010',
    rating: 4.2,
    reviews: 128,
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work schedule and remote options',
      '401(k) with company match',
      'Professional development budget',
      'Generous parental leave'
    ]
  };

  const handleFollow = () => {
    setFollowing(!following);
    toast({
      title: following ? "Company unfollowed" : "Company followed",
      description: following ? 
        `You will no longer receive updates from ${companyDetails.name}` : 
        `You will now receive updates about new jobs from ${companyDetails.name}`,
    });
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
      <Link href="/companies" className="inline-flex items-center text-gray-600 hover:text-job-primary mb-6 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to companies
      </Link>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-20 h-20 bg-job-primary rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-3xl">{companyDetails.logo}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-job-text mb-2">{companyDetails.name}</h1>
                
                <div className="flex items-center flex-wrap gap-3">
                  <div className="flex items-center text-job-muted">
                    <MapPin size={16} className="mr-1" />
                    <span>{companyDetails.location}</span>
                  </div>
                  
                  <div className="flex items-center text-job-muted">
                    <Globe size={16} className="mr-1" />
                    <a href={companyDetails.website} className="hover:text-job-primary transition-colors" target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </div>
                  
                  <div className="flex items-center text-job-muted">
                    <Users size={16} className="mr-1" />
                    <span>{companyDetails.size}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm">
                      <Star size={14} className="mr-1 fill-current" />
                      <span className="font-medium">{companyDetails.rating}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span>{companyDetails.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button 
                  variant={following ? "default" : "outline"}
                  className={following ? 
                    "bg-job-primary hover:bg-blue-700" : 
                    "border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"}
                  onClick={handleFollow}
                >
                  <Bookmark size={16} className="mr-2" />
                  {following ? "Following" : "Follow Company"}
                </Button>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{companyDetails.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full border-gray-300 bg-gray-50">
                {companyDetails.industry}
              </Badge>
              <Badge variant="outline" className="rounded-full border-gray-300 bg-gray-50">
                Founded {companyDetails.founded}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border border-gray-200 rounded-lg mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({companyJobs.length})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">About {companyDetails.name}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{companyDetails.overview}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Company Information</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-gray-500 w-32">Industry:</span>
                  <span className="font-medium">{companyDetails.industry}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Founded:</span>
                  <span className="font-medium">{companyDetails.founded}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Company size:</span>
                  <span className="font-medium">{companyDetails.size}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-32">Headquarters:</span>
                  <span className="font-medium">{companyDetails.location}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Why Join Us?</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Collaborative and inclusive work environment</li>
                <li>Opportunities for growth and career development</li>
                <li>Innovative projects that make a real impact</li>
                <li>Competitive compensation and benefits</li>
                <li>Work-life balance and flexible scheduling</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="jobs" className="animate-fade-in">
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">Open Positions at {companyDetails.name}</h2>
            <p className="text-gray-700 mb-4">
              Join our team and be part of something amazing. Check out our open positions below.
            </p>
            <Link href="/profile">
              <Button className="bg-job-primary hover:bg-blue-700">
                Create Job Alert
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {companyJobs.length > 0 ? (
              companyJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No open positions</h3>
                <p className="text-gray-600 mb-6">
                  {companyDetails.name} doesn't have any open positions right now. 
                  Check back later or create a job alert to be notified when new positions open up.
                </p>
                <Link href="/profile">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Create Job Alert
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Employee Reviews</h2>
            <Button className="bg-job-primary hover:bg-blue-700">Write a Review</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-job-primary mb-1">{companyDetails.rating}</div>
              <div className="flex justify-center items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(companyDetails.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <div className="text-gray-600">Based on {companyDetails.reviews} reviews</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What people like</h3>
              <ul className="text-sm space-y-1">
                <li>• Great work-life balance</li>
                <li>• Collaborative environment</li>
                <li>• Learning opportunities</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What could improve</h3>
              <ul className="text-sm space-y-1">
                <li>• Career advancement</li>
                <li>• Management communication</li>
                <li>• Decision-making processes</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="benefits" className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-6">Benefits and Perks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-semibold mb-4">Company Benefits</h3>
              <ul className="space-y-3">
                {companyDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Office Perks</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-job-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="font-medium">Health & Wellness</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-job-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                  <div className="font-medium">Free Meals</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-job-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="font-medium">Flexible Hours</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-job-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <div className="font-medium">Team Events</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
} 