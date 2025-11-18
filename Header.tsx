import React from 'react';
import { Link } from 'react-router-dom';
import { CometLogo } from './CometLogo';
import { Plus, LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between sticky top-0 z-50">
      {/* Top Left: Title then Logo */}
      <div className="flex items-center select-none">
        <Link to="/" className="group flex items-center gap-1 sm:gap-2">
          {/* Title First */}
          <span className="text-2xl sm:text-4xl font-[900] tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.25)] group-hover:text-white/90 transition-all">
            CURIOGALAXY
          </span>
          
          {/* Logo Second (Right side) */}
          <div className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
            <CometLogo />
          </div>
        </Link>
      </div>

      {/* Top Right: Actions */}
      {/* Reduced gap to gap-2 (0.5rem) to match the 'very little space' request */}
      <nav className="text-sm text-white/90 flex items-center gap-2 font-medium">
        <button className="flex items-center gap-1 hover:text-cg-pink transition-colors group">
           <Plus size={18} className="group-hover:rotate-90 transition-transform" />
           <span className="hidden sm:inline tracking-wide">Create</span>
        </button>
        
        <span className="opacity-40 select-none h-4 w-px bg-white mx-1"></span>
        
        <button className="flex items-center gap-1 hover:text-cg-orange transition-colors group">
           <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
           <span className="hidden sm:inline tracking-wide">Sign in</span>
        </button>
      </nav>
    </header>
  );
};