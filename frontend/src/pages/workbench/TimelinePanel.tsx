import { useState } from 'react';
import { StatusDot } from '../../components/ui/Micrographics';
import { Activity, Clock, ChevronDown, ChevronUp, Cpu, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MarkdownViewer } from '../../components/ui/MarkdownViewer';

interface TimelinePanelProps {
  pipeline: any;
}

interface ParsedTraceEvent {
  id: string;
  time: string;
  agentName: string;
  role: string;
  summary: string;
  reasoning: string;
  latency: string;
  status: 'safe' | 'pending' | 'danger';
  active: boolean;
}

function getAgentTheme(agentName: string) {
  const upper = agentName.toUpperCase();
  if (upper.includes('ALERT') || upper.includes('SENTINEL') || upper.includes('TRIAGE')) {
    return {
      text: 'text-amber-400',
      badge: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      icon: ShieldAlert,
    };
  }
  if (upper.includes('GRAPH') || upper.includes('SCOUT') || upper.includes('DETECTIVE')) {
    return {
      text: 'text-cyan-400',
      badge: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
      icon: Database,
    };
  }
  if (upper.includes('EVIDENCE') || upper.includes('ASSESSOR')) {
    return {
      text: 'text-purple-400',
      badge: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
      icon: Activity,
    };
  }
  if (upper.includes('PATTERN') || upper.includes('STRATEGIST')) {
    return {
      text: 'text-blue-400',
      badge: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
      icon: Cpu,
    };
  }
  if (upper.includes('POLICY') || upper.includes('GOVERNOR')) {
    return {
      text: 'text-emerald-400',
      badge: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
      icon: CheckCircle2,
    };
  }
  if (upper.includes('COMPLIANCE') || upper.includes('OFFICER') || upper.includes('SAR')) {
    return {
      text: 'text-rose-400',
      badge: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
      icon: ShieldAlert,
    };
  }
  if (upper.includes('MEMORY') || upper.includes('WEAVER')) {
    return {
      text: 'text-indigo-400',
      badge: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
      icon: Database,
    };
  }
  if (upper.includes('OVERRIDE')) {
    return {
      text: 'text-red-400',
      badge: 'border-red-500/50 bg-red-500/10 text-red-300',
      icon: ShieldAlert,
    };
  }
  if (upper.includes('APPROVAL')) {
    return {
      text: 'text-cyan-300',
      badge: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
      icon: CheckCircle2,
    };
  }
  return {
    text: 'text-teal-400',
    badge: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
    icon: Cpu,
  };
}

