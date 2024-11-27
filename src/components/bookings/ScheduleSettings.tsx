import React from 'react';
import { Clock } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate time slots for 24 hours
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    slots.push(`${hour}:00`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

interface ScheduleSettingsProps {
  schedule: Record<string, string[]>;
  onChange: (schedule: Record<string, string[]>) => void;
}

export const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({
  schedule,
  onChange
}) => {
  const toggleTimeSlot = (day: string, time: string) => {
    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[day]) {
      updatedSchedule[day] = [];
    }
    
    if (updatedSchedule[day].includes(time)) {
      updatedSchedule[day] = updatedSchedule[day].filter(t => t !== time);
    } else {
      updatedSchedule[day] = [...updatedSchedule[day], time].sort();
    }
    
    onChange(updatedSchedule);
  };

  const handleSelectAll = (day: string, select: boolean) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day] = select ? [...TIME_SLOTS] : [];
    onChange(updatedSchedule);
  };

  const isDayFullySelected = (day: string) => {
    return schedule[day]?.length === TIME_SLOTS.length;
  };

  const groupTimeSlots = (slots: string[]) => {
    const groups: { start: number; end: number; }[] = [];
    let currentGroup: { start: number; end: number; } | null = null;

    slots.forEach(slot => {
      const hour = parseInt(slot.split(':')[0]);
      
      if (!currentGroup) {
        currentGroup = { start: hour, end: hour };
      } else if (hour === currentGroup.end + 1) {
        currentGroup.end = hour;
      } else {
        groups.push({ ...currentGroup });
        currentGroup = { start: hour, end: hour };
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {DAYS.map(day => {
          const selectedSlots = schedule[day] || [];
          const timeGroups = groupTimeSlots(selectedSlots);

          return (
            <div key={day} className="space-y-3 p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-lighter" />
                  <span className="font-medium">{day}</span>
                </div>
                <button
                  onClick={() => handleSelectAll(day, !isDayFullySelected(day))}
                  className="text-sm text-primary-lighter hover:text-primary-light transition-colors"
                >
                  {isDayFullySelected(day) ? 'Clear All' : 'Select All'}
                </button>
              </div>

              {/* Time Groups Display */}
              <div className="flex flex-wrap gap-2 mb-2">
                {timeGroups.map((group, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full bg-primary-lighter/20 text-primary-lighter text-sm"
                  >
                    {`${group.start.toString().padStart(2, '0')}:00 - ${(group.end + 1).toString().padStart(2, '0')}:00`}
                  </div>
                ))}
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {TIME_SLOTS.map(time => (
                  <button
                    key={`${day}-${time}`}
                    onClick={() => toggleTimeSlot(day, time)}
                    className={`px-3 py-2 text-sm rounded-lg transition-all duration-300
                      ${selectedSlots.includes(time)
                        ? 'bg-primary-lighter text-white transform scale-105 shadow-lg shadow-primary-lighter/20'
                        : 'glass-effect hover:bg-primary-lighter/20'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};