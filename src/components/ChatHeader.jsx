const ACCENT_GRADIENT = "bg-gradient-to-r from-indigo-500 to-violet-500";

export default function ChatHeader({ repoUrl, onReset }) {
  return (
    <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/40">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${ACCENT_GRADIENT} animate-pulse`} />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-indigo-500 blur-sm animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-zinc-100 tracking-wide">Link Established</span>
          <span className="text-xs text-indigo-400 font-mono">
            {repoUrl.replace('https://github.com/', '')}
          </span>
        </div>
      </div>
      <button onClick={onReset} className="px-4 py-2 text-sm rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all">
        Go Back
      </button>
    </div>
  );
}