
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Tab } from './types';
import { QuizGame } from './components/QuizGame';
import { AIChat } from './components/AIChat';
import { MazeGame } from './components/MazeGame';
import { MorseGame } from './components/MorseGame';
import { ShooterGame } from './components/ShooterGame';
import { BuilderGame } from './components/BuilderGame';

// --- Page Components ---

const HomePage: React.FC<{onNavigate: (tab: Tab) => void}> = ({onNavigate}) => (
  <div className="space-y-6 pb-8 bg-stone-50 min-h-full relative">
    
    {/* Hero Section */}
    <div className="relative h-80 w-full overflow-hidden rounded-b-[2.5rem] shadow-2xl bg-stone-900">
      <img 
        src="https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1000&auto=format&fit=crop" 
        alt="焦庄户地道战遗址" 
        className="w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#C8102E]/50 to-transparent mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-14 z-10 text-white">
        <div className="flex items-center space-x-2 mb-3 animate-fade-in-up">
           <span className="bg-party-red/90 backdrop-blur-md border border-white/20 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
             北京市顺义区 · 爱国主义教育基地
           </span>
        </div>
        
        <h2 className="text-4xl font-serif font-black text-white drop-shadow-lg tracking-widest leading-tight animate-fade-in-up delay-100 mb-2">
          人民<span className="text-party-gold">第一堡垒</span>
        </h2>
        
        <p className="text-red-50 text-sm font-light tracking-wider opacity-90 animate-fade-in-up delay-200 line-clamp-2">
          焦庄户地道战遗址，传承红色基因，铭记峥嵘岁月。
        </p>
      </div>
    </div>

    {/* Quick Stats - Floating Cards */}
    <div className="grid grid-cols-3 gap-3 px-4 -mt-10 relative z-20">
      <div className="bg-white rounded-xl p-3 pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center border-b-4 border-party-red flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-xl font-serif font-black text-party-darkRed group-hover:text-party-red transition-colors">11.5</div>
        <div className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider mt-1">地道总长(km)</div>
      </div>
      <div className="bg-white rounded-xl p-3 pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center border-b-4 border-party-gold flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-xl font-serif font-black text-party-darkRed group-hover:text-party-gold transition-colors">1943</div>
        <div className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider mt-1">始建年份</div>
      </div>
      <div className="bg-white rounded-xl p-3 pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center border-b-4 border-party-red flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-xl font-serif font-black text-party-darkRed group-hover:text-party-red transition-colors">830</div>
        <div className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider mt-1">参观长度(m)</div>
      </div>
    </div>

    {/* Intro Card */}
    <div className="px-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 relative overflow-hidden group">
        <div className="flex items-center mb-3">
           <span className="w-8 h-8 rounded-lg bg-red-50 text-party-red flex items-center justify-center mr-3 font-serif font-bold text-lg border border-red-100">
             序
           </span>
           <h3 className="font-serif font-bold text-lg text-gray-800 tracking-wide">景区简介</h3>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed text-justify relative z-10">
          <span className="font-bold text-party-darkRed">焦庄户地道战遗址纪念馆</span>位于北京市顺义区，地道网布局周密，户户相连，村村相通，能打能防。这里见证了抗战时期的烽火岁月，是中华民族不屈不挠精神的象征。
        </p>
        
        <div className="mt-4 flex justify-end relative z-10">
          <button 
            onClick={() => onNavigate(Tab.HISTORY)}
            className="flex items-center text-xs font-bold text-party-red hover:text-party-darkRed transition-colors bg-red-50 px-3 py-1.5 rounded-full"
          >
            阅读详细历史 &rarr;
          </button>
        </div>
      </div>
    </div>

    {/* Interaction Teaser */}
    <div className="px-4 pb-6">
      <div 
        onClick={() => onNavigate(Tab.INTERACTIVE)}
        className="relative overflow-hidden bg-gradient-to-br from-party-red to-party-darkRed rounded-2xl shadow-xl cursor-pointer group"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-party-gold/20 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>

        <div className="p-5 flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
               <span className="bg-party-gold text-party-brown text-[0.6rem] font-bold px-1.5 py-0.5 rounded animate-pulse shadow-sm">
                 热门推荐
               </span>
               <h3 className="font-bold text-lg text-white tracking-wide font-serif">红星互动大厅</h3>
            </div>
            <p className="text-xs text-white/80 max-w-[12rem] leading-relaxed">
              体验AI导游、地道突围、摩斯电码、地道神枪手等趣味游戏。
            </p>
          </div>
          <div className="w-10 h-10 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HistoryPage: React.FC = () => (
  <div className="p-4 space-y-6 bg-stone-50 min-h-full">
    <div className="text-center mb-8 mt-4">
      <h2 className="text-2xl font-serif font-bold text-party-darkRed">峥嵘岁月</h2>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">History of Tunnel Warfare</p>
      <div className="w-10 h-1 bg-party-red mx-auto mt-3 rounded-full"></div>
    </div>

    {/* Timeline events */}
    <div className="border-l-2 border-party-red/20 ml-4 space-y-10 pl-8 relative pb-4">
      <div className="relative group">
        <div className="absolute -left-[39px] bg-white w-5 h-5 rounded-full border-4 border-party-red shadow-sm group-hover:scale-110 transition-transform"></div>
        <span className="text-xs font-bold text-party-red bg-red-50 px-2 py-0.5 rounded mb-2 inline-block border border-red-100">1943年 春</span>
        <h3 className="font-bold text-gray-800 text-lg mb-1">地道初建</h3>
        <p className="text-sm text-gray-600 leading-relaxed text-justify">为躲避敌人扫荡，焦庄户村民在马福老村长的带领下，开始在自家院内挖掘隐蔽洞，这便是地道的雏形。</p>
      </div>

      <div className="relative group">
        <div className="absolute -left-[39px] bg-white w-5 h-5 rounded-full border-4 border-party-red shadow-sm group-hover:scale-110 transition-transform"></div>
        <span className="text-xs font-bold text-party-red bg-red-50 px-2 py-0.5 rounded mb-2 inline-block border border-red-100">1944年</span>
        <h3 className="font-bold text-gray-800 text-lg mb-1">连村地道网</h3>
        <p className="text-sm text-gray-600 leading-relaxed text-justify">随着战斗形势发展，单口洞逐渐连接成户户相通、村村相连的地道网，全长达23华里，形成了能打能藏的地下长城。</p>
      </div>

      <div className="relative group">
        <div className="absolute -left-[39px] bg-white w-5 h-5 rounded-full border-4 border-party-red shadow-sm group-hover:scale-110 transition-transform"></div>
        <span className="text-xs font-bold text-party-red bg-red-50 px-2 py-0.5 rounded mb-2 inline-block border border-red-100">1947年</span>
        <h3 className="font-bold text-gray-800 text-lg mb-1">人民第一堡垒</h3>
        <p className="text-sm text-gray-600 leading-relaxed text-justify">鉴于焦庄户人民在抗战中的英勇表现和地道战的巨大威力，顺义县政府授予焦庄户“人民第一堡垒”的光荣称号。</p>
      </div>
    </div>
    
    <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
      <p className="text-party-red text-sm font-bold">“地道战，嘿！地道战，埋伏下神兵千百万……”</p>
    </div>
  </div>
);

