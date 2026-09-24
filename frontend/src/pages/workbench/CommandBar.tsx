import { Terminal, Send } from 'lucide-react';
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
    <div className="h-12 border-t border-white/[0.08] bg-black flex items-center px-4 shrink-0">
      <Terminal size={14} className="text-zinc-500 mr-3" />
      <span className="font-mono text-xs font-bold text-[#06b6d4] mr-3">ZYG0S &gt;</span>
      <input 
        type="text" 
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder={isLoading ? "Agent is reasoning..." : "Type /investigate to trigger agent, or ask a question about this case..."} 
        className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-600 disabled:opacity-50"
      />
      <button 
        onClick={handleSend}
        disabled={isLoading || !cmd.trim()}
        className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 hover:text-white flex items-center gap-2 disabled:opacity-50"
      >
        Execute <Send size={12} />
      </button>
    </div>
  );
}
