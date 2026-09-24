import { useState } from 'react';
import { StatusDot } from '../../components/ui/Micrographics';
import { Activity, Clock, ChevronDown, ChevronUp, Cpu, Database, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { MarkdownViewer } from '../../components/ui/MarkdownViewer';

interface TimelinePanelProps {
  pipeline: any;
  isInvestigated?: boolean;
  isInvestigating?: boolean;
  activeAgentIndex?: number;
  activeAgentName?: string;
}

const AGENT_SEQUENCE = [
  { name: 'ALERT SENTINEL', role: 'Telemetry Ingestion & Trigger Triage' },
  { name: 'GRAPH SCOUT', role: 'TigerGraph Multi-Hop Subgraph Traversal' },
  { name: 'EVIDENCE ASSESSOR', role: 'Defensibility Grading & Signal Weighting' },
  { name: 'PATTERN STRATEGIST', role: 'Groq LPU Fraud Ring Synthesis' },
  { name: 'POLICY GOVERNOR', role: 'Bank Policy v1.0 (R1-R10) & 2-Stage NBA' },
  { name: 'COMPLIANCE OFFICER', role: 'FinCEN SAR Narrative Formulation' },
  { name: 'MEMORY WEAVER', role: 'TigerGraph Episodic Memory Archival' },
];

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
  let icon = Activity;
  if (upper.includes('ALERT') || upper.includes('SENTINEL') || upper.includes('TRIAGE') || upper.includes('OVERRIDE')) {
    icon = ShieldAlert;
  } else if (upper.includes('GRAPH') || upper.includes('SCOUT') || upper.includes('MEMORY') || upper.includes('WEAVER')) {
    icon = Database;
  } else if (upper.includes('PATTERN') || upper.includes('STRATEGIST') || upper.includes('COPILOT')) {
    icon = Cpu;
  } else if (upper.includes('POLICY') || upper.includes('GOVERNOR') || upper.includes('APPROVAL')) {
    icon = CheckCircle2;
  }

  return {
    text: 'text-white',
    badge: 'border-white/20 bg-white/[0.04] text-white',
    icon,
  };
}

export function TimelinePanel({
  pipeline,
  isInvestigated = true,
  isInvestigating = false,
  activeAgentIndex = 0,
  activeAgentName = 'Alert Sentinel',
}: TimelinePanelProps) {
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
    <footer className="h-56 border-t border-zinc-800 bg-[#0c0c10] flex flex-col shrink-0 w-full overflow-hidden select-none">
      {/* Region 04 Header: WHAT DID ZYGØS DO? (Pure Monochrome) */}
      <div className="h-7 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-[#121217] shrink-0 font-mono text-[9px] uppercase tracking-[0.18em]">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Activity size={12} className="text-white" /> WHAT DID ZYGØS DO?
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">AGENT • EVIDENCE • TIMELINE</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400 text-[8px]">
          <Clock size={10} />
          <span>
            {!isInvestigated && !isInvestigating
              ? '0 / 7 AGENTS EXECUTED (STANDBY)'
              : isInvestigating
              ? `RUNNING: ${activeAgentName.toUpperCase()} (${Math.min(activeAgentIndex + 1, 7)} OF 7)`
              : `${events.length} chronological actions`}
          </span>
        </div>
      </div>

      {/* Scrollable Forensic Events Trace */}
      <div className="flex-1 px-6 py-3 overflow-y-auto space-y-2 bg-[#0c0c10]">
        {!isInvestigated && !isInvestigating ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 h-full items-center">
            {AGENT_SEQUENCE.map((agent, i) => (
              <div
                key={agent.name}
                className="p-2.5 rounded border border-zinc-800/80 bg-[#111116] flex flex-col justify-between h-28 font-mono text-left"
              >
                <div>
                  <div className="text-[8px] text-zinc-500 font-bold mb-1">0{i + 1} // STANDBY</div>
                  <div className="text-white font-bold text-[10px] tracking-tight uppercase leading-tight">
                    {agent.name}
                  </div>
                </div>
                <div className="text-zinc-500 text-[8px] line-clamp-2 leading-tight">
                  {agent.role}
                </div>
              </div>
            ))}
          </div>
        ) : isInvestigating ? (
          <div className="space-y-2">
            {AGENT_SEQUENCE.slice(0, activeAgentIndex + 1).map((agent, i) => {
              const isCurrent = i === activeAgentIndex;
              return (
                <div
                  key={agent.name}
                  className={`p-3 rounded border font-mono transition-all ${
                    isCurrent
                      ? 'bg-[#181824] border-white shadow-[0_0_12px_rgba(255,255,255,0.12)]'
                      : 'bg-[#111116] border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 text-[9px]">0{i + 1}</span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                        {agent.name}
                      </span>
                      <span className="text-zinc-500 text-[9px]">— {agent.role}</span>
                    </div>
                    {isCurrent ? (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white bg-white text-black font-bold text-[9px] uppercase">
                        <Loader2 size={10} className="animate-spin text-black" />
                        Running...
                      </span>
                    ) : (
                      <span className="text-[9px] text-zinc-400 uppercase font-bold">
                        Completed ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : events.length > 0 ? (
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
                    ? 'bg-[#1a1a24] border-zinc-500 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
                    : 'bg-[#121218] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#161620]'
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
                      <span className="font-mono text-[9px] text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800/70">
                        ⚡ {e.latency}
                      </span>
                    )}
                    {hasReasoning && (
                      <button
                        onClick={() => toggleReasoning(e.id)}
                        className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 hover:text-white px-1.5 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 flex items-center gap-1 bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
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
                  <div className="mt-2.5 ml-6 p-3 rounded bg-[#0b0b0f] border-l-2 border-white border border-zinc-800 font-sans text-xs">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white font-bold mb-1.5 flex items-center gap-1.5">
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

