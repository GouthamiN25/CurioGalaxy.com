import React from 'react';
import { Navigation } from '../components/Navigation';
import { User } from '../types';

const CURRENT_USER: User = {
  id: 'u1',
  name: 'Gouthami Nadupuri',
  handle: '@gouthami',
  avatarUrl: 'https://picsum.photos/200/200',
  bio: 'I’m a curious creator at CurioGalaxy — blending data science, AI, and creativity with tech, fashion, and storytelling.'
};

export const Profile: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 pb-20">
      <div className="text-center pt-6">
        <Navigation />
      </div>

      <h1 className="mt-10 text-3xl sm:text-4xl font-bold text-center drop-shadow-lg">Profile</h1>

      <section className="mt-10 max-w-3xl mx-auto bg-black/60 border border-white/12 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-2xl backdrop-blur relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cg-pink/10 rounded-full blur-[60px] pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-cg-pink to-cg-orange">
                    <img 
                        src={CURRENT_USER.avatarUrl} 
                        alt={CURRENT_USER.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-black"
                    />
                </div>
            </div>
            
            <div className="space-y-7 flex-1 text-center sm:text-left">
                <div>
                <label className="text-xs tracking-[0.16em] uppercase text-white/60">
                    Full Name
                </label>
                <p className="mt-2 text-lg sm:text-xl font-semibold text-white">
                    {CURRENT_USER.name}
                </p>
                <p className="text-sm text-cg-pink">{CURRENT_USER.handle}</p>
                </div>

                <div>
                <label className="text-xs tracking-[0.16em] uppercase text-white/60">
                    About
                </label>
                <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
                    {CURRENT_USER.bio} I love building smart, stylish, and
                    snackable ideas that help people learn, explore, and have fun.
                </p>
                </div>

                <div>
                <label className="text-xs tracking-[0.16em] uppercase text-white/60">
                    Favourites
                </label>
                <ul className="mt-2 text-sm sm:text-base text-white/85 space-y-1 inline-block text-left">
                    <li className="flex gap-2"><span className="text-cg-orange">✦</span> Tech: AI, RAG, and data storytelling</li>
                    <li className="flex gap-2"><span className="text-cg-pink">✦</span> Fashion: chic + comfy outfits, colour palettes</li>
                    <li className="flex gap-2"><span className="text-purple-400">✦</span> Vibes: cozy cafés, playlists, late-night coding</li>
                </ul>
                </div>
            </div>
        </div>
      </section>

      <div className="mt-12 h-px w-full bg-white/12"></div>
      <p className="mt-8 text-sm text-white/70 text-center">
        © 2025 CurioGalaxy — A Galaxy of Curiosities ✦
      </p>
    </main>
  );
};