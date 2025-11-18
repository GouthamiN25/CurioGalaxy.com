import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Greetings, traveler! I am Curio. What brings you to this corner of the galaxy today? We can talk tech, tools, or explore new skills.', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), role: 'user' as const, text: userText, timestamp: Date.now() }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Prepare history for Gemini
    const history = newMessages.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Call API
    const responseText = await sendMessageToGemini(history, userText);

    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() }
    ]);
    setIsLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 flex flex-col h-[calc(100vh-100px)]">
      <div className="text-center py-4 flex-shrink-0">
        <Navigation />
      </div>

      <div className="flex-1 overflow-y-auto bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md flex flex-col gap-4 mt-4 relative shadow-2xl">
         {/* Empty state decoration */}
         {messages.length === 1 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                 <Sparkles size={120} className="text-cg-pink animate-pulse" />
             </div>
         )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-cg-pink text-black' : 'bg-indigo-600 text-white'
            }`}>
                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white text-black rounded-tr-none'
                  : 'bg-white/10 text-white rounded-tl-none border border-white/5'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
            <div className="self-start flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white animate-pulse">
                    <Bot size={16} />
                 </div>
                 <div className="px-4 py-3 rounded-2xl bg-white/10 text-white/50 rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Curio is thinking...</span>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="mt-4 relative flex-shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Curio something curious..."
          className="w-full bg-black/60 border border-white/20 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-white/40 focus:outline-none focus:border-cg-pink focus:ring-1 focus:ring-cg-pink transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-cg-pink transition-colors disabled:opacity-50 disabled:hover:bg-white"
        >
          <Send size={20} />
        </button>
      </form>
    </main>
  );
};