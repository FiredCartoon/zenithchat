import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Sparkles } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar / Icon */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser 
            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'}
        `}>
          {isUser ? <User size={14} /> : <Sparkles size={14} />}
        </div>

        {/* Bubble */}
        <div
          className={`
            px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
            ${isUser 
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-tr-sm' 
              : 'bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-tl-sm'
            }
          `}
        >
          {message.isThinking ? (
            <div className="flex items-center gap-1 h-6">
              <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : ''} dark:prose-invert`}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
