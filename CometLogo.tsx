import React from 'react';

export const CometLogo: React.FC = () => {
  return (
    <svg 
      className="w-10 h-10 sm:w-12 sm:h-12" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="falling-star-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8FB7" />
          <stop offset="100%" stopColor="#FFB45A" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* The Falling Trail (Motion lines) */}
      <path 
        d="M20 10 Q 40 30 55 55" 
        stroke="url(#falling-star-grad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        className="opacity-60"
      />
      <path 
        d="M10 25 Q 30 45 45 65" 
        stroke="url(#falling-star-grad)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        className="opacity-40"
      />
      
      {/* The Star Shape */}
      <path
        fill="url(#falling-star-grad)"
        filter="url(#glow)"
        d="M70 55 
           L76 70 
           L92 72 
           L80 82 
           L84 98 
           L70 90 
           L56 98 
           L60 82 
           L48 72 
           L64 70 
           Z"
        transform="rotate(-15, 70, 80)"
      />
    </svg>
  );
};