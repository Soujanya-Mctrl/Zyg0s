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
    <div className="h-11 border-t border-white/[0.08] bg-black flex items-center px-6 shrink-0 select-none">
      {/* Mental Model Title */}
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500 mr-4 shrink-0">
        <span className="text-[#06b6d4] font-bold">REGION 06</span>
        <span className="text-zinc-700">|</span>
        <span className="text-white font-bold flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#06b6d4]" /> WHAT SHOULD WE DO?
        </span>
      </div>

      <div className="flex items-center gap-2 flex-1 bg-white/[0.02] border border-white/10 rounded px-3 py-1">
        <Terminal size={12} className="text-[#06b6d4] shrink-0" />
        <span className="font-mono text-xs font-bold text-[#06b6d4] shrink-0">ZYGØS &gt;</span>
        <input 
          type="text" 
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={isLoading ? "Agent reasoning in progress..." : "Ask / investigate / request / explain (e.g. /investigate, 'explain card testing rule R5')..."} 
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-600 disabled:opacity-50"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !cmd.trim()}
          className="font-mono text-[9px] tracking-widest uppercase text-zinc-400 hover:text-white flex items-center gap-1.5 disabled:opacity-30 shrink-0 px-2 py-0.5 border border-white/10 rounded hover:border-[#06b6d4] transition-colors"
        >
          Execute <Send size={10} />
        </button>
      </div>
    </div>
  );
}
