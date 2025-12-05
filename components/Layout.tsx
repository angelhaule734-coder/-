import React, { ReactNode } from 'react';
import { Tab } from '../types';

interface LayoutProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="bg-party-red text-party-gold p-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold font-serif tracking-widest">北京焦庄户地道战</h1>
          <div className="w-8 h-8 rounded-full bg-party-gold flex items-center justify-center text-party-red font-bold text-xs border-2 border-white">
            京
          </div>
        </div>
        <p className="text-xs text-white opacity-80 mt-1">人民第一堡垒 · 红色教育基地</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-2 z-50 text-xs shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <NavButton 
          active={activeTab === Tab.HOME} 
          onClick={() => onTabChange(Tab.HOME)} 
          icon={<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />}
          label="首页"
        />
        <NavButton 
          active={activeTab === Tab.HISTORY} 
          onClick={() => onTabChange(Tab.HISTORY)} 
          icon={<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />}
          label="历史"
        />
        <NavButton 
          active={activeTab === Tab.INTERACTIVE} 
          onClick={() => onTabChange(Tab.INTERACTIVE)} 
          icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />}
          label="互动"
        />
        <NavButton 
          active={activeTab === Tab.GUIDE} 
          onClick={() => onTabChange(Tab.GUIDE)} 
          icon={<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />}
          label="指南"
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${active ? 'text-party-red' : 'text-gray-400'}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
      {icon}
    </svg>
    <span className="scale-90">{label}</span>
  </button>
);