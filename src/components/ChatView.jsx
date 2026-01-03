import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatView({ messages, isTyping, currentQuery, repoUrl, messagesEndRef, onQueryChange, onSend, onReset }) {
  return (
    <motion.div key="chat" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-[85vh] flex flex-col bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <ChatHeader repoUrl={repoUrl} onReset={onReset} />
      
      <ChatMessages messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef}/>
      
      <ChatInput currentQuery={currentQuery} onQueryChange={onQueryChange} onSend={onSend} isDisabled={!currentQuery.trim() || isTyping}/>
    </motion.div>
  );
}