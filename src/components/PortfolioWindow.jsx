import React from 'react';
import { resumeData } from '../data/resumeData';
import { playClick } from '../utils/audio';
import { Github, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';

export default function PortfolioWindow({ onOpenProject }) {
  return (
    <div 
      className="w-full min-h-full p-6 sm:p-10 text-black font-sans leading-relaxed selection:bg-[#000080] selection:text-white"
      style={{
        background: 'linear-gradient(180deg, #b0d3f8 0%, #cae3fb 50%, #e8f2fc 100%)'
      }}
    >
      {/* Window Header */}
      <div className="max-w-5xl mx-auto mb-4 border-b-2 border-[#808080] pb-2.5">
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-950">
          My Portfolio &amp; Engineering Showcase
        </h2>
        <p className="text-gray-800 font-serif text-xs sm:text-sm mt-0.5 font-medium">
          Production AI pipelines, Graph Neural Networks (GNNs), multi-agent architectures, and full-stack web applications.
        </p>
      </div>

      {/* 2x2 Projects Grid matching reference video layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {resumeData.projects.map((proj) => (
          <div 
            key={proj.id} 
            className="win-box-out p-1 bg-[#c0c0c0] shadow-md flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            {/* Project Preview Window Mockup */}
            <div className="win-box-in !bg-slate-950 p-3.5 h-52 sm:h-56 flex flex-col justify-between relative overflow-hidden">
              {/* Retro top bar */}
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-xs text-slate-200">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  ● {proj.badge}
                </span>
                <span className="font-mono text-[11px] text-slate-400 font-semibold">
                  {proj.period}
                </span>
              </div>

              {/* Center visual summary with deep details */}
              <div className="my-auto py-2">
                <h3 className="text-lg sm:text-xl font-serif font-black text-white tracking-wide mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono font-bold text-blue-300 mb-2">
                  {proj.role}
                </p>
                <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed font-medium">
                  {proj.shortDesc}
                </p>
              </div>

              {/* Bottom stats row */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800 text-center">
                {proj.stats.map((st, sIdx) => (
                  <div key={sIdx} className="bg-slate-900/90 border border-slate-800 rounded py-1 px-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter truncate font-bold">
                      {st.label}
                    </div>
                    <div className="text-xs font-black text-emerald-300 font-mono truncate">
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Project Name & Action Buttons */}
            <div className="pt-3 px-2 pb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="font-serif font-black text-gray-950 text-base sm:text-lg truncate">
                {proj.title.split('—')[0].trim()}
              </span>

              <div className="flex items-center gap-1.5">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="win-btn px-2.5 py-1.5 text-gray-900 font-serif text-xs font-bold hover:bg-[#d8d8d8] flex items-center gap-1"
                  title="GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
                {proj.liveDemo && (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="win-btn px-2.5 py-1.5 text-blue-900 font-serif text-xs font-bold hover:bg-[#d8d8d8] flex items-center gap-1"
                    title="Vercel Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    playClick();
                    onOpenProject(proj);
                  }}
                  className="win-btn px-3.5 py-1.5 text-black font-serif text-xs sm:text-sm font-bold hover:bg-[#d8d8d8] active:translate-y-0.5"
                >
                  See Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Hackathons & Technical Competitions */}
      <div className="max-w-5xl mx-auto mt-12 p-6 win-box-out bg-[#c0c0c0]">
        <div className="win-box-in p-6 bg-white">
          <h3 className="text-xl font-serif font-black text-gray-950 mb-2">
            Competitive Hackathons &amp; Recognition
          </h3>
          <p className="text-sm text-gray-800 leading-relaxed mb-4 font-medium">
            Demonstrated engineering execution under strict time constraints, shipping AI and full-stack solutions competing against 50+ national engineering teams.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resumeData.achievements.map((item, idx) => (
              <div key={idx} className="win-box-out p-1 bg-[#f0f0f0]">
                <div className="win-box-in p-3 bg-white">
                  <div className="text-sm font-black text-blue-950">{item.title} – {item.event}</div>
                  <div className="text-xs text-gray-700 mt-1 font-medium">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
