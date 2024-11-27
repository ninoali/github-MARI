import React from 'react';
import { Star } from 'lucide-react';
import { ServiceCategory, Service } from '../../../types/ad';
import { ServiceItem } from './ServiceItem';

interface ServiceGridProps {
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
}

const services: Service[] = [
  { id: 'sexcam', name: 'Sexcam', category: 'VIRTUAL' },
  { id: '69', name: '69', category: 'STANDARD' },
  { id: 'adult-baby', name: 'Adult Baby/Mindi', category: 'FETISH' },
  { id: 'anal', name: 'Anal', category: 'STANDARD' },
  { id: 'bdsm', name: 'BDSM', category: 'FETISH' },
  { id: 'bisexual', name: 'Bisexual', category: 'ORIENTATION' },
  { id: 'blowjob', name: 'Blowjob', category: 'STANDARD' },
  { id: 'bukkake', name: 'Bukkake', category: 'FETISH' },
  { id: 'car-meets', name: 'Car Meets', category: 'LOCATION' },
  { id: 'cif', name: 'CIF', category: 'STANDARD' },
  { id: 'cob', name: 'COB', category: 'STANDARD' },
  { id: 'couples', name: 'Couples', category: 'PARTY' },
  { id: 'cross-dressing', name: 'Cross Dressing', category: 'FETISH' },
  { id: 'cum-in-mouth', name: 'Cum in Mouth', category: 'STANDARD' },
  { id: 'deep-throat', name: 'Deep Throat', category: 'STANDARD' },
  { id: 'disabled-clients', name: 'Disabled Clients', category: 'SPECIAL' },
  { id: 'dogging', name: 'Dogging', category: 'LOCATION' },
  { id: 'domination', name: 'Domination', category: 'FETISH' },
  { id: 'dp', name: 'DP', category: 'STANDARD' },
  { id: 'duo', name: 'DUO', category: 'PARTY' },
  { id: 'enema', name: 'Enema', category: 'FETISH' },
  { id: 'erotic-massage', name: 'Erotic massage', category: 'MASSAGE' },
  { id: 'exhibitionism', name: 'Exhibitionism', category: 'FETISH' },
  { id: 'face-sitting', name: 'Face Sitting', category: 'FETISH' },
  { id: 'fetish', name: 'Fetish', category: 'FETISH' },
  { id: 'filming', name: 'Filming', category: 'MEDIA' },
  { id: 'fisting', name: 'Fisting', category: 'FETISH' },
  { id: 'french-kiss', name: 'French Kiss', category: 'STANDARD' },
  { id: 'gang-bangs', name: 'Gang Bangs', category: 'PARTY' },
  { id: 'gfe', name: 'GFE', category: 'EXPERIENCE' },
  { id: 'hardcore-sex', name: 'Hardcore sex', category: 'STANDARD' },
  { id: 'hdj', name: 'HDJ', category: 'MASSAGE' },
  { id: 'kissing', name: 'Kissing', category: 'STANDARD' },
  { id: 'lapdance', name: 'Lapdance', category: 'DANCE' },
  { id: 'massage', name: 'Massage', category: 'MASSAGE' },
  { id: 'naturism', name: 'Naturism/Nudism', category: 'LIFESTYLE' },
  { id: 'owo', name: 'OWO', category: 'STANDARD' },
  { id: 'party-girl', name: 'Party Girl', category: 'PARTY' },
  { id: 'period-play', name: 'Period Play', category: 'FETISH' },
  { id: 'pregnant', name: 'Pregnant', category: 'FETISH' },
  { id: 'pse', name: 'PSE', category: 'EXPERIENCE' },
  { id: 'quickie', name: 'Quickie', category: 'DURATION' },
  { id: 'receiving-oral', name: 'Receiving Oral', category: 'STANDARD' },
  { id: 'rimming', name: 'Rimming', category: 'STANDARD' },
  { id: 'role-playing', name: 'Role-playing', category: 'FETISH' },
  { id: 'snowballing', name: 'Snowballing', category: 'FETISH' },
  { id: 'spanking', name: 'Spanking', category: 'FETISH' },
  { id: 'sploshing', name: 'Sploshing', category: 'FETISH' },
  { id: 'squirting', name: 'Squirting', category: 'FETISH' },
  { id: 'strap-on', name: 'Strap On', category: 'FETISH' },
  { id: 'striptease', name: 'Striptease', category: 'DANCE' },
  { id: 'submission', name: 'Submission', category: 'FETISH' },
  { id: 'swallow', name: 'Swallow', category: 'STANDARD' },
  { id: 'swinging', name: 'Swinging', category: 'PARTY' },
  { id: 'threesomes', name: 'Threesomes', category: 'PARTY' },
  { id: 'tie-and-tease', name: 'Tie and Tease', category: 'FETISH' },
  { id: 'toys', name: 'Toys', category: 'EQUIPMENT' },
  { id: 'travel', name: 'Travel/Extended', category: 'TRAVEL' },
  { id: 'uniforms', name: 'Uniforms', category: 'ROLEPLAY' },
  { id: 'watersports', name: 'Watersports', category: 'FETISH' },
];

const categories: ServiceCategory[] = [
  { id: 'standard', name: 'Standard Services' },
  { id: 'fetish', name: 'Fetish & BDSM' },
  { id: 'party', name: 'Party & Groups' },
  { id: 'massage', name: 'Massage Services' },
  { id: 'experience', name: 'Experiences' },
  { id: 'extras', name: 'Additional Services' },
];

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  selectedServices,
  onServiceToggle,
}) => {
  const getServicesByCategory = (category: string) => {
    return services.filter(service => service.category === category);
  };

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            {category.name}
            <Star className="w-4 h-4 text-primary-lighter" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {getServicesByCategory(category.id).map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                isSelected={selectedServices.includes(service.id)}
                onToggle={() => onServiceToggle(service.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};