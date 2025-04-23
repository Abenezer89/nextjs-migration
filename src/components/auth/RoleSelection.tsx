import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { roleCardVariants } from './animations';

interface RoleSelectionProps {
  onSelect: (role: 'jobseeker' | 'employer') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Your Role</h2>
        <p className="text-gray-600 mt-2">Select how you want to use our platform</p>
      </div>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="radiogroup"
        aria-label="Select your role"
      >
        <motion.div
          variants={roleCardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-job-primary"
            onClick={() => onSelect('jobseeker')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelect('jobseeker');
              }
            }}
            tabIndex={0}
            role="radio"
            aria-checked="false"
            aria-label="Job Seeker"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <User className="h-12 w-12 text-job-primary mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Job Seeker</h3>
              <p className="text-gray-600">
                Find your dream job, apply to positions, and manage your applications
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={roleCardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-job-primary"
            onClick={() => onSelect('employer')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelect('employer');
              }
            }}
            tabIndex={0}
            role="radio"
            aria-checked="false"
            aria-label="Employer"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Briefcase className="h-12 w-12 text-job-primary mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Employer</h3>
              <p className="text-gray-600">
                Post jobs, manage applications, and find the perfect candidates
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection; 