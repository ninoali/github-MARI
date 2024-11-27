import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, Camera, Calendar, CreditCard, Lock } from 'lucide-react';
import { CreateAdForm } from '../../components/advertising/CreateAdForm';
import { StepNavigation, Step } from '../../components/advertising/navigation/StepNavigation';

export const CreateAd = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const steps: Step[] = [
    { number: 1, title: 'Location', icon: MapPin },
    { number: 2, title: 'Details', icon: FileText },
    { number: 3, title: 'Media', icon: Camera },
    { number: 4, title: 'Bookings', icon: Calendar },
    { number: 5, title: 'Package', icon: CreditCard },
    { number: 6, title: 'Payment', icon: Lock },
  ];

  const handleStepClick = (stepNumber: number) => {
    // Only allow navigating to completed steps or the next available step
    if (stepNumber <= step) {
      setStep(stepNumber);
    }
  };

  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, steps.length));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="text-center pt-12 pb-6">
        <h1 className="text-3xl font-light tracking-wider mb-6 bg-gradient-to-r from-primary-lighter via-primary-light to-primary-lighter bg-clip-text text-transparent">
          Create Your Advertisement
        </h1>
        <p className="text-sm text-primary-lighter font-light tracking-wider opacity-80 select-none">
          First month free • Use code "DIXLAUNCH"
        </p>
      </div>

      {/* Navigation */}
      <StepNavigation 
        steps={steps}
        currentStep={step}
        onStepClick={handleStepClick}
      />

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-xl p-8 border border-white/10">
          <CreateAdForm 
            currentStep={step} 
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            onComplete={() => navigate('/advertising/manage')}
          />
        </div>
      </div>
    </div>
  );
};