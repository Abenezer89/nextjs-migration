'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { jobs } from '@/data/jobs';
import { JobFilter } from '@/types';
import JobCard from '@/components/JobCard';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Search,
  List, 
  Globe,
  Filter,
  X
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const locationParam = searchParams?.get('location') || '';
  const isMobile = useIsMobile();
  
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeFilters, setActiveFilters] = useState<JobFilter>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(query);
  const [location, setLocation] = useState(locationParam);
  const jobsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setPage(1);
    
    setTimeout(() => {
      const results = jobs
        .filter(job => {
          const matchesQuery = !query || 
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase());
          
          const matchesLocation = !location || 
            (location.toLowerCase() === 'remote' && job.remote) ||
            job.location.toLowerCase().includes(location.toLowerCase());
          
          const matchesJobType = !activeFilters.jobType || job.jobType === activeFilters.jobType;
          const matchesRemote = activeFilters.remote === undefined || job.remote === activeFilters.remote;
          const matchesCategory = !activeFilters.category || job.category === activeFilters.category;
          const matchesExperience = !activeFilters.experienceLevel || job.experienceLevel === activeFilters.experienceLevel;

          return matchesQuery && matchesLocation && matchesJobType && matchesRemote && matchesCategory && matchesExperience;
        })
        .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      
      setFilteredJobs(results);
      setLoading(false);
    }, 500);
  }, [query, location, activeFilters]);

  const handleFilterChange = (filters: JobFilter) => {
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValue) params.set('q', searchValue);
    if (location) params.set('location', location);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const displayedJobs = filteredJobs.slice(0, page * jobsPerPage);
  const hasMoreJobs = displayedJobs.length < filteredJobs.length;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Search Jobs</h1>
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="bg-job-primary hover:bg-blue-700">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:gap-8">
            {!isMobile && (
              <div className="w-full md:w-72 mb-6 md:mb-0">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <div className="space-y-4">
                    {/* Add your filter components here */}
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {query || location ? `Search Results (${filteredJobs.length})` : 'All Jobs'}
                </h2>
                {isMobile && (
                  <Button variant="outline" onClick={toggleMobileFilters}>
                    <Filter className="mr-2" size={16} />
                    Filters
                  </Button>
                )}
              </div>

              {isMobile && showMobileFilters && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" onClick={toggleMobileFilters}>
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {/* Add your filter components here */}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-primary"></div>
                  </div>
                ) : displayedJobs.length > 0 ? (
                  displayedJobs.map(job => (
                    job && job.id ? <JobCard key={job.id} job={job} /> : null
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria or clearing filters.</p>
                    <Button
                      onClick={clearFilters}
                      className="bg-job-primary hover:bg-blue-700"
                    >
                      Clear Filters & Search
                    </Button>
                  </div>
                )}
              </div>

              {hasMoreJobs && !loading && (
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    Load More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 