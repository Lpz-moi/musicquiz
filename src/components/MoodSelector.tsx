import React from 'react';

interface MoodOption {
  emoji: string;
  label: string;
  description: string;
  gradient: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    description?: string;
  }[];
}

const moods: MoodOption[] = [
  { 
    emoji: '😔', 
    label: 'sad', 
    description: 'Need some comfort',
    gradient: 'from-blue-500 via-blue-400 to-blue-300',
    questions: [
      {
        id: 'comfort_type',
        text: 'What kind of comfort are you looking for?',
        options: [
          { label: 'Uplifting', value: 'uplifting', description: 'Songs to lift your spirits' },
          { label: 'Emotional', value: 'emotional', description: 'Songs to help process emotions' },
          { label: 'Calming', value: 'calming', description: 'Gentle, soothing melodies' }
        ]
      },
      {
        id: 'lyrics_preference',
        text: 'Do you prefer songs with meaningful lyrics or instrumental music?',
        options: [
          { label: 'Meaningful Lyrics', value: 'lyrics', description: 'Songs with deep, meaningful lyrics' },
          { label: 'Instrumental', value: 'instrumental', description: 'Pure musical expression' },
          { label: 'Both', value: 'both', description: 'A mix of both styles' }
        ]
      }
    ]
  },
  { 
    emoji: '😌', 
    label: 'relaxed', 
    description: 'Feeling peaceful',
    gradient: 'from-green-500 via-green-400 to-teal-300',
    questions: [
      {
        id: 'environment',
        text: 'Where are you relaxing?',
        options: [
          { label: 'Indoors', value: 'indoors', description: 'Cozy indoor vibes' },
          { label: 'Nature', value: 'nature', description: 'Outdoor peaceful settings' },
          { label: 'Travel', value: 'travel', description: 'On the move' }
        ]
      },
      {
        id: 'sound_preference',
        text: 'What kind of sounds help you relax?',
        options: [
          { label: 'Acoustic', value: 'acoustic', description: 'Natural instruments' },
          { label: 'Electronic', value: 'electronic', description: 'Synthetic ambient sounds' },
          { label: 'Nature Sounds', value: 'nature', description: 'Environmental sounds' }
        ]
      }
    ]
  },
  { 
    emoji: '😁', 
    label: 'happy', 
    description: 'In a great mood',
    gradient: 'from-yellow-500 via-yellow-400 to-orange-300',
    questions: [
      {
        id: 'energy_level',
        text: 'How energetic do you want the music to be?',
        options: [
          { label: 'High Energy', value: 'high', description: 'Upbeat and lively' },
          { label: 'Moderate', value: 'moderate', description: 'Balanced energy' },
          { label: 'Gentle', value: 'gentle', description: 'Soft and pleasant' }
        ]
      },
      {
        id: 'genre_preference',
        text: 'What genre matches your happy mood?',
        options: [
          { label: 'Pop', value: 'pop', description: 'Popular upbeat music' },
          { label: 'Dance', value: 'dance', description: 'Rhythmic dance tracks' },
          { label: 'Indie', value: 'indie', description: 'Alternative happy tunes' }
        ]
      }
    ]
  },
  { 
    emoji: '🧘‍♀️', 
    label: 'zen', 
    description: 'Seeking tranquility',
    gradient: 'from-purple-500 via-purple-400 to-indigo-300',
    questions: [
      {
        id: 'meditation_type',
        text: 'What type of meditation or focus are you looking for?',
        options: [
          { label: 'Deep Focus', value: 'focus', description: 'Concentration enhancement' },
          { label: 'Meditation', value: 'meditation', description: 'Mindfulness practice' },
          { label: 'Yoga', value: 'yoga', description: 'Movement and flow' }
        ]
      }
    ]
  },
  { 
    emoji: '🏋️‍♂️', 
    label: 'motivated', 
    description: 'Ready to conquer',
    gradient: 'from-red-500 via-red-400 to-orange-300',
    questions: [
      {
        id: 'activity_type',
        text: 'What are you getting motivated for?',
        options: [
          { label: 'Workout', value: 'workout', description: 'Physical exercise' },
          { label: 'Work', value: 'work', description: 'Professional tasks' },
          { label: 'Creative', value: 'creative', description: 'Creative projects' }
        ]
      },
      {
        id: 'intensity',
        text: 'What intensity level do you prefer?',
        options: [
          { label: 'Intense', value: 'intense', description: 'Maximum motivation' },
          { label: 'Moderate', value: 'moderate', description: 'Steady drive' },
          { label: 'Building', value: 'building', description: 'Gradually increasing' }
        ]
      }
    ]
  },
  { 
    emoji: '😴', 
    label: 'tired', 
    description: 'Need some energy',
    gradient: 'from-indigo-500 via-indigo-400 to-blue-300',
    questions: [
      {
        id: 'energy_boost',
        text: 'How would you like to boost your energy?',
        options: [
          { label: 'Gentle Wake', value: 'gentle', description: 'Soft energy boost' },
          { label: 'Progressive', value: 'progressive', description: 'Gradually energizing' },
          { label: 'Quick Boost', value: 'quick', description: 'Immediate energy' }
        ]
      }
    ]
  },
  { 
    emoji: '🎉', 
    label: 'party', 
    description: 'Time to celebrate',
    gradient: 'from-pink-500 via-pink-400 to-purple-300',
    questions: [
      {
        id: 'party_type',
        text: 'What kind of party vibe are you going for?',
        options: [
          { label: 'Dance Party', value: 'dance', description: 'High energy dancing' },
          { label: 'Chill Gathering', value: 'chill', description: 'Relaxed social vibes' },
          { label: 'Celebration', value: 'celebration', description: 'Special occasion' }
        ]
      },
      {
        id: 'music_era',
        text: 'What era of music do you prefer?',
        options: [
          { label: 'Current Hits', value: 'current', description: 'Latest popular tracks' },
          { label: 'Classics', value: 'classics', description: 'Timeless favorites' },
          { label: 'Mixed', value: 'mixed', description: 'Variety of eras' }
        ]
      }
    ]
  },
];

interface MoodSelectorProps {
  onSelect: (mood: string, questions: Question[]) => void;
}

function MoodSelector({ onSelect }: MoodSelectorProps) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onSelect(mood.label, mood.questions)}
            className="group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <div className={`relative flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/10`}>
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${mood.gradient} mb-4 transform group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-4xl">{mood.emoji}</span>
              </div>
              <span className="text-white font-medium capitalize mb-2">{mood.label}</span>
              <span className="text-gray-400 text-sm text-center">{mood.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;