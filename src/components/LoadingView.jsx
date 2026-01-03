import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function LoadingView() {
  return (
    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center space-y-8 p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
      <div className="relative">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className={`w-32 h-32 rounded-full bg-gradient-to-tr from-transparent via-indigo-500 to-transparent blur-md opacity-80`}/>
        <div className="absolute inset-2 bg-black rounded-full z-10 flex items-center justify-center border border-zinc-800">
           <Code2 size={48} className="text-indigo-400 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Processing Repository</h3>
        <p className="text-indigo-300/80 font-mono text-sm">Creating embeddings from code...</p>
      </div>
    </motion.div>
  );
}