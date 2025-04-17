import React, { useState, useEffect } from 'react';
import { jobs } from '@/data/jobs';
import { JobFilter } from '@/types';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import FeaturedJobs from '@/components/FeaturedJobs';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import HomeFilters from '@/components/HomeFilters';
import FilterChips from '@/components/FilterChips';

const Home: React.FC = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<JobFilter>({});
  const jobsPerPage = 10;
  const isMobile = useIsMobile();

  const handleSearch = (query: string, location: string) => {
    setLoading(true);
    setSearchQuery(query);
    setSearchLocation(location);
    
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Search Results",
        description: `Found ${getFilteredJobs(query, location).length} jobs matching your criteria`,
      });
    }, 500);
  };

  const getFilteredJobs = (query: string, location: string) => {
    return jobs
      .filter(job => {
        // Search query filter
        const matchesQuery = !query || 
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase());
        
        // Location filter
        const matchesLocation = !location || 
          (location.toLowerCase() === 'remote' && job.remote) ||
          job.location.toLowerCase().includes(location.toLowerCase());
        
        // Job type filter
        const matchesJobType = !activeFilters.jobType || job.jobType === activeFilters.jobType;
        
        // Remote filter
        const matchesRemote = activeFilters.remote === undefined || job.remote === activeFilters.remote;
        
        // Category filter
        const matchesCategory = !activeFilters.category || job.category === activeFilters.category;
        
        // Experience level filter
        const matchesExperience = !activeFilters.experienceLevel || job.experienceLevel === activeFilters.experienceLevel;
        
        return matchesQuery && matchesLocation && matchesJobType && matchesRemote && matchesCategory && matchesExperience;
      })
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()); // Sort by time
  };

  useEffect(() => {
    setPage(1); // Reset page when search or filters change
    setFilteredJobs(getFilteredJobs(searchQuery, searchLocation));
  }, [searchQuery, searchLocation, activeFilters]);

  const handleFilterChange = (filters: JobFilter) => {
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const displayedJobs = filteredJobs.slice(0, page * jobsPerPage);
  const hasMoreJobs = displayedJobs.length < filteredJobs.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-job-text mb-4">
                Find Your Dream Job Today
              </h1>
              <p className="text-xl text-job-muted mb-8">
                Search thousands of jobs from top companies and apply in minutes.
              </p>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            <div className="mt-8 flex justify-center">
              <div className="text-sm text-gray-600">
                Popular searches: Web Developer, UI Designer, Marketing, Remote
              </div>
            </div>
          </div>
        </div>
        
        <FeaturedJobs jobs={jobs} />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Filters - Desktop sidebar */}
            {!isMobile && (
              <div className="w-full md:w-72 mb-6 md:mb-0">
                <HomeFilters 
                  onFilterChange={handleFilterChange} 
                  activeFilters={activeFilters}
                  clearFilters={clearFilters}
                />
              </div>
            )}
            
            {/* Main content */}
            <div className="flex-1">
              {/* Header with filter button for mobile */}
              <div className="flex flex-col mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">
                    {searchQuery || searchLocation ? `Search Results (${filteredJobs.length})` : 'Latest Jobs'}
                  </h2>
                  {isMobile && (
                    <HomeFilters 
                      onFilterChange={handleFilterChange} 
                      activeFilters={activeFilters}
                      clearFilters={clearFilters}
                    />
                  )}
                </div>
                {/* Mobile Filter Chips */}
                {isMobile && (
                  <FilterChips 
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-primary"></div>
                  </div>
                ) : displayedJobs.length > 0 ? (
                  displayedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                    <Button 
                      onClick={clearFilters}
                      className="bg-job-primary hover:bg-blue-700"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Load more section */}
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
};

export default Home;
