import React from 'react';
import { MapPin, FileText, Camera, Calendar, CreditCard, Lock } from 'lucide-react';

export interface Step {
  number: number;
  title: string;
  icon: typeof MapPin;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-dark-900 via-primary-dark to-dark-900 backdrop-blur-md border-b border-primary-light/10 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 h-px bg-white/10 top-6 -z-10" />
          <div 
            className="absolute left-0 h-px bg-gradient-to-r from-primary-lighter via-primary-light to-primary-lighter top-6 -z-10 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.number;
            const isCurrent = currentStep === step.number;

            return (
              <button
                key={step.number}
                onClick={() => onStepClick(step.number)}
                className="flex flex-col items-center group"
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                    transition-all duration-500 transform
                    ${isActive 
                      ? 'bg-primary-lighter text-white scale-110 shadow-lg shadow-primary-lighter/20' 
                      : 'glass-effect text-white/40'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span 
                  className={`text-xs tracking-wider font-light transition-all duration-300
                    ${isActive 
                      ? 'text-primary-lighter transform scale-105' 
                      : 'text-white/40'}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};