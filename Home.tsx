import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Post } from '../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    user: {
      id: 'u1',
      name: 'Gouthami Nadupuri',
      handle: '@gouthami',
      avatarUrl: 'https://picsum.photos/100/100'
    },
    content: 'Just explored the new Gemini 2.5 Flash model. The latency improvement is incredible for real-time applications! 🚀 #Gemini #AI #Dev',
    timestamp: Date.now() - 3600000,
    likes: 124,
    tags: ['AI', 'Gemini', 'Dev'],
    category: 'Technology'
  },
  {
    id: '2',
    userId: 'u2',
    user: {
      id: 'u2',
      name: 'Cosmic Coder',
      handle: '@star_dev',
      avatarUrl: 'https://picsum.photos/101/101'
    },
    content: 'Found this amazing tool for visualizing React component trees. Definitely adding it to my collection of essential dev tools. 🛠️',
    timestamp: Date.now() - 7200000,
    likes: 89,
    tags: ['React', 'Tools', 'Productivity'],
    category: 'Tools'
  }
];

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 text-center pb-20">
      {/* Hero Section */}
      <div className="pt-10 pb-6">
        {/* High Visibility CTA */}
        <div className="mb-10">
          <Link 
            to="/chat" 
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cg-pink to-cg-orange text-black text-lg font-extrabold tracking-wide rounded-full shadow-[0_0_40px_rgba(255,143,183,0.4)] hover:shadow-[0_0_60px_rgba(255,143,183,0.7)] hover:scale-105 hover:-translate-y-1 transition-all duration-300"
          >
            <Sparkles size={22} className="animate-pulse" />
            START CHAT
          </Link>
        </div>

        <Navigation />
        
        <h1 className="mt-16 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
          Smart Ideas Platform
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
           Share thoughts on technology, discover the latest skills, and explore curious tools across the galaxy.
        </p>
      </div>

      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

      {/* Feed Section */}
      <div className="max-w-2xl mx-auto text-left space-y-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-cg-pink to-cg-orange rounded-full"></span>
          Latest Transmissions
        </h2>

        {posts.map(post => (
          <article key={post.id} className="bg-cg-panel border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg">
            <div className="flex items-start gap-4">
              <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-lg">{post.user.name}</h3>
                    <p className="text-xs text-white/50 font-medium tracking-wide">{post.user.handle} • {new Date(post.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                
                <p className="mt-3 text-white/90 leading-relaxed text-base">
                  {post.content}
                </p>

                <div className="mt-4 flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-cg-pink font-medium border border-white/10 hover:bg-white/10 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between text-white/40 text-sm border-t border-white/5 pt-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 hover:text-cg-pink transition-colors group"
                  >
                    <Heart size={18} className="group-hover:scale-110 transition-transform" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <MessageCircle size={18} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 h-px w-full bg-white/12"></div>
      <p className="mt-8 text-sm text-white/70">
        © 2025 CurioGalaxy — A Galaxy of Curiosities ✦
      </p>
    </main>
  );
};