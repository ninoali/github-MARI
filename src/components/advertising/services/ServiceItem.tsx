import React from 'react';
import { Check } from 'lucide-react';
import { Service } from '../../../types/ad';

interface ServiceItemProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  isSelected,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`relative p-3 rounded-lg text-left transition-all duration-300 group
        ${isSelected 
          ? 'bg-primary-lighter text-white transform scale-105 shadow-lg shadow-primary-lighter/20' 
          : 'glass-effect hover:bg-white/10'}`}
    >
      <span className="text-sm font-light">{service.name}</span>
      <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center
        ${isSelected ? 'bg-white' : 'bg-white/10'}`}>
        <Check className={`w-3 h-3 transform transition-all duration-300
          ${isSelected ? 'text-primary-lighter scale-100' : 'scale-0'}`} />
      </div>
    </button>
  );
};