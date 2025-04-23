'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, User, Briefcase } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import RoleSelection from '@/components/auth/RoleSelection';
import ProgressIndicator from '@/components/auth/ProgressIndicator';
import { pageVariants, formFieldVariants } from '@/components/auth/animations';

const SignUpPage = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'jobseeker' | 'employer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (accountType === 'employer' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleRoleSelect = (role: 'jobseeker' | 'employer') => {
    setAccountType(role);
    setStep(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && accountType) {
      setIsLoading(true);
      
      try {
        const { error } = await signUp(
          formData.email,
          formData.password,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            accountType,
            companyName: accountType === 'employer' ? formData.companyName : undefined
          }
        );

        if (error) {
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration successful!",
            description: "Please check your email to confirm your account.",
          });
          router.push('/auth/login');
        }
      } catch (error) {
        toast({
          title: "Registration failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setStep(1);
      setAccountType(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-start justify-center p-4 pt-6 pb-6 bg-gray-50">
        <div className="w-full max-w-md py-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join our platform to start your journey</p>
          </div>
          
          <ProgressIndicator 
            currentStep={step} 
            totalSteps={2} 
            onStepClick={handleStepClick}
          />
          
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="role-selection"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-6"
              >
                <RoleSelection onSelect={handleRoleSelect} />
              </motion.div>
            ) : (
              <motion.div
                key="registration-form"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div 
                        className="grid grid-cols-2 gap-4"
                        variants={formFieldVariants}
                        custom={0}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className={errors.firstName ? 'text-red-500' : ''}>
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className={errors.lastName ? 'text-red-500' : ''}>
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs">{errors.lastName}</p>
                          )}
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        variants={formFieldVariants}
                        custom={1}
                      >
                        <Label htmlFor="email" className={errors.email ? 'text-red-500' : ''}>
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        variants={formFieldVariants}
                        custom={2}
                      >
                        <Label htmlFor="password" className={errors.password ? 'text-red-500' : ''}>
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={`pl-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs">{errors.password}</p>
                        )}
                      </motion.div>
                      
                      {accountType === 'employer' && (
                        <motion.div 
                          className="space-y-2"
                          variants={formFieldVariants}
                          custom={3}
                        >
                          <Label htmlFor="companyName" className={errors.companyName ? 'text-red-500' : ''}>
                            Company Name
                          </Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Acme Inc."
                            value={formData.companyName}
                            onChange={handleChange}
                            className={errors.companyName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          />
                          {errors.companyName && (
                            <p className="text-red-500 text-xs">{errors.companyName}</p>
                          )}
                        </motion.div>
                      )}
                      
                      <motion.div 
                        className="flex items-center space-x-2 pt-2"
                        variants={formFieldVariants}
                        custom={4}
                      >
                        <Checkbox 
                          id="agreeTerms" 
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked === true})}
                        />
                        <Label htmlFor="agreeTerms" className="text-sm font-normal">
                          I agree to the{' '}
                          <Link href="/terms" className="text-job-primary hover:underline">
                            Terms and Conditions
                          </Link>
                        </Label>
                      </motion.div>
                      {errors.agreeTerms && (
                        <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                      )}
                      
                      <motion.div
                        variants={formFieldVariants}
                        custom={5}
                      >
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage; 