export interface Question {
  id: number;
  question: string;
  options: string[];
  followUpQuestions?: {
    [key: string]: Question;
  };
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface MusicProfile {
  genre: string;
  mood: string;
  tempo: string;
  era: string;
}