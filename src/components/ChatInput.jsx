import { Send } from 'lucide-react';

const ACCENT_GRADIENT = "bg-gradient-to-r from-indigo-500 to-violet-500";

export default function ChatInput({ currentQuery, onQueryChange, onSend, isDisabled }) {
  return (
    <div className="p-8 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent">
      <div className="relative group">
        <div className={`absolute -inset-0.5 ${ACCENT_GRADIENT} rounded-2xl opacity-0 group-focus-within:opacity-50 transition duration-700 blur-md`}></div>
        
        <div className="relative flex items-center bg-zinc-950/90 rounded-2xl border border-white/10 shadow-2xl">
          <input type="text" autoFocus value={currentQuery} onChange={(e) => onQueryChange(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSend()} placeholder="Ask the codebase..."
            className="w-full bg-transparent text-zinc-100 px-8 py-6 text-lg outline-none placeholder:text-zinc-600 font-light"/>
          <button 
            onClick={onSend}
            disabled={isDisabled}
            className={`mr-4 p-4 rounded-xl transition-all duration-300 ${isDisabled ? 'text-zinc-700' : 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-105'}`}>
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}