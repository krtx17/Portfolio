import React, { useState, useEffect } from 'react';
import Window from './Window';
import { playClick, playBeep, playStartupChime, playError } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Bot, User, RotateCcw } from 'lucide-react';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export default function TicTacToe({ isOpen, onClose, onFocus, zIndex }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('bot'); // 'bot' | 'pvp'
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [scores, setScores] = useState({ player: 0, bot: 0, draws: 0 });

  const calculateWinner = (squares) => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const winResult = calculateWinner(board);
  const winner = winResult?.winner || null;
  const winningLine = winResult?.line || [];
  const isDraw = !winner && board.every((square) => square !== null);

  // Bot AI decision logic
  const findBestMove = (squares) => {
    // 1. Check if Bot ('O') can win in the next move
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      const lineVals = [squares[a], squares[b], squares[c]];
      const oCount = lineVals.filter(v => v === 'O').length;
      const nullCount = lineVals.filter(v => v === null).length;
      if (oCount === 2 && nullCount === 1) {
        if (squares[a] === null) return a;
        if (squares[b] === null) return b;
        if (squares[c] === null) return c;
      }
    }

    // 2. Block player ('X') from winning
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      const lineVals = [squares[a], squares[b], squares[c]];
      const xCount = lineVals.filter(v => v === 'X').length;
      const nullCount = lineVals.filter(v => v === null).length;
      if (xCount === 2 && nullCount === 1) {
        if (squares[a] === null) return a;
        if (squares[b] === null) return b;
        if (squares[c] === null) return c;
      }
    }

    // 3. Take center if available
    if (squares[4] === null) return 4;

    // 4. Take any corner
    const corners = [0, 2, 6, 8].filter(idx => squares[idx] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Take any empty cell
    const emptyCells = squares.map((v, idx) => v === null ? idx : null).filter(v => v !== null);
    if (emptyCells.length > 0) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return null;
  };

  // Bot response effect
  useEffect(() => {
    if (gameMode !== 'bot' || isXNext || winner || isDraw) return;

    setIsBotThinking(true);
    const timer = setTimeout(() => {
      const bestMove = findBestMove(board);
      if (bestMove !== null) {
        playBeep();
        const nextBoard = board.slice();
        nextBoard[bestMove] = 'O';
        setBoard(nextBoard);
        setIsXNext(true);

        const outcome = calculateWinner(nextBoard);
        if (outcome && outcome.winner === 'O') {
          playError();
          setScores((prev) => ({ ...prev, bot: prev.bot + 1 }));
        } else if (nextBoard.every(sq => sq !== null)) {
          setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
      }
      setIsBotThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [isXNext, gameMode, board, winner, isDraw]);

  const handleClick = (i) => {
    if (winner || isDraw || board[i] || isBotThinking) return;
    if (gameMode === 'bot' && !isXNext) return;

    playBeep();
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);

    const outcome = calculateWinner(nextBoard);
    if (outcome) {
      if (outcome.winner === 'X') {
        playStartupChime();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setScores((prev) => ({ ...prev, player: prev.player + 1 }));
      } else {
        setScores((prev) => ({ ...prev, bot: prev.bot + 1 }));
      }
      setIsXNext(!isXNext);
      return;
    }

    if (nextBoard.every((sq) => sq !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      setIsXNext(!isXNext);
      return;
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsBotThinking(false);
  };

  const switchMode = (mode) => {
    playClick();
    setGameMode(mode);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsBotThinking(false);
  };

  return (
    <Window
      id="tictactoe-window"
      title="Tic-Tac-Toe '98 (AI Bot Edition)"
      icon="/assets/icons/tictactoe.png"
      isOpen={isOpen}
      isActive={true}
      onClose={onClose}
      onMinimize={onClose}
      onFocus={onFocus}
      defaultPos={{ x: 230, y: 35 }}
      defaultSize={{ width: 360, height: 465 }}
      zIndex={zIndex}
      statusText={
        winner 
          ? `Game Over: ${winner === 'X' ? 'You' : gameMode === 'bot' ? 'Kritika-Bot' : 'Player O'} Won!` 
          : isDraw 
          ? 'Draw Game!' 
          : isBotThinking 
          ? 'Kritika-Bot is calculating move...' 
          : `${isXNext ? 'Your Turn (X)' : gameMode === 'bot' ? 'Bot Turn (O)' : 'Player O Turn'}`
      }
    >
      <div className="p-3.5 bg-[#c0c0c0] h-full flex flex-col justify-between items-center select-none font-sans">
        {/* Game Mode Selector Bar */}
        <div className="w-full flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => switchMode('bot')}
              className={`win-btn px-2 py-1 text-xs font-bold flex items-center gap-1 ${
                gameMode === 'bot' ? 'win-btn-pressed text-blue-900 bg-[#dfdfdf]' : 'text-gray-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-blue-800" />
              <span>vs AI Bot</span>
            </button>
            <button
              onClick={() => switchMode('pvp')}
              className={`win-btn px-2 py-1 text-xs font-bold flex items-center gap-1 ${
                gameMode === 'pvp' ? 'win-btn-pressed text-blue-900 bg-[#dfdfdf]' : 'text-gray-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-gray-800" />
              <span>2 Players</span>
            </button>
          </div>

          <button
            onClick={resetGame}
            className="win-btn px-2 py-1 text-xs font-bold flex items-center gap-1 text-gray-900 hover:bg-[#d8d8d8]"
            title="Reset Current Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>

        {/* Scoreboard Bar */}
        <div className="win-box-in px-3 py-1 bg-[#d4d0c8] w-full flex items-center justify-between text-xs font-mono font-bold text-gray-900 mb-2">
          <span className="text-blue-900">You (X): {scores.player}</span>
          <span className="text-gray-700">Draws: {scores.draws}</span>
          <span className="text-red-800">{gameMode === 'bot' ? 'Bot (O)' : 'P2 (O)'}: {scores.bot}</span>
        </div>

        {/* Status Indicator Banner */}
        <div className="win-box-in px-3 py-1.5 bg-white w-full text-center font-bold text-xs text-gray-900 mb-2.5 shadow-inner">
          {winner ? (
            <span className={winner === 'X' ? 'text-emerald-700' : 'text-red-700'}>
              ★ {winner === 'X' ? 'Victory! You Won!' : gameMode === 'bot' ? 'Bot Won this round!' : 'Player O Won!'} ★
            </span>
          ) : isDraw ? (
            <span className="text-amber-800">Game Over - It's a Draw!</span>
          ) : isBotThinking ? (
            <span className="text-purple-700 flex items-center justify-center gap-1.5 animate-pulse">
              <Bot className="w-3.5 h-3.5" />
              <span>Kritika-Bot is calculating move...</span>
            </span>
          ) : (
            <span>
              Turn: <strong className={isXNext ? 'text-blue-800' : 'text-red-800'}>
                {isXNext ? 'You (X)' : gameMode === 'bot' ? 'Bot (O)' : 'Player O'}
              </strong>
            </span>
          )}
        </div>

        {/* 3x3 Board */}
        <div className="grid grid-cols-3 gap-1.5 win-box-in p-2 bg-[#808080] rounded-xs">
          {board.map((val, idx) => {
            const isWinningCell = winningLine.includes(idx);
            return (
              <button
                key={idx}
                disabled={Boolean(winner || isDraw || val || isBotThinking || (gameMode === 'bot' && !isXNext))}
                onClick={() => handleClick(idx)}
                className={`win-btn w-20 h-20 text-3xl font-black flex items-center justify-center font-mono transition-colors ${
                  isWinningCell 
                    ? 'bg-amber-100 ring-2 ring-emerald-500' 
                    : 'hover:bg-[#d8d8d8] active:bg-[#a8a8a8]'
                } ${isBotThinking && !val ? 'cursor-wait' : ''}`}
              >
                <span className={val === 'X' ? 'text-blue-800' : 'text-red-800'}>
                  {val}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom helper tip */}
        <div className="pt-2 text-center text-[11px] text-gray-600 font-sans">
          {gameMode === 'bot' ? 'Playing against Kritika AI Bot Engine' : 'Pass & play with a friend'}
        </div>
      </div>
    </Window>
  );
}
