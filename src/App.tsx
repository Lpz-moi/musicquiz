import React, { useEffect, useState } from 'react';
import { Music, LogOut, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from './store/quizStore';
import QuizCard from './components/QuizCard';
import LoadingSpinner from './components/LoadingSpinner';
import ConfirmDialog from './components/ConfirmDialog';
import ShareResults from './components/ShareResults';
import Login from './components/Login';
import spotifyApi, { getTokenFromUrl } from './utils/spotify';
import TopSongs from './components/TopSongs';


function App() {
  const {
    token,
    setToken,
    setUser,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    addAnswer,
    resetQuiz,
    isLoading,
    setLoading,
    answers,
    logout,
    user,  // Assuming you set the user object in the store
  } = useQuizStore();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [playlistGenerated, setPlaylistGenerated] = useState(false);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [showTopSongs, setShowTopSongs] = useState(false); // New state for showing TopSongs component

  const questions = [
    {
      id: 'q1',
      text: 'What is your favorite genre?',
      options: [
        { id: 'rock', text: 'Rock' },
        { id: 'pop', text: 'Pop' },
        { id: 'jazz', text: 'Jazz' },
        { id: 'classical', text: 'Classical' },
      ],
    },
    {
      id: 'q2',
      text: 'Which instrument do you prefer?',
      options: [
        { id: 'guitar', text: 'Guitar' },
        { id: 'piano', text: 'Piano' },
        { id: 'drums', text: 'Drums' },
        { id: 'violin', text: 'Violin' },
      ],
    },
    // More questions can be added here
  ];

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotifyApi.setAccessToken(_token);

      spotifyApi.getMe().then(
        (user) => {
          setUser({
            ...user,
            display_name: user.display_name || 'Unknown User',
            images: user.images || [],
          });
        },
        (error) => {
          console.error('Error fetching user data from Spotify:', error);
          alert('Failed to fetch user data. Please try again later.');
        }
      );

      window.location.hash = '';  
    } else if (!token) {
      window.location.href = 'https://accounts.spotify.com/authorize?client_id=80e3d5e35cfd400ea990cf146faf1791&response_type=token&redirect_uri=http://localhost:5173/callback&scope=user-top-read';
    }
  }, [setToken, setUser, token]);

  const handleAnswer = async (answerId: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addAnswer({
        questionId: questions[currentQuestionIndex].id,
        answer: answerId,
        timestamp: Date.now(),
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Set a flag to show the TopSongs component after quiz completion
        setShowTopSongs(true);
        setPlaylistGenerated(true);
      }
    } catch (error) {
      console.error('Error processing answer:', error);
      alert('An error occurred while processing your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const handleReset = () => {
    resetQuiz();
    setPlaylistGenerated(false);
    setPlaylistId(null);
    setShowResetDialog(false);
  };

  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#000000]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80')] opacity-5 bg-cover bg-center bg-no-repeat" />
      <div className="relative container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
              <Music className="relative w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Music Quiz</h1>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {user?.images?.[0]?.url && (
              <img
                src={user.images[0].url}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
            )}
            <span className="text-white font-semibold">{user?.display_name}</span>

            <motion.button
              onClick={() => setShowResetDialog(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Reset Quiz"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setShowLogoutDialog(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <LoadingSpinner />
              </motion.div>
            ) : currentQuestionIndex < questions.length && !playlistGenerated ? (
              <QuizCard
                key={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                isLoading={isLoading}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
              />
            ) : showTopSongs ? (
              // Show TopSongs component if quiz is complete
              <TopSongs onBack={() => setShowTopSongs(false)} />
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Your Personalized Playlist</h2>
                <div className="mb-8">
                  <p className="text-gray-400 mb-4">
                    Based on your {answers.length} answers, we've created a custom playlist just for you!
                  </p>
                  {playlistId && (
                    <iframe
                      src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                      width="100%"
                      height="380"
                      frameBorder="0"
                      allow="encrypted-media"
                      className="rounded-xl border border-white/10"
                    />
                  )}
                </div>
                <ShareResults
                  results={{
                    score: answers.length,
                    totalQuestions: questions.length,
                    recommendations: ['Song 1', 'Song 2', 'Song 3'],
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout? Your progress will be saved."
      />

      <ConfirmDialog
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={handleReset}
        title="Reset Quiz"
        message="Are you sure you want to reset the quiz? All progress will be lost."
      />
    </div>
  );
}

export default App;
