'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-job-primary mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" passHref legacyBehavior>
            <Button className="bg-job-primary hover:bg-blue-700">
              Go Back Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound; 