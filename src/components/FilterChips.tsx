import React from 'react';
import { X } from 'lucide-react';
import { JobFilter } from '@/types';
import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
  activeFilters: JobFilter;
  onFilterChange: (filters: JobFilter) => void;
  className?: string;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilters,
  onFilterChange,
  className = ''
}) => {
  if (!Object.keys(activeFilters).length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {Object.entries(activeFilters).map(([key, value]) => (
        value && (
          <Badge 
            key={key}
            variant="outline" 
            className="rounded-full bg-blue-50 border-blue-200 text-job-primary py-1.5 px-3 cursor-pointer hover:bg-blue-100 transition-colors group"
            onClick={() => {
              const newFilters = { ...activeFilters };
              delete newFilters[key];
              onFilterChange(newFilters);
            }}
          >
            <span className="flex items-center text-sm">
              {typeof value === 'boolean' ? 
                (key === 'remote' ? (value ? 'Remote' : 'On-site') : key) : 
                value}
              <X className="h-3.5 w-3.5 ml-1.5 text-gray-400 group-hover:text-gray-600" />
            </span>
          </Badge>
        )
      ))}
    </div>
  );
};

export default FilterChips; 