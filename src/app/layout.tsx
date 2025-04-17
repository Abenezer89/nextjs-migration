'use client'; // Required for providers like QueryClientProvider, TooltipProvider

import '@/app/globals.css'; 
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Default Next.js font, adjust if needed
import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react"; // Import React for QueryClient state
import Navbar from "@/components/Navbar";

// Assuming Inter is the desired font, adjust if your project used a different one.
const inter = Inter({ subsets: ["latin"] });

// Basic metadata setup - uncomment and modify as needed
// export const metadata: Metadata = {
//   title: "simple-job-pulse",
//   description: "Lovable Generated Project",
//   openGraph: {
//     images: '/og-image.png',
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize QueryClient here within the client component part
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add custom font links or other head elements here if needed */}
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <Navbar />
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
