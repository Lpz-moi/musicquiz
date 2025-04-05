import React, { useState } from 'react';
import { Disc3, Loader2 } from 'lucide-react';
import SpotifyWebApi from 'spotify-web-api-js';

// Initialize the Spotify API client
const spotifyApi = new SpotifyWebApi();

interface PlaylistViewProps {
  mood: string;
  time: string;
  preferences: Record<string, string>;
}

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
}

function PlaylistView({ mood, time, preferences }: PlaylistViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchTracks = async () => {
    try {
      setIsLoading(true);
      // Récupérer les morceaux via l'API Spotify
      const response = await spotifyApi.getMyTopTracks();
      
      // Transformer les morceaux pour correspondre à l'interface Track
      const transformedTracks = response.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '), // Extraction des artistes
        albumArt: track.album.images[0]?.url || '', // Utilisation de la première image de l'album
      }));
      
      setTracks(transformedTracks); // Mise à jour de l'état avec les morceaux transformés
    } catch (error) {
      console.error('Error fetching tracks', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpotifyConnect = () => {
    const clientId = '80e3d5e35cfd400ea990cf146faf1791';
    const redirectUri = encodeURIComponent('https://musicquiz-seven.vercel.app/callback');
    const scopes = encodeURIComponent(['user-read-private', 'playlist-modify-public', 'user-top-read'].join(' '));
    const state = encodeURIComponent(JSON.stringify({ mood, time, preferences }));
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&state=${state}`;
    window.location.href = authUrl;

    // Appeler fetchTracks après la connexion réussie
    fetchTracks();
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5">
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-50" />
          <Disc3 className="relative w-24 h-24 text-white animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Your Perfect Playlist</h2>
        <p className="text-gray-400 text-lg">
          Based on your {mood} mood during {time}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {Object.entries(preferences).map(([key, value]) => (
            <span key={key} className="inline-block px-3 py-1 bg-white/5 rounded-full m-1">
              {value}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center p-4 bg-white/5 rounded-xl">
                <img src={track.albumArt} alt={track.name} className="w-16 h-16 rounded-lg" />
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{track.name}</h3>
                  <p className="text-gray-400">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSpotifyConnect}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Connect with Spotify
      </button>
    </div>
  );
}

export default PlaylistView;
