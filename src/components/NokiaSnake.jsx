import React, { useState, useEffect, useRef } from 'react';
import Window from './Window';
import { playBeep, playClick, playError, playStartupChime } from '../utils/audio';

const GRID_SIZE = 16;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 8, y: 9 },
  { x: 8, y: 10 }
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function NokiaSnake({ isOpen, onClose, onFocus, zIndex }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 4, y: 4 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const dirRef = useRef(INITIAL_DIRECTION);
  dirRef.current = direction;

  const generateFood = (currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const onSnake = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  };

  const startGame = () => {
    playClick();
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    dirRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isGameOver) return;
      if (['ArrowUp', 'KeyW'].includes(e.code) && dirRef.current.y === 0) {
        setDirection({ x: 0, y: -1 });
      } else if (['ArrowDown', 'KeyS'].includes(e.code) && dirRef.current.y === 0) {
        setDirection({ x: 0, y: 1 });
      } else if (['ArrowLeft', 'KeyA'].includes(e.code) && dirRef.current.x === 0) {
        setDirection({ x: -1, y: 0 });
      } else if (['ArrowRight', 'KeyD'].includes(e.code) && dirRef.current.x === 0) {
        setDirection({ x: 1, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const tickSpeed = Math.max(90, 240 - Math.floor(score / 20) * 15);

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = {
          x: prevSnake[0].x + dirRef.current.x,
          y: prevSnake[0].y + dirRef.current.y
        };

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          playError();
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          playError();
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          playBeep();
          setScore((prev) => {
            const next = prev + 10;
            if (next > highScore) setHighScore(next);
            return next;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, food, score, highScore]);

  return (
    <Window
      id="snake-window"
      title="Snake 3310 - Nokia Edition"
      icon="/assets/icons/snake.png"
      isOpen={isOpen}
      isActive={true}
      showMenuBar={false}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 260, y: 15 }}
      defaultSize={{ width: 280, height: 350 }}
      zIndex={zIndex}
      statusText={`Score: ${score} | High: ${highScore} | Speed: ${Math.round(1000 / Math.max(90, 240 - Math.floor(score / 20) * 15))} fps`}
    >
      <div className="p-2 bg-[#c0c0c0] h-full flex flex-col justify-between items-center select-none font-pixel overflow-hidden">
        {/* Nokia Green LCD Screen */}
        <div 
          className="w-48 h-48 p-1 win-box-in border-4 border-[#2b442b] shadow-inner relative flex flex-col justify-between shrink-0"
          style={{ backgroundColor: '#9bbc0f' }}
        >
          {/* Top LCD Score Bar */}
          <div className="flex items-center justify-between text-[#0f380f] text-xs px-1 font-bold border-b border-[#8bac0f] pb-0.5">
            <span>SCORE: {score}</span>
            <span>HIGH: {highScore}</span>
          </div>

          {/* Grid canvas */}
          <div className="relative flex-1 w-full h-full grid grid-cols-16 grid-rows-16">
            {/* Food */}
            <div
              className="absolute w-[6.25%] h-[6.25%] bg-[#0f380f] rounded-full animate-ping"
              style={{
                left: `${food.x * 6.25}%`,
                top: `${food.y * 6.25}%`
              }}
            />
            <div
              className="absolute w-[6.25%] h-[6.25%] bg-[#0f380f] rounded-xs"
              style={{
                left: `${food.x * 6.25}%`,
                top: `${food.y * 6.25}%`
              }}
            />

            {/* Snake segments */}
            {snake.map((seg, i) => (
              <div
                key={i}
                className="absolute w-[6.25%] h-[6.25%] bg-[#0f380f] border-[0.5px] border-[#9bbc0f] rounded-xs"
                style={{
                  left: `${seg.x * 6.25}%`,
                  top: `${seg.y * 6.25}%`
                }}
              />
            ))}

            {/* Game Over / Start Overlay */}
            {(!isPlaying || isGameOver) && (
              <div className="absolute inset-0 bg-[#9bbc0f]/90 flex flex-col items-center justify-center text-[#0f380f] p-2 text-center">
                <h3 className="text-lg font-bold mb-1">
                  {isGameOver ? 'GAME OVER!' : 'SNAKE 3310'}
                </h3>
                <p className="text-xs mb-2">
                  {isGameOver ? `Final Score: ${score}` : 'Classic Nokia Game'}
                </p>
                <button
                  onClick={startGame}
                  className="win-btn px-3 py-0.5 text-black font-sans font-bold text-xs shadow"
                >
                  {isGameOver ? 'Play Again' : 'Start Game'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* D-Pad Controls for Mobile/Click */}
        <div className="pt-1 flex flex-col items-center gap-1 font-sans shrink-0">
          <button
            onClick={() => { if (dirRef.current.y === 0) setDirection({ x: 0, y: -1 }); }}
            className="win-btn w-8 h-5 font-bold text-[11px]"
          >
            ▲
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={() => { if (dirRef.current.x === 0) setDirection({ x: -1, y: 0 }); }}
              className="win-btn w-8 h-5 font-bold text-[11px]"
            >
              ◀
            </button>
            <button
              onClick={() => { if (dirRef.current.y === 0) setDirection({ x: 0, y: 1 }); }}
              className="win-btn w-8 h-5 font-bold text-[11px]"
            >
              ▼
            </button>
            <button
              onClick={() => { if (dirRef.current.x === 0) setDirection({ x: 1, y: 0 }); }}
              className="win-btn w-8 h-5 font-bold text-[11px]"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}
