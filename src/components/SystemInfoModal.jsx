import React, { useState } from 'react';
import Window from './Window';
import { resumeData } from '../data/resumeData';
import { playClick } from '../utils/audio';
import { HardDrive, Monitor, Cpu, ShieldCheck } from 'lucide-react';

export default function SystemInfoModal({ isOpen, onClose, onFocus, zIndex }) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Window
      id="system-info-window"
      title="System Properties - My Computer"
      icon="/assets/icons/computer.png"
      isOpen={isOpen}
      isActive={true}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 100, y: 50 }}
      defaultSize={{ width: 520, height: 480 }}
      zIndex={zIndex}
      statusText="System Status: Optimal (100% Operational)"
    >
      <div className="p-4 bg-[#c0c0c0] h-full flex flex-col justify-between text-xs font-sans">
        {/* Tab Headers */}
        <div>
          <div className="flex items-center gap-1 border-b border-[#808080] pb-0 mb-3">
            {[
              { id: 'general', label: 'General' },
              { id: 'skills', label: 'Device Manager' },
              { id: 'education', label: 'Credentials' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => { playClick(); setActiveTab(t.id); }}
                className={`px-3 py-1 font-sans text-xs border-t-2 border-l-2 border-r-2 ${
                  activeTab === t.id
                    ? 'border-white bg-[#c0c0c0] border-b-2 border-b-[#c0c0c0] -mb-[2px] font-bold z-10'
                    : 'border-transparent bg-[#b0b0b0] text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab 1: General */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="win-box-out p-1 bg-[#c0c0c0]">
                  <img src="/assets/icons/computer.png" alt="PC" className="w-16 h-16 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">System:</h4>
                  <p className="text-gray-800">Kritika OS '98 Second Edition</p>
                  <p className="text-gray-600">Build 2026.09 (Production Ready)</p>
                  <p className="text-gray-600">Engine: React + Vite + Tailwind</p>
                </div>
              </div>

              <div className="border-t border-[#808080] pt-3 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Registered to:</h4>
                  <p className="font-bold text-blue-900 text-base">{resumeData.name}</p>
                  <p className="text-gray-800 text-xs">{resumeData.education.degree}</p>
                  <p className="text-gray-700 text-xs">{resumeData.education.institution}</p>
                  <p className="text-gray-500 font-mono text-[11px] mt-0.5">ID: SRMU-CSE-2023-2027</p>
                </div>
                <div className="w-16 h-16 win-box-out p-0.5 bg-[#c0c0c0] shadow-sm">
                  <img src="/assets/avatar.jpg" alt={resumeData.name} className="w-full h-full object-cover win-box-in" />
                </div>
              </div>

              <div className="border-t border-[#808080] pt-3">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Hardware &amp; Performance:</h4>
                <p className="text-gray-800">• 5x Production Internships Completed</p>
                <p className="text-gray-800">• 3rd Place National AI Hackathon (AgentathonX 2026)</p>
                <p className="text-gray-800">• Full Stack AI &amp; Multi-Agent Architecture Engine</p>
                <p className="text-gray-800">• 32.0 GB Neural Memory Allocation</p>
              </div>
            </div>
          )}

          {/* Tab 2: Skills / Device Manager */}
          {activeTab === 'skills' && (
            <div className="win-box-in p-3 bg-white max-h-[280px] overflow-y-auto space-y-2 text-xs">
              <div className="font-bold text-gray-900">Installed Drivers &amp; Technologies:</div>
              <div>
                <span className="font-bold text-blue-900">📁 Programming Languages:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.languages.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-blue-900">📁 Frameworks &amp; Libraries:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.frameworks.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-blue-900">📁 AI / Machine Learning:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.ai_ml.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-blue-900">📁 APIs &amp; Networking:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.apis.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-blue-900">📁 Databases &amp; Cloud:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.databases.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-blue-900">📁 Developer Tools:</span>
                <p className="pl-4 text-gray-700">{resumeData.skills.tools.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Credentials */}
          {activeTab === 'education' && (
            <div className="space-y-3">
              <div className="win-box-in p-3 bg-white space-y-2">
                <div className="font-bold text-gray-900">Certified Qualifications:</div>
                {resumeData.certifications.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                    <span className="text-gray-800 font-medium">{c.name}</span>
                    <span className="text-blue-900 font-mono text-[11px]">{c.issuer}</span>
                  </div>
                ))}
              </div>
              <div className="text-center pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="win-btn px-4 py-1.5 text-xs font-bold"
                >
                  Download Complete Resume (PDF)
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom OK Button */}
        <div className="pt-3 border-t border-[#808080] flex justify-end">
          <button
            onClick={() => { playClick(); onClose(); }}
            className="win-btn px-6 py-1 font-bold text-black hover:bg-[#d8d8d8]"
          >
            OK
          </button>
        </div>
      </div>
    </Window>
  );
}
