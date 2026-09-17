import React from 'react';
import Window from './Window';
import { playClick } from '../utils/audio';
import { Github, ExternalLink, Cpu, CheckCircle2, Zap } from 'lucide-react';

export default function ProjectModal({ project, onClose, onFocus, zIndex }) {
  if (!project) return null;

  return (
    <Window
      id={`project-${project.id}`}
      title={`${project.title} - Project Details`}
      icon="/assets/icons/folder.png"
      isOpen={!!project}
      isActive={true}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 100, y: 50 }}
      defaultSize={{ width: 800, height: 580 }}
      zIndex={zIndex}
      statusText={`Project: ${project.title} | Status: Production`}
    >
      <div className="p-4 sm:p-8 bg-[#f5f8fc] min-h-full space-y-6 text-black font-sans leading-relaxed">
        {/* Header Badge & Title */}
        <div className="border-b-2 border-[#808080] pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-pixel bg-blue-900 text-white rounded-xs font-bold">
              {project.badge}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs win-box-in">
              ✓ Verified Project
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
            {project.title}
          </h2>
          <p className="text-xs font-mono font-bold text-gray-900 mt-1">
            {project.role} · {project.period}
          </p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-3 gap-3">
          {project.stats.map((st, i) => (
            <div key={i} className="win-box-out p-1 bg-[#c0c0c0]">
              <div className="win-box-in p-3 bg-white text-center">
                <div className="text-[11px] font-mono font-bold text-gray-800 uppercase tracking-wide">
                  {st.label}
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-blue-950 mt-1">
                  {st.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture & Deep Dive */}
        <div className="win-box-out p-1 bg-[#c0c0c0]">
          <div className="win-box-in p-4 bg-white space-y-3">
            <h3 className="font-serif font-black text-gray-950 text-base flex items-center gap-2 border-b border-gray-300 pb-2">
              <Cpu className="w-4 h-4 text-blue-900" />
              <span>Technical Architecture &amp; Key Deliverables</span>
            </h3>

            <ul className="space-y-3 pt-1">
              {project.bullets.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-sm font-semibold text-gray-950 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-gray-950 text-sm">
            Technologies, Frameworks &amp; Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span 
                key={t}
                className="win-box-out px-3 py-1 bg-[#e0e0e0] text-xs font-mono font-bold text-gray-900 shadow-xs"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Button Row */}
        <div className="pt-4 border-t border-gray-300 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="win-btn px-4 py-2 text-sm font-serif font-bold text-black hover:bg-[#d8d8d8] flex items-center gap-2 shadow"
            >
              <Github className="w-4 h-4 text-black" />
              <span>GitHub Repository</span>
            </a>

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="win-btn px-4 py-2 text-sm font-serif font-bold text-blue-950 hover:bg-[#d8d8d8] flex items-center gap-2 shadow"
              >
                <ExternalLink className="w-4 h-4 text-blue-800" />
                <span>Vercel Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={() => { playClick(); onClose(); }}
            className="win-btn px-6 py-2 text-sm font-serif font-bold text-black hover:bg-[#d8d8d8]"
          >
            Close Window
          </button>
        </div>
      </div>
    </Window>
  );
}
