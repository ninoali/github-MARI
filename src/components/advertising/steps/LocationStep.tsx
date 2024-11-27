import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, ChevronDown } from 'lucide-react';
import { cityAreaGroups } from '../../../lib/data/cityAreaGroups';
import { cityAreas } from '../../../lib/data/cityAreas';
import { extractPostcode } from '../../../lib/utils/sorting';

const locationSchema = z.object({
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  area: z.string().min(1, 'Area is required'),
  postcode: z.string().optional(),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface LocationStepProps {
  onSubmit: (data: { location: LocationFormData }) => void;
  defaultValues?: Partial<LocationFormData>;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues,
  });

  const selectedCity = watch('city');
  const selectedArea = watch('area');

  const handleFormSubmit = (data: LocationFormData) => {
    // If no postcode is provided, extract it from the area
    if (!data.postcode && data.area) {
      const postcode = extractPostcode(data.area);
      data.postcode = postcode;
    }
    onSubmit({ location: data });
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setValue('region', region);
    setValue('area', ''); // Reset area when region changes
    setExpandedRegion(region === expandedRegion ? null : region);
  };

  const handleAreaSelect = (area: string) => {
    setValue('area', area);
    // Auto-fill postcode field with the postcode from the area
    const postcode = extractPostcode(area);
    setValue('postcode', postcode);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4 transform hover:scale-110 transition-all duration-300">
          <MapPin className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Select Your Location</h2>
        <p className="text-white/60 mt-2">Choose where you want to advertise</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="glass-effect rounded-xl p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300">
          {/* City Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <select
              {...register('city')}
              onChange={(e) => {
                setValue('city', e.target.value);
                setValue('region', '');
                setValue('area', '');
                setValue('postcode', '');
                setSelectedRegion('');
                setExpandedRegion(null);
              }}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white [&>option]:bg-dark-900 [&>option]:text-white"
            >
              <option value="">Select a city</option>
              {Object.keys(cityAreas).sort().map(city => (
                <option key={city} value={city} className="text-white">
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
            )}
          </div>

          {/* Region and Area Selection */}
          {selectedCity && cityAreaGroups[selectedCity] && (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Region & Area</label>
              <div className="space-y-2">
                {cityAreaGroups[selectedCity].map((group) => (
                  <div key={group.label} className="rounded-lg overflow-hidden">
                    {/* Region Header */}
                    <button
                      type="button"
                      onClick={() => handleRegionSelect(group.label)}
                      className={`w-full px-4 py-3 flex items-center justify-between transition-all duration-300
                        ${selectedRegion === group.label
                          ? 'bg-primary-lighter text-white'
                          : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      <span className="font-medium">{group.label}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300
                          ${expandedRegion === group.label ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Areas List */}
                    <div
                      className={`overflow-hidden transition-all duration-300
                        ${expandedRegion === group.label
                          ? 'max-h-[500px] opacity-100'
                          : 'max-h-0 opacity-0'}`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-white/5">
                        {group.areas.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => handleAreaSelect(area)}
                            className={`px-4 py-2 rounded-lg text-left text-sm transition-all duration-300
                              ${selectedArea === area
                                ? 'bg-primary-lighter/20 text-primary-lighter'
                                : 'hover:bg-white/10'}`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {(errors.region || errors.area) && (
                <p className="mt-1 text-sm text-red-400">
                  Please select both a region and an area
                </p>
              )}
            </div>
          )}

          {/* Postcode (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Postcode (Optional)
            </label>
            <input
              type="text"
              {...register('postcode')}
              placeholder="e.g., SW1A 1AA"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
            />
          </div>
        </div>
      </form>
    </div>
  );
};