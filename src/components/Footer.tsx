import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo />
            <p className="mt-4 text-gray-600 text-sm">
              Connecting talented professionals with their dream careers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Recruiting Solutions
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-job-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Eshi Jobs. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/" className="text-gray-600 hover:text-job-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-job-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
