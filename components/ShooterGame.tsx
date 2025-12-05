import React, { useState, useEffect, useRef } from 'react';

type EntityType = 'empty' | 'enemy' | 'civilian';

interface Hole {
  id: number;
  type: EntityType;
  isVisible: boolean;
}

export const ShooterGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [holes, setHoles] = useState<Hole[]>(Array(9).fill(null).map((_, i) => ({ id: i, type: 'empty', isVisible: false })));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<number | null>(null);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    spawnTimerRef.current = window.setInterval(spawnEntity, 800); // Spawn every 800ms

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [gameOver]);

  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
  };

  const spawnEntity = () => {
    setHoles(currentHoles => {
      const newHoles = [...currentHoles];
      // Hide some existing
      newHoles.forEach(h => {
        if (Math.random() > 0.6) h.isVisible = false;
      });

      // Spawn new
      const emptyIndices = newHoles.map((h, i) => !h.isVisible ? i : -1).filter(i => i !== -1);
      if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        // 80% Enemy, 20% Civilian
        const type = Math.random() > 0.2 ? 'enemy' : 'civilian';
        newHoles[randomIndex] = { ...newHoles[randomIndex], type, isVisible: true };
      }
      return newHoles;
    });
  };

  const handleClick = (index: number) => {
    if (gameOver || !holes[index].isVisible) return;

    const hole = holes[index];
    
    if (hole.type === 'enemy') {
      setScore(s => s + 10);
      // Feedback effect could go here
    } else if (hole.type === 'civilian') {
      setScore(s => Math.max(0, s - 20));
      // Penalty feedback
    }

    // Hide immediately after hit
    setHoles(prev => {
      const newHoles = [...prev];
      newHoles[index].isVisible = false;
      return newHoles;
    });
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setHoles(Array(9).fill(null).map((_, i) => ({ id: i, type: 'empty', isVisible: false })));
  };

  return (
    <div className="bg-stone-800 min-h-full p-4 flex flex-col items-center relative overflow-hidden">
      {/* HUD */}
      <div className="w-full flex justify-between items-center mb-6 z-10 text-white">
        <button onClick={onBack} className="text-gray-300 hover:text-white flex items-center text-sm">
           <span className="mr-1">←</span> 退出
        </button>
        <div className="flex gap-4">
           <div className="bg-black/50 px-3 py-1 rounded border border-gray-600">
             <span className="text-xs text-gray-400 block">得分</span>
             <span className="text-xl font-bold text-party-gold font-mono">{score}</span>
           </div>
           <div className={`bg-black/50 px-3 py-1 rounded border border-gray-600 ${timeLeft <= 5 ? 'animate-pulse border-red-500' : ''}`}>
             <span className="text-xs text-gray-400 block">时间</span>
             <span className={`text-xl font-bold font-mono ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>{timeLeft}s</span>
           </div>
        </div>
      </div>

      <h2 className="text-party-red font-serif font-bold text-2xl mb-6 tracking-widest z-10 shadow-black drop-shadow-md">保卫地道</h2>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-4 bg-stone-700 p-4 rounded-xl border-4 border-stone-600 shadow-2xl z-10">
        {holes.map((hole, index) => (
          <div 
            key={index} 
            className="w-20 h-20 bg-black rounded-full shadow-inner relative overflow-hidden cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {/* Background texture for hole */}
            <div className="absolute inset-0 bg-stone-900 rounded-full opacity-80"></div>
            
            {/* Entity */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-100 ${
                hole.isVisible ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {hole.type === 'enemy' ? (
                <div className="w-14 h-14 bg-stone-500 rounded-t-lg flex flex-col items-center relative border-2 border-stone-400">
                   <div className="w-14 h-4 bg-green-800 absolute top-0 rounded-t-sm"></div> {/* Hat */}
                   <div className="w-1 h-1 bg-black rounded-full absolute top-6 left-4"></div>
                   <div className="w-1 h-1 bg-black rounded-full absolute top-6 right-4"></div>
                   <div className="w-6 h-2 bg-black absolute top-9 rounded-full"></div> {/* Moustache */}
                </div>
              ) : (
                <div className="w-14 h-14 bg-yellow-200 rounded-t-lg flex flex-col items-center relative border-2 border-yellow-100">
                   <div className="w-14 h-4 bg-white absolute top-0 rounded-t-sm"></div> {/* Towel */}
                   <div className="w-1 h-1 bg-black rounded-full absolute top-6 left-4"></div>
                   <div className="w-1 h-1 bg-black rounded-full absolute top-6 right-4"></div>
                   <div className="w-4 h-1 bg-red-400 absolute top-10 rounded-full"></div> {/* Smile */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-xl text-center max-w-xs mx-4 border-4 border-party-red">
            <h3 className="text-2xl font-bold text-party-darkRed mb-2">战斗结束</h3>
            <p className="text-gray-600 mb-6">最终得分: <span className="text-3xl font-bold text-party-red">{score}</span></p>
            <div className="space-y-3">
              <button 
                onClick={resetGame}
                className="w-full bg-party-red text-white py-3 rounded-full font-bold shadow-lg hover:bg-party-darkRed"
              >
                再次战斗
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-300"
              >
                返回大厅
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decoration */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-stone-900 to-transparent pointer-events-none"></div>
    </div>
  );
};