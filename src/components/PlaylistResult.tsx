import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw } from 'lucide-react';

interface PlaylistResultProps {
  answers: string[];
  onRestart: () => void;
}

const PlaylistResult: React.FC<PlaylistResultProps> = ({ answers, onRestart }) => {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  // Fonction pour obtenir l'URL de la playlist
  const getPlaylistUrl = () => {
    // Logique simplifiée pour démonstration
    if (answers[0] === 'rap') {
      return 'https://open.spotify.com/playlist/211vzYG60PkPrlADj0g3sR';
    } else if (answers[0] === 'electro') {
      return 'https://open.spotify.com/playlist/55BVUV8lSpwQj3m8tO6YD5';
    }
    return 'https://open.spotify.com/playlist/';
  };

  // Utiliser useEffect pour gérer l'URL de la playlist une fois les réponses données
  useEffect(() => {
    // Une fois que les réponses sont données, on obtient l'URL de la playlist
    setPlaylistUrl(getPlaylistUrl());
  }, [answers]);

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ma Playlist Personnalisée',
        text: '🎶 Voici ma playlist du moment, découvrez la vôtre !',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Voici ta playlist personnalisée ! 🎵
      </h2>

      <div className="mb-8">
        {playlistUrl && (
          <iframe
            src={playlistUrl}
            width="100%"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-xl"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={shareResults}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
        >
          <Share2 size={20} />
          Partager
        </button>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
        >
          <RefreshCw size={20} />
          Recommencer
        </button>
      </div>
    </div>
  );
}

export default PlaylistResult;
