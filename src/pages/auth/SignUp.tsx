import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [accountType, setAccountType] = useState<'jobseeker' | 'employer'>('jobseeker');
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
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
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
          navigate('/login');
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/">
              <Logo />
            </Link>
            <h1 className="text-2xl font-bold mt-4">Create an Account</h1>
            <p className="text-gray-600 mt-1">Join our platform to start your journey</p>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={accountType === 'jobseeker' ? 'default' : 'outline'}
                  className={`w-full ${accountType === 'jobseeker' ? 'bg-job-primary hover:bg-blue-700' : 'border-gray-300'}`}
                  onClick={() => setAccountType('jobseeker')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Job Seeker
                </Button>
                <Button
                  type="button"
                  variant={accountType === 'employer' ? 'default' : 'outline'}
                  className={`w-full ${accountType === 'employer' ? 'bg-job-primary hover:bg-blue-700' : 'border-gray-300'}`}
                  onClick={() => setAccountType('employer')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Employer
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                
                <div className="space-y-2">
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
                </div>
                
                <div className="space-y-2">
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
                  <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>
                
                {accountType === 'employer' && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className={errors.companyName ? 'text-red-500' : ''}>
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Company Inc."
                      value={formData.companyName}
                      onChange={handleChange}
                      className={errors.companyName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs">{errors.companyName}</p>
                    )}
                  </div>
                )}
                
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="agreeTerms" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => {
                      setFormData({...formData, agreeTerms: checked === true});
                      if (errors.agreeTerms) {
                        setErrors({...errors, agreeTerms: ''});
                      }
                    }}
                    className={errors.agreeTerms ? 'border-red-500 text-red-500' : ''}
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="agreeTerms"
                      className={`text-sm font-normal ${errors.agreeTerms ? 'text-red-500' : ''}`}
                    >
                      I agree to the <Link to="/terms" className="text-job-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-job-primary hover:underline">Privacy Policy</Link>
                    </Label>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-job-primary hover:bg-blue-700 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-job-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
