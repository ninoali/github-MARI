import React, { useState } from 'react';
import { CreditCard, Info } from 'lucide-react';
import { AdTier } from '../../../types/ad';

interface PackageFormData {
  tier: AdTier;
  duration: number;
  promoCode?: string;
}

interface PackageStepProps {
  onSubmit: (data: { package: PackageFormData }) => void;
  defaultValues?: PackageFormData;
}

const packages = [
  {
    tier: 'TOP' as AdTier,
    title: 'TOP Ad',
    subtitle: 'Maximum visibility',
    isPopular: true,
    durations: [
      { days: 7, price: 54.99 },
      { days: 15, price: 64.99 },
      { days: 30, price: 99.99 },
    ],
    features: [
      { text: '20X more calls', included: true },
      { text: 'Always in the top positions', included: true },
      { text: 'Unlimited manual boosts', included: true, new: true },
      { text: 'Highlighted background', included: true },
      { text: 'Top badge', included: true },
      { text: 'Unlimited change of city', included: true },
    ],
  },
  {
    tier: 'PRIME' as AdTier,
    title: 'Prime Ad',
    subtitle: '🔥 Popular',
    isPopular: false,
    durations: [
      { days: 7, price: 19.99 },
      { days: 15, price: 35.99 },
      { days: 30, price: 54.99 },
    ],
    features: [
      { text: '5X more calls', included: true },
      { text: 'Always in the top positions', included: true },
      { text: '6 Manual Boost included per day', included: true },
      { text: 'Highlighted background', included: true },
      { text: 'Top badge', included: false },
      { text: 'Unlimited change of city', included: false },
    ],
  },
  {
    tier: 'BASIC' as AdTier,
    title: 'Basic Ad',
    subtitle: 'Published in 24 hours',
    isPopular: false,
    durations: [
      { days: 7, price: 14.99 },
      { days: 15, price: 22.99 },
      { days: 30, price: 34.99 },
    ],
    features: [
      { text: 'Contacts in your area', included: true },
      { text: 'Always in the top positions', included: false },
      { text: '6 Manual Boost included per day', included: false },
      { text: 'Highlighted background', included: false },
      { text: 'Top badge', included: false },
      { text: 'Unlimited change of city', included: false },
    ],
  },
];

export const PackageStep: React.FC<PackageStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [selectedTier, setSelectedTier] = useState<AdTier | undefined>(
    defaultValues?.tier
  );
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(
    defaultValues?.duration
  );
  const [promoCode, setPromoCode] = useState<string>(
    defaultValues?.promoCode || ''
  );
  const [isPromoValid, setIsPromoValid] = useState(false);

  const handlePackageSelect = (tier: AdTier, duration: number) => {
    setSelectedTier(tier);
    setSelectedDuration(duration);
  };

  const handlePromoCodeApply = () => {
    const isValid = promoCode.toUpperCase() === 'DIXLAUNCH';
    setIsPromoValid(isValid);
  };

  const calculatePrice = (basePrice: number) => {
    if (isPromoValid) {
      return 0;
    }
    return basePrice;
  };

  const handleSubmit = () => {
    if (!selectedTier || !selectedDuration) return;

    onSubmit({
      package: {
        tier: selectedTier,
        duration: selectedDuration,
        promoCode: isPromoValid ? promoCode : undefined,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <CreditCard className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Choose Your Package</h2>
        <p className="text-white/60 mt-2">Select the perfect advertising package</p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
        {packages.map((pkg) => (
          <div key={pkg.tier} className="w-full max-w-sm">
            <div
              className={`relative rounded-xl overflow-hidden transition-all duration-300
                ${selectedTier === pkg.tier 
                  ? 'border-2 border-primary-lighter shadow-lg shadow-primary-lighter/20 scale-105'
                  : 'border border-white/10 hover:border-primary-lighter/50'}`}
            >
              {/* Package Header */}
              <div className="p-6 bg-gradient-to-b from-primary-dark to-dark-900">
                <h3 className="text-xl font-medium text-primary-lighter mb-1">
                  {pkg.title}
                </h3>
                <p className="text-sm text-white/60">{pkg.subtitle}</p>
              </div>

              {/* Duration Options */}
              <div className="p-6 space-y-4">
                {pkg.durations.map((duration) => (
                  <label
                    key={duration.days}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`duration-${pkg.tier}`}
                      checked={selectedTier === pkg.tier && selectedDuration === duration.days}
                      onChange={() => handlePackageSelect(pkg.tier, duration.days)}
                      className="form-radio text-primary-lighter focus:ring-primary-lighter"
                    />
                    <span className="flex-grow">
                      {duration.days} days
                    </span>
                    <span className="font-medium">
                      £{calculatePrice(duration.price)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Features */}
              <div className="p-6 bg-white/5">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center space-x-2 text-sm
                        ${feature.included ? 'text-white' : 'text-white/40'}`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                        ${feature.included ? 'bg-primary-lighter/20' : 'bg-white/10'}`}>
                        {feature.included ? '✓' : '×'}
                      </div>
                      <span className="flex-grow">{feature.text}</span>
                      {feature.new && (
                        <span className="px-2 py-0.5 text-xs bg-primary-lighter text-white rounded-full">
                          NEW
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="glass-effect rounded-xl p-6">
        <label className="block text-sm font-medium mb-2">
          Promo Code
          <span className="text-white/60 ml-2">(Optional)</span>
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors uppercase"
          />
          <button
            type="button"
            onClick={handlePromoCodeApply}
            className="button-secondary"
          >
            Apply
          </button>
        </div>
        {isPromoValid && (
          <p className="mt-2 text-sm text-green-400 flex items-center gap-2">
            <span>✓</span> First month free promotion applied!
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedTier || !selectedDuration}
        className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  );
};