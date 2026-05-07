import React from 'react';

interface LogoProps {
  size?: number;
  hideText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 64, hideText = false }) => {
  return (
    <div className="inline-flex items-center gap-3" style={{ minWidth: size }}>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id="goldLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff1a8" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#9b7619" />
            </linearGradient>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 241, 168, 0.9)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0.0)" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="52" fill="rgba(20, 18, 15, 0.3)" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="4" />
          <circle cx="60" cy="60" r="40" fill="url(#goldGlow)" />
          <path
            d="M34 84 L60 20 L86 84 H68 L60 58 L52 84 H34 Z"
            fill="url(#goldLogo)"
            stroke="#f7e17c"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M40 76 L60 30 L80 76"
            fill="none"
            stroke="#fff5b0"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!hideText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-[0.32em] text-[#f7e28b]">AURIX</span>
          <span className="text-xs tracking-[0.4em] uppercase text-[#d4bf74]">Club</span>
        </div>
      )}
    </div>
  );
};
