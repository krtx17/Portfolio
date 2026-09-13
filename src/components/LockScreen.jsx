import React, { useState, useEffect, useRef } from 'react';
import { playStartupChime, playClick, playBeep } from '../utils/audio';

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const buttonRef = useRef(null);
  const [cursorStyle, setCursorStyle] = useState({
    opacity: 0,
    top: '75%',
    left: '50%',
    transition: 'all 0.8s ease-in-out'
  });

  // Auto-login animation simulating the reference video
  useEffect(() => {
    let timers = [];

    // Auto type dots
    const dots = ['•', '••', '•••', '••••', '•••••', '••••••'];
    dots.forEach((dotStr, idx) => {
      const t = setTimeout(() => {
        playBeep();
        setPassword(dotStr);
      }, 450 + idx * 220);
      timers.push(t);
    });

    // Cursor glides towards Confirm button
    const tCursor = setTimeout(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCursorStyle({
          opacity: 1,
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left + rect.width / 2}px`,
          transition: 'all 0.75s cubic-bezier(0.25, 1, 0.5, 1)'
        });
      } else {
        setCursorStyle({
          opacity: 1,
          top: '56%',
          left: '57%',
          transition: 'all 0.75s cubic-bezier(0.25, 1, 0.5, 1)'
        });
      }
    }, 1850);
    timers.push(tCursor);

    // Button clicks down
    const tPress = setTimeout(() => {
      playClick();
      setIsButtonPressed(true);
    }, 2650);
    timers.push(tPress);

    // Chime and unlock to desktop
    const tUnlock = setTimeout(() => {
      playStartupChime();
      onUnlock();
    }, 2950);
    timers.push(tUnlock);

    return () => timers.forEach(clearTimeout);
  }, [onUnlock]);

  const handleManualSubmit = (e) => {
    if (e) e.preventDefault();
    playClick();
    playStartupChime();
    onUnlock();
  };

  return (
    <div 
      onClick={handleManualSubmit}
      className="relative w-screen h-screen flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, #4480d4 0%, #3b91c8 45%, #25a0b8 100%)'
      }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      {/* Auto-moving retro pink cursor from video */}
      <div 
        style={cursorStyle} 
        className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path 
            d="M5 3L19 12L12 14L9 21L5 3Z" 
            fill="#ff007f" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Center login box */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 cursor-default"
      >
        {/* User Portrait Photo Frame */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 win-box-out p-1 bg-[#c0c0c0] mb-6 shadow-2xl">
          <div className="w-full h-full win-box-in overflow-hidden relative">
            <img 
              src="/assets/avatar.jpg" 
              alt="Kritika Tripathi" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Enter Password Form */}
        <form onSubmit={handleManualSubmit} className="w-full max-w-xs flex flex-col items-start gap-1.5">
          <label 
            htmlFor="pwd"
            className="text-white font-pixel text-2xl tracking-wide drop-shadow-sm"
          >
            Enter Password
          </label>

          <div className="flex w-full items-stretch h-10 shadow-md">
            <input 
              id="pwd"
              type="text" 
              readOnly
              value={password}
              placeholder="Logging in..."
              className="flex-1 bg-white text-black font-mono tracking-widest px-3 text-xl outline-none win-box-in border-r-0"
            />

            <button
              ref={buttonRef}
              type="submit"
              className={`px-4 text-black font-sans text-base font-medium h-full flex items-center justify-center min-w-[85px] win-btn ${
                isButtonPressed ? 'win-btn-pressed' : ''
              }`}
            >
              Confirm
            </button>
          </div>

          <div className="flex items-center justify-between w-full mt-3">
            <span className="text-white/90 font-pixel text-lg animate-pulse">
              Logging into Kritika OS...
            </span>
            <button
              type="button"
              onClick={handleManualSubmit}
              className="text-xs text-white underline hover:text-yellow-200 font-sans"
            >
              Skip Intro ➔
            </button>
          </div>
        </form>
      </div>

      {/* Bottom watermark */}
      <div className="absolute bottom-4 right-4 z-10 bg-white text-black px-3 py-1 text-xs font-sans shadow flex items-center gap-1.5 border border-gray-300">
        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
        <span>Kritika OS '98</span>
      </div>
    </div>
  );
}
