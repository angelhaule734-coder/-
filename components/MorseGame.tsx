import React, { useState, useEffect } from 'react';

const WORDS = [
  { code: '.... . .-. ---', answer: 'HERO', hint: '英雄' },
  { code: '.... --- .--. .', answer: 'HOPE', hint: '希望' },
  { code: '.-. . -..', answer: 'RED', hint: '红色' },
  { code: '...- .. -.-. - --- .-. -.--', answer: 'VICTORY', hint: '胜利' },
];

const MORSE_CODE: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..'
};

export const MorseGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [level, setLevel] = useState(0);
  const [input, setInput] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentWord = WORDS[level];

  useEffect(() => {
    if (input.toUpperCase() === currentWord.answer) {
      if (level < WORDS.length - 1) {
        setTimeout(() => {
          setLevel(l => l + 1);
          setInput('');
        }, 500);
      } else {
        setCompleted(true);
      }
    }
  }, [input, level, currentWord.answer]);

  return (
    <div className="bg-stone-100 min-h-full p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-party-red font-bold">
           ← 退出
        </button>
        <span className="font-serif font-bold text-party-darkRed text-lg">红色电波</span>
        <button onClick={() => setShowTable(!showTable)} className="text-xs bg-party-gold text-party-red px-2 py-1 rounded font-bold">
          {showTable ? '隐藏密码本' : '查看密码本'}
        </button>
      </div>

      {completed ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-party-red text-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl animate-bounce">
            ★
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">情报破译成功！</h2>
          <p className="text-gray-600 mb-8">您是一名优秀的通信兵！</p>
          <button onClick={onBack} className="bg-party-red text-white px-8 py-3 rounded-full font-bold">返回大厅</button>
        </div>
      ) : (
        <>
          <div className="bg-stone-800 text-green-400 font-mono p-6 rounded-xl shadow-inner mb-6 text-center border-b-4 border-stone-600">
            <div className="text-xs text-stone-500 mb-2 text-left border-b border-stone-700 pb-1">INCOMING TRANSMISSION...</div>
            <div className="text-2xl tracking-widest mb-4 break-words">{currentWord.code}</div>
            <div className="text-stone-500 text-sm">提示: {currentWord.hint}</div>
          </div>

          <div className="text-center mb-8">
            <input 
              type="text" 
              value={input}
              readOnly
              className="w-full text-center text-3xl font-bold bg-transparent border-b-2 border-party-red outline-none text-party-darkRed tracking-[0.5em] h-12"
              placeholder="_ _ _ _"
            />
          </div>

          <div className="grid grid-cols-6 gap-2 mb-6">
            {Object.keys(MORSE_CODE).map(char => (
              <button
                key={char}
                onClick={() => setInput(prev => (prev + char).slice(0, currentWord.answer.length))}
                className="bg-white rounded p-2 text-center shadow-sm border border-gray-200 active:bg-red-50 active:border-red-200"
              >
                <div className="font-bold text-gray-800">{char}</div>
                {showTable && <div className="text-[0.5rem] text-gray-400 scale-75">{MORSE_CODE[char]}</div>}
              </button>
            ))}
            <button 
              onClick={() => setInput(prev => prev.slice(0, -1))}
              className="bg-red-100 rounded p-2 text-center shadow-sm border border-red-200 text-red-600 col-span-2 flex items-center justify-center"
            >
              ← 删除
            </button>
            <button 
              onClick={() => setInput('')}
              className="bg-gray-200 rounded p-2 text-center shadow-sm border border-gray-300 text-gray-600 col-span-2"
            >
              清空
            </button>
          </div>
        </>
      )}
    </div>
  );
};