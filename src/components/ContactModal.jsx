import React, { useState } from 'react';
import Window from './Window';
import { resumeData } from '../data/resumeData';
import { playClick, playStartupChime } from '../utils/audio';
import { Mail, Send, Paperclip, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose, onFocus, zIndex }) {
  const [subject, setSubject] = useState('Opportunity Discussion / Project Inquiry');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    playClick();
    playStartupChime();
    setSent(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Also offer opening mailto
    const mailtoUrl = `mailto:${resumeData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `From: ${senderEmail}\n\n${message}`
    )}`;
    setTimeout(() => {
      window.open(mailtoUrl, '_blank');
    }, 1200);
  };

  return (
    <Window
      id="contact-window"
      title="New Message - Outlook Express 98"
      icon="/assets/icons/folder.png"
      isOpen={isOpen}
      isActive={true}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 160, y: 90 }}
      defaultSize={{ width: 680, height: 500 }}
      zIndex={zIndex}
      statusText={`Ready to send to ${resumeData.email}`}
    >
      <div className="p-4 bg-[#c0c0c0] h-full flex flex-col justify-between">
        {sent ? (
          <div className="win-box-in p-8 bg-white my-auto text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Message Prepared &amp; Dispatched!
            </h3>
            <p className="text-sm text-gray-700 max-w-md mx-auto">
              Your default email application is launching to deliver your message directly to{' '}
              <strong className="text-blue-900">{resumeData.email}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSent(false);
                  onClose();
                }}
                className="win-btn px-6 py-1.5 text-sm font-serif font-bold"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3 flex-1 flex flex-col">
            {/* Top Toolbar */}
            <div className="flex items-center gap-2 pb-2 border-b border-[#808080]">
              <button
                type="submit"
                className="win-btn px-4 py-1 text-xs font-serif font-bold flex items-center gap-1.5 bg-[#d4d4d4]"
              >
                <Send className="w-3.5 h-3.5 text-blue-900" />
                <span>Send</span>
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="win-btn px-3 py-1 text-xs font-serif flex items-center gap-1.5"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attach Resume</span>
              </a>
            </div>

            {/* Email Header Fields */}
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <label className="w-16 text-gray-700 font-bold text-right">To:</label>
                <input
                  type="text"
                  readOnly
                  value={resumeData.email}
                  className="flex-1 win-box-in px-2 py-1 bg-gray-100 text-blue-900 font-mono text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-16 text-gray-700 font-bold text-right">Your Email:</label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="flex-1 win-box-in px-2 py-1 bg-white text-black font-sans text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-16 text-gray-700 font-bold text-right">Subject:</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 win-box-in px-2 py-1 bg-white text-black font-sans text-xs outline-none"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 flex flex-col pt-1">
              <textarea
                required
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or inquiry here..."
                className="flex-1 w-full win-box-in p-3 bg-white text-black font-sans text-xs outline-none resize-none"
              />
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
              <span>Connect via LinkedIn: @{resumeData.socials.linkedin.handle}</span>
              <span>Phone: {resumeData.phone}</span>
            </div>
          </form>
        )}
      </div>
    </Window>
  );
}
