import React from 'react';
import { Clock, DollarSign } from 'lucide-react';

interface RatesSectionProps {
  rates: {
    thirtyMins: number;
    oneHour: number;
    twoHours?: number;
    threeHours?: number;
    outcall?: {
      oneHour?: number;
      overnight?: number;
    };
  };
  onChange: (rates: any) => void;
}

export const RatesSection: React.FC<RatesSectionProps> = ({
  rates,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-primary-lighter" />
        <h3 className="text-lg font-medium">Your Rates</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Incall Rates */}
        <div className="glass-effect rounded-xl p-6 space-y-4">
          <h4 className="text-sm font-medium text-primary-lighter">Incall</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">30 Minutes</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.thirtyMins || ''}
                  onChange={(e) => onChange({ ...rates, thirtyMins: parseInt(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">1 Hour</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.oneHour || ''}
                  onChange={(e) => onChange({ ...rates, oneHour: parseInt(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">2 Hours (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.twoHours || ''}
                  onChange={(e) => onChange({ ...rates, twoHours: parseInt(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">3 Hours (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.threeHours || ''}
                  onChange={(e) => onChange({ ...rates, threeHours: parseInt(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Outcall Rates */}
        <div className="glass-effect rounded-xl p-6 space-y-4">
          <h4 className="text-sm font-medium text-primary-lighter">Outcall (Optional)</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">1 Hour</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.outcall?.oneHour || ''}
                  onChange={(e) => onChange({
                    ...rates,
                    outcall: {
                      ...rates.outcall,
                      oneHour: parseInt(e.target.value)
                    }
                  })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Overnight</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">£</span>
                <input
                  type="number"
                  value={rates.outcall?.overnight || ''}
                  onChange={(e) => onChange({
                    ...rates,
                    outcall: {
                      ...rates.outcall,
                      overnight: parseInt(e.target.value)
                    }
                  })}
                  className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-white/60 italic">
        Note: Only booking deposits will be handled through our platform. All other payments are cash only.
      </p>
    </div>
  );
};