export function TimelinePanel({ pipeline }: TimelinePanelProps) {
  const [expandedReasoningIds, setExpandedReasoningIds] = useState<Record<string, boolean>>({});

  const toggleReasoning = (id: string) => {
    setExpandedReasoningIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const rawTrace = pipeline?.pipeline_trace || [];
  const events: ParsedTraceEvent[] = rawTrace.map((trace: any, idx: number) => {
    // Generate clean timestamp
    let timeStr = '14:42';
    if (trace.timestamp) {
      try {
        const d = new Date(trace.timestamp);
        timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
      } catch {
        timeStr = `14:${(42 + idx).toString().padStart(2, '0')}`;
      }
    } else {
      timeStr = `14:${(42 + idx).toString().padStart(2, '0')}`;
    }

    // Extract human-readable agent name
    let cleanName = trace.agent_name || trace.agent || trace.agent_id || `Agent ${idx + 1}`;
    if (typeof cleanName === 'string' && cleanName.startsWith('agent_')) {
      cleanName = cleanName.replace(/agent_\d+_/, '').replace(/_/g, ' ');
    }
    if (typeof cleanName === 'string') {
      cleanName = cleanName.replace(/_/g, ' ').toUpperCase();
    }

    // Extract role, summary, and reasoning
    const role = trace.role || '';
    const summary =
      trace.hand_off_summary ||
      trace.action ||
      trace.step ||
      (trace.ai_reasoning ? 'Completed investigative reasoning.' : 'Completed agent analysis.');
    const reasoning = trace.ai_reasoning || '';
    const latency = trace.latency_ms ? `${Math.round(trace.latency_ms)}ms` : '';

    // Status mapping
    let status: 'safe' | 'pending' | 'danger' = 'safe';
    const upperName = String(cleanName).toUpperCase();
    const upperSum = String(summary).toUpperCase();

    if (trace.status === 'danger' || trace.status === 'error') {
      status = 'danger';
    } else if (trace.status === 'warning' || trace.status === 'pending') {
      status = 'pending';
    } else if (upperName.includes('OVERRIDE') || upperSum.includes('BLOCK') || upperSum.includes('FRAUD')) {
      status = 'danger';
    } else if (upperSum.includes('STEP-UP') || upperSum.includes('UNCERTAIN') || upperSum.includes('VERIFY')) {
      status = 'pending';
    }

    return {
      id: `evt_${idx}`,
      time: timeStr,
      agentName: cleanName,
      role,
      summary,
      reasoning,
      latency,
      status,
      active: idx === rawTrace.length - 1,
    };
  });

  return (
    <footer className="h-56 border-t border-white/[0.08] bg-black flex flex-col shrink-0 w-full overflow-hidden select-none">
      {/* Region 04 Header: WHAT DID ZYGØS DO? */}
      <div className="h-7 border-b border-white/[0.04] flex items-center justify-between px-6 bg-white/[0.02] shrink-0 font-mono text-[9px] uppercase tracking-[0.18em]">
        <div className="flex items-center gap-3">
          <span className="text-[#06b6d4] font-bold">REGION 04</span>
          <span className="text-zinc-700">|</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <Activity size={12} className="text-[#06b6d4]" /> WHAT DID ZYGØS DO?
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">AGENT • EVIDENCE • TIMELINE</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-500 text-[8px]">
          <Clock size={10} />
          <span>{events.length} chronological actions</span>
        </div>
      </div>

      {/* Scrollable Forensic Events Trace */}
      <div className="flex-1 px-6 py-3 overflow-y-auto space-y-2.5">
        {events.length > 0 ? (
          events.map((e, idx) => {
            const theme = getAgentTheme(e.agentName);
            const Icon = theme.icon;
            const hasReasoning = Boolean(e.reasoning && e.reasoning.trim() !== e.summary.trim());
            const isExpanded = expandedReasoningIds[e.id] ?? (e.active || idx === events.length - 1);

            return (
              <div
                key={e.id}
                className={`p-3 rounded border transition-all ${
                  e.active
                    ? 'bg-zinc-950/90 border-[#06b6d4]/40 shadow-[0_0_12px_rgba(6,182,212,0.12)]'
                    : 'bg-zinc-950/40 border-white/[0.06] hover:border-white/15'
                }`}
              >
                {/* Header Row: Timestamp • Agent Pill • Role • Latency */}
                <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-[10px] text-zinc-500">{e.time}</span>
                    
                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider uppercase border ${theme.badge}`}>
                      <StatusDot status={e.status} />
                      <Icon size={11} className={theme.text} />
                      <span>{e.agentName}</span>
                    </span>

                    {e.role && (
                      <span className="font-mono text-[9px] text-zinc-400 tracking-wide hidden md:inline">
                        — {e.role}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {e.latency && (
                      <span className="font-mono text-[9px] text-zinc-500 px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02]">
                        ⚡ {e.latency}
                      </span>
                    )}
                    {hasReasoning && (
                      <button
                        onClick={() => toggleReasoning(e.id)}
                        className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 hover:text-white px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1 bg-white/[0.02] hover:border-[#06b6d4] transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Rationale' : 'View Rationale'}</span>
                        {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Action / Hand-Off Summary */}
                <div className="pl-6 font-mono text-xs text-zinc-200 leading-relaxed font-semibold">
                  <MarkdownViewer content={e.summary} />
                </div>

                {/* Cognitive Reasoning Narrative (Expandable) */}
                {hasReasoning && isExpanded && (
                  <div className="mt-2.5 ml-6 p-3 rounded bg-black/70 border-l-2 border-[#06b6d4] border-white/10 font-sans text-xs">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#06b6d4] font-bold mb-1.5 flex items-center gap-1.5">
                      <Cpu size={11} />
                      <span>Groq LPU Cognitive Reasoning Narrative:</span>
                    </div>
                    <MarkdownViewer content={e.reasoning} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center font-mono text-xs text-zinc-600 uppercase tracking-widest">
            Awaiting agent pipeline trigger (/investigate)...
          </div>
        )}
      </div>
    </footer>
  );
}
