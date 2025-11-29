import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { geminiService } from './services/gemini';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputArea } from './components/InputArea';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      geminiService.initializeChat();
      isFirstRender.current = false;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now(),
    };

    // Optimistically add user message
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Create placeholder for AI response
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsgPlaceholder: Message = {
      id: aiMsgId,
      role: 'model',
      text: '',
      timestamp: Date.now(),
      isThinking: true,
    };
    setMessages((prev) => [...prev, aiMsgPlaceholder]);

    try {
      let fullResponse = '';
      let isFirstChunk = true;

      const stream = geminiService.streamMessage(text);

      for await (const chunk of stream) {
        fullResponse += chunk;
        
        setMessages((prev) => 
          prev.map((msg) => {
            if (msg.id === aiMsgId) {
              return {
                ...msg,
                text: fullResponse,
                isThinking: false, // Stop thinking indicator once first chunk arrives
              };
            }
            return msg;
          })
        );

        if (isFirstChunk) {
            isFirstChunk = false;
            // Quick scroll on first chunk
            scrollToBottom();
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === aiMsgId 
            ? { ...msg, text: "I'm sorry, I encountered an error processing your request.", isThinking: false } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    geminiService.initializeChat();
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900 font-sans">
      <Header onNewChat={handleNewChat} />
      
      <main className="flex-1 overflow-y-auto pt-20 pb-40">
        <div className="max-w-3xl mx-auto px-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-duration:1s]">
              <div className="w-16 h-16 bg-neutral-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-4">
                 <div className="w-8 h-8 border-2 border-white dark:border-neutral-900 rounded-full" />
              </div>
              <h1 className="text-4xl font-medium tracking-tight text-neutral-900 dark:text-white">
                How can I help?
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-md text-lg font-light">
                I'm ready to assist you with questions, ideas, or tasks.
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
