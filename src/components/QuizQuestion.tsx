import React from 'react';
import { Music, Headphones } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string;
  description: string;
  icon: 'music' | 'headphones';
}

interface Question {
  text: string;
  options: Option[];
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
  isLoading?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
  isLoading = false,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl transform transition-all duration-500">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">
            Question {currentQuestion}/{totalQuestions}
          </span>
          <div className="h-2 flex-1 mx-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">{question.text}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isLoading && onAnswer(option.value)}
            disabled={isLoading}
            className={clsx(
              "group relative bg-white/5 hover:bg-white/10 rounded-xl p-6 text-left transition-all duration-300",
              "hover:transform hover:scale-105 hover:shadow-2xl",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg transform transition-all duration-300 group-hover:scale-110">
                {option.icon === 'music' ? <Music size={24} /> : <Headphones size={24} />}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white transition-colors duration-300 group-hover:text-purple-300">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion