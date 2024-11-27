import React, { useState } from 'react';
import { Camera, Shield, AlertCircle, Upload, X, Loader2, ImagePlus } from 'lucide-react';
import { AdImage } from '../../types/ad';

interface VerificationUploadProps {
  verificationImages: AdImage[];
  onUpload: (image: AdImage) => void;
  onRemove: (imageId: string) => void;
}

export const VerificationUpload: React.FC<VerificationUploadProps> = ({
  verificationImages,
  onUpload,
  onRemove,
}) => {
  const [activeUpload, setActiveUpload] = useState<'id' | 'selfie' | 'note' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verificationSteps = [
    {
      id: 'id' as const,
      title: 'ID Document',
      description: 'A clear photo of your ID document (passport or driving license)',
      icon: Shield,
    },
    {
      id: 'selfie' as const,
      title: 'ID Selfie',
      description: 'A selfie of you holding your ID document',
      icon: Camera,
    },
    {
      id: 'note' as const,
      title: 'Verification Note',
      description: 'A photo of yourself holding a handwritten note showing your name, "dix", and today\'s date',
      icon: AlertCircle,
    },
  ];

  const getImageByType = (type: string) => {
    return verificationImages.find(img => img.id.includes(type));
  };

  const handleFileChange = async (type: 'id' | 'selfie' | 'note', file: File) => {
    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG or PNG image');
      return;
    }

    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setIsProcessing(true);
    setActiveUpload(type);
    setError(null);

    try {
      // Create a local preview URL
      const url = URL.createObjectURL(file);
      
      // Create image object
      const newImage: AdImage = {
        id: `verification-${type}-${Date.now()}`,
        url,
        isPrimary: false,
        type: 'VERIFICATION',
        status: 'PENDING'
      };

      onUpload(newImage);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
      setActiveUpload(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {verificationSteps.map((step) => {
        const image = getImageByType(step.id);
        const StepIcon = step.icon;

        return (
          <div
            key={step.id}
            className={`glass-effect rounded-xl p-6 transition-all duration-300 transform hover:scale-[1.01]
              ${activeUpload === step.id ? 'ring-2 ring-primary-lighter' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary-lighter/20">
                <StepIcon className="w-5 h-5 text-primary-lighter" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium mb-1">{step.title}</h4>
                <p className="text-sm text-white/60 mb-4">{step.description}</p>

                {image ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
                    <img
                      src={image.url}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          if (image.url.startsWith('blob:')) {
                            URL.revokeObjectURL(image.url);
                          }
                          onRemove(image.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                        disabled={isProcessing}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {image.status === 'PENDING' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-white text-xs py-1 px-2 text-center">
                        Pending Review
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="block w-32">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileChange(step.id, file);
                        }
                      }}
                      className="hidden"
                      disabled={isProcessing}
                    />
                    <div className="h-32 rounded-lg border-2 border-dashed border-white/20 hover:border-primary-lighter/50 cursor-pointer transition-colors flex items-center justify-center">
                      <div className="text-center">
                        {isProcessing && activeUpload === step.id ? (
                          <Loader2 className="w-6 h-6 mx-auto mb-2 text-primary-lighter animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6 mx-auto mb-2 text-white/60" />
                        )}
                        <span className="text-sm text-white/60">
                          {isProcessing && activeUpload === step.id ? 'Processing...' : 'Upload Photo'}
                        </span>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};