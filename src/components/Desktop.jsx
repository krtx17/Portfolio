import React, { useState } from 'react';
import Window from './Window';
import HomeWindow from './HomeWindow';
import PortfolioWindow from './PortfolioWindow';
import ProjectModal from './ProjectModal';
import ContactModal from './ContactModal';
import SystemInfoModal from './SystemInfoModal';
import MusicPlayer from './MusicPlayer';
import ResumeModal from './ResumeModal';
import NokiaSnake from './NokiaSnake';
import TicTacToe from './TicTacToe';
import Taskbar from './Taskbar';
import { playClick, playError } from '../utils/audio';

export default function Desktop({ onRestartBoot }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  
  // Windows state
  const [openWindows, setOpenWindows] = useState({
    home: true,
    portfolio: false,
    contact: false,
    system: false,
    music: false,
    resume: false,
    snake: false,
    tictactoe: false,
    recycle: false,
  });

  const [minimizedWindows, setMinimizedWindows] = useState({
    home: false,
    portfolio: false,
    contact: false,
    system: false,
    music: false,
    resume: false,
    snake: false,
    tictactoe: false,
    recycle: false,
  });

  const [activeWindowId, setActiveWindowId] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [zIndices, setZIndices] = useState({
    home: 10,
    portfolio: 11,
    contact: 12,
    system: 13,
    music: 14,
    resume: 15,
    snake: 16,
    tictactoe: 17,
    recycle: 18,
    project: 25,
  });

  const bringToFront = (id) => {
    setActiveWindowId(id);
    setZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return { ...prev, [id]: maxZ + 1 };
    });
  };

  const openWindow = (id) => {
    playClick();
    setOpenWindows((prev) => ({ ...prev, [id]: true }));
    setMinimizedWindows((prev) => ({ ...prev, [id]: false }));
    bringToFront(id);
  };

  const closeWindow = (id) => {
    playClick();
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id) => {
    playClick();
    setMinimizedWindows((prev) => ({ ...prev, [id]: true }));
  };

  const toggleWindowFromTaskbar = (id) => {
    if (!openWindows[id]) {
      openWindow(id);
    } else if (minimizedWindows[id]) {
      setMinimizedWindows((prev) => ({ ...prev, [id]: false }));
      bringToFront(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  // Complete List of Workable Desktop Icons
  const leftIcons = [
    {
      id: 'home',
      title: 'Home',
      icon: '/assets/icons/home.png',
      action: () => openWindow('home'),
    },
    {
      id: 'system',
      title: 'My Computer',
      icon: '/assets/icons/computer.png',
      action: () => openWindow('system'),
    },
    {
      id: 'portfolio',
      title: 'My Portfolio',
      icon: '/assets/icons/folder.png',
      action: () => openWindow('portfolio'),
    },
    {
      id: 'resume',
      title: 'Resume.pdf',
      icon: '/assets/icons/template.png',
      action: () => openWindow('resume'),
    },
    {
      id: 'snake',
      title: 'Snake 3310',
      icon: '/assets/icons/snake.png',
      action: () => openWindow('snake'),
    },
    {
      id: 'tictactoe',
      title: 'Tic-Tac-Toe',
      icon: '/assets/icons/tictactoe.png',
      action: () => openWindow('tictactoe'),
    },
    {
      id: 'music',
      title: 'Music Player',
      icon: '/assets/icons/music.png',
      action: () => openWindow('music'),
    },
    {
      id: 'contact',
      title: 'Outlook Express',
      icon: '/assets/icons/mail.png',
      action: () => openWindow('contact'),
    },
  ];

  const rightIcons = [
    {
      id: 'recycle',
      title: 'Recycle Bin',
      icon: '/assets/icons/recycle.png',
      action: () => openWindow('recycle'),
    },
    {
      id: 'github',
      title: 'GitHub Space',
      icon: '/assets/icons/github.png',
      action: () => {
        playClick();
        window.open('https://github.com/kritikatripathi17', '_blank');
      },
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      icon: '/assets/icons/linkedin.png',
      action: () => {
        playClick();
        window.open('https://www.linkedin.com/in/kritika-tripathi-837441246?utm_source=share_via&utm_content=profile&utm_medium=member_ios', '_blank');
      },
    },
  ];

  // Active windows list for taskbar
  const taskbarWindows = [
    openWindows.home && { id: 'home', title: 'Home', icon: '/assets/icons/home.png', isMinimized: minimizedWindows.home },
    openWindows.portfolio && { id: 'portfolio', title: 'My Portfolio', icon: '/assets/icons/folder.png', isMinimized: minimizedWindows.portfolio },
    openWindows.resume && { id: 'resume', title: 'Resume.pdf', icon: '/assets/icons/template.png', isMinimized: minimizedWindows.resume },
    openWindows.snake && { id: 'snake', title: 'Snake 3310', icon: '/assets/icons/snake.png', isMinimized: minimizedWindows.snake },
    openWindows.tictactoe && { id: 'tictactoe', title: 'Tic-Tac-Toe', icon: '/assets/icons/tictactoe.png', isMinimized: minimizedWindows.tictactoe },
    openWindows.contact && { id: 'contact', title: 'Outlook Express', icon: '/assets/icons/mail.png', isMinimized: minimizedWindows.contact },
    openWindows.system && { id: 'system', title: 'My Computer', icon: '/assets/icons/computer.png', isMinimized: minimizedWindows.system },
    openWindows.music && { id: 'music', title: 'Music Player', icon: '/assets/icons/music.png', isMinimized: minimizedWindows.music },
    openWindows.recycle && { id: 'recycle', title: 'Recycle Bin', icon: '/assets/icons/recycle.png', isMinimized: minimizedWindows.recycle },
    selectedProject && { id: 'project', title: selectedProject.title, icon: '/assets/icons/folder.png', isMinimized: false }
  ].filter(Boolean);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/wallpaper.jpg')" }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Left Desktop Icons Column */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-0">
        {leftIcons.map((item) => {
          const isSelected = selectedIcon === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setSelectedIcon(item.id);
                item.action();
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                item.action();
              }}
              className={`w-20 sm:w-24 p-1.5 flex flex-col items-center text-center cursor-pointer rounded-xs transition-colors group ${
                isSelected ? 'bg-blue-900/75 outline-1 outline-dotted outline-white' : 'hover:bg-white/10'
              }`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter drop-shadow-md mb-1"
              />
              <span className="text-white text-xs font-sans font-bold px-1 py-0.5 rounded text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right Desktop Icons Column */}
      <div className="absolute top-4 right-4 flex flex-col gap-4 z-0">
        {rightIcons.map((item) => {
          const isSelected = selectedIcon === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setSelectedIcon(item.id);
                item.action();
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                item.action();
              }}
              className={`w-20 sm:w-24 p-1.5 flex flex-col items-center text-center cursor-pointer rounded-xs transition-colors group ${
                isSelected ? 'bg-blue-900/75 outline-1 outline-dotted outline-white' : 'hover:bg-white/10'
              }`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter drop-shadow-md mb-1"
              />
              <span className="text-white text-xs font-sans font-bold px-1 py-0.5 rounded text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* WINDOW 1: Home Window */}
      <Window
        id="home"
        title="Home"
        icon="/assets/icons/home.png"
        isOpen={openWindows.home}
        isActive={activeWindowId === 'home'}
        isMinimized={minimizedWindows.home}
        onClose={() => closeWindow('home')}
        onMinimize={() => minimizeWindow('home')}
        onFocus={() => bringToFront('home')}
        defaultPos={{ x: 135, y: 20 }}
        defaultSize={{ width: 920, height: 610 }}
        zIndex={zIndices.home}
        statusText="484 object(s) | Portfolio Ready"
      >
        <HomeWindow
          onOpenProject={(proj) => {
            setSelectedProject(proj);
            bringToFront('project');
          }}
          onOpenPortfolio={() => openWindow('portfolio')}
          onOpenContact={() => openWindow('contact')}
          onOpenResume={() => openWindow('resume')}
          onOpenSnake={() => openWindow('snake')}
          onOpenTicTacToe={() => openWindow('tictactoe')}
        />
      </Window>

      {/* WINDOW 2: Portfolio Window */}
      <Window
        id="portfolio"
        title="My Portfolio"
        icon="/assets/icons/folder.png"
        isOpen={openWindows.portfolio}
        isActive={activeWindowId === 'portfolio'}
        isMinimized={minimizedWindows.portfolio}
        onClose={() => closeWindow('portfolio')}
        onMinimize={() => minimizeWindow('portfolio')}
        onFocus={() => bringToFront('portfolio')}
        defaultPos={{ x: 90, y: 35 }}
        defaultSize={{ width: 960, height: 620 }}
        zIndex={zIndices.portfolio}
        statusText="4 Production Projects Loaded"
      >
        <PortfolioWindow
          onOpenProject={(proj) => {
            setSelectedProject(proj);
            bringToFront('project');
          }}
        />
      </Window>

      {/* WINDOW 3: Project Inspection Window */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onFocus={() => bringToFront('project')}
          zIndex={zIndices.project}
        />
      )}

      {/* WINDOW 4: Resume PDF Viewer */}
      <ResumeModal
        isOpen={openWindows.resume}
        onClose={() => closeWindow('resume')}
        onFocus={() => bringToFront('resume')}
        zIndex={zIndices.resume}
      />

      {/* WINDOW 5: Nokia Snake Game */}
      <NokiaSnake
        isOpen={openWindows.snake}
        onClose={() => closeWindow('snake')}
        onFocus={() => bringToFront('snake')}
        zIndex={zIndices.snake}
      />

      {/* WINDOW 6: Tic-Tac-Toe Game */}
      <TicTacToe
        isOpen={openWindows.tictactoe}
        onClose={() => closeWindow('tictactoe')}
        onFocus={() => bringToFront('tictactoe')}
        zIndex={zIndices.tictactoe}
      />

      {/* WINDOW 7: Outlook Express Contact Modal */}
      <ContactModal
        isOpen={openWindows.contact}
        onClose={() => closeWindow('contact')}
        onFocus={() => bringToFront('contact')}
        zIndex={zIndices.contact}
      />

      {/* WINDOW 8: System Properties (My Computer) */}
      <SystemInfoModal
        isOpen={openWindows.system}
        onClose={() => closeWindow('system')}
        onFocus={() => bringToFront('system')}
        zIndex={zIndices.system}
      />

      {/* WINDOW 9: Music Player */}
      <MusicPlayer
        isOpen={openWindows.music}
        onClose={() => closeWindow('music')}
        onFocus={() => bringToFront('music')}
        zIndex={zIndices.music}
      />

      {/* WINDOW 10: Recycle Bin */}
      {openWindows.recycle && (
        <Window
          id="recycle"
          title="Recycle Bin"
          icon="/assets/icons/recycle.png"
          isOpen={openWindows.recycle}
          isActive={activeWindowId === 'recycle'}
          isMinimized={minimizedWindows.recycle}
          onClose={() => closeWindow('recycle')}
          onMinimize={() => minimizeWindow('recycle')}
          onFocus={() => bringToFront('recycle')}
          defaultPos={{ x: 200, y: 150 }}
          defaultSize={{ width: 380, height: 220 }}
          zIndex={zIndices.recycle}
          showMenuBar={false}
          statusText="0 bytes"
        >
          <div className="p-6 bg-[#c0c0c0] h-full flex flex-col justify-between text-center">
            <div className="flex items-center gap-4 justify-center">
              <img src="/assets/icons/recycle.png" alt="" className="w-12 h-12 object-contain" />
              <p className="text-sm font-sans font-bold text-gray-900">
                The Recycle Bin is empty.<br />
                <span className="text-xs font-normal text-gray-600">All 0 bugs discarded.</span>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => closeWindow('recycle')}
                className="win-btn px-6 py-1 font-bold text-sm"
              >
                OK
              </button>
            </div>
          </div>
        </Window>
      )}

      {/* Bottom Taskbar */}
      <Taskbar
        windows={taskbarWindows}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindowFromTaskbar}
        onOpenHome={() => openWindow('home')}
        onOpenPortfolio={() => openWindow('portfolio')}
        onOpenContact={() => openWindow('contact')}
        onOpenMusic={() => openWindow('music')}
        onOpenSystem={() => openWindow('system')}
        onOpenResume={() => openWindow('resume')}
        onOpenSnake={() => openWindow('snake')}
        onOpenTicTacToe={() => openWindow('tictactoe')}
        onRestartBoot={onRestartBoot}
      />
    </div>
  );
}
