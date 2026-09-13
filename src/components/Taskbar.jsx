import React, { useState, useEffect } from 'react';
import { playClick } from '../utils/audio';
import { Volume2, Shield, Sparkles, Gamepad2, FileText } from 'lucide-react';

export default function Taskbar({
  windows,
  activeWindowId,
  onToggleWindow,
  onOpenHome,
  onOpenPortfolio,
  onOpenContact,
  onOpenMusic,
  onOpenSystem,
  onOpenResume,
  onOpenSnake,
  onOpenTicTacToe,
  onRestartBoot
}) {
  const [time, setTime] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1 z-50 select-none text-xs font-sans shadow-lg">
      {/* Left side: Start button & Quick launch */}
      <div className="flex items-center gap-1.5 h-full py-1">
        {/* Start Button */}
        <div className="relative h-full">
          <button
            onClick={() => {
              playClick();
              setIsStartOpen(!isStartOpen);
            }}
            className={`h-full px-2.5 font-bold flex items-center gap-1.5 win-btn text-black ${
              isStartOpen ? 'win-btn-pressed' : ''
            }`}
          >
            <img src="/assets/icons/home.png" alt="Start" className="w-4 h-4 object-contain" />
            <span className="font-sans tracking-wide">Start</span>
          </button>

          {/* Start Menu Dropdown */}
          {isStartOpen && (
            <div 
              className="absolute bottom-full left-0 mb-1 w-64 win-box-out bg-[#c0c0c0] p-1 shadow-2xl flex flex-col z-50 text-black text-xs"
              onMouseLeave={() => setIsStartOpen(false)}
            >
              {/* Left blue decorative bar */}
              <div className="flex">
                <div className="w-8 bg-gradient-to-t from-[#000080] to-[#1084d0] text-white font-bold flex items-end p-1.5 select-none">
                  <span className="transform -rotate-90 origin-bottom-left whitespace-nowrap text-sm font-sans tracking-widest text-[#dfdfdf]">
                    KRITIKA '98
                  </span>
                </div>

                <div className="flex-1 py-1 space-y-0.5">
                  <button
                    onClick={() => { playClick(); onOpenHome(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/home.png" alt="" className="w-4 h-4" />
                    <span>Home Window</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenPortfolio(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/folder.png" alt="" className="w-4 h-4" />
                    <span>My Portfolio</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenResume(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/template.png" alt="" className="w-4 h-4 object-contain" />
                    <span>Resume (PDF Viewer)</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenSnake(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/snake.png" alt="" className="w-4 h-4 object-contain" />
                    <span>Nokia Snake 3310</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenTicTacToe(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/tictactoe.png" alt="" className="w-4 h-4 object-contain" />
                    <span>Tic-Tac-Toe Game (AI Bot)</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenSystem(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/computer.png" alt="" className="w-4 h-4" />
                    <span>My Computer (Specs)</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenMusic(); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/music.png" alt="" className="w-4 h-4" />
                    <span>Music Player (Stranger Things)</span>
                  </button>

                  <button
                    onClick={() => { playClick(); onOpenContact(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-medium"
                  >
                    <img src="/assets/icons/mail.png" alt="" className="w-4 h-4" />
                    <span>Outlook Express (Email)</span>
                  </button>

                  <div className="border-t border-[#808080] my-1" />

                  <button
                    onClick={() => { playClick(); onRestartBoot(); setIsStartOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-bold text-red-700"
                  >
                    <span>⏻</span>
                    <span>Restart to BIOS Intro...</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-5 w-[2px] bg-[#808080] border-r border-white mx-0.5" />

        {/* Quick Launch Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { playClick(); onOpenHome(); }}
            className="p-1 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] rounded-xs"
            title="Home"
          >
            <img src="/assets/icons/home.png" alt="Home" className="w-4 h-4 object-contain" />
          </button>
          <button
            onClick={() => { playClick(); onOpenPortfolio(); }}
            className="p-1 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] rounded-xs"
            title="Portfolio"
          >
            <img src="/assets/icons/folder.png" alt="Portfolio" className="w-4 h-4 object-contain" />
          </button>
          <button
            onClick={() => { playClick(); onOpenSnake(); }}
            className="p-1 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] rounded-xs"
            title="Snake 3310"
          >
            <img src="/assets/icons/snake.png" alt="Snake 3310" className="w-4 h-4 object-contain" />
          </button>
          <button
            onClick={() => { playClick(); onOpenTicTacToe(); }}
            className="p-1 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] rounded-xs"
            title="Tic-Tac-Toe AI"
          >
            <img src="/assets/icons/tictactoe.png" alt="Tic-Tac-Toe" className="w-4 h-4 object-contain" />
          </button>
          <button
            onClick={() => { playClick(); onOpenContact(); }}
            className="p-1 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] rounded-xs"
            title="Contact"
          >
            <img src="/assets/icons/mail.png" alt="Mail" className="w-4 h-4 object-contain" />
          </button>
        </div>

        {/* Separator */}
        <div className="h-5 w-[2px] bg-[#808080] border-r border-white mx-0.5" />

        {/* Active Windows Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-xl h-full py-0.5">
          {windows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => {
                  playClick();
                  onToggleWindow(win.id);
                }}
                className={`h-full px-2.5 max-w-[140px] truncate flex items-center gap-1.5 win-btn text-[11px] font-bold ${
                  isActive ? 'win-btn-pressed text-black' : 'text-gray-900'
                }`}
              >
                {win.icon && <img src={win.icon} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />}
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: System Tray & Clock */}
      <div className="flex items-center gap-2 h-full py-1">
        <div className="win-box-in px-2.5 py-1 bg-[#c0c0c0] flex items-center gap-2 h-full">
          <Volume2 
            onClick={() => { playClick(); onOpenMusic(); }} 
            className="w-3.5 h-3.5 text-gray-800 cursor-pointer hover:text-black" 
            title="Volume / Music" 
          />
          <Shield className="w-3.5 h-3.5 text-blue-900" title="Kritika OS Protected" />
          <span className="font-mono text-xs font-black text-gray-950 ml-1">
            {time || '12:00 PM'}
          </span>
        </div>
      </div>
    </div>
  );
}
