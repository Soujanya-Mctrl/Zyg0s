import { useState, useMemo } from 'react';
import { GlitchText } from '../../components/ui/GlitchElements';

export interface CaseSummary {
  case_id: string;
  trigger_type?: string;
  fraud_pattern?: string;
  risk_score: number;
  status: string;
  updated?: string;
  stage_1_action?: string;
  uncertainty_score?: number;
}

interface SidebarQueueProps {
  cases: CaseSummary[];
  activeCaseId: string | null;
  onSelectCase: (id: string) => void;
  investigatedCaseIds?: Set<string>;
}

type QueueFilter = 'ALL' | 'ACTIVE' | 'EVIDENCE' | 'REVIEW' | 'APPROVAL' | 'CLOSED';

const isClosedStatus = (s?: string) => Boolean(s && (s.startsWith('closed') || s === 'cleared' || s === 'resolved'));

export function SidebarQueue({ cases, activeCaseId, onSelectCase, investigatedCaseIds }: SidebarQueueProps) {
  const [selectedFilter, setSelectedFilter] = useState<QueueFilter>('ALL');

  const counts = useMemo(() => {
    return {
      ALL: cases.length,
      ACTIVE: cases.filter(c => !isClosedStatus(c.status)).length,
      EVIDENCE: cases.filter(c => (c.uncertainty_score ?? 0) > 0.40 || (c.risk_score > 0.35 && c.risk_score < 0.70)).length,
      REVIEW: cases.filter(c => (c.risk_score >= 0.40 && c.risk_score < 0.75) || c.stage_1_action?.includes('REVIEW') || c.stage_1_action?.includes('STEP_UP')).length,
      APPROVAL: cases.filter(c => c.risk_score >= 0.75 || c.stage_1_action?.includes('BLOCK') || c.stage_1_action?.includes('SAR') || c.stage_1_action?.includes('FREEZE')).length,
      CLOSED: cases.filter(c => isClosedStatus(c.status)).length,
    };
  }, [cases]);

  const filteredCases = useMemo(() => {
    switch (selectedFilter) {
      case 'ACTIVE':
        return cases.filter(c => !isClosedStatus(c.status));
      case 'EVIDENCE':
        return cases.filter(c => (c.uncertainty_score ?? 0) > 0.40 || (c.risk_score > 0.35 && c.risk_score < 0.70));
      case 'REVIEW':
        return cases.filter(c => (c.risk_score >= 0.40 && c.risk_score < 0.75) || c.stage_1_action?.includes('REVIEW') || c.stage_1_action?.includes('STEP_UP'));
      case 'APPROVAL':
        return cases.filter(c => c.risk_score >= 0.75 || c.stage_1_action?.includes('BLOCK') || c.stage_1_action?.includes('SAR') || c.stage_1_action?.includes('FREEZE'));
      case 'CLOSED':
        return cases.filter(c => isClosedStatus(c.status));
      case 'ALL':
      default:
        return cases;
    }
  }, [cases, selectedFilter]);

  const filterDefs: { id: QueueFilter; label: string }[] = [
    { id: 'ALL', label: 'ALL' },
    { id: 'ACTIVE', label: 'ACTIVE' },
    { id: 'EVIDENCE', label: 'EVIDENCE' },
    { id: 'REVIEW', label: 'REVIEW' },
    { id: 'APPROVAL', label: 'APPROVAL' },
    { id: 'CLOSED', label: 'CLOSED' },
  ];

  return (
    <aside className="w-[320px] border-r border-zinc-800 bg-[#0d0d11] flex flex-col h-full shrink-0 select-none">
      
      {/* Category Navigation (Monochromatic Cyber-Fintech Grid) */}
      <div className="p-4 pb-3 border-b border-zinc-800 bg-[#111116]">
        <div className="font-mono text-[8px] text-zinc-400 tracking-[0.25em] uppercase mb-1 font-bold">
          ALERT QUEUE
        </div>
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-white font-bold mb-3 flex items-center justify-between">
          <span>CASE QUEUE</span>
          <span className="text-[10px] text-zinc-400 font-mono font-normal">
            <strong className="text-white">{filteredCases.length}</strong> / {cases.length} alerts
          </span>
        </div>
        
        {/* 2-Column High-Density Filter Matrix */}
        <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px] tracking-wider uppercase">
          {filterDefs.map((f) => {
            const isSelected = selectedFilter === f.id;
            const count = counts[f.id];
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-2.5 py-1.5 rounded flex items-center justify-between transition-all cursor-pointer border text-left ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                    : 'bg-[#161620]/70 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/60'
                }`}
              >
                <span className="truncate">{f.label}</span>
                <span
                  className={`text-[8px] font-bold px-1 rounded ml-1 ${
                    isSelected ? 'bg-black/15 text-black' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case List (Monochromatic) */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredCases.length === 0 ? (
          <div className="p-8 text-center font-mono">
            <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">
              QUEUE EMPTY
            </div>
            <div className="text-xs text-zinc-400">
              0 cases in {selectedFilter} queue
            </div>
          </div>
        ) : (
          filteredCases.map((c) => {
            const isActive = c.case_id === activeCaseId;
            const isCaseInvestigated = investigatedCaseIds ? investigatedCaseIds.has(c.case_id) : true;
            const riskDisplay = isCaseInvestigated ? `${Math.round(c.risk_score * 100)}%` : '--';
            return (
              <div 
                key={c.case_id}
                onClick={() => onSelectCase(c.case_id)}
                className={`relative p-6 border-b border-zinc-800/60 cursor-pointer transition-colors ${isActive ? 'bg-zinc-800/80 shadow-inner' : 'hover:bg-zinc-800/30'}`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />}
                
                <div className="mb-3 flex items-center justify-between">
                  <span className={`font-mono text-sm tracking-widest font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {isActive ? <GlitchText text={c.case_id} active={isActive} /> : c.case_id}
                  </span>
                  {!isCaseInvestigated && (
                    <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800/90 text-zinc-300">
                      STANDBY
                    </span>
                  )}
                </div>
                
                <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 space-y-1 mb-5">
                  <div>{c.fraud_pattern || 'UNKNOWN PATTERN'}</div>
                  <div>{c.trigger_type || 'NEW DEVICE'}</div>
                </div>
                
                <div className="flex justify-between items-end font-mono text-[10px] tracking-widest uppercase">
                  <div>
                    <div className="text-zinc-600 mb-0.5 text-[9px]">RISK</div>
                    <div className={`font-bold ${isCaseInvestigated ? 'text-white' : 'text-zinc-600'}`}>
                      {riskDisplay}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${!isCaseInvestigated ? 'bg-zinc-600' : c.status === 'open' ? 'bg-white animate-pulse' : 'bg-zinc-400'}`} />
                    <span className={!isCaseInvestigated ? 'text-zinc-500' : c.status === 'open' ? 'text-white font-bold' : 'text-zinc-400'}>
                      {!isCaseInvestigated ? 'AWAITING' : c.status === 'open' ? 'INVESTIGATED' : c.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
