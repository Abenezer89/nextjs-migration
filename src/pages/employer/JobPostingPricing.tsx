
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  included: boolean;
  text: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  popular?: boolean;
  features: PlanFeature[];
}

const JobPostingPricing = () => {
  const { toast } = useToast();

  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "$29",
      description: "Perfect for small businesses posting occasional jobs.",
      buttonText: "Get Started",
      features: [
        { included: true, text: "1 job posting at a time" },
        { included: true, text: "30 days visibility" },
        { included: true, text: "Standard search ranking" },
        { included: false, text: "Featured job placement" },
        { included: false, text: "Premium candidate matching" },
        { included: false, text: "Candidate screening tools" },
        { included: false, text: "Applicant analytics" },
      ]
    },
    {
      name: "Professional",
      price: "$99",
      description: "Ideal for growing companies with regular hiring needs.",
      buttonText: "Best Value",
      popular: true,
      features: [
        { included: true, text: "5 active job postings" },
        { included: true, text: "60 days visibility" },
        { included: true, text: "Enhanced search ranking" },
        { included: true, text: "Featured job placement" },
        { included: true, text: "Premium candidate matching" },
        { included: false, text: "Candidate screening tools" },
        { included: false, text: "Applicant analytics" },
      ]
    },
    {
      name: "Enterprise",
      price: "$249",
      description: "Complete solution for companies with extensive hiring needs.",
      buttonText: "Contact Sales",
      features: [
        { included: true, text: "Unlimited job postings" },
        { included: true, text: "90 days visibility" },
        { included: true, text: "Priority search ranking" },
        { included: true, text: "Featured job placement" },
        { included: true, text: "Premium candidate matching" },
        { included: true, text: "Advanced screening tools" },
        { included: true, text: "Comprehensive analytics" },
      ]
    }
  ];

  const handlePlanSelection = (planName: string) => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan. Redirecting to checkout...`
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Job Posting Plans</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the right plan to find your ideal candidates quickly and efficiently.
          All plans include access to our pool of qualified job seekers.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`mr-2 mt-1 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`}>
                      {feature.included ? (
                        <Check size={18} className="stroke-2" />
                      ) : (
                        <span className="block w-[18px] h-[18px] opacity-40">-</span>
                      )}
                    </div>
                    <span className={feature.included ? '' : 'text-muted-foreground opacity-75'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handlePlanSelection(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Need a custom solution?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          If you have specific requirements or are hiring at scale, our team can create
          a tailored solution that meets your exact needs.
        </p>
        <Button size="lg">
          Contact Our Sales Team
        </Button>
      </div>
    </div>
  );
};

export default JobPostingPricing;
