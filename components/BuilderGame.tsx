import React, { useState, useEffect } from 'react';

// Types of pipe pieces
type PipeType = 'straight' | 'corner' | 't-shape' | 'cross' | 'start' | 'end';

interface Cell {
  x: number;
  y: number;
  type: PipeType;
  rotation: number; // 0, 90, 180, 270
  locked?: boolean;
  connected?: boolean; // To visualize water flow
}

const BOARD_SIZE = 5;

// Initial Level Configuration
const INITIAL_BOARD: Cell[] = [
  // Row 0
  { x: 0, y: 0, type: 'start', rotation: 90, locked: true }, // Start points Right
  { x: 1, y: 0, type: 'straight', rotation: 0 },
  { x: 2, y: 0, type: 'corner', rotation: 0 },
  { x: 3, y: 0, type: 'straight', rotation: 90 },
  { x: 4, y: 0, type: 'corner', rotation: 90 },
  
  // Row 1
  { x: 0, y: 1, type: 'corner', rotation: 0 },
  { x: 1, y: 1, type: 'cross', rotation: 0 },
  { x: 2, y: 1, type: 'straight', rotation: 90 },
  { x: 3, y: 1, type: 't-shape', rotation: 0 },
  { x: 4, y: 1, type: 'straight', rotation: 0 },

  // Row 2
  { x: 0, y: 2, type: 'straight', rotation: 90 },
  { x: 1, y: 2, type: 'straight', rotation: 0 },
  { x: 2, y: 2, type: 'corner', rotation: 180 },
  { x: 3, y: 2, type: 'straight', rotation: 0 },
  { x: 4, y: 2, type: 'corner', rotation: 270 },

  // Row 3
  { x: 0, y: 3, type: 't-shape', rotation: 180 },
  { x: 1, y: 3, type: 'corner', rotation: 270 },
  { x: 2, y: 3, type: 'straight', rotation: 0 },
  { x: 3, y: 3, type: 'corner', rotation: 0 },
  { x: 4, y: 3, type: 'straight', rotation: 90 },

  // Row 4
  { x: 0, y: 4, type: 'corner', rotation: 0 },
  { x: 1, y: 4, type: 'straight', rotation: 90 },
  { x: 2, y: 4, type: 't-shape', rotation: 270 },
  { x: 3, y: 4, type: 'straight', rotation: 0 },
  { x: 4, y: 4, type: 'end', rotation: 270, locked: true }, // End expects from Left (points Left visually)
];

