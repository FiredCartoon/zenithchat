import React from 'react';
import { Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 text-neutral-800 font-medium tracking-tight">
        {/* Abstract Icon */}
        <div className="w-5 h-5 bg-neutral-900 rounded-md" />
        <span>Zenith</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onNewChat}
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"
          aria-label="New Chat"
        >
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
};
