import { Terminal, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface CommandBarProps {
  onSubmit: (command: string) => void;
  isLoading?: boolean;
}

export function CommandBar({ onSubmit, isLoading }: CommandBarProps) {
  const [cmd, setCmd] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && cmd.trim() && !isLoading) {
      onSubmit(cmd.trim());
      setCmd('');
    }
  };

  const handleSend = () => {
    if (cmd.trim() && !isLoading) {
      onSubmit(cmd.trim());
      setCmd('');
    }
  };

  return (
    <div className="h-11 border-t border-zinc-800 bg-[#09090c] flex items-center px-6 shrink-0 select-none">
      {/* Mental Model Title (Monochromatic) */}
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] mr-4 shrink-0">
        <span className="text-white font-bold flex items-center gap-1.5">
          <Sparkles size={11} className="text-white" /> WHAT SHOULD WE DO?
        </span>
      </div>

      <div className="flex items-center gap-2 flex-1 bg-[#14141c] border border-zinc-700/80 rounded px-3 py-1 focus-within:border-zinc-500 transition-colors">
        <Terminal size={12} className="text-white shrink-0" />
        <span className="font-mono text-xs font-bold text-white shrink-0">ZYGOS &gt;</span>
        <input 
          type="text" 
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={isLoading ? "Agent reasoning in progress..." : "Ask / investigate / request / explain (e.g. /investigate, 'explain card testing rule R5')..."} 
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-500 disabled:opacity-50"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !cmd.trim()}
          className="font-mono text-[9px] tracking-widest uppercase text-zinc-300 hover:text-white flex items-center gap-1.5 disabled:opacity-30 shrink-0 px-2.5 py-0.5 border border-zinc-700 rounded bg-zinc-800/80 hover:bg-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer"
        >
          Execute <Send size={10} />
        </button>
      </div>
    </div>
  );
}
