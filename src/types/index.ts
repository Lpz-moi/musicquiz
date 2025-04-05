export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
}

export interface MusicProfile {
  genre: string;
  mood: string;
  tempo: string;
  era: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video' | 'spotify';
  created_at: string;
  user: User;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: string[];
  album: {
    name: string;
    images: { url: string }[];
  };
  preview_url: string;
}