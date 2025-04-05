import React, { useState } from 'react';
import type { Question } from './MoodSelector';

interface QuestionnaireProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

function Questionnaire({ questions, onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            {currentQuestion.text}
          </h2>
          <span className="text-gray-400">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{option.label}</h3>
              {option.description && (
                <p className="text-gray-400">{option.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questionnaire;