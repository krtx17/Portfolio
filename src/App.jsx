import React, { useState } from 'react';
import BiosScreen from './components/BiosScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

export default function App() {
  // Allow ?screen=desktop or #desktop for direct desktop testing, default to authentic bios boot sequence
  const initialScreen = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('screen') === 'desktop' || window.location.hash === '#desktop') {
        return 'desktop';
      }
      if (params.get('screen') === 'lock' || window.location.hash === '#lock') {
        return 'lock';
      }
    }
    return 'bios';
  };

  const [currentScreen, setCurrentScreen] = useState(initialScreen);

  return (
    <main className="w-screen h-screen overflow-hidden bg-black select-none">
      {currentScreen === 'bios' && (
        <BiosScreen 
          onEnter={() => setCurrentScreen('lock')} 
          onSkip={() => setCurrentScreen('desktop')}
        />
      )}

      {currentScreen === 'lock' && (
        <LockScreen onUnlock={() => setCurrentScreen('desktop')} />
      )}

      {currentScreen === 'desktop' && (
        <Desktop onRestartBoot={() => setCurrentScreen('bios')} />
      )}
    </main>
  );
}
