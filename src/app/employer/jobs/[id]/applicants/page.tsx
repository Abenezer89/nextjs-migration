'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Download, 
  X,
  Check,
  Star,
  Filter,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  UserCheck,
  UserX,
  FileText,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight,
  MapPin
} from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  resumeUrl: string;
  status: 'new' | 'reviewed' | 'interview' | 'offer' | 'rejected';
  match: number;
  experience: string;
  education: string;
  notes?: string;
  starred?: boolean;
}

export default function ApplicantsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  // State management
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Initialize mock data
  useEffect(() => {
    const mockApplicants: Applicant[] = [
      {
        id: "1",
        name: "Alexander Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        appliedDate: "2023-05-15T14:30:00",
        resumeUrl: "/resumes/alexander-johnson.pdf",
        status: 'interview',
        match: 92,
        experience: "7 years",
        education: "M.S. Computer Science, Stanford University",
        notes: "Strong technical skills, great communication during screening call.",
        starred: true
      },
      {
        id: "2",
        name: "Sophia Chen",
        email: "sophia.chen@example.com",
        phone: "+1 (555) 987-6543",
        location: "Seattle, WA",
        appliedDate: "2023-05-14T09:15:00",
        resumeUrl: "/resumes/sophia-chen.pdf",
        status: 'reviewed',
        match: 87,
        experience: "5 years",
        education: "B.S. Software Engineering, University of Washington"
      },
      {
        id: "3",
        name: "Michael Williams",
        email: "michael.w@example.com",
        phone: "+1 (555) 456-7890",
        location: "Austin, TX",
        appliedDate: "2023-05-13T11:45:00",
        resumeUrl: "/resumes/michael-williams.pdf",
        status: 'new',
        match: 78,
        experience: "4 years",
        education: "B.S. Computer Science, UT Austin"
      },
      {
        id: "4",
        name: "Emily Rodriguez",
        email: "emily.r@example.com",
        phone: "+1 (555) 234-5678",
        location: "New York, NY",
        appliedDate: "2023-05-12T16:20:00",
        resumeUrl: "/resumes/emily-rodriguez.pdf",
        status: 'rejected',
        match: 65,
        experience: "3 years",
        education: "B.A. Information Technology, NYU"
      },
      {
        id: "5",
        name: "David Kim",
        email: "david.kim@example.com",
        phone: "+1 (555) 876-5432",
        location: "Chicago, IL",
        appliedDate: "2023-05-12T10:05:00",
        resumeUrl: "/resumes/david-kim.pdf",
        status: 'offer',
        match: 95,
        experience: "8 years",
        education: "Ph.D. Computer Science, University of Chicago",
        notes: "Excellent technical skills, great cultural fit, very experienced with our tech stack.",
        starred: true
      }
    ];
    setApplicants(mockApplicants);
  }, []);

  // Handle navigation
  const handleBack = () => {
    router.push('/employer');
  };

  const handleViewJob = () => {
    router.push(`/employer/jobs/${id}`);
  };

  // Handle applicant status update
  const updateApplicantStatus = (applicantId: string, newStatus: Applicant['status']) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? {...app, status: newStatus} : app
    ));
    
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant({...selectedApplicant, status: newStatus});
    }
    
    const statusMessages = {
      'new': "Applicant marked as new",
      'reviewed': "Applicant marked as reviewed",
      'interview': "Applicant moved to interview stage",
      'offer': "Offer extended to applicant",
      'rejected': "Applicant rejected"
    };
    
    toast(statusMessages[newStatus]);
  };

  // Helper for status badge
  const getStatusBadge = (status: Applicant['status']) => {
    switch(status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Reviewed</Badge>;
      case 'interview':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Interview</Badge>;
      case 'offer':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Offer</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <button 
                onClick={handleBack}
                className="text-job-primary hover:underline mb-2 inline-block"
              >
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-job-text">
                Applicants for Senior Software Engineer
              </h1>
              <p className="text-job-muted">Manage and review job applicants</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <button 
                onClick={handleViewJob}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                View Job Posting
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <h3 className="font-medium">Filters</h3>
                  </div>
                  
                  {statusFilter !== 'all' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-gray-500 hover:text-red-500"
                      onClick={() => setStatusFilter('all')}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-all" 
                        checked={statusFilter === 'all'}
                        onCheckedChange={() => setStatusFilter('all')}
                      />
                      <Label htmlFor="status-all" className="ml-2">All</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-new" 
                        checked={statusFilter === 'new'}
                        onCheckedChange={() => setStatusFilter('new')}
                      />
                      <Label htmlFor="status-new" className="ml-2">New</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-reviewed" 
                        checked={statusFilter === 'reviewed'}
                        onCheckedChange={() => setStatusFilter('reviewed')}
                      />
                      <Label htmlFor="status-reviewed" className="ml-2">Reviewed</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-interview" 
                        checked={statusFilter === 'interview'}
                        onCheckedChange={() => setStatusFilter('interview')}
                      />
                      <Label htmlFor="status-interview" className="ml-2">Interview</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-offer" 
                        checked={statusFilter === 'offer'}
                        onCheckedChange={() => setStatusFilter('offer')}
                      />
                      <Label htmlFor="status-offer" className="ml-2">Offer</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="status-rejected" 
                        checked={statusFilter === 'rejected'}
                        onCheckedChange={() => setStatusFilter('rejected')}
                      />
                      <Label htmlFor="status-rejected" className="ml-2">Rejected</Label>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Sort by</h4>
                  <Select
                    value={sortField}
                    onValueChange={setSortField}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appliedDate">Date applied</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="match">Match score</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex mt-2">
                    <Button
                      variant={sortDirection === 'asc' ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-r-none flex-1 ${sortDirection === 'asc' ? 'bg-job-primary hover:bg-blue-700' : 'border-gray-300'}`}
                      onClick={() => setSortDirection('asc')}
                    >
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Asc
                    </Button>
                    <Button
                      variant={sortDirection === 'desc' ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-l-none flex-1 ${sortDirection === 'desc' ? 'bg-job-primary hover:bg-blue-700' : 'border-gray-300'}`}
                      onClick={() => setSortDirection('desc')}
                    >
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Desc
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Applicants ({applicants.length})</h3>
                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {applicants.length > 0 ? (
                    applicants.map((applicant) => (
                      <div 
                        key={applicant.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedApplicant?.id === applicant.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium truncate">{applicant.name}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle star functionality will be implemented
                            }}
                            className="text-gray-400 hover:text-yellow-400 transition-colors"
                          >
                            <Star className={`h-4 w-4 ${applicant.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="truncate">{applicant.email}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">{new Date(applicant.appliedDate).toLocaleDateString()}</span>
                          </div>
                          <div>{getStatusBadge(applicant.status)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No applicants found matching your criteria
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedApplicant ? (
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <h2 className="text-xl font-semibold mr-3">{selectedApplicant.name}</h2>
                          <button
                            onClick={() => {
                              // Toggle star functionality will be implemented
                            }}
                            className="text-gray-400 hover:text-yellow-400 transition-colors"
                          >
                            <Star className={`h-5 w-5 ${selectedApplicant.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-4 w-4" />
                            <span>{selectedApplicant.email}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="mr-1 h-4 w-4" />
                            <span>{selectedApplicant.phone}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{selectedApplicant.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {getStatusBadge(selectedApplicant.status)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300"
                        onClick={() => window.location.href = `tel:${selectedApplicant.phone}`}
                      >
                        <Phone className="mr-1 h-4 w-4" />
                        Call
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300"
                        onClick={() => window.location.href = `mailto:${selectedApplicant.email}`}
                      >
                        <Mail className="mr-1 h-4 w-4" />
                        Email
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300"
                        onClick={() => window.open(selectedApplicant.resumeUrl, '_blank')}
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Tabs defaultValue="profile">
                      <TabsList className="mb-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="status">Change Status</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="profile">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold">Application Overview</h3>
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                {selectedApplicant.match}% Match
                              </Badge>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                                <p>{selectedApplicant.experience}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Education</h4>
                                <p>{selectedApplicant.education}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Applied On</h4>
                                <p>{new Date(selectedApplicant.appliedDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Resume Preview</h3>
                            <div className="border border-gray-200 rounded-lg h-64 flex items-center justify-center bg-gray-50">
                              <div className="text-center">
                                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(selectedApplicant.resumeUrl, '_blank')}
                                >
                                  <Download className="mr-1 h-4 w-4" />
                                  View Full Resume
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="status">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">Current Status</h3>
                            <div className="flex items-center">
                              {getStatusBadge(selectedApplicant.status)}
                              <span className="ml-2 text-sm text-gray-500">
                                Last updated on {new Date(selectedApplicant.appliedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-semibold mb-4">Update Status</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card className={`cursor-pointer hover:border-blue-300 transition-colors ${selectedApplicant.status === 'new' ? 'border-2 border-blue-500' : ''}`} onClick={() => updateApplicantStatus(selectedApplicant.id, 'new')}>
                                <CardContent className="p-4 flex items-center">
                                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">New</h4>
                                    <p className="text-sm text-gray-500">Applicant to be reviewed</p>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className={`cursor-pointer hover:border-purple-300 transition-colors ${selectedApplicant.status === 'reviewed' ? 'border-2 border-purple-500' : ''}`} onClick={() => updateApplicantStatus(selectedApplicant.id, 'reviewed')}>
                                <CardContent className="p-4 flex items-center">
                                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                                    <Check className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Reviewed</h4>
                                    <p className="text-sm text-gray-500">Resume has been checked</p>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className={`cursor-pointer hover:border-amber-300 transition-colors ${selectedApplicant.status === 'interview' ? 'border-2 border-amber-500' : ''}`} onClick={() => updateApplicantStatus(selectedApplicant.id, 'interview')}>
                                <CardContent className="p-4 flex items-center">
                                  <div className="bg-amber-100 rounded-full p-2 mr-3">
                                    <UserCheck className="h-5 w-5 text-amber-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Interview</h4>
                                    <p className="text-sm text-gray-500">Ready for or in interviews</p>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className={`cursor-pointer hover:border-green-300 transition-colors ${selectedApplicant.status === 'offer' ? 'border-2 border-green-500' : ''}`} onClick={() => updateApplicantStatus(selectedApplicant.id, 'offer')}>
                                <CardContent className="p-4 flex items-center">
                                  <div className="bg-green-100 rounded-full p-2 mr-3">
                                    <ThumbsUp className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Offer</h4>
                                    <p className="text-sm text-gray-500">Extending job offer</p>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className={`cursor-pointer hover:border-gray-300 transition-colors ${selectedApplicant.status === 'rejected' ? 'border-2 border-gray-500' : ''}`} onClick={() => updateApplicantStatus(selectedApplicant.id, 'rejected')}>
                                <CardContent className="p-4 flex items-center">
                                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                                    <UserX className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Rejected</h4>
                                    <p className="text-sm text-gray-500">Not proceeding with applicant</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Applicant Notes</h3>
                          <Textarea 
                            placeholder="Add notes about this applicant here..."
                            className="min-h-32"
                            defaultValue={selectedApplicant.notes || ''}
                            onChange={(e) => {
                              if (selectedApplicant) {
                                setSelectedApplicant({
                                  ...selectedApplicant,
                                  notes: e.target.value
                                });
                              }
                            }}
                          />
                          <div className="flex justify-end">
                            <Button 
                              className="bg-job-primary hover:bg-blue-700"
                              onClick={() => {
                                if (selectedApplicant) {
                                  // Save notes functionality will be implemented
                                  toast("Notes saved successfully");
                                }
                              }}
                            >
                              Save Notes
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Applicant Selected</h3>
                  <p className="text-gray-500 mb-4">
                    Select an applicant from the list to view their details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 