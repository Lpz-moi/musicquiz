import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Send, Image, Music2 } from 'lucide-react';
import type { Post } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

export const SocialFeed: React.FC = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
    const subscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
        payload => {
          setPosts(current => [payload.new as Post, ...current]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(*)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPost.trim()) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            content: newPost.trim(),
          },
        ]);

      if (error) throw error;
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {user && (
        <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-4">
          <div className="flex gap-4">
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Partagez votre découverte musicale..."
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                rows={2}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-purple-400 rounded-full hover:bg-purple-500/10 transition-colors"
                  >
                    <Image size={20} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-purple-400 rounded-full hover:bg-purple-500/10 transition-colors"
                  >
                    <Music2 size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Publier
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <img
                src={post.user.avatar_url}
                alt={post.user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {post.user.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-300">{post.content}</p>
                {post.media_url && (
                  <div className="mt-3">
                    {post.media_type === 'image' ? (
                      <img
                        src={post.media_url}
                        alt="Post media"
                        className="rounded-lg max-h-96 object-cover"
                      />
                    ) : post.media_type === 'spotify' ? (
                      <iframe
                        src={post.media_url}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media"
                        className="rounded-lg"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};