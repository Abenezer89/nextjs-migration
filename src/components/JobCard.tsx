import React from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { Job } from '@/types';
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, compact = false }) => {
  return (
    <Card className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:border-job-primary/30 overflow-hidden group transition-all duration-300 hover:shadow-md ${compact ? 'p-0' : 'p-6'}`}>
      <div className="flex justify-between items-start">
        <CardHeader className={compact ? 'p-4 pb-2' : 'p-0 space-y-3'}>
          <div className="flex items-center gap-2">
            <Badge variant={job.remote ? "outline" : "secondary"} className={`${job.remote ? 'border-blue-300 bg-blue-50 text-job-primary' : ''} rounded-full text-xs animate-fade-in`}>
              {job.remote ? 'Remote' : job.location}
            </Badge>
            <span className="text-job-muted text-sm">{job.postedDate}</span>
          </div>
          
          <CardTitle className="text-xl font-semibold text-left text-job-text hover:text-job-primary transition-colors">
            <Link href={`/job/${job.id}`} className="block">
              {job.title}
            </Link>
          </CardTitle>
          
          <div className="text-job-muted text-left">{job.company}</div>
        </CardHeader>
        
        <Button variant="ghost" className="rounded-full p-2 h-9 w-9 mt-3 mr-3">
          <MoreVertical size={18} />
        </Button>
      </div>
      
      {!compact && (
        <CardContent className="p-0 text-left mt-4">
          <div className="mt-2">
            <div className="text-job-text mb-3">{job.description.substring(0, 150)}...</div>
            
            {job.salary && (
              <div className="flex items-center mt-4">
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 rounded-full">
                  {job.salary}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      )}
      
      {!compact && (
        <CardFooter className="p-0 pt-4 gap-3 flex justify-between items-center">
          <Badge variant="outline" className="rounded-full border-gray-300">
            {job.jobType}
          </Badge>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary transition-colors">
              Save
            </Button>
            <Button size="sm" className="rounded-full bg-job-primary hover:bg-blue-700 transition-colors">
              Apply
            </Button>
          </div>
        </CardFooter>
      )}
      
      {compact && job.salary && (
        <CardFooter className="p-4 pt-0 flex justify-start">
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 rounded-full">
            {job.salary}
          </Badge>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobCard;
