import React, { useState, useRef, useEffect } from 'react';
import { playClick } from '../utils/audio';

export default function Window({
  id,
  title,
  icon,
  isOpen,
  isActive,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  defaultPos = { x: 50, y: 30 },
  defaultSize = { width: 900, height: 600 },
  children,
  showMenuBar = true,
  statusText = "404 object(s)",
  zIndex = 10,
}) {
  const [pos, setPos] = useState(defaultPos);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Dragging logic
  const handleMouseDown = (e) => {
    if (isMaximized) return;
    onFocus();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.current.y));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      id={id}
      ref={windowRef}
      onMouseDown={onFocus}
      style={{
        zIndex,
        ...(isMaximized
          ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 40px)' }
          : {
              top: `${pos.y}px`,
              left: `${pos.x}px`,
              width: `min(${defaultSize.width}px, 96vw)`,
              height: `min(${defaultSize.height}px, 86vh)`,
            }),
      }}
      className="fixed win-box-out p-1 bg-[#c0c0c0] flex flex-col shadow-win-window select-none text-black"
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          playClick();
          setIsMaximized(!isMaximized);
        }}
        className={`h-7 px-1.5 flex items-center justify-between cursor-move text-sm font-bold select-none ${
          isActive ? 'win-titlebar' : 'win-titlebar-inactive'
        }`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {icon && <img src={icon} alt="" className="w-4 h-4 object-contain" />}
          <span className="font-sans text-xs tracking-wide">{title}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              onMinimize();
            }}
            className="win-btn w-4 h-4 text-black text-[10px] font-bold leading-none"
            title="Minimize"
          >
            _
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              setIsMaximized(!isMaximized);
            }}
            className="win-btn w-4 h-4 text-black text-[10px] font-bold leading-none"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? "❐" : "口"}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              onClose();
            }}
            className="win-btn w-4 h-4 text-black text-[10px] font-bold leading-none hover:bg-red-200"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar (File, Edit, View, Go, Help) */}
      {showMenuBar && (
        <div className="bg-[#c0c0c0] border-b border-[#808080] py-0.5 px-1 flex items-center text-xs font-sans relative">
          {['File', 'Edit', 'View', 'Go', 'Help'].map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => {
                  playClick();
                  setActiveMenu(activeMenu === item ? null : item);
                }}
                className={`px-2 py-0.5 hover:bg-[#000080] hover:text-white ${
                  activeMenu === item ? 'bg-[#000080] text-white' : 'text-black'
                }`}
              >
                {item}
              </button>

              {/* Menu Dropdown */}
              {activeMenu === item && (
                <div 
                  className="absolute top-full left-0 z-50 min-w-[140px] win-box-out bg-[#c0c0c0] p-1 shadow-lg text-black text-xs"
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item === 'File' && (
                    <>
                      <div 
                        onClick={() => { playClick(); window.open('/resume.pdf', '_blank'); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        Open Resume (PDF)
                      </div>
                      <div 
                        onClick={() => { playClick(); onClose(); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer border-t border-gray-400 mt-1"
                      >
                        Close Window
                      </div>
                    </>
                  )}
                  {item === 'Edit' && (
                    <>
                      <div 
                        onClick={() => { playClick(); navigator.clipboard?.writeText(window.location.href); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        Copy Page Link
                      </div>
                    </>
                  )}
                  {item === 'View' && (
                    <>
                      <div 
                        onClick={() => { playClick(); setIsMaximized(!isMaximized); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        {isMaximized ? "Restore Size" : "Full Screen"}
                      </div>
                    </>
                  )}
                  {item === 'Go' && (
                    <>
                      <div 
                        onClick={() => { playClick(); window.open('https://github.com/krtx17', '_blank'); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        GitHub Profile
                      </div>
                      <div 
                        onClick={() => { playClick(); window.open('https://www.linkedin.com/in/kritika-tripathi-837441246', '_blank'); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        LinkedIn Profile
                      </div>
                    </>
                  )}
                  {item === 'Help' && (
                    <>
                      <div 
                        onClick={() => { playClick(); alert("Kritika OS '98 Portfolio\nBuilt with React & Vite\nVersion 1.0"); setActiveMenu(null); }}
                        className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                      >
                        About Kritika OS
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Inner Content Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden win-box-in bg-white relative win-scrollbar">
        {children}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] pt-1 px-1 flex items-center justify-between text-[11px] font-sans text-gray-700">
        <div className="win-box-in px-2 py-0.5 flex-1 mr-1 truncate">
          {statusText}
        </div>
        <div className="win-box-in px-3 py-0.5 text-center min-w-[70px]">
          Ready
        </div>
      </div>
    </div>
  );
}
