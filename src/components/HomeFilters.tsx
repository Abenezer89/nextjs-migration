import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { JobFilter } from '@/types';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FilterChips from './FilterChips';

interface HomeFiltersProps {
  onFilterChange: (filters: JobFilter) => void;
  activeFilters: JobFilter;
  clearFilters: () => void;
}

const HomeFilters: React.FC<HomeFiltersProps> = ({
  onFilterChange,
  activeFilters,
  clearFilters,
}) => {
  const isMobile = useIsMobile();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Volunteer', 'Internship'];
  const datePosts = ['Last 24 hours', 'Last week', 'Last month'];
  const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Sales'];
  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior', 'Manager', 'Executive'];

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const FilterSection = ({ title, items, activeValue, onChange }: {
    title: string;
    items: string[];
    activeValue?: string | boolean;
    onChange: (value: any) => void;
  }) => (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <label key={item} className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-job-primary w-5 h-5"
              checked={
                title === 'Location'
                  ? (item === 'Remote' && activeValue === true) ||
                    (item === 'On-site' && activeValue === false)
                  : activeValue === item
              }
              onChange={() =>
                title === 'Location'
                  ? onChange(item === 'Remote')
                  : onChange(item)
              }
            />
            <span className="ml-3 text-gray-700">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="grid grid-cols-1 w-full gap-3">
          <div>
            <Button
              variant="outline"
              className="inline-flex items-center justify-center gap-2 px-3 py-2 h-9 rounded-lg hover:bg-gray-50 transition-colors border-gray-200"
              onClick={toggleMobileFilters}
            >
              <Filter className="h-4 w-4 text-job-primary" />
              <span className="text-gray-700 text-sm font-medium">Filters</span>
              {Object.keys(activeFilters).length > 0 && (
                <Badge className="bg-job-primary text-white text-xs">
                  {Object.keys(activeFilters).length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Filters Bottom Sheet */}
      {isMobile && showMobileFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={toggleMobileFilters}
            aria-hidden="true"
          />
          
          {/* Bottom Sheet */}
          <div 
            className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-heading"
          >
            <div className="bg-white rounded-t-2xl max-h-[87vh] flex flex-col">
              {/* Handle bar for visual indication */}
              <div className="flex justify-center p-2">
                <div className="w-12 h-1.5 rounded-full bg-gray-300" />
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 id="filter-heading" className="font-semibold text-lg">Filters</h2>
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
                  {/* Mobile Filter Chips */}
                  <FilterChips 
                    activeFilters={activeFilters}
                    onFilterChange={onFilterChange}
                    className="mb-4"
                  />

                  <FilterSection
                    title="Job Type"
                    items={jobTypes}
                    activeValue={activeFilters.jobType}
                    onChange={(type) => 
                      onFilterChange({
                        ...activeFilters,
                        jobType: activeFilters.jobType === type ? undefined : type
                      })
                    }
                  />

                  <FilterSection
                    title="Location"
                    items={['Remote', 'On-site']}
                    activeValue={activeFilters.remote}
                    onChange={(isRemote) => 
                      onFilterChange({
                        ...activeFilters,
                        remote: activeFilters.remote === isRemote ? undefined : isRemote
                      })
                    }
                  />

                  <FilterSection
                    title="Date Posted"
                    items={datePosts}
                    activeValue={activeFilters.postedDate}
                    onChange={(date) => 
                      onFilterChange({
                        ...activeFilters,
                        postedDate: activeFilters.postedDate === date ? undefined : date
                      })
                    }
                  />

                  <FilterSection
                    title="Category"
                    items={categories}
                    activeValue={activeFilters.category}
                    onChange={(category) => 
                      onFilterChange({
                        ...activeFilters,
                        category: activeFilters.category === category ? undefined : category
                      })
                    }
                  />

                  <FilterSection
                    title="Experience Level"
                    items={experienceLevels}
                    activeValue={activeFilters.experienceLevel}
                    onChange={(level) => 
                      onFilterChange({
                        ...activeFilters,
                        experienceLevel: activeFilters.experienceLevel === level ? undefined : level
                      })
                    }
                  />
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
        <div className="bg-white rounded-lg border border-gray-200 p-4 h-fit sticky top-20">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-job-primary" />
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
          
          {/* Desktop Filter Chips */}
          <FilterChips 
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            className="mb-4"
          />
          
          <div className="space-y-5 mt-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <FilterSection
              title="Job Type"
              items={jobTypes}
              activeValue={activeFilters.jobType}
              onChange={(type) => 
                onFilterChange({
                  ...activeFilters,
                  jobType: activeFilters.jobType === type ? undefined : type
                })
              }
            />

            <FilterSection
              title="Location"
              items={['Remote', 'On-site']}
              activeValue={activeFilters.remote}
              onChange={(isRemote) => 
                onFilterChange({
                  ...activeFilters,
                  remote: activeFilters.remote === isRemote ? undefined : isRemote
                })
              }
            />

            <FilterSection
              title="Date Posted"
              items={datePosts}
              activeValue={activeFilters.postedDate}
              onChange={(date) => 
                onFilterChange({
                  ...activeFilters,
                  postedDate: activeFilters.postedDate === date ? undefined : date
                })
              }
            />

            <FilterSection
              title="Category"
              items={categories}
              activeValue={activeFilters.category}
              onChange={(category) => 
                onFilterChange({
                  ...activeFilters,
                  category: activeFilters.category === category ? undefined : category
                })
              }
            />

            <FilterSection
              title="Experience Level"
              items={experienceLevels}
              activeValue={activeFilters.experienceLevel}
              onChange={(level) => 
                onFilterChange({
                  ...activeFilters,
                  experienceLevel: activeFilters.experienceLevel === level ? undefined : level
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeFilters; 