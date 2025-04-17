'use client'; // This page uses hooks (useState, useEffect) and event handlers

import React, { useState, useEffect } from 'react';
import { jobs } from '@/data/jobs'; // Assuming this path is correct after copy
import { JobFilter } from '@/types'; // Assuming this path is correct
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import FeaturedJobs from '@/components/FeaturedJobs';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast"; // Ensure use-toast is set up correctly
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this path is correct
import HomeFilters from '@/components/HomeFilters';
import FilterChips from '@/components/FilterChips';

// Renaming to Page or exporting Home as default works for Next.js App Router
export default function HomePage() { // Changed name for clarity
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

    // Simulating async search
    setTimeout(() => {
      setLoading(false);

      // Ensure the Toaster component is included in layout.tsx for this to work
      toast({
        title: "Search Results",
        description: `Found ${getFilteredJobs(query, location).length} jobs matching your criteria`,
      });
    }, 500);
  };

  // Function to filter jobs based on search query, location, and active filters
  const getFilteredJobs = (query: string, location: string) => {
    // Ensure jobs is an array before filtering
    const jobsArray = Array.isArray(jobs) ? jobs : [];

    return jobsArray
      .filter(job => {
        // Defensive check for job properties
        const title = job?.title?.toLowerCase() || '';
        const company = job?.company?.toLowerCase() || '';
        const description = job?.description?.toLowerCase() || '';
        const jobLocation = job?.location?.toLowerCase() || '';
        const queryLower = query.toLowerCase();
        const locationLower = location.toLowerCase();

        const matchesQuery = !query ||
          title.includes(queryLower) ||
          company.includes(queryLower) ||
          description.includes(queryLower);

        const matchesLocation = !location ||
          (locationLower === 'remote' && job?.remote) ||
          jobLocation.includes(locationLower);

        const matchesJobType = !activeFilters.jobType || job?.jobType === activeFilters.jobType;
        const matchesRemote = activeFilters.remote === undefined || job?.remote === activeFilters.remote;
        const matchesCategory = !activeFilters.category || job?.category === activeFilters.category;
        const matchesExperience = !activeFilters.experienceLevel || job?.experienceLevel === activeFilters.experienceLevel;

        return matchesQuery && matchesLocation && matchesJobType && matchesRemote && matchesCategory && matchesExperience;
      })
      .sort((a, b) => {
        // Defensive check for dates
        const dateA = a?.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b?.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA; // Sort descending by date
      });
  };


  // Update filtered jobs when search or filters change
  useEffect(() => {
    setPage(1); // Reset page number
    setFilteredJobs(getFilteredJobs(searchQuery, searchLocation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchLocation, activeFilters]); // Consider memoizing getFilteredJobs if it causes issues

  // Handler for filter changes from HomeFilters component
  const handleFilterChange = (filters: JobFilter) => {
    setActiveFilters(filters);
  };

  // Handler to clear all active filters
  const clearFilters = () => {
    setActiveFilters({});
    // Optionally clear search query/location as well if desired
    // setSearchQuery('');
    // setSearchLocation('');
  };

  // Handler for loading more jobs
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Calculate jobs to display based on current page
  const displayedJobs = filteredJobs.slice(0, page * jobsPerPage);
  const hasMoreJobs = displayedJobs.length < filteredJobs.length;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
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

        {/* Featured Jobs Section */}
        {/* Ensure jobs data is valid before passing */}
        {Array.isArray(jobs) && <FeaturedJobs jobs={jobs} />}

        {/* Main Content Area with Filters and Job List */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Filters Sidebar (Desktop) */}
            {!isMobile && (
              <div className="w-full md:w-72 mb-6 md:mb-0">
                <HomeFilters
                  onFilterChange={handleFilterChange}
                  activeFilters={activeFilters}
                  clearFilters={clearFilters}
                />
              </div>
            )}

            {/* Job List Area */}
            <div className="flex-1">
              {/* Header with Title and Mobile Filter Trigger */}
              <div className="flex flex-col mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">
                    {searchQuery || searchLocation ? `Search Results (${filteredJobs.length})` : 'Latest Jobs'}
                  </h2>
                  {/* Mobile Filter Component Trigger */}
                  {isMobile && (
                    <HomeFilters
                      onFilterChange={handleFilterChange}
                      activeFilters={activeFilters}
                      clearFilters={clearFilters}
                    />
                  )}
                </div>
                {/* Mobile Filter Chips Display */}
                {isMobile && Object.keys(activeFilters).length > 0 && (
                  <FilterChips
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange} // Allow removing filters via chips
                    className="mt-2"
                  />
                )}
              </div>

              {/* Job List / Loading / No Results */}
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-primary"></div>
                  </div>
                ) : displayedJobs.length > 0 ? (
                  displayedJobs.map(job => (
                    // Add defensive check for job existence and id
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

              {/* Load More Button */}
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