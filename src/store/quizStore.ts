import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import spotifyApi from '../utils/spotify';

interface Answer {
  questionId: string;
  answer: string;
  timestamp: number;
}

interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
}

interface QuizState {
  token: string | null;
  user: SpotifyUser | null;
  currentQuestionIndex: number;
  answers: Answer[];
  isAuthenticated: boolean;
  isLoading: boolean;
  progress: number;
  setToken: (token: string) => void;
  setUser: (user: SpotifyUser) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: Answer) => void;
  resetQuiz: () => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setProgress: (value: number) => void;
  logout: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      currentQuestionIndex: 0,
      answers: [],
      isAuthenticated: false,
      isLoading: false,
      progress: 0,
      setToken: (token) => {
        spotifyApi.setAccessToken(token);
        set({ token, isAuthenticated: true });
      },
      setUser: (user) => set({ user }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
      resetQuiz: () => set({ currentQuestionIndex: 0, answers: [], progress: 0 }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setLoading: (value) => set({ isLoading: value }),
      setProgress: (value) => set({ progress: value }),
      logout: () => {
        spotifyApi.setAccessToken('');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          currentQuestionIndex: 0,
          answers: [],
          progress: 0,
        });
        window.localStorage.clear();
      },
    }),
    {
      name: 'quiz-storage',
    }
  )
);