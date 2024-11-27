{/* Previous imports remain the same */}

export const AdPackageCard: React.FC<AdPackageCardProps> = ({
  // ... other props
}) => {
  return (
    <div
      className={`w-full relative rounded-xl overflow-hidden transition-all duration-300
        ${isSelected 
          ? 'border-2 border-primary-lighter shadow-lg shadow-primary-lighter/20 scale-105'
          : 'border border-white/10 hover:border-primary-lighter/50'}`}
    >
      {/* Rest of the component remains the same */}
    </div>
  );
};