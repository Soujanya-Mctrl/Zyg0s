import { StatusDot } from '../../components/ui/Micrographics';

interface TimelinePanelProps {
  pipeline: any;
}

export function TimelinePanel({ pipeline }: TimelinePanelProps) {
  const events = pipeline?.pipeline_trace?.map((trace: any, idx: number) => {
    // Generate a pseudo-time for visual flavor based on index
    const baseHour = 14;
    const baseMin = 42 + idx;
    const timeStr = `${baseHour}:${baseMin.toString().padStart(2, '0')}`;
    
    return {
      time: timeStr,
      agent: trace.agent?.replace(/_/g, ' ').toUpperCase() || 'AGENT',
      event: trace.action || 'Performed action',
      status: trace.status === 'error' ? 'danger' : trace.status === 'warning' ? 'pending' : 'safe',
      active: idx === pipeline.pipeline_trace.length - 1
    };
  }) || [];

  const stages = ['TRIGGER', 'INVESTIGATE', 'EVIDENCE', 'UNCERTAINTY', 'MORE EVIDENCE', 'REASSESS'];

  return (
    <footer className="h-64 border-t border-white/[0.08] bg-black flex flex-col shrink-0 w-full overflow-hidden">
      
      {/* Investigation Stage Tracker */}
      <div className="h-10 border-b border-white/[0.04] flex items-center px-6 gap-6 font-mono text-[9px] tracking-[0.2em] bg-white/[0.02]">
        {stages.map((stage, idx) => {
          // just mock an active stage based on events length
          const isActive = idx === Math.min(stages.length - 1, Math.floor(events.length / 2));
          const isComplete = idx < Math.floor(events.length / 2);
          return (
            <div key={stage} className={`flex items-center gap-2 ${isActive ? 'text-[#06b6d4] font-bold' : isComplete ? 'text-zinc-500' : 'text-zinc-700'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#06b6d4]' : isComplete ? 'bg-zinc-500' : 'bg-transparent border border-zinc-700'}`} />
              {stage}
              {idx < stages.length - 1 && <span className="ml-4 text-zinc-800">→</span>}
            </div>
          );
        })}
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {events.map((e: any, idx: number) => (
          <div key={idx} className={`flex gap-6 ${e.active ? 'text-white' : 'text-zinc-500'}`}>
            <div className="font-mono text-xs w-12 shrink-0 pt-0.5">{e.time}</div>
            <div className="flex-1 font-mono text-xs">
              <div className="font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
                <StatusDot status={e.status as any} /> {e.agent}
              </div>
              <div className={`pl-4 ${e.active ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {e.event}
              </div>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
