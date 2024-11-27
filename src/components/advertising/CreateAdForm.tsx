import React, { useState, useEffect } from 'react';
import { LocationStep } from './steps/LocationStep';
import { DetailsStep } from './steps/DetailsStep';
import { MediaStep } from './steps/MediaStep';
import { BookingStep } from './steps/BookingStep';
import { PackageStep } from './steps/PackageStep';
import { PaymentStep } from './steps/PaymentStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CreateAdFormProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onComplete: () => void;
}

export const CreateAdForm: React.FC<CreateAdFormProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    location: {},
    details: {},
    media: {
      images: [],
      verificationImages: [],
    },
    bookings: {
      settings: {
        enabled: false,
      },
      location: {},
    },
    package: {
      tier: '',
      duration: 0,
      price: 0,
      promoCode: '',
    },
    payment: {},
  });

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleStepSubmit = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    onNextStep();
  };

  const handleFinalSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      // Mock API call to create advertisement
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  const NavigationButtons = ({ canProceed = true, isLastStep = false }) => (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrevStep}
          className="button-secondary flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Step
        </button>
      )}
      {!isLastStep && (
        <button
          type="button"
          onClick={onNextStep}
          disabled={!canProceed}
          className="button-primary flex items-center gap-2 ml-auto"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <LocationStep 
              onSubmit={handleStepSubmit} 
              defaultValues={formData.location} 
            />
            <NavigationButtons />
          </>
        );
      case 2:
        return (
          <>
            <DetailsStep 
              onSubmit={handleStepSubmit} 
              defaultValues={formData.details} 
            />
            <NavigationButtons />
          </>
        );
      case 3:
        return (
          <>
            <MediaStep 
              onSubmit={handleStepSubmit} 
              defaultValues={formData.media}
            />
            <NavigationButtons 
              canProceed={formData.media.images.length > 0} 
            />
          </>
        );
      case 4:
        return (
          <>
            <BookingStep 
              onSubmit={handleStepSubmit} 
              defaultValues={formData.bookings} 
            />
            <NavigationButtons />
          </>
        );
      case 5:
        return (
          <>
            <PackageStep 
              onSubmit={handleStepSubmit} 
              defaultValues={formData.package}
            />
            <NavigationButtons />
          </>
        );
      case 6:
        return (
          <PaymentStep
            onSubmit={handleFinalSubmit}
            selectedPackage={{
              tier: formData.package.tier,
              duration: formData.package.duration,
              price: formData.package.price || 0, // Ensure price is never undefined
            }}
            bookingEnabled={formData.bookings?.settings?.enabled || false}
            promoCode={formData.package?.promoCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {renderStep()}
    </div>
  );
};