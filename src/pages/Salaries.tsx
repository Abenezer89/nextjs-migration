
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Salaries: React.FC = () => {
  const popularJobs = [
    { title: 'Software Engineer', avgSalary: '$105,000', range: '$85,000 - $145,000', companies: ['Google', 'Microsoft', 'Amazon'] },
    { title: 'Product Manager', avgSalary: '$125,000', range: '$95,000 - $160,000', companies: ['Apple', 'Facebook', 'Adobe'] },
    { title: 'Data Scientist', avgSalary: '$115,000', range: '$90,000 - $150,000', companies: ['Netflix', 'Salesforce', 'IBM'] },
    { title: 'UX Designer', avgSalary: '$95,000', range: '$75,000 - $130,000', companies: ['Airbnb', 'Uber', 'Twitter'] },
    { title: 'Marketing Manager', avgSalary: '$85,000', range: '$65,000 - $120,000', companies: ['Coca-Cola', 'Pepsi', 'Nike'] },
    { title: 'Financial Analyst', avgSalary: '$80,000', range: '$60,000 - $110,000', companies: ['JP Morgan', 'Goldman Sachs', 'Morgan Stanley'] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-job-text mb-4">
                Search Salaries & Compensation
              </h1>
              <p className="text-xl text-job-muted mb-8">
                Find out what you should be paid and what skills to learn next.
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex gap-3 w-full bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search size={20} className="text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search job titles or companies"
                    className="border-0 shadow-none focus-visible:ring-0 text-job-text flex-1"
                  />
                </div>
                
                <Button type="submit" className="bg-job-primary hover:bg-blue-700 rounded-lg px-5">
                  Search
                </Button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <Button variant="outline" className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Software Engineer</Button>
                <Button variant="outline" className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Data Scientist</Button>
                <Button variant="outline" className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Product Manager</Button>
                <Button variant="outline" className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">UX Designer</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Popular Jobs & Salaries</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularJobs.map((job) => (
              <div key={job.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300 animate-fade-in">
                <h3 className="font-semibold text-xl mb-3">{job.title}</h3>
                
                <div className="flex items-center mb-4">
                  <div className="text-2xl font-bold text-job-primary">{job.avgSalary}</div>
                  <span className="ml-2 text-gray-600">average per year</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Salary Range</div>
                  <div className="font-medium">{job.range}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Top Companies</div>
                  <div className="flex flex-wrap gap-2">
                    {job.companies.map((company) => (
                      <span key={company} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="mt-5 w-full border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary"
                >
                  See All {job.title} Jobs
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 py-10 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <h3 className="text-2xl font-bold mb-3">Want to know your worth?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Get personalized salary estimates based on your skills, experience, and location.
            </p>
            <Button className="bg-job-primary hover:bg-blue-700">
              Calculate Your Salary
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Salaries;
