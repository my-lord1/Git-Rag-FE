const ACCENT_GRADIENT = "bg-gradient-to-r from-indigo-500 to-violet-500";

export default function Input({ value, onChange, placeholder, onKeyDown, disabled, autoFocus, isInvalid }) {
  return (
    <div className="relative w-full group">
      <div className={`absolute -inset-0.5 ${isInvalid ? 'bg-red-500' : ACCENT_GRADIENT} rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur`}></div>
      <input type="text" value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} disabled={disabled} autoFocus={autoFocus}
        className={`relative w-full bg-black/80 border ${isInvalid ? 'border-red-500/50' : 'border-zinc-800'} text-zinc-100 rounded-xl px-6 py-4 outline-none 
        placeholder:text-zinc-600 focus:text-white transition-all shadow-inner backdrop-blur-xl`}
      />
    </div>
  );
}