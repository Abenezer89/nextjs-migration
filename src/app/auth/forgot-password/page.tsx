'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Mail, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email format is invalid');
      return false;
    }
    setError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateEmail(email)) {
      setIsLoading(true);
      
      try {
        const { error } = await resetPassword(email);
        
        if (error) {
          toast({
            title: "Password reset failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setIsSuccess(true);
          toast({
            title: "Password reset email sent",
            description: "Please check your email for instructions to reset your password.",
          });
        }
      } catch (error) {
        toast({
          title: "Password reset failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link href="/">
              <Logo />
            </Link>
            <h1 className="text-2xl font-bold mt-4">Reset Password</h1>
            <p className="text-gray-600 mt-1">Enter your email to receive reset instructions</p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {isSuccess ? (
                <div className="text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="text-gray-600">
                    We've sent password reset instructions to your email address.
                    Please check your inbox and follow the link to reset your password.
                  </p>
                  <Button
                    type="button"
                    className="w-full bg-job-primary hover:bg-blue-700"
                    onClick={() => router.push('/auth/login')}
                  >
                    Return to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={error ? 'text-red-500' : ''}>
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className={`pl-10 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs">{error}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-job-primary hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-center text-gray-600">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-job-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

 