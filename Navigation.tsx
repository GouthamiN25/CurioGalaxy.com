import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavSection } from '../types';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'home';

  const isActive = (path: string) => {
    if (path === 'home' && currentPath === 'home') return true;
    if (currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { id: NavSection.Home, label: 'Home', path: '/' },
    { id: NavSection.Profile, label: 'Profile', path: '/profile' },
    { id: NavSection.Tales, label: 'Tales', path: '/tales' },
    { id: NavSection.Collection, label: 'Collection', path: '/collection' },
    { id: NavSection.Guidora, label: 'Guidora', path: '/guidora' },
  ];

  return (
    <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 px-4">
      {/* Container for the nav items to give them a grounded feel */}
      <div className="flex flex-wrap justify-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300
              ${isActive(item.id) 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-105' 
                : 'bg-transparent text-white/60 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};