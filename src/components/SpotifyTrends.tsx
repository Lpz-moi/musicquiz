import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Music2, X } from 'lucide-react';
import { getTopTracks } from '../lib/spotify';
import LoadingSpinner from './LoadingSpinner';  // Correction ici pour l'importation par défaut
import type { SpotifyTrack } from '../types'; // Assurez-vous que le type est bien exporté

interface SpotifyTrendsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotifyTrends: React.FC<SpotifyTrendsProps> = ({ isOpen, onClose }) => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadTracks();
    }
  }, [isOpen]);

  const loadTracks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const topTracks = await getTopTracks();
      setTracks(topTracks);
    } catch (err) {
      setError('Erreur lors du chargement des tendances Spotify');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-bold text-white flex items-center gap-2">
                <Music2 className="text-purple-400" />
                Tendances Spotify
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-8">{error}</div>
            ) : (
              <div className="space-y-4">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.album.name}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{track.name}</h3>
                      <p className="text-sm text-gray-400">
                        {track.artists.map((artist: { name: string }) => artist.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
