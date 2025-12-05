import React, { useState } from 'react';
import { QuizQuestion } from '../types';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "焦庄户地道战遗址被誉为：",
    options: ["地下长城", "人民第一堡垒", "抗战奇迹", "红色要塞"],
    correctIndex: 1,
    explanation: "焦庄户人民在抗日战争时期利用地道与敌人进行英勇斗争，被顺义县政府授予“人民第一堡垒”锦旗。"
  },
  {
    id: 2,
    question: "焦庄户地道最初主要用于：",
    options: ["进攻", "居住", "储藏粮食", "隐蔽物资和藏身"],
    correctIndex: 3,
    explanation: "初期主要是为了躲避敌人的扫荡，藏身和隐蔽物资，后来发展为能打能防的战斗型地道。"
  },
  {
    id: 3,
    question: "地道内部设计了哪些精妙的防御设施？（多选概念）",
    options: ["只有直路", "陷阱、射击孔、单人掩体", "电梯", "玻璃窗"],
    correctIndex: 1,
    explanation: "地道内设有单人掩体、会议室、水缸存放处、陷阱、翻板、射击孔等多种战斗和生活设施。"
  }
];

export const QuizGame: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === QUESTIONS[currentQIndex].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-party-red/20 m-4">
        <div className="w-20 h-20 bg-party-red text-party-gold rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
          ★
        </div>
        <h2 className="text-2xl font-serif font-bold text-party-red mb-2">挑战完成</h2>
        <p className="text-gray-600 mb-6">您的得分：<span className="text-3xl font-bold text-party-darkRed">{score}</span> / {QUESTIONS.length}</p>
        
        <div className="text-sm text-gray-500 mb-6">
          {score === QUESTIONS.length 
            ? "太棒了！您是真正的红色历史通！" 
            : score > 0 
              ? "不错的成绩，继续学习红色精神！" 
              : "还需要加强学习哦，再去参观一下吧！"}
        </div>

        <button 
          onClick={resetGame}
          className="bg-party-red text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-party-darkRed transition-colors w-full"
        >
          再挑战一次
        </button>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentQIndex];

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 m-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-party-red uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
          红色知识挑战
        </span>
        <span className="text-gray-400 text-sm">
          {currentQIndex + 1} / {QUESTIONS.length}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-6 min-h-[3.5rem]">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 relative ";
          
          if (isAnswered) {
             if (index === currentQuestion.correctIndex) {
               btnClass += "bg-green-50 border-green-500 text-green-700 font-bold";
             } else if (index === selectedOption) {
               btnClass += "bg-red-50 border-red-500 text-red-700";
             } else {
               btnClass += "bg-gray-50 border-gray-200 text-gray-400";
             }
          } else {
             btnClass += "bg-white border-gray-200 hover:border-party-red hover:bg-red-50/30 text-gray-700";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={btnClass}
              disabled={isAnswered}
            >
              <span className="mr-3 font-mono">{String.fromCharCode(65 + index)}.</span>
              {option}
              {isAnswered && index === currentQuestion.correctIndex && (
                 <span className="absolute right-4 text-green-600">✓</span>
              )}
              {isAnswered && index === selectedOption && index !== currentQuestion.correctIndex && (
                 <span className="absolute right-4 text-red-600">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="animate-fade-in-up">
          <div className="bg-stone-50 p-4 rounded-lg text-sm text-gray-600 mb-4 border-l-4 border-party-gold">
            <span className="font-bold text-party-brown block mb-1">解析：</span>
            {currentQuestion.explanation}
          </div>
          <button 
            onClick={handleNext}
            className="w-full bg-party-red text-white py-3 rounded-lg font-bold shadow-md hover:bg-party-darkRed transition-colors"
          >
            {currentQIndex < QUESTIONS.length - 1 ? "下一题" : "查看结果"}
          </button>
        </div>
      )}
    </div>
  );
};