import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';

interface TopSongsProps {
  onBack: () => void;
}

const TopSongs: React.FC<TopSongsProps> = ({ onBack }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold">
          Top des Meilleures Chansons
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Top 50 Rap Français
          </h3>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/211vzYG60PkPrlADj0g3sR?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Best of Electro 2025
          </h3>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/55BVUV8lSpwQj3m8tO6YD5?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Pop Hits 2025
          </h3>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/34NbomaTu7YuOYnky8nLXL?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default TopSongs;