const GuidePage: React.FC = () => (
  <div className="p-4 space-y-6 bg-stone-50 min-h-full">
    <div className="text-center mb-6 mt-4">
      <h2 className="text-2xl font-serif font-bold text-party-darkRed">参观指南</h2>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Visitor Guide</p>
    </div>

    {/* Info Cards */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-party-red">
        <div className="text-party-red mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-800 text-sm">开放时间</h3>
        <p className="text-xs text-gray-500 mt-1">周三至周日<br/>09:00 - 16:00</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-party-gold">
        <div className="text-party-gold mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-800 text-sm">门票信息</h3>
        <p className="text-xs text-gray-500 mt-1">免费参观<br/>(需携带身份证)</p>
      </div>
    </div>

    {/* Navigation - Artistic Style */}
    <div className="mt-2">
      <div 
        onClick={() => window.open('https://www.amap.com/search?query=北京焦庄户地道战遗址纪念馆', '_blank')}
        className="relative h-44 rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-party-red/10"
      >
        <img 
          src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop" 
          alt="红色征途" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 sepia-[.3] contrast-125 saturate-[.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-party-red/80 via-party-red/40 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute inset-0 p-5 flex flex-col justify-center text-white">
          <div className="flex items-center space-x-2 mb-1">
            <span className="p-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-party-gold">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-party-gold text-shadow-sm">一键导航</span>
          </div>
          <h3 className="text-2xl font-serif font-black tracking-widest mb-2 text-white drop-shadow-lg italic">
            红色征途
          </h3>
          <p className="text-xs text-red-50 mb-4 opacity-90 max-w-[70%] drop-shadow font-serif">
            Destination: Beijing Jiaozhuanghu
          </p>
          <div className="self-start px-5 py-2 bg-gradient-to-r from-party-red to-party-darkRed border border-white/20 rounded-full text-xs font-bold text-white shadow-lg group-hover:scale-105 transition-transform flex items-center">
            开启地图 &rarr;
          </div>
        </div>
      </div>
    </div>

    {/* Tips */}
    <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
      <h3 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-party-red">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.001 6.001 0 00-5.304-3h5.207l2.853-2.853a.75.75 0 011.06 1.06l-2.853 2.853a.75.75 0 01-1.06 0l-2.853-2.853a.75.75 0 00-1.06 1.06l2.853 2.853z" />
        </svg>
        参观须知
      </h3>
      <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
        <li>地道内光线较暗，地面湿滑，请穿着舒适的防滑鞋。</li>
        <li>部分地道狭窄低矮，请注意碰头，弯腰通行。</li>
        <li>请勿在地道内吸烟、刻画或损坏文物设施。</li>
        <li>建议参观时长：1.5 - 2 小时。</li>
      </ul>
    </div>
  </div>
);

const InteractivePage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'quiz') return (
    <div className="h-full flex flex-col">
       <div className="p-2"><button onClick={() => setActiveGame(null)} className="text-sm text-gray-500">← 返回大厅</button></div>
       <QuizGame />
    </div>
  );
  if (activeGame === 'maze') return <MazeGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'morse') return <MorseGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'shooter') return <ShooterGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'builder') return <BuilderGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="p-4 space-y-6 bg-stone-50 min-h-full">
      <div className="text-center mb-6 mt-4">
        <h2 className="text-2xl font-serif font-bold text-party-darkRed">红星互动大厅</h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Interactive Zone</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <AIChat />
      </div>

      <h3 className="font-bold text-gray-800 text-sm ml-1 mb-2">趣味挑战</h3>
      <div className="grid grid-cols-2 gap-4">
        <GameCard 
          title="地道突围" 
          desc="迷宫策略逃脱" 
          color="bg-stone-800" 
          icon="🛡️"
          onClick={() => setActiveGame('maze')}
        />
        <GameCard 
          title="红色电波" 
          desc="摩斯密码破译" 
          color="bg-party-red" 
          icon="📡"
          onClick={() => setActiveGame('morse')}
        />
        <GameCard 
          title="地道神枪手" 
          desc="保卫家园射击" 
          color="bg-orange-700" 
          icon="🎯"
          onClick={() => setActiveGame('shooter')}
        />
        <GameCard 
          title="地道设计师" 
          desc="防御工事构建" 
          color="bg-blue-800" 
          icon="🏗️"
          onClick={() => setActiveGame('builder')}
        />
        <GameCard 
          title="知识问答" 
          desc="红色历史测试" 
          color="bg-party-gold" 
          textColor="text-party-brown"
          icon="🎓"
          onClick={() => setActiveGame('quiz')}
        />
      </div>
    </div>
  );
};

const GameCard: React.FC<{title: string, desc: string, color: string, textColor?: string, icon: string, onClick: () => void}> = ({
  title, desc, color, textColor = 'text-white', icon, onClick
}) => (
  <div 
    onClick={onClick}
    className={`${color} rounded-xl p-4 shadow-md cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl group-hover:scale-125 transition-transform">{icon}</div>
    <h4 className={`${textColor} font-bold text-lg mb-1 relative z-10`}>{title}</h4>
    <p className={`${textColor} text-xs opacity-80 relative z-10`}>{desc}</p>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <HomePage onNavigate={setActiveTab} />;
      case Tab.HISTORY:
        return <HistoryPage />;
      case Tab.GUIDE:
        return <GuidePage />;
      case Tab.INTERACTIVE:
        return <InteractivePage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
