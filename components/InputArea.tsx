import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, ArrowUp } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-neutral-900 via-white dark:via-neutral-900 to-transparent pb-6 pt-10 px-4 md:px-0 z-10">
      <div className="max-w-3xl mx-auto relative">
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-[26px] flex items-end p-2 transition-shadow focus-within:shadow-xl focus-within:border-neutral-300 dark:focus-within:border-neutral-600">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isLoading}
            rows={1}
            className="flex-1 max-h-[200px] py-3 pl-4 pr-2 bg-transparent border-none focus:ring-0 resize-none text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-base leading-relaxed"
            style={{ scrollbarWidth: 'none' }}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            className={`
              p-2.5 rounded-full mb-0.5 flex-shrink-0 transition-all duration-200
              ${input.trim() && !isLoading 
                ? 'bg-neutral-900 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transform hover:scale-105' 
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-300 dark:text-neutral-500 cursor-not-allowed'
              }
            `}
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        </div>
        <div className="text-center mt-3">
            <p className="text-xs text-neutral-300 dark:text-neutral-600 font-light">
                Designed for speed and clarity.
            </p>
        </div>
      </div>
    </div>
  );
};
