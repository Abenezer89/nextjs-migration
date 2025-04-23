import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  onStepClick 
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const canClick = stepNumber < currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <button
              type="button"
              onClick={() => canClick && onStepClick?.(stepNumber)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                isCompleted
                  ? 'bg-job-primary text-white hover:bg-job-primary/90 cursor-pointer'
                  : isCurrent
                  ? 'bg-job-primary/20 text-job-primary border-2 border-job-primary'
                  : 'bg-gray-200 text-gray-400'
              } ${canClick ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={!canClick}
              aria-label={`Go to step ${stepNumber}`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                stepNumber
              )}
            </button>
            {stepNumber < totalSteps && (
              <div
                className={`w-12 h-1 ${
                  isCompleted ? 'bg-job-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator; 