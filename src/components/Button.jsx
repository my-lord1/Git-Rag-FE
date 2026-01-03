import { motion } from 'framer-motion';

const ACCENT_GRADIENT = "bg-gradient-to-r from-indigo-500 to-violet-500";

export default function Button({ children, onClick, disabled, className, icon: Icon }) {
  return (
    <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)" }} whileTap={{ scale: 0.98 }} onClick={onClick} disabled={disabled}
      className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 relative overflow-hidden group
      ${disabled ? 'bg-zinc-900/50 text-zinc-600 border border-zinc-800 cursor-not-allowed' : `text-white ${ACCENT_GRADIENT} shadow-lg shadow-indigo-500/20`} ${className}`}>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
      {Icon && <Icon size={18} className="relative z-10" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}