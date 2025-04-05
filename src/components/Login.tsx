import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';
import { loginUrl } from '../utils/spotify';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#000000] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80')] opacity-5 bg-cover bg-center bg-no-repeat" />
      
      <div className="relative max-w-md w-full mx-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
              <Music className="relative w-16 h-16 text-purple-400" />
            </div>
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Music Quiz
          </h1>
          
          <p className="text-gray-400 mb-8">
            Test your music knowledge and get personalized playlist recommendations based on your taste!
          </p>

          <motion.a
            href={loginUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect with Spotify
          </motion.a>

          <p className="mt-6 text-sm text-gray-500">
            By continuing, you agree to share your Spotify data for personalized recommendations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;