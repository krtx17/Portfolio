# 🖥️ Kritika OS '98 — Retro Windows 95/98 Interactive Portfolio

<div align="center">

`	ext
  _  ______  _____ _______ _____ _  __          ____   _____  
 | |/ /  _ \|_   _|__   __|_   _| |/ /   /\    / __ \ / ____| 
 | ' /| |_) | | |    | |    | | | ' /   /  \  | |  | | (___   
 |  < |  _ <  | |    | |    | | |  <   / /\ \ | |  | |\___ \  
 | . \| |_) |_| |_   | |   _| |_| . \ / ____ \| |__| |____) | 
 |_|\_\____/|_____|  |_|  |_____|_|\_/_/    \_\\____/|_____/  
                  W I N D O W S   9 8   E D I T I O N         
`

**An authentic, nostalgia-fueled Windows 98 / 95 interactive operating system portfolio for Kritika Tripathi.**  
*Built with React 18, Vite, Tailwind CSS, Web Audio API, and pixel-perfect retro aesthetics.*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-FF6F00?style=for-the-badge&logo=soundcharts&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](#-live-demo--preview) • [✨ Key Features](#-key-features) • [🕹️ Games & Audio](#️-interactive-games--audio-engine) • [🚀 Quickstart](#-quickstart--local-development) • [☁️ Vercel Deployment](#️-deploying-to-vercel) • [📬 Contact](#-connect-with-kritika)

</div>

---

## 🌟 Highlights

- 📟 **Authentic BIOS POST Screen**: Energy Star parody boot sequence with hardware memory check, retro keyboard prompts (Press F to pay respects), and auto-boot countdown.
- 🔐 **Cinematic Auto-Login**: Smooth retro typing animation (••••••), dynamic pink cursor glide, button click states, and Windows 98 startup chime.
- 🪟 **Desktop GUI & Window Manager**: True Win98 window chrome with draggable headers, minimize/maximize/restore, active z-index stacking, custom scrollbars, and single-click workable icons.
- 🤖 **Tic-Tac-Toe AI Bot Opponent**: Built-in intelligent bot (Kritika-Bot) with winning-move calculations, block detection, center/corner priority, and scoreboard tracking.
- 🐍 **Nokia 3310 Snake**: Authentic dot-matrix green LCD screen, arcade speed acceleration starting slow at 240ms, high-score memory, keyboard controls (Arrow keys / WASD) + on-screen D-Pad.
- 🎵 **Winamp 98 with Stranger Things Synth**: Web Audio API synthesizer playing the signature 80s Stranger Things arpeggio (C3-E3-G3-B3-C4-B3-G3-E3) with resonant lowpass filter sweeps and pulsating sub-bass.
- 📄 **ATS Single-Page Resume PDF**: Embedded Adobe Acrobat Reader '98 viewer featuring single-page ATS-formatted resume with one-click download.
- 💻 **Production AI & Full Stack Projects**: High-contrast dark CRT project showcase with GitHub code repositories and live Vercel deployment links.

---

## 🕹️ Interactive Applications & Features

| App Icon | Application | Description |
|:---:|:---|:---|
| 🏠 | **Home Window** | Complete developer profile, bio, 5 internships timeline, technical services, interactive tools grid, and FAQ accordion. |
| 📁 | **My Portfolio** | Interactive 2x2 grid of production AI, GNN, Multi-Agent, and Full Stack applications with deep-dive architectural modals. |
| 🤖 | **Tic-Tac-Toe '98 (AI Bot)** | Play solo against **Kritika-Bot** with 450ms thinking state or switch to 2-player pass-and-play mode. Includes celebratory confetti on victory. |
| 🐍 | **Snake 3310 (Nokia Edition)** | Classic Nokia 3310 arcade snake with green LCD screen, responsive controls, and dynamic speed curve. |
| 📄 | **Resume.pdf** | Adobe Acrobat '98 viewer rendering a clean, 1-page ATS-optimized resume with direct download. |
| 📻 | **Retro CD Player (Winamp)** | Real-time audio engine with 4 tracks, animated stereo visualizer, and 80s Stranger Things synth arpeggio. |
| 💻 | **My Computer** | Windows 98 System Properties dialog detailing CPU, RAM, verified technologies, and credentials. |
| ✉️ | **Outlook Express** | Retro email composer pre-configured to send messages directly to \mahitripathi966@gmail.com\. |
| 🗑️ | **Recycle Bin** | Classic system bin with nostalgic "0 bugs discarded" prompt. |

---

## 🛠️ Technology Stack

- **Core Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) (lightning-fast HMR and optimized asset bundling)
- **Styling & UI**: [Tailwind CSS 3](https://tailwindcss.com/) + custom retro Windows 98 3D bevel utility classes (\win-box-out\, \win-box-in\, \win-btn\, \win-titlebar\)
- **Sound & Synthesis**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (OscillatorNodes, BiquadFilterNodes, GainNodes for retro beeps, startup chimes, and synth arpeggios)
- **Iconography**: Custom hand-crafted pixel-art icons (Win98 House, Nokia 3310, Tic-Tac-Toe grid, Octocat, Outlook envelope) + [Lucide React](https://lucide.dev/)
- **Visual FX**: Canvas Confetti for victory celebrations, CRT scanline overlay, and phosphor equalizer visualizer

---

## 📂 Project Structure

`	ext
portfolio/
├── public/
│   ├── assets/
│   │   ├── icons/            # Handcrafted retro pixel-art icons (home, snake, tictactoe, etc.)
│   │   ├── wallpaper.jpg     # Nostalgic Windows 98 desktop background
│   │   └── portrait.jpg      # Developer workstation photo
│   ├── resume.pdf            # Single-page ATS resume PDF
│   └── favicon.ico           # Win98 retro icon
├── src/
│   ├── components/
│   │   ├── BiosScreen.jsx    # Energy Star BIOS boot screen
│   │   ├── LockScreen.jsx    # CRT auto-login sequence
│   │   ├── Desktop.jsx       # Desktop icon layout and window manager
│   │   ├── Window.jsx        # Draggable, resizable Win98 window frame
│   │   ├── HomeWindow.jsx    # Main developer bio and experience
│   │   ├── PortfolioWindow.jsx # Production projects showcase
│   │   ├── ProjectModal.jsx  # Project deep-dive details modal
│   │   ├── NokiaSnake.jsx    # Classic Nokia 3310 Snake game
│   │   ├── TicTacToe.jsx     # AI Bot Tic-Tac-Toe game
│   │   ├── MusicPlayer.jsx   # Winamp 98 synth player (Stranger Things)
│   │   ├── ResumeModal.jsx   # Acrobat '98 PDF viewer
│   │   ├── SystemInfoModal.jsx # My Computer System Properties
│   │   ├── ContactModal.jsx  # Outlook Express email client
│   │   └── Taskbar.jsx       # Win98 Start menu, active tabs, clock
│   ├── data/
│   │   └── resumeData.js     # Single source of truth for resume data
│   ├── utils/
│   │   └── audio.js          # Web Audio API sound generator
│   ├── App.jsx               # Main state orchestrator (BIOS -> Lock -> Desktop)
│   └── index.css             # Windows 98 3D borders, scanlines, and typography
├── vercel.json               # Vercel deployment configuration
├── package.json
└── vite.config.js
`

---

## 🚀 Quickstart & Local Development

### 1. Clone the repository
`ash
git clone https://github.com/kritikatripathi17/portfolio.git
cd portfolio
`

### 2. Install dependencies
`ash
npm install
`

### 3. Run development server
`ash
npm run dev
`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
`ash
npm run build
`

---

## ☁️ Deploying to Vercel

This repository is pre-configured with ercel.json for zero-configuration, one-click deployments.

### Method 1: Push to GitHub & Import in Vercel (Recommended)
1. Push this repository to your GitHub account.
2. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
3. Select your repository (portfolio).
4. Keep the default settings (Framework: **Vite**, Build Command: 
pm run build, Output Directory: dist).
5. Click **Deploy**!

### Method 2: Deploy from Terminal (Vercel CLI)
`ash
npx vercel
`
Follow the on-screen prompts to log into Vercel and deploy. For production:
`ash
npx vercel --prod
`

---

## 📬 Connect with Kritika

- **Name**: Kritika Tripathi
- **Role**: AI & Full Stack Developer | B.Tech CSE (2023–2027)
- **Email**: [mahitripathi966@gmail.com](mailto:mahitripathi966@gmail.com)
- **LinkedIn**: [linkedin.com/in/kritika-tripathi](https://www.linkedin.com/in/kritika-tripathi-837441246)
- **GitHub**: [github.com/kritikatripathi17](https://github.com/kritikatripathi17)

---

<div align="center">
  <sub>Designed &amp; Built with nostalgic ❤️ for the classic golden age of computing.</sub>
</div>
