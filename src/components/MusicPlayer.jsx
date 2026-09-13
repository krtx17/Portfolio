import React, { useState, useEffect, useRef } from 'react';
import Window from './Window';
import { playClick } from '../utils/audio';
import { Play, Pause, SkipForward, Volume2, Music as MusicIcon } from 'lucide-react';

export default function MusicPlayer({ isOpen, onClose, onFocus, zIndex }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [bars, setBars] = useState([40, 70, 30, 90, 60, 45, 80, 50]);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  const tracks = [
    { 
      title: "Stranger Things (80s Retro Synth)", 
      duration: "3:05", 
      interval: 180,
      scale: [130.81, 164.81, 196.00, 246.94, 261.63, 246.94, 196.00, 164.81],
      type: "synth"
    },
    { 
      title: "Windows 98 Ambient Chill", 
      duration: "2:45", 
      interval: 260,
      scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
      type: "ambient"
    },
    { 
      title: "AgentathonX Synthwave", 
      duration: "3:12", 
      interval: 200,
      scale: [174.61, 220.00, 261.63, 329.63, 349.23, 261.63],
      type: "synthwave"
    },
    { 
      title: "Lo-Fi Deep Learning Beat", 
      duration: "2:20", 
      interval: 320,
      scale: [220.00, 261.63, 329.63, 392.00, 440.00, 329.63],
      type: "lofi"
    }
  ];

  // Synthesize background chiptune pattern
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const activeTrack = tracks[trackIndex];
      let step = 0;

      timerRef.current = setInterval(() => {
        // Equalizer animation
        setBars([
          Math.floor(Math.random() * 80) + 15,
          Math.floor(Math.random() * 95) + 10,
          Math.floor(Math.random() * 70) + 20,
          Math.floor(Math.random() * 85) + 15,
          Math.floor(Math.random() * 90) + 10,
          Math.floor(Math.random() * 75) + 25,
          Math.floor(Math.random() * 85) + 20,
          Math.floor(Math.random() * 65) + 30
        ]);

        // Synthesize retro note
        if (ctx && ctx.state === 'running') {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          const freq = activeTrack.scale[step % activeTrack.scale.length];
          osc.type = activeTrack.type === 'synth' ? 'sawtooth' : (step % 2 === 0 ? 'triangle' : 'sine');
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          if (activeTrack.type === 'synth') {
            filter.type = 'lowpass';
            // Smooth resonant filter cutoff sweep
            const cutoff = 750 + Math.sin(step * 0.35) * 350;
            filter.frequency.setValueAtTime(cutoff, ctx.currentTime);
            filter.Q.setValueAtTime(4.2, ctx.currentTime);

            gain.gain.setValueAtTime(0.045, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17);

            // Sub-bass pulse on downbeat (C2 = 65.41 Hz)
            if (step % 8 === 0) {
              const bassOsc = ctx.createOscillator();
              const bassGain = ctx.createGain();
              bassOsc.type = 'sawtooth';
              bassOsc.frequency.setValueAtTime(65.41, ctx.currentTime);
              bassGain.gain.setValueAtTime(0.05, ctx.currentTime);
              bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
              bassOsc.connect(bassGain);
              bassGain.connect(filter);
              bassOsc.start();
              bassOsc.stop(ctx.currentTime + 0.35);
            }
          } else {
            gain.gain.setValueAtTime(0.035, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
          }

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.18);
        }
        step++;
      }, activeTrack.interval);

    } catch (e) {}

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, trackIndex]);

  const togglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    playClick();
    setTrackIndex((trackIndex + 1) % tracks.length);
  };

  return (
    <Window
      id="music-player-window"
      title="Retro CD Player - Winamp 98"
      icon="/assets/icons/music.png"
      isOpen={isOpen}
      isActive={true}
      onClose={() => {
        setIsPlaying(false);
        onClose();
      }}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 220, y: 130 }}
      defaultSize={{ width: 440, height: 320 }}
      zIndex={zIndex}
      statusText={isPlaying ? `Playing: ${tracks[trackIndex].title}` : "Stopped"}
    >
      <div className="p-4 bg-[#c0c0c0] h-full flex flex-col justify-between select-none">
        {/* Visualizer Display Screen */}
        <div className="win-box-in p-3 bg-black text-[#55ff55] font-mono flex flex-col justify-between h-32 rounded-xs shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <MusicIcon className="w-3.5 h-3.5 animate-spin" />
              <span>{tracks[trackIndex].title}</span>
            </span>
            <span className="text-[11px] text-[#55ff55]/80">{tracks[trackIndex].duration}</span>
          </div>

          {/* Equalizer Bars */}
          <div className="flex items-end justify-center gap-2 h-14 py-1">
            {bars.map((height, i) => (
              <div
                key={i}
                style={{ height: `${isPlaying ? height : 10}%` }}
                className="w-4 bg-gradient-to-t from-emerald-600 via-yellow-400 to-red-500 rounded-t-xs transition-all duration-150"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>STEREO 44.1kHz</span>
            <span>{isPlaying ? "STATUS: PLAYING" : "STATUS: PAUSED"}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={togglePlay}
            className="win-btn px-6 py-2 text-sm font-bold flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-700" /> : <Play className="w-4 h-4 text-emerald-700" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={nextTrack}
            className="win-btn px-4 py-2 text-sm font-medium flex items-center gap-1.5"
            title="Next Track"
          >
            <SkipForward className="w-4 h-4" />
            <span>Next</span>
          </button>
        </div>

        <div className="text-center text-[11px] text-gray-600 font-sans pt-2">
          Kritika's Retro Synthwave Audio Engine
        </div>
      </div>
    </Window>
  );
}
