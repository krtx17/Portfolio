import React, { useState } from 'react';
import { resumeData } from '../data/resumeData';
import { playClick } from '../utils/audio';
import { 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Sparkles,
  FileText,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';

export default function HomeWindow({ 
  onOpenProject, 
  onOpenPortfolio, 
  onOpenContact, 
  onOpenResume,
  onOpenSnake,
  onOpenTicTacToe 
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#e8f1fa] text-black font-sans leading-relaxed text-sm selection:bg-[#000080] selection:text-white">
      {/* Top Header Sky Section */}
      <div 
        className="w-full p-4 sm:p-10 border-b-2 border-[#808080]"
        style={{
          background: 'linear-gradient(180deg, #99c2ec 0%, #b8d7f7 50%, #d8e9fc 100%)'
        }}
      >
        {/* Navigation Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button 
            onClick={() => { playClick(); onOpenPortfolio(); }}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8]"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('sec-services')}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8]"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('sec-tools')}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8]"
          >
            Tools
          </button>
          <button 
            onClick={() => scrollToSection('sec-experience')}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8]"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('sec-faq')}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8]"
          >
            FAQ
          </button>
          <button 
            onClick={() => { playClick(); onOpenResume(); }}
            className="win-btn px-4 py-1.5 text-black font-serif text-sm sm:text-base font-bold shadow hover:bg-[#d8d8d8] flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-blue-800" />
            <span>Resume</span>
          </button>
          <button 
            onClick={() => { playClick(); onOpenSnake(); }}
            className="win-btn px-3 py-1.5 text-black font-serif text-sm font-bold shadow hover:bg-[#d8d8d8] flex items-center gap-1.5"
            title="Play Nokia Snake"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>Snake '98</span>
          </button>
        </div>

        {/* Hero Card Content */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Portrait Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="win-box-out p-1 bg-[#c0c0c0] shadow-xl w-64 h-72 sm:w-72 sm:h-80">
              <div className="w-full h-full win-box-in overflow-hidden relative group">
                <img 
                  src="/assets/portrait.jpg" 
                  alt={resumeData.name} 
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs text-white text-xs font-pixel p-1.5 text-center font-bold tracking-wide">
                  Kritika Tripathi · B.Tech CSE (2023-2027)
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Social Details */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping inline-block" />
              <span className="text-gray-900 font-serif italic text-base font-semibold">
                {resumeData.status}
              </span>
            </div>

            <div className="text-blue-900 font-serif text-lg sm:text-xl font-bold tracking-wide">
              <a 
                href={`mailto:${resumeData.email}`}
                className="hover:underline flex items-center gap-2"
                onClick={() => playClick()}
              >
                <Mail className="w-4 h-4 text-blue-900" />
                <span>{resumeData.email}</span>
              </a>
            </div>

            {/* Socials Block */}
            <div className="space-y-2 pt-1 text-gray-900 font-serif">
              <p className="font-bold text-gray-950 text-sm tracking-wide">Socials &amp; Profiles</p>
              
              <div className="flex items-center justify-between py-1 border-b border-blue-300/60">
                <span className="text-gray-800 flex items-center gap-1.5 font-medium text-sm">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <span>/linkedin</span>
                </span>
                <a 
                  href={resumeData.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="text-blue-900 hover:underline font-mono font-bold text-sm"
                >
                  @{resumeData.socials.linkedin.handle}
                </a>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-blue-300/60">
                <span className="text-gray-800 flex items-center gap-1.5 font-medium text-sm">
                  <Github className="w-4 h-4 text-gray-950" />
                  <span>/github</span>
                </span>
                <a 
                  href={resumeData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="text-blue-900 hover:underline font-mono font-bold text-sm"
                >
                  @{resumeData.socials.github.handle}
                </a>
              </div>



              <div className="flex items-center justify-between py-1">
                <span className="text-gray-800 flex items-center gap-1.5 font-medium text-sm">
                  <MapPin className="w-4 h-4 text-red-700" />
                  <span>/location</span>
                </span>
                <span className="text-gray-950 font-mono font-bold text-xs">
                  {resumeData.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Text / Headline */}
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t-2 border-blue-300/60">
          <p className="text-xs font-black uppercase tracking-wider text-blue-950">
            {resumeData.title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 mt-1 font-black">
            {resumeData.name}
          </h2>
          <p className="mt-3 text-gray-900 text-sm sm:text-base leading-relaxed font-serif font-medium">
            {resumeData.summary}
          </p>
        </div>
      </div>

      {/* Main Work Preview Section */}
      <div id="sec-work" className="p-4 sm:p-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#808080]">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 flex items-center gap-2">
            <span>Featured Projects</span>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-xs win-box-in">
              Production AI &amp; Full Stack
            </span>
          </h3>
          <button
            onClick={() => { playClick(); onOpenPortfolio(); }}
            className="win-btn px-4 py-1 text-xs font-serif font-bold hover:bg-[#d8d8d8]"
          >
            All Projects ➔
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.projects.map((proj) => (
            <div 
              key={proj.id}
              className="win-box-out p-1 bg-[#c0c0c0] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div className="win-box-in p-5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 text-[11px] font-pixel tracking-wide bg-blue-950 text-white rounded-xs font-bold">
                      {proj.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a 
                        href={proj.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); playClick(); }}
                        className="win-btn px-2 py-0.5 text-[11px] font-mono font-bold text-gray-900 hover:bg-[#d8d8d8] flex items-center gap-1"
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
                          onClick={(e) => { e.stopPropagation(); playClick(); }}
                          className="win-btn px-2 py-0.5 text-[11px] font-mono font-bold text-blue-900 hover:bg-[#d8d8d8] flex items-center gap-1"
                          title="Vercel Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo ↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-serif font-black text-gray-950 mb-1">
                    {proj.title}
                  </h4>
                  <p className="text-xs font-mono font-bold text-gray-800 mb-3">
                    {proj.role} · {proj.period}
                  </p>

                  <ul className="space-y-2 mb-4 pl-1">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-gray-950 leading-snug">
                        <span className="text-blue-900 font-black mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags and action buttons */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono font-bold bg-gray-100 border border-gray-300 px-2 py-0.5 text-gray-800 rounded-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-300">
                    <span className="text-xs font-serif italic text-gray-800 font-semibold">
                      {proj.stats[0]?.label}: <strong className="text-blue-950 font-bold">{proj.stats[0]?.value}</strong>
                    </span>
                    <button
                      onClick={() => { playClick(); onOpenProject(proj); }}
                      className="win-btn px-5 py-1.5 text-black font-serif font-bold text-xs sm:text-sm hover:bg-[#d8d8d8] active:translate-y-0.5 shadow"
                    >
                      See Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View My Portfolio Banner */}
        <div className="mt-10 p-6 win-box-out bg-[#c0c0c0] text-center shadow">
          <p className="text-base sm:text-lg font-serif font-bold text-gray-900 mb-3">
            Wanna see more? Check my complete portfolio page!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { playClick(); onOpenPortfolio(); }}
              className="win-btn px-8 py-2 text-base font-serif font-bold text-black hover:bg-[#d8d8d8] shadow-md active:translate-y-0.5"
            >
              View My Portfolio
            </button>
            <button
              onClick={() => { playClick(); onOpenResume(); }}
              className="win-btn px-6 py-2 text-base font-serif font-bold text-blue-950 hover:bg-[#d8d8d8] shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Resume PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="sec-services" className="p-4 sm:p-10 max-w-5xl mx-auto border-t-2 border-[#808080]">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 mb-6">
          Technical Services &amp; Capabilities
        </h3>
        <div className="space-y-4">
          {resumeData.services.map((srv, idx) => (
            <div key={idx} className="win-box-out p-1 bg-[#c0c0c0] shadow-sm">
              <div className="win-box-in p-4 bg-white">
                <h4 className="text-base sm:text-lg font-serif font-bold text-gray-950 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" />
                  <span>{srv.title}</span>
                </h4>
                <p className="text-gray-900 text-sm font-medium leading-relaxed pl-6">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div id="sec-tools" className="p-4 sm:p-10 max-w-5xl mx-auto border-t-2 border-[#808080]">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 mb-6">
          Tools &amp; Technologies Grid
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {resumeData.toolsGrid.map((tool, idx) => (
            <div key={idx} className="win-box-out p-1 bg-[#c0c0c0] shadow-sm text-center">
              <div className="win-box-in p-4 bg-white flex flex-col items-center justify-center min-h-[115px]">
                <span className="text-3xl mb-1">{tool.icon}</span>
                <span className="font-serif font-bold text-gray-950 text-base">
                  {tool.name}
                </span>
                <span className="text-[11px] font-mono font-bold text-blue-900 mt-0.5">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div id="sec-experience" className="p-4 sm:p-10 max-w-5xl mx-auto border-t-2 border-[#808080]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
            Work Experience &amp; Internships
          </h3>
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 win-box-in">
            5 Internships Completed
          </span>
        </div>

        <div className="space-y-4">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="win-box-out p-1 bg-[#c0c0c0] shadow-sm">
              <div className="win-box-in p-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 border-b border-gray-300 pb-2">
                  <div>
                    <h4 className="text-base sm:text-lg font-serif font-black text-gray-950">
                      {exp.company}
                    </h4>
                    <span className="text-sm font-serif italic font-bold text-blue-900">
                      {exp.role}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-gray-700 sm:text-right">
                    <div>{exp.period}</div>
                    <div className="text-gray-600 font-semibold">{exp.location}</div>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-900 pl-2">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 leading-relaxed font-medium">
                      <span className="text-blue-800 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Achievements */}
      <div className="p-4 sm:p-10 max-w-5xl mx-auto border-t-2 border-[#808080]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="win-box-out p-1 bg-[#c0c0c0]">
            <div className="win-box-in p-5 bg-white h-full">
              <h4 className="text-lg font-serif font-black text-gray-950 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <span>Education</span>
              </h4>
              <p className="font-bold text-gray-950 text-base">
                {resumeData.education.institution}
              </p>
              <p className="font-serif italic font-bold text-blue-900 text-sm">
                {resumeData.education.degree}
              </p>
              <p className="text-xs font-mono font-bold text-gray-600 mb-3 mt-1">
                {resumeData.education.period} · {resumeData.education.location}
              </p>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">
                <strong>Relevant Coursework:</strong> {resumeData.education.coursework}
              </p>
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="win-box-out p-1 bg-[#c0c0c0]">
            <div className="win-box-in p-5 bg-white h-full flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-serif font-black text-gray-950 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-900" />
                  <span>Key Competitions &amp; Hackathons</span>
                </h4>
                <div className="space-y-2 text-xs text-gray-900 font-medium">
                  {resumeData.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-blue-800 font-bold">•</span>
                      <span>
                        <strong className="font-bold text-gray-950">{ach.title}</strong> – {ach.event} ({ach.desc})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-300 mt-3 text-xs text-gray-800">
                <strong>Certifications:</strong> NPTEL IIT Madras (Machine Learning), Netcamp Solutions (Ethical Hacking, Android Dev, Web Dev with Python).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="sec-faq" className="p-4 sm:p-10 max-w-5xl mx-auto border-t-2 border-[#808080]">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 mb-6">
          FAQ
        </h3>
        <div className="space-y-3">
          {resumeData.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="win-box-out p-1 bg-[#c0c0c0]">
                <button
                  onClick={() => {
                    playClick();
                    setOpenFaq(isOpen ? null : idx);
                  }}
                  className="w-full text-left win-box-in p-3.5 bg-white flex items-center justify-between hover:bg-blue-50/50"
                >
                  <span className="font-serif font-bold text-gray-950 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span className="text-xl font-black font-mono px-2">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="win-box-in p-4 bg-[#f8fafd] text-gray-900 text-xs sm:text-sm border-t-0 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Contact Section */}
      <div className="p-5 sm:p-12 text-center border-t-2 border-[#808080] bg-[#e4effa]">
        <p className="text-gray-800 font-serif text-base mb-1 font-semibold">
          Got any questions? Contact me!
        </p>
        <a 
          href={`mailto:${resumeData.email}`}
          onClick={() => playClick()}
          className="text-2xl sm:text-3xl font-serif font-black text-gray-950 hover:text-blue-900 hover:underline inline-block mb-6"
        >
          {resumeData.email}
        </a>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { playClick(); onOpenContact(); }}
            className="win-btn px-6 py-2 text-sm font-serif font-bold shadow hover:bg-[#d8d8d8]"
          >
            Open Email Client
          </button>
          <a
            href={resumeData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            className="win-btn px-5 py-2 text-sm font-serif font-bold shadow hover:bg-[#d8d8d8] flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4 text-blue-700" />
            <span>LinkedIn Profile</span>
          </a>
          <a
            href={resumeData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            className="win-btn px-5 py-2 text-sm font-serif font-bold shadow hover:bg-[#d8d8d8] flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}
