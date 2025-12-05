import React, { useState, useEffect } from 'react';

// 0: Path, 1: Wall, 2: Start, 3: End, 4: Player
const LEVEL_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

export const MazeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 }); // Start at (1,1)
  const [won, setWon] = useState(false);

  // Find start position on mount
  useEffect(() => {
    let startX = 1;
    let startY = 1;
    LEVEL_MAP.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) {
          startX = x;
          startY = y;
        }
      });
    });
    setPlayerPos({ x: startX, y: startY });
  }, []);

  const move = (dx: number, dy: number) => {
    if (won) return;
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Boundary and Wall check
    if (
      newY >= 0 && newY < LEVEL_MAP.length &&
      newX >= 0 && newX < LEVEL_MAP[0].length &&
      LEVEL_MAP[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY });
      if (LEVEL_MAP[newY][newX] === 3) {
        setWon(true);
      }
    }
  };

  return (
    <div className="bg-stone-100 min-h-full p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-gray-600 hover:text-party-red font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          返回
        </button>
        <span className="font-serif font-bold text-party-darkRed text-lg">地道突围</span>
        <div className="w-12"></div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-party-brown/30 mb-6">
        <p className="text-sm text-gray-500 mb-2 text-center">将情报送达出口（绿色区域）</p>
        <div className="grid grid-cols-8 gap-1 bg-party-brown p-1 rounded">
          {LEVEL_MAP.map((row, y) => (
            row.map((cell, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              let cellClass = "w-8 h-8 rounded-sm transition-colors duration-200 flex items-center justify-center text-xs ";
              
              if (isPlayer) {
                cellClass += "bg-party-red text-white z-10 shadow-md transform scale-110";
              } else if (cell === 1) {
                cellClass += "bg-stone-800"; // Wall
              } else if (cell === 3) {
                cellClass += "bg-green-500 animate-pulse"; // End
              } else {
                cellClass += "bg-stone-300"; // Path
              }

              return (
                <div key={`${x}-${y}`} className={cellClass}>
                  {isPlayer && "★"}
                  {cell === 3 && !isPlayer && "出口"}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {won ? (
        <div className="text-center animate-fade-in-up">
          <h3 className="text-2xl font-bold text-party-red mb-2">任务完成！</h3>
          <p className="text-gray-600 mb-4">您成功将情报送出了包围圈！</p>
          <button 
            onClick={onBack}
            className="bg-party-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-party-darkRed"
          >
            领取奖励
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 w-48">
          <div></div>
          <button onClick={() => move(0, -1)} className="bg-white p-4 rounded-lg shadow-md active:bg-gray-200 text-party-brown border-b-4 border-gray-300 active:border-0 active:translate-y-1">↑</button>
          <div></div>
          <button onClick={() => move(-1, 0)} className="bg-white p-4 rounded-lg shadow-md active:bg-gray-200 text-party-brown border-b-4 border-gray-300 active:border-0 active:translate-y-1">←</button>
          <button onClick={() => move(0, 1)} className="bg-white p-4 rounded-lg shadow-md active:bg-gray-200 text-party-brown border-b-4 border-gray-300 active:border-0 active:translate-y-1">↓</button>
          <button onClick={() => move(1, 0)} className="bg-white p-4 rounded-lg shadow-md active:bg-gray-200 text-party-brown border-b-4 border-gray-300 active:border-0 active:translate-y-1">→</button>
        </div>
      )}
    </div>
  );
};