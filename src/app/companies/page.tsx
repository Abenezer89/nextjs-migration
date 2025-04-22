'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'

const topCompanies = [
  { name: 'Indeed', logo: 'I', jobs: 124, rating: 4.2 },
  { name: 'Acme Inc', logo: 'A', jobs: 87, rating: 4.5 },
  { name: 'TechCorp', logo: 'T', jobs: 56, rating: 3.9 },
  { name: 'GlobalTech', logo: 'G', jobs: 42, rating: 4.1 },
  { name: 'DesignHub', logo: 'D', jobs: 31, rating: 4.7 },
  { name: 'CloudTech', logo: 'C', jobs: 28, rating: 4.0 },
  { name: 'BrandCo', logo: 'B', jobs: 25, rating: 3.8 },
  { name: 'ServicePro', logo: 'S', jobs: 22, rating: 4.3 },
]

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-job-text mb-4">
                Find Great Places to Work
              </h1>
              <p className="text-xl text-job-muted mb-8">
                Discover top companies hiring now and read reviews from employees.
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex gap-3 w-full bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search size={20} className="text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search companies by name"
                    className="border-0 shadow-none focus-visible:ring-0 text-job-text flex-1"
                  />
                </div>
                
                <Button type="submit" className="bg-job-primary hover:bg-blue-700 rounded-lg px-5">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Top Companies Hiring Now</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCompanies.map((company) => (
              <div key={company.name} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300 animate-fade-in scale-hover">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-job-primary rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">{company.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <div className="flex items-center">
                      <div className="text-yellow-500">★</div>
                      <span className="ml-1 text-gray-700">{company.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{company.jobs} open positions</p>
                
                <Link href={`/companies/${company.name}`}>
                  <Button variant="outline" className="w-full border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
                    View Company
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-gray-300 hover:border-job-primary hover:bg-white hover:text-job-primary">
              Load More Companies
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Are You an Employer?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Post your jobs and find the perfect candidates for your company.
              </p>
              <Button className="bg-job-primary hover:bg-blue-700 text-lg py-6 px-8">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 