import React, { useMemo } from 'react';

export const StarBackground: React.FC = () => {
  // Function to generate random stars using box-shadows
  // This avoids the grid-like pattern of background-images
  const generateStars = (count: number) => {
    let shadow = '';
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      // Using vw/vh allows them to stay relative to viewport without JS resize listeners
      shadow += `${x}vw ${y}vh 0 white, `;
    }
    return shadow.slice(0, -2); // Remove trailing comma
  };

  // Generate stars only once
  const smallStarsBoxShadow = useMemo(() => generateStars(70), []); // Reduced count (Static)
  const twinklingStarsBoxShadow = useMemo(() => generateStars(30), []); // Reduced count (Twinkling)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      {/* 
        Major Gradient Mix 
        Deep mesh gradient to ensure the Pink and Orange are visible.
      */}
      
      {/* Top-Left Pink/Purple wash */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cg-pink mix-blend-screen opacity-20 blur-[100px] rounded-full animate-float" />
      
      {/* Bottom-Right Orange/Gold wash */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cg-orange mix-blend-screen opacity-20 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-5s' }} />

      {/* Center/Random splashes to bridge the colors */}
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-purple-900 opacity-30 blur-[120px] rounded-full" />

      {/* General ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />

      {/* 
        Randomly Placed Stars 
        We use a single pixel div and replicate it using box-shadow
      */}
      
      {/* Static Small Stars */}
      <div 
        className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent rounded-full opacity-60"
        style={{ boxShadow: smallStarsBoxShadow }}
      />

      {/* Twinkling Larger Stars */}
      <div 
        className="absolute top-0 left-0 w-[3px] h-[3px] bg-transparent rounded-full opacity-80 animate-twinkle"
        style={{ boxShadow: twinklingStarsBoxShadow }}
      />
      
      {/* Scanline effect for retro/tech feel (optional, very subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
    </div>
  );
};