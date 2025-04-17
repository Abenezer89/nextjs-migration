import React from 'react';
import { Job } from '@/types';
import JobCard from './JobCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface FeaturedJobsProps {
  jobs: Job[];
}

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ jobs }) => {
  const featuredJobs = jobs.filter(job => job.isFeatured);
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  
  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  if (featuredJobs.length === 0) return null;
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="inline-block text-job-primary text-sm font-medium px-3 py-1 bg-blue-50 rounded-full mb-2">Featured Opportunities</div>
          <h2 className="text-3xl font-bold text-job-text mb-2">Top Jobs This Week</h2>
          <p className="text-job-muted max-w-2xl mx-auto">Discover opportunities from top companies that are actively hiring right now.</p>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {featuredJobs.map((job) => (
                <CarouselItem key={job.id} className="pl-4 md:basis-1/3 md:pl-6">
                  <div className="p-1">
                    <JobCard job={job} compact />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white hover:bg-white shadow-md border-0" 
            />
            <CarouselNext 
              className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white hover:bg-white shadow-md border-0" 
            />
          </Carousel>
          
          {/* Pagination Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredJobs.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  current === index ? "bg-job-primary w-4" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
