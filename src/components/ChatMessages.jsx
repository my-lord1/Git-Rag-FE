import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import MessageContent from './MessageContent';

export default function ChatMessages({ messages, isTyping, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      {messages.map((msg, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg
            ${msg.role === 'ai' ? 'bg-zinc-900/80 border-indigo-500/30 text-indigo-400 shadow-indigo-900/20' : 'bg-white text-black border-white'}`}>
            {msg.role === 'ai' ? <Bot size={24} /> : <User size={24} />}
          </div>
          
          <div className={`max-w-[85%] rounded-3xl px-8 py-6 shadow-xl backdrop-blur-md
            ${msg.role === 'user' ? 'bg-white text-zinc-900 rounded-tr-sm' : 'bg-zinc-900/40 border border-white/5 text-zinc-100 rounded-tl-sm'}`}>
            <MessageContent text={msg.text} role={msg.role} />
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-indigo-400 animate-pulse" />
          </div>
          <div className="flex gap-2 items-center h-full py-6 px-4">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_0ms]" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}