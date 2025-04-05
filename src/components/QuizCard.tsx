import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Loader2 } from 'lucide-react';

interface QuizCardProps {
  question: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      previewUrl?: string;
    }[];
    previewUrl?: string;
  };
  onAnswer: (answerId: string) => void;
  isLoading: boolean;
  currentIndex: number;
  totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  isLoading,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">{question.text}</h2>
            <span className="text-gray-400">
              {currentIndex + 1}/{totalQuestions}
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {question.previewUrl && (
          <div className="mb-8">
            <iframe
              src={question.previewUrl}
              className="w-full rounded-xl h-[80px] border border-white/10"
              allow="encrypted-media"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}

        <div className="grid gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          ) : (
            question.options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 flex items-center gap-4">
                  {option.previewUrl ? (
                    <iframe
                      src={option.previewUrl}
                      className="w-16 h-16 rounded-xl border border-white/10"
                      allow="encrypted-media"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Music2 className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <span className="text-xl font-semibold text-white">{option.text}</span>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizCard;
