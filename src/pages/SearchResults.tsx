import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '@/data/jobs';
import { JobFilter } from '@/types';
import Navbar from '@/components/Navbar';
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

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const isMobile = useIsMobile();
  
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeFilters, setActiveFilters] = useState<JobFilter>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(query);
  const jobsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setPage(1); // Reset page when search or filters change
    
    // Simulate API delay for search
    setTimeout(() => {
      const results = jobs
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
          
          // Posted date filter
          const matchesPostedDate = !activeFilters.postedDate || job.postedDate === activeFilters.postedDate;
          
          return matchesQuery && matchesLocation && matchesJobType && matchesRemote && 
                 matchesCategory && matchesExperience && matchesPostedDate;
        })
        .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()); // Sort by time
      
      setFilteredJobs(results);
      setLoading(false);
    }, 800);
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

  const displayedJobs = filteredJobs.slice(0, page * jobsPerPage);
  const hasMoreJobs = displayedJobs.length < filteredJobs.length;

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Volunteer', 'Internship'];
  const datePosts = ['Last 24 hours', 'Last week', 'Last month'];
  const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Sales'];
  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior', 'Manager', 'Executive'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValue) params.set('q', searchValue);
    if (location) params.set('location', location);
    navigate(`/search?${params.toString()}`);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar - Both Mobile and Desktop */}
          <div className={`${isMobile ? 'sticky top-0 z-20 -mx-4 px-4 mb-6' : 'mb-6'}`}>
            <div className={`${!isMobile ? 'grid grid-cols-4 gap-6' : ''}`}>
              {!isMobile && <div className="col-span-1" />}
              <div className={`${!isMobile ? 'col-span-3' : ''}`}>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search jobs..."
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-job-primary focus:border-transparent bg-white shadow-sm text-base"
                    />
                  </div>
                  {isMobile ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="shrink-0 h-[46px] w-[46px]"
                      onClick={toggleMobileFilters}
                    >
                      <Filter className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-job-primary hover:bg-blue-700 text-white px-6 h-[46px] text-base font-medium"
                    >
                      Search
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            {!isMobile && (
              <Badge variant="outline" className="rounded-full bg-blue-50 border-blue-200 text-job-primary py-2 px-4">
                <Search size={14} className="mr-1" />
                {query || 'All Jobs'}
              </Badge>
            )}
            
            {location && (
              <Badge variant="outline" className="rounded-full bg-blue-50 border-blue-200 text-job-primary py-2 px-4">
                <MapPin size={14} className="mr-1" />
                {location}
              </Badge>
            )}
            
            {Object.entries(activeFilters).map(([key, value]) => (
              value && (
                <Badge 
                  key={key}
                  variant="outline" 
                  className="rounded-full bg-blue-50 border-blue-200 text-job-primary py-2 px-4 cursor-pointer hover:bg-blue-100 transition-colors group"
                  onClick={() => {
                    const newFilters = { ...activeFilters };
                    delete newFilters[key];
                    handleFilterChange(newFilters);
                  }}
                >
                  <span className="flex items-center">
                    {typeof value === 'boolean' ? 
                      (key === 'remote' ? (value ? 'Remote' : 'On-site') : key) : 
                      value}
                    <X className="h-4 w-4 ml-1 text-black group-hover:text-gray-600" />
                  </span>
                </Badge>
              )
            ))}
            
            {Object.keys(activeFilters).length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-gray-600 hover:text-red-600"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mobile Filters Bottom Sheet */}
            {isMobile && showMobileFilters && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                  onClick={toggleMobileFilters}
                />
                
                {/* Bottom Sheet */}
                <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out">
                  <div className="bg-white rounded-t-2xl max-h-[87vh] flex flex-col">
                    {/* Handle bar for visual indication */}
                    <div className="flex justify-center p-2">
                      <div className="w-12 h-1.5 rounded-full bg-gray-300" />
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <h2 className="font-semibold text-lg">Filters</h2>
                      <Button
                        variant="outline"
                        size="default"
                        onClick={toggleMobileFilters}
                        className="h-10 w-10 p-0 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        aria-label="Close filters"
                      >
                        <X className="h-5 w-5 text-black" />
                      </Button>
                    </div>
                    
                    {/* Filter Content */}
                    <div className="overflow-y-auto overscroll-contain">
                      <div className="p-4 space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Job Type</h3>
                          <div className="space-y-3">
                            {jobTypes.map((type) => (
                              <label key={type} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-job-primary w-5 h-5"
                                  checked={activeFilters.jobType === type}
                                  onChange={() => 
                                    handleFilterChange({
                                      ...activeFilters,
                                      jobType: activeFilters.jobType === type ? undefined : type
                                    })
                                  }
                                />
                                <span className="ml-3 text-gray-700">{type}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Location</h3>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-job-primary w-5 h-5"
                                checked={activeFilters.remote === true}
                                onChange={() => 
                                  handleFilterChange({
                                    ...activeFilters,
                                    remote: activeFilters.remote === true ? undefined : true
                                  })
                                }
                              />
                              <span className="ml-3 text-gray-700">Remote</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-job-primary w-5 h-5"
                                checked={activeFilters.remote === false}
                                onChange={() => 
                                  handleFilterChange({
                                    ...activeFilters,
                                    remote: activeFilters.remote === false ? undefined : false
                                  })
                                }
                              />
                              <span className="ml-3 text-gray-700">On-site</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Date Posted</h3>
                          <div className="space-y-3">
                            {datePosts.map((date) => (
                              <label key={date} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-job-primary w-5 h-5"
                                  checked={activeFilters.postedDate === date}
                                  onChange={() => 
                                    handleFilterChange({
                                      ...activeFilters,
                                      postedDate: activeFilters.postedDate === date ? undefined : date
                                    })
                                  }
                                />
                                <span className="ml-3 text-gray-700">{date}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Category</h3>
                          <div className="space-y-3">
                            {categories.map((category) => (
                              <label key={category} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-job-primary w-5 h-5"
                                  checked={activeFilters.category === category}
                                  onChange={() => 
                                    handleFilterChange({
                                      ...activeFilters,
                                      category: activeFilters.category === category ? undefined : category
                                    })
                                  }
                                />
                                <span className="ml-3 text-gray-700">{category}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Experience Level</h3>
                          <div className="space-y-3">
                            {experienceLevels.map((level) => (
                              <label key={level} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-job-primary w-5 h-5"
                                  checked={activeFilters.experienceLevel === level}
                                  onChange={() => 
                                    handleFilterChange({
                                      ...activeFilters,
                                      experienceLevel: activeFilters.experienceLevel === level ? undefined : level
                                    })
                                  }
                                />
                                <span className="ml-3 text-gray-700">{level}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Actions */}
                    <div className="p-4 border-t bg-white">
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={clearFilters}
                        >
                          Clear All
                        </Button>
                        <Button 
                          className="flex-1 bg-job-primary hover:bg-blue-700"
                          onClick={toggleMobileFilters}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Desktop Filters */}
            {!isMobile && (
              <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-4 h-fit sticky top-20">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <h2 className="font-semibold">Filters</h2>
                  </div>
                  {Object.keys(activeFilters).length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-gray-600 hover:text-red-600"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div>
                    <h3 className="font-medium mb-2">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-job-primary"
                            checked={activeFilters.jobType === type}
                            onChange={() => 
                              handleFilterChange({
                                ...activeFilters,
                                jobType: activeFilters.jobType === type ? undefined : type
                              })
                            }
                          />
                          <span className="ml-2 text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Location</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-job-primary"
                          checked={activeFilters.remote === true}
                          onChange={() => 
                            handleFilterChange({
                              ...activeFilters,
                              remote: activeFilters.remote === true ? undefined : true
                            })
                          }
                        />
                        <span className="ml-2 text-gray-700">Remote</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-job-primary"
                          checked={activeFilters.remote === false}
                          onChange={() => 
                            handleFilterChange({
                              ...activeFilters,
                              remote: activeFilters.remote === false ? undefined : false
                            })
                          }
                        />
                        <span className="ml-2 text-gray-700">On-site</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Date Posted</h3>
                    <div className="space-y-2">
                      {datePosts.map((date) => (
                        <label key={date} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-job-primary"
                            checked={activeFilters.postedDate === date}
                            onChange={() => 
                              handleFilterChange({
                                ...activeFilters,
                                postedDate: activeFilters.postedDate === date ? undefined : date
                              })
                            }
                          />
                          <span className="ml-2 text-gray-700">{date}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-job-primary"
                            checked={activeFilters.category === category}
                            onChange={() => 
                              handleFilterChange({
                                ...activeFilters,
                                category: activeFilters.category === category ? undefined : category
                              })
                            }
                          />
                          <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Experience Level</h3>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-job-primary"
                            checked={activeFilters.experienceLevel === level}
                            onChange={() => 
                              handleFilterChange({
                                ...activeFilters,
                                experienceLevel: activeFilters.experienceLevel === level ? undefined : level
                              })
                            }
                          />
                          <span className="ml-2 text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Job Results */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
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
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                    <Button onClick={clearFilters} className="bg-job-primary hover:bg-blue-700">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {hasMoreJobs && (
                <div className="mt-8 flex justify-center">
                  <Button 
                    variant="outline" 
                    className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                    onClick={handleLoadMore}
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

export default SearchResults;
