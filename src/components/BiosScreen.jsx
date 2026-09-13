import React, { useState, useEffect } from 'react';
import { playBeep, playRespectFanfare, playClick } from '../utils/audio';

export default function BiosScreen({ onEnter, onSkip }) {
  const [respectPaid, setRespectPaid] = useState(false);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // Auto boot countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        playRespectFanfare();
        setRespectPaid(true);
        setTimeout(() => {
          onEnter();
        }, 1200);
      } else {
        playClick();
        clearInterval(timer);
        onEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter]);

  useEffect(() => {
    if (countdown === 0) {
      onEnter();
    }
  }, [countdown, onEnter]);

  return (
    <div 
      onClick={() => { playClick(); onEnter(); }}
      className="relative w-screen h-screen bg-black text-[#aaaaaa] font-pixel text-xl sm:text-2xl p-6 sm:p-12 flex flex-col justify-between select-none overflow-hidden leading-snug cursor-pointer"
    >
      {/* Background scanline effect */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <img 
            src="/assets/boot_logo.png" 
            alt="Boot Logo" 
            className="w-10 h-14 object-contain mt-1 image-pixelated"
          />
          <div>
            <h1 className="text-white text-2xl sm:text-3xl tracking-wide">
              Welcome to my portfolio website
            </h1>
            <p className="text-[#888888] text-lg sm:text-xl">
              Engineered with Modern Web &amp; React
            </p>
          </div>
        </div>

        {/* N404 Parody Energy Star Logo */}
        <div className="hidden sm:block">
          <img 
            src="/assets/n404_star.png" 
            alt="Energy Star N404" 
            className="w-44 h-auto object-contain"
          />
        </div>
      </div>

      {/* Center Table Details */}
      <div className="relative z-10 my-auto max-w-3xl space-y-3 sm:space-y-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">File</span>
          <span className="sm:col-span-7 text-white">: Portfolio Website</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Built for</span>
          <span className="sm:col-span-7 text-[#55ff55] font-bold">: Kritika Tripathi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Specialist</span>
          <span className="sm:col-span-7 text-white">: AI &amp; Full Stack Developer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Experience &amp; Internships</span>
          <span className="sm:col-span-7 text-white">: 5 Internships (AI / Full Stack / Open Source)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Primary Stack</span>
          <span className="sm:col-span-7 text-white">: Python, React.js, FastAPI, Node.js, PyTorch</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Languages</span>
          <span className="sm:col-span-7 text-white">: English, Hindi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
          <span className="sm:col-span-5 text-[#888888]">Current Status</span>
          <span className="sm:col-span-7 text-[#00ffff]">: Available for Hire (Full-Time &amp; Internships)</span>
        </div>
      </div>

      {/* Respect toast banner */}
      {respectPaid && (
        <div className="relative z-20 mx-auto bg-[#ffff55] text-black px-6 py-2 border-2 border-white animate-bounce text-xl font-bold">
          ★ RESPECT PAID! (+100 XP) ★
        </div>
      )}

      {/* Bottom Instructions */}
      <div className="relative z-10 pt-6 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-white">
            Press <span className="text-[#ffff55] font-bold underline">F</span> to pay respects
          </p>
          <p className="text-white text-lg sm:text-xl">
            Press <span className="text-[#55ff55] font-bold underline">Enter</span> or <span className="text-cyan-400 font-bold underline">Click Anywhere</span> to load OS 
            <span className="text-gray-400 text-base ml-2">(Auto-booting in {countdown}s...)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onSkip && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onSkip();
              }}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-white underline font-sans"
            >
              Skip to Desktop ➔
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              onEnter();
            }}
            className="win-btn px-6 py-2 text-black font-pixel text-xl sm:text-2xl hover:bg-[#d8d8d8] active:translate-y-0.5 shadow-md flex items-center gap-2"
          >
            <span>Boot System</span>
            <span className="inline-block w-2.5 h-4 bg-black animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}
