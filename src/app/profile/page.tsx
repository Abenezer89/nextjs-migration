'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Briefcase, GraduationCap, Award, Edit, Plus, Check, BookOpen, MapPin, Mail, Phone, Globe, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import JobCard from '@/components/JobCard';
import { toast } from "@/components/ui/use-toast";
import { profileData } from '@/data/profile';

// Mock data - will be moved to a separate file later
const featuredJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    remote: true,
    postedDate: '2 days ago',
    isFeatured: true
  },
  {
    id: '2',
    title: 'React Developer',
    company: 'WebSolutions',
    location: 'Remote',
    remote: true,
    postedDate: '1 week ago',
    isFeatured: true
  }
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-job-text">My Profile</h1>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                onClick={handleDownloadResume}
              >
                Download Resume
              </Button>
              
              <Button 
                className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-job-primary hover:bg-blue-700"}
                onClick={handleEditToggle}
              >
                {isEditing ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 bg-job-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={40} className="text-job-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-job-text mb-1">{profileData.name}</h2>
                        <p className="text-lg text-job-muted">{profileData.title}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center text-job-muted">
                            <MapPin size={16} className="mr-1" />
                            <span>{profileData.location}</span>
                          </div>
                          
                          <div className="flex items-center text-job-muted">
                            <Mail size={16} className="mr-1" />
                            <a href={`mailto:${profileData.email}`} className="hover:text-job-primary transition-colors">
                              {profileData.email}
                            </a>
                          </div>
                          
                          <div className="flex items-center text-job-muted">
                            <Phone size={16} className="mr-1" />
                            <span>{profileData.phone}</span>
                          </div>
                          
                          {profileData.website && (
                            <div className="flex items-center text-job-muted">
                              <Globe size={16} className="mr-1" />
                              <a href={profileData.website} className="hover:text-job-primary transition-colors" target="_blank" rel="noopener noreferrer">
                                Portfolio
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {isEditing && (
                        <Button variant="outline" size="sm" className="flex-shrink-0 mt-3 sm:mt-0">
                          <Edit size={14} className="mr-1" />
                          Edit Photo
                        </Button>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-700">{profileData.about}</p>
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="text-job-primary hover:bg-blue-50 mt-2 p-0 h-auto">
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-job-primary rounded-full">
                            {skill}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm" className="rounded-full border-dashed border-gray-300 bg-gray-50">
                            <Plus size={14} className="mr-1" />
                            Add Skill
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Briefcase className="text-job-primary mr-2" />
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                  </div>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                      <Plus size={16} className="mr-1" />
                      Add Experience
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 text-gray-500 hover:text-job-primary p-1 h-8 w-8">
                          <Edit size={14} />
                        </Button>
                      )}
                      
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <div className="flex items-center text-job-muted mb-2">
                        <span>{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{exp.from} - {exp.to}</div>
                      <p className="text-gray-700">{exp.description}</p>
                      
                      {index < profileData.experience.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <GraduationCap className="text-job-primary mr-2" />
                    <h2 className="text-xl font-semibold">Education</h2>
                  </div>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                      <Plus size={16} className="mr-1" />
                      Add Education
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="relative">
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 text-gray-500 hover:text-job-primary p-1 h-8 w-8">
                          <Edit size={14} />
                        </Button>
                      )}
                      
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <div className="flex items-center text-job-muted mb-2">
                        <span>{edu.institution}</span>
                        <span className="mx-2">•</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{edu.from} - {edu.to}</div>
                      <p className="text-gray-700">{edu.description}</p>
                      
                      {index < profileData.education.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Award className="text-job-primary mr-2" />
                    <h2 className="text-xl font-semibold">Certifications</h2>
                  </div>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                      <Plus size={16} className="mr-1" />
                      Add Certification
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="relative">
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="absolute right-0 top-0 text-gray-500 hover:text-job-primary p-1 h-8 w-8">
                          <Edit size={14} />
                        </Button>
                      )}
                      
                      <h3 className="font-semibold text-lg">{cert.name}</h3>
                      <div className="text-job-muted mb-2">{cert.issuer}</div>
                      <div className="text-sm text-gray-600">
                        Issued {cert.date}
                        {cert.expires && <span> • Expires {cert.expires}</span>}
                      </div>
                      
                      {index < profileData.certifications.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Profile Strength</h2>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-500 h-2.5 rounded-full w-[85%]"></div>
                </div>
                
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-600">85% Complete</span>
                  <span className="text-job-primary font-medium">Strong</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                      <AlertCircle size={14} />
                    </div>
                    <div className="flex-1 text-sm text-gray-700">Add your portfolio or work samples</div>
                    <Button variant="ghost" size="sm" className="text-job-primary hover:bg-blue-50">
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                      <AlertCircle size={14} />
                    </div>
                    <div className="flex-1 text-sm text-gray-700">Complete your job preferences</div>
                    <Button variant="ghost" size="sm" className="text-job-primary hover:bg-blue-50">
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Job Alerts</h2>
                
                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                    <h3 className="font-medium text-job-text mb-1">Senior Developer Jobs</h3>
                    <p className="text-sm text-gray-600 mb-3">San Francisco, CA • Remote • Full-time</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Daily • 12 new jobs</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-job-primary hover:bg-blue-50">
                        View
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                    <h3 className="font-medium text-job-text mb-1">React Developer</h3>
                    <p className="text-sm text-gray-600 mb-3">Remote • Contract</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Weekly • 8 new jobs</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-job-primary hover:bg-blue-50">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full mt-4 border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                >
                  <Plus size={16} className="mr-2" />
                  Create New Alert
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
                
                <div className="space-y-4">
                  {featuredJobs.map(job => (
                    <Link 
                      key={job.id} 
                      href={`/jobs/${job.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-job-primary hover:shadow-sm transition-all"
                    >
                      <div className="font-medium text-job-primary hover:underline">{job.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{job.company}</div>
                      <div className="flex items-center mt-2">
                        <Badge variant={job.remote ? "outline" : "secondary"} className={`${job.remote ? 'border-blue-300 bg-blue-50 text-job-primary' : ''} rounded-full text-xs`}>
                          {job.remote ? 'Remote' : job.location}
                        </Badge>
                        <span className="ml-2 text-sm text-gray-500">{job.postedDate}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Link href="/jobs">
                    <Button variant="ghost" className="text-job-primary hover:bg-blue-50">
                      View All Recommendations
                      <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 