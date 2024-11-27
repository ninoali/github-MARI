import React, { useState } from 'react';
import { Settings, Calendar, Clock, DollarSign } from 'lucide-react';
import { BookingSettings as IBookingSettings } from '../../types/booking';
import { ScheduleSettings } from './ScheduleSettings';

interface BookingSettingsProps {
  onSubmit: (settings: IBookingSettings) => void;
  defaultValues?: Partial<IBookingSettings>;
}

export const BookingSettings: React.FC<BookingSettingsProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [settings, setSettings] = useState<IBookingSettings>({
    enabled: false,
    instantBooking: false,
    deposit: {
      required: false,
      amount: {
        incall: 50,
        outcall: 100,
      },
    },
    schedule: [],
    location: {
      address: '',
      postcode: '',
      city: '',
      latitude: 0,
      longitude: 0,
      directions: [],
      verificationStatus: 'PENDING',
    },
    contactVerified: false,
    ...defaultValues,
  });

  const [schedule, setSchedule] = useState<Record<string, string[]>>({});

  const handleSubmit = () => {
    const scheduleArray = Object.entries(schedule).map(([day, slots]) => ({
      date: day,
      slots: slots.map(time => ({
        startTime: time,
        endTime: time,
        isAvailable: true,
      })),
    }));

    onSubmit({
      ...settings,
      schedule: scheduleArray,
    });
  };

  return (
    <div className="space-y-6">
      {/* Enable Bookings Toggle */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary-lighter/20">
              <Calendar className="w-6 h-6 text-primary-lighter" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Booking Feature</h3>
              <p className="text-sm text-white/60">Allow clients to book appointments</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                enabled: e.target.checked,
              }))}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-lighter after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
          </label>
        </div>
        <div className="mt-4 text-sm text-white/60">
          Additional cost: £45
        </div>
      </div>

      {settings.enabled && (
        <>
          {/* Schedule Settings */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-primary-lighter/20">
                <Clock className="w-6 h-6 text-primary-lighter" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Working Hours</h3>
                <p className="text-sm text-white/60">Set your availability for bookings</p>
              </div>
            </div>
            <ScheduleSettings
              schedule={schedule}
              onChange={setSchedule}
            />
          </div>

          {/* Deposit Settings */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-primary-lighter/20">
                <DollarSign className="w-6 h-6 text-primary-lighter" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Deposit Settings</h3>
                <p className="text-sm text-white/60">Set deposit requirements for bookings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span>Require Deposit</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.deposit.required}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      deposit: {
                        ...prev.deposit,
                        required: e.target.checked,
                      },
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-lighter after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              {settings.deposit.required && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      In-call Deposit (£)
                    </label>
                    <input
                      type="number"
                      value={settings.deposit.amount.incall}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        deposit: {
                          ...prev.deposit,
                          amount: {
                            ...prev.deposit.amount,
                            incall: Math.max(5, parseInt(e.target.value) || 0),
                          },
                        },
                      }))}
                      min={5}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                    />
                    <p className="mt-1 text-xs text-white/60">Minimum £5</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Out-call Deposit (£)
                    </label>
                    <input
                      type="number"
                      value={settings.deposit.amount.outcall}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        deposit: {
                          ...prev.deposit,
                          amount: {
                            ...prev.deposit.amount,
                            outcall: Math.max(50, parseInt(e.target.value) || 0),
                          },
                        },
                      }))}
                      min={50}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
                    />
                    <p className="mt-1 text-xs text-white/60">Minimum £50</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="button-primary w-full"
      >
        Continue
      </button>
    </div>
  );
};