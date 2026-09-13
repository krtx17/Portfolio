import React from 'react';
import Window from './Window';
import { playClick } from '../utils/audio';
import { Download, ExternalLink, Printer } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, onFocus, zIndex }) {
  return (
    <Window
      id="resume-window"
      title="Resume.pdf - Adobe Acrobat Reader '98"
      icon="/assets/icons/template.png"
      isOpen={isOpen}
      isActive={true}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 80, y: 35 }}
      defaultSize={{ width: 880, height: 620 }}
      zIndex={zIndex}
      statusText="Kritika_Tripathi_Resume.pdf (100% Page 1 of 1)"
    >
      <div className="flex flex-col h-full bg-[#808080] select-none">
        {/* Acrobat Toolbar */}
        <div className="bg-[#c0c0c0] p-1.5 border-b border-[#000000] flex items-center justify-between gap-2 text-xs font-sans">
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Kritika_Tripathi_Resume.pdf"
              onClick={() => playClick()}
              className="win-btn px-3 py-1 font-bold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="win-btn px-3 py-1 flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          </div>
          <span className="text-gray-700 font-mono text-[11px]">
            Format: ATS-Compliant Single Page
          </span>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 w-full bg-[#525659] p-2 overflow-hidden flex justify-center">
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            title="Kritika Tripathi Resume"
            className="w-full h-full border border-gray-900 bg-white shadow-2xl"
          />
        </div>
      </div>
    </Window>
  );
}