export const BuilderGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [board, setBoard] = useState<Cell[]>(JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [won, setWon] = useState(false);

  // Helper to check connections
  // Directions: 0: Up, 1: Right, 2: Down, 3: Left
  const getExits = (type: PipeType, rotation: number): number[] => {
    // Base exits for rotation 0
    let exits: number[] = [];
    switch (type) {
      case 'straight': exits = [0, 2]; break; // Up, Down
      case 'corner': exits = [1, 2]; break; // Right, Down
      case 't-shape': exits = [1, 2, 3]; break; // Right, Down, Left
      case 'cross': exits = [0, 1, 2, 3]; break;
      case 'start': exits = [1]; break; // Right (at rot 0)
      case 'end': exits = [3]; break; // Left (at rot 0)
    }
    // Apply rotation
    return exits.map(e => (e + rotation / 90) % 4);
  };

  const getOpposite = (dir: number) => (dir + 2) % 4;

  const checkConnectivity = (currentBoard: Cell[]) => {
    // Reset connected status
    currentBoard.forEach(c => c.connected = false);
    
    // Find start
    const start = currentBoard.find(c => c.type === 'start');
    if (!start) return false;

    // BFS
    const queue = [start];
    start.connected = true;
    let endReached = false;

    // Helper to get cell at x,y
    const getCell = (x: number, y: number) => currentBoard.find(c => c.x === x && c.y === y);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr.type === 'end') {
        endReached = true;
        continue;
      }

      const exits = getExits(curr.type, curr.rotation);
      
      exits.forEach(dir => {
        let nextX = curr.x, nextY = curr.y;
        if (dir === 0) nextY--;
        if (dir === 1) nextX++;
        if (dir === 2) nextY++;
        if (dir === 3) nextX--;

        const next = getCell(nextX, nextY);
        if (next && !next.connected) {
          // Check if neighbor connects back
          const nextExits = getExits(next.type, next.rotation);
          if (nextExits.includes(getOpposite(dir))) {
             next.connected = true;
             queue.push(next);
          }
        }
      });
    }
    return endReached;
  };

  const handleRotate = (index: number) => {
    if (won || board[index].locked) return;

    const newBoard = [...board];
    newBoard[index] = { 
      ...newBoard[index], 
      rotation: (newBoard[index].rotation + 90) % 360 
    };

    const isComplete = checkConnectivity(newBoard);
    setBoard(newBoard);
    if (isComplete) setWon(true);
  };

  // Initial check on mount
  useEffect(() => {
    const newBoard = [...board];
    checkConnectivity(newBoard);
    setBoard(newBoard);
  }, []);

  return (
    <div className="bg-stone-50 min-h-full p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-party-red font-bold flex items-center">
          <span className="mr-1">←</span> 退出
        </button>
        <span className="font-serif font-bold text-party-darkRed text-lg">地道设计师</span>
        <div className="w-12"></div>
      </div>

      <div className="mb-4 text-center">
        <p className="text-gray-600 text-sm">点击方块旋转，打通起点（绿）到终点（红）的道路。</p>
      </div>

      <div 
        className="grid grid-cols-5 gap-1 bg-party-brown p-2 rounded-lg shadow-xl relative"
        style={{ width: 'fit-content' }}
      >
        {board.map((cell, index) => {
          const isConnected = cell.connected;
          return (
            <div 
              key={`${cell.x}-${cell.y}`}
              onClick={() => handleRotate(index)}
              className={`w-14 h-14 bg-stone-200 rounded relative cursor-pointer transition-all duration-300 ${isConnected ? 'bg-blue-50' : ''}`}
            >
              {/* Pipe Visual Representation using SVG */}
              <div 
                className="w-full h-full transition-transform duration-300 ease-in-out"
                style={{ transform: `rotate(${cell.rotation}deg)` }}
              >
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Start/End Markers */}
                    {cell.type === 'start' && <circle cx="50" cy="50" r="20" className="fill-green-500" />}
                    {cell.type === 'end' && <rect x="30" y="30" width="40" height="40" className="fill-red-500" />}

                    {/* Pipe Body Color */}
                    {cell.type !== 'start' && cell.type !== 'end' && (
                        <g className={isConnected ? "fill-blue-500" : "fill-stone-500"}>
                             {/* Define shapes for each type based on center (50,50) */}
                             {(cell.type === 'straight' || cell.type === 'cross' || cell.type === 't-shape') && <rect x="35" y="0" width="30" height="100" />}
                             {(cell.type === 'straight') && <rect x="35" y="0" width="30" height="100" className="opacity-0" />} {/* Just to match logic structure if needed */}
                             
                             {/* Overlay cross bar for types that need it */}
                             {(cell.type === 'cross' || cell.type === 't-shape' || cell.type === 'corner') && <rect x="50" y="35" width="50" height="30" />}
                             
                             {/* Specific fixes for corner/t-shape to look right */}
                             {cell.type === 'corner' && <rect x="35" y="50" width="30" height="50" />} 

                             {/* Redrawing simplified shapes for clarity */}
                        </g>
                    )}
                    
                    {/* Better SVG paths for pipes */}
                     <g className={isConnected ? "stroke-blue-500" : "stroke-stone-600"} strokeWidth="20" fill="none" strokeLinecap="butt">
                        {cell.type === 'straight' && <line x1="50" y1="0" x2="50" y2="100" />}
                        {cell.type === 'corner' && <path d="M50 100 L50 50 L100 50" />}
                        {cell.type === 't-shape' && <path d="M50 0 L50 100 M50 50 L100 50" />}
                        {cell.type === 'cross' && <path d="M50 0 L50 100 M0 50 L100 50" />}
                        {cell.type === 'start' && <line x1="50" y1="50" x2="100" y2="50" />}
                        {cell.type === 'end' && <line x1="0" y1="50" x2="50" y2="50" />}
                     </g>
                 </svg>
              </div>
            </div>
          );
        })}
      </div>

      {won && (
         <div className="mt-8 text-center animate-bounce">
            <h3 className="text-2xl font-bold text-party-red mb-2">防御工事构建完成！</h3>
            <p className="text-gray-600 mb-4">地道已全线贯通！</p>
            <button 
              onClick={onBack}
              className="bg-party-red text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              返回大厅
            </button>
         </div>
      )}
    </div>
  );
};