import { motion } from 'framer-motion';
import { Github, AlertCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';

const ACCENT_GRADIENT = "bg-gradient-to-r from-indigo-500 to-violet-500";
const ACCENT_TEXT_GRADIENT = "bg-gradient-to-r from-indigo-400 to-violet-300 text-transparent bg-clip-text";

export default function LandingView({ repoUrl, isUrlValid, urlError, onUrlChange, onIngest }) {
  return (
    <motion.div key="landing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} transition={{ duration: 0.6, type: "spring" }} className="text-center space-y-12 backdrop-blur-sm bg-black/20 p-12 rounded-[3rem] border border-white/5 shadow-2xl">
      <div className="space-y-6">
      <motion.a href="https://github.com/USERNAME/REPO_NAME" target="_blank" rel="noopener noreferrer" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-indigo-500/30
                    text-sm text-indigo-300 font-medium shadow-[0_0_20px_rgba(99,102,241,0.2)]
                    hover:bg-black/70 hover:border-indigo-400 hover:text-indigo-200
                    transition-all cursor-pointer">
      <Github size={18} />
        Documentation
      </motion.a>

        <h1 className="text-7xl font-bold tracking-tighter text-white drop-shadow-xl">
          GitHub<span className={ACCENT_TEXT_GRADIENT}> RAG Chat</span>
        </h1>
        
        <p className="text-zinc-300 text-xl max-w-lg mx-auto leading-relaxed font-light">
          Ask any question about the GitHub repository in real-time by pasting repo link below.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <Input  placeholder="https://github.com/username/project"  value={repoUrl} onChange={onUrlChange} isInvalid={repoUrl.trim() !== '' && !isUrlValid}/>
          <Button onClick={onIngest} disabled={!isUrlValid} icon={Github}>
            Connect
          </Button>
        </div>
        {urlError && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            {urlError}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}