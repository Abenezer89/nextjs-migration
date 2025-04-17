import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { JobFilter } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  onFilterChange: (filters: JobFilter) => void;
  activeFilters: JobFilter;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  activeFilters
}) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Volunteer', 'Internship'];
  const locations = ['Remote', 'On-site', 'Hybrid'];
  const datePosts = ['Last 24 hours', 'Last week', 'Last month'];
  const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Sales'];
  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior', 'Manager', 'Executive'];

  const handleJobTypeChange = (jobType: string) => {
    onFilterChange({
      ...activeFilters,
      jobType: activeFilters.jobType === jobType ? undefined : jobType
    });
  };

  const handleRemoteChange = (isRemote: boolean) => {
    onFilterChange({
      ...activeFilters,
      remote: activeFilters.remote === isRemote ? undefined : isRemote
    });
  };

  const handleDateChange = (date: string) => {
    onFilterChange({
      ...activeFilters,
      postedDate: activeFilters.postedDate === date ? undefined : date
    });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...activeFilters,
      category: activeFilters.category === category ? undefined : category
    });
  };

  const handleExperienceLevelChange = (level: string) => {
    onFilterChange({
      ...activeFilters,
      experienceLevel: activeFilters.experienceLevel === level ? undefined : level
    });
  };

  const handleClearAllFilters = () => {
    onFilterChange({});
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== undefined);

  const FilterSection = ({ title, items, onChange, activeValue }: {
    title: string;
    items: string[];
    onChange: (value: any) => void;
    activeValue?: string | boolean;
  }) => (
    <div className="mb-6">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-job-primary focus:ring-job-primary"
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
            <span className="ml-2 text-gray-700 text-sm">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const filterContent = (
    <div className={`space-y-4 ${isMobile ? 'p-4 border-t' : 'p-6'}`}>
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <FilterSection
          title="Category"
          items={categories}
          onChange={handleCategoryChange}
          activeValue={activeFilters.category}
        />
        <FilterSection
          title="Job Type"
          items={jobTypes}
          onChange={handleJobTypeChange}
          activeValue={activeFilters.jobType}
        />
        <FilterSection
          title="Location"
          items={locations}
          onChange={handleRemoteChange}
          activeValue={activeFilters.remote}
        />
        <FilterSection
          title="Date Posted"
          items={datePosts}
          onChange={handleDateChange}
          activeValue={activeFilters.postedDate}
        />
        <FilterSection
          title="Experience Level"
          items={experienceLevels}
          onChange={handleExperienceLevelChange}
          activeValue={activeFilters.experienceLevel}
        />
      </div>
      
      {hasActiveFilters && (
        <div className="pt-4 border-t sticky bottom-0 bg-white">
          <Button
            variant="outline"
            className="w-full text-gray-600 hover:text-job-primary hover:border-job-primary"
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`animate-fade-in ${isMobile ? 'w-full mb-4' : 'w-72'}`}>
      {isMobile ? (
        <div className="border rounded-lg bg-white shadow-sm">
          <button 
            className="w-full flex items-center justify-between px-4 py-3"
            onClick={toggleExpand}
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2" /> 
              <span className="font-medium">Filters</span>
            </div>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {isExpanded && filterContent}
        </div>
      ) : (
        <div className="border rounded-lg bg-white shadow-sm">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center">
              <Filter size={16} className="mr-2" /> 
              <span className="font-medium">Filters</span>
            </div>
          </div>
          {filterContent}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
