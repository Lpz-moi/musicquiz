import React from 'react';
import { useAuthStore } from '../store/authStore';
import { User, LogOut, Music2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signIn, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Music2 className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">MusicProfile</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
                >
                  <User size={16} />
                  Connexion avec Discord
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}