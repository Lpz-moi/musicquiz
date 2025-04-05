import React from 'react';
import { Sun, Moon, Sunset, Coffee, Star } from 'lucide-react';

interface TimeOption {
  icon: React.ReactNode;
  label: string;
  description: string;
  gradient: string;
}

const times: TimeOption[] = [
  { 
    icon: <Coffee className="w-8 h-8" />, 
    label: 'morning', 
    description: 'Start your day right',
    gradient: 'from-orange-500 via-orange-400 to-yellow-300'
  },
  { 
    icon: <Sun className="w-8 h-8" />, 
    label: 'afternoon', 
    description: 'Keep the momentum going',
    gradient: 'from-yellow-500 via-yellow-400 to-orange-300'
  },
  { 
    icon: <Sunset className="w-8 h-8" />, 
    label: 'evening', 
    description: 'Wind down time',
    gradient: 'from-purple-500 via-purple-400 to-pink-300'
  },
  { 
    icon: <Moon className="w-8 h-8" />, 
    label: 'night', 
    description: 'Late night vibes',
    gradient: 'from-blue-500 via-blue-400 to-indigo-300'
  },
  { 
    icon: <Star className="w-8 h-8" />, 
    label: 'special', 
    description: 'Special occasion',
    gradient: 'from-pink-500 via-pink-400 to-purple-300'
  },
];

interface TimeSelectorProps {
  onSelect: (time: string) => void;
}

function TimeSelector({ onSelect }: TimeSelectorProps) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        What time is it?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {times.map((time) => (
          <button
            key={time.label}
            onClick={() => onSelect(time.label)}
            className="group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <div className={`relative flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/10`}>
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${time.gradient} mb-4 transform group-hover:scale-110 transition-transform duration-200`}>
                <div className="text-white">{time.icon}</div>
              </div>
              <span className="text-white font-medium capitalize mb-2">{time.label}</span>
              <span className="text-gray-400 text-sm text-center">{time.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSelector;