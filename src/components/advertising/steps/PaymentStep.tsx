import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, Check } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdTier } from '../../../types/ad';

const paymentSchema = z.object({
  // Account Details
  email: z.string().email('Valid email is required'),
  confirmEmail: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Valid phone number is required'),
  confirmPhone: z.string(),

  // Payment Details (only if total > 0)
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),

  // Terms
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.phone === data.confirmPhone, {
  message: "Phone numbers don't match",
  path: ["confirmPhone"],
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentStepProps {
  selectedPackage: {
    tier: AdTier;
    duration: number;
    price: number;
  };
  bookingEnabled: boolean;
  promoCode?: string;
  onSubmit: (data: PaymentFormData) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedPackage,
  bookingEnabled,
  promoCode,
  onSubmit,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const calculateTotal = () => {
    let total = selectedPackage?.price || 0;
    if (bookingEnabled) {
      total += 45; // Booking feature cost
    }
    if (promoCode?.toUpperCase() === 'DIXLAUNCH') {
      total = 0;
    }
    return total;
  };

  const total = calculateTotal();

  const handleFormSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    try {
      // Mock payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(data);
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <CreditCard className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Complete Your Order</h2>
        <p className="text-white/60 mt-2">Create your account and process payment</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Account Information */}
        <div className="glass-effect rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          
          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Email</label>
              <input
                type="email"
                {...register('confirmEmail')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Confirm your email"
              />
              {errors.confirmEmail && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmEmail.message}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Phone Number</label>
              <input
                type="tel"
                {...register('confirmPhone')}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                placeholder="Confirm your phone number"
              />
              {errors.confirmPhone && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Information - Only show if total is greater than 0 */}
        {total > 0 && (
          <div className="glass-effect rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-medium mb-4">Payment Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  {...register('cardNumber')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    {...register('expiryDate')}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    {...register('cvv')}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{selectedPackage.tier} Package ({selectedPackage.duration} days)</span>
              <span>£{selectedPackage.price.toFixed(2)}</span>
            </div>

            {bookingEnabled && (
              <div className="flex justify-between text-primary-lighter">
                <span>Booking Feature</span>
                <span>£45.00</span>
              </div>
            )}

            {promoCode && (
              <div className="flex justify-between text-green-400">
                <span>Promo Code: {promoCode}</span>
                <span>-£{(selectedPackage.price + (bookingEnabled ? 45 : 0)).toFixed(2)}</span>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('termsAccepted')}
              className="mt-1 form-checkbox text-primary-lighter rounded focus:ring-primary-lighter"
            />
            <span className="text-sm text-white/60">
              I agree to the Terms and Conditions and Privacy Policy
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-sm text-red-400">{errors.termsAccepted.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="button-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">
                <CreditCard className="w-5 h-5" />
              </span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>{total > 0 ? 'Complete Payment' : 'Create Account'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};