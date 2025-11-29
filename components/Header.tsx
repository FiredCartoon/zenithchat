import React from 'react';
import { Menu, Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 z-10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-medium tracking-tight">
        {/* Abstract Icon */}
        <div className="w-5 h-5 bg-neutral-900 dark:bg-white rounded-md" />
        <span>Zenith</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-600 dark:text-neutral-300"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button 
          onClick={onNewChat}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-600 dark:text-neutral-300"
          aria-label="New Chat"
        >
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
};
