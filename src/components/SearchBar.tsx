
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 w-full bg-white p-2 rounded-xl shadow-sm border border-gray-200">
        <div className="flex-1 flex items-center px-3 gap-2">
          <Search size={20} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-job-text flex-1"
          />
        </div>
        
        <div className="h-full w-[1px] bg-gray-200 hidden md:block" />
        
        <Button type="submit" className="bg-job-primary hover:bg-blue-700 md:rounded-lg px-5">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
