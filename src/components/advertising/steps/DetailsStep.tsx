import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const nationalities = [
  // British Isles
  { value: 'british', label: 'British' },
  { value: 'irish', label: 'Irish' },
  { value: 'scottish', label: 'Scottish' },
  { value: 'welsh', label: 'Welsh' },
  
  // European
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'greek', label: 'Greek' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'polish', label: 'Polish' },
  { value: 'turkish', label: 'Turkish' },
  
  // Asian
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'vietnamese', label: 'Vietnamese' },
  { value: 'indian', label: 'Indian' },
  { value: 'pakistani', label: 'Pakistani' },
  { value: 'bangladeshi', label: 'Bangladeshi' },
  { value: 'sri_lankan', label: 'Sri Lankan' },
  
  // Middle Eastern
  { value: 'lebanese', label: 'Lebanese' },
  { value: 'persian', label: 'Persian' },
  
  // African
  { value: 'nigerian', label: 'Nigerian' },
  { value: 'ghanaian', label: 'Ghanaian' },
  { value: 'south_african', label: 'South African' },
  { value: 'moroccan', label: 'Moroccan' },
  { value: 'algerian', label: 'Algerian' },
  
  // South American
  { value: 'brazilian', label: 'Brazilian' },
  { value: 'argentinian', label: 'Argentinian' },
  
  // Caribbean
  { value: 'caribbean', label: 'Caribbean' },
].sort((a, b) => a.label.localeCompare(b.label));

const eyeColors = [
  { value: 'blue', label: 'Blue' },
  { value: 'brown', label: 'Brown' },
  { value: 'green', label: 'Green' },
  { value: 'hazel', label: 'Hazel' },
  { value: 'grey', label: 'Grey' },
  { value: 'black', label: 'Black' },
];

const hairColors = [
  { value: 'black', label: 'Black' },
  { value: 'brown', label: 'Brown' },
  { value: 'blonde', label: 'Blonde' },
  { value: 'red', label: 'Red' },
  { value: 'grey', label: 'Grey' },
  { value: 'white', label: 'White' },
];

const detailsSchema = z.object({
  workingName: z.string().min(2, 'Working name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').max(99, 'Invalid age'),
  nationality: z.string().min(1, 'Nationality is required'),
  eyes: z.string().min(1, 'Eye color is required'),
  hair: z.string().min(1, 'Hair color is required'),
});

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsStepProps {
  onSubmit: (data: { details: DetailsFormData }) => void;
  defaultValues?: DetailsFormData;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: DetailsFormData) => {
    onSubmit({ details: data });
  };

  const baseSelectStyles = "w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white [&>option]:bg-dark-900 [&>option]:text-white";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-light">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Working Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Working Name</label>
            <input
              {...register('workingName')}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white"
              placeholder="Your working name"
            />
            {errors.workingName && (
              <p className="mt-1 text-sm text-red-400">{errors.workingName.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white"
              placeholder="Your age"
              min={18}
              max={99}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-medium mb-2">Nationality</label>
            <select
              {...register('nationality')}
              className={baseSelectStyles}
            >
              <option value="">Select nationality</option>
              {nationalities.map(({ value, label }) => (
                <option key={value} value={value} className="text-white">
                  {label}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-400">{errors.nationality.message}</p>
            )}
          </div>

          {/* Eye Color */}
          <div>
            <label className="block text-sm font-medium mb-2">Eye Color</label>
            <select
              {...register('eyes')}
              className={baseSelectStyles}
            >
              <option value="">Select eye color</option>
              {eyeColors.map(({ value, label }) => (
                <option key={value} value={value} className="text-white">
                  {label}
                </option>
              ))}
            </select>
            {errors.eyes && (
              <p className="mt-1 text-sm text-red-400">{errors.eyes.message}</p>
            )}
          </div>

          {/* Hair Color */}
          <div>
            <label className="block text-sm font-medium mb-2">Hair Color</label>
            <select
              {...register('hair')}
              className={baseSelectStyles}
            >
              <option value="">Select hair color</option>
              {hairColors.map(({ value, label }) => (
                <option key={value} value={value} className="text-white">
                  {label}
                </option>
              ))}
            </select>
            {errors.hair && (
              <p className="mt-1 text-sm text-red-400">{errors.hair.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};