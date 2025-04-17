import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email format is invalid');
      return false;
    }
    setError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const { error } = await resetPassword(email);

        if (error) {
          toast({
            title: "Reset failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setIsSubmitted(true);
          toast({
            title: "Reset link sent",
            description: "Check your email for the password reset link",
          });
        }
      } catch (error) {
        toast({
          title: "Reset failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="text-2xl font-bold mt-4">Reset Your Password</h1>
          <p className="text-gray-600 mt-1">We'll email you a link to reset your password</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {isSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Didn't receive the email? Check your spam folder or request another reset link.
                </p>
                <div className="flex flex-col space-y-3">
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-job-primary hover:bg-blue-700"
                  >
                    Resend Reset Link
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link to="/login">
                      Return to Login
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className={error ? 'text-red-500' : ''}>
                    Email Address
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
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-job-primary hover:bg-blue-700 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="justify-center pt-4">
            <Link to="/login" className="flex items-center text-job-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
