import { SVGBracket } from '../../components/ui/Micrographics';
import { ShieldAlert } from 'lucide-react';
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
}

export function SidebarQueue({ cases, activeCaseId, onSelectCase }: SidebarQueueProps) {
  const activeCount = cases.filter(c => c.status !== 'closed' && c.status !== 'cleared').length;
  const needsEvidenceCount = cases.filter(c => c.status === 'open' && c.uncertainty_score && c.uncertainty_score > 0.4).length;

  return (
    <aside className="w-[320px] border-r border-white/[0.08] bg-black flex flex-col h-full shrink-0">
      
      {/* Category Navigation */}
      <div className="p-6 pb-2 border-b border-white/[0.08]">
        <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-6 flex items-center gap-2">
          <ShieldAlert size={12} /> Investigation Queue
        </h2>
        
        <div className="space-y-1 font-mono text-[9px] tracking-widest uppercase mb-4">
          {['ALL', 'ACTIVE', 'EVIDENCE', 'REVIEW', 'APPROVAL', 'CLOSED'].map((filter, idx) => (
            <div key={filter} className={`flex items-center justify-between p-2 cursor-pointer transition-colors ${idx === 1 ? 'text-white bg-white/[0.04]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}`}>
              <span>{filter}</span>
              {idx === 1 && <span className="text-[#06b6d4]">{activeCount}</span>}
              {idx === 2 && <span className="text-[#f59e0b]">{needsEvidenceCount}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Case List */}
      <div className="flex-1 overflow-y-auto">
        {cases.map((c) => {
          const isActive = c.case_id === activeCaseId;
          const riskDisplay = Math.round(c.risk_score * 100);
          return (
            <div 
              key={c.case_id}
              onClick={() => onSelectCase(c.case_id)}
              className={`relative p-6 border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02] transition-colors ${isActive ? 'bg-white/[0.04]' : ''}`}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#06b6d4]"></div>}
              {isActive && <SVGBracket className="top-2 left-2 text-[#06b6d4]/50" />}
              {isActive && <SVGBracket className="bottom-2 right-2 text-[#06b6d4]/50" />}
              
              <div className="mb-4">
                <span className={`font-mono text-sm tracking-widest font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {isActive ? <GlitchText text={c.case_id} active={isActive} /> : c.case_id}
                </span>
              </div>
              
              <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 space-y-1 mb-6">
                <div>{c.fraud_pattern || 'UNKNOWN PATTERN'}</div>
                <div>{c.trigger_type || 'NEW DEVICE'}</div>
              </div>
              
              <div className="flex justify-between items-end font-mono text-[10px] tracking-widest uppercase">
                <div>
                  <div className="text-zinc-600 mb-1">RISK</div>
                  <div className={`font-bold ${riskDisplay > 80 ? 'text-[#ef4444]' : riskDisplay > 60 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
                    {riskDisplay}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'open' ? 'bg-[#f59e0b] animate-pulse' : 'bg-[#10b981]'}`} />
                  <span className={c.status === 'open' ? 'text-[#f59e0b]' : 'text-[#10b981]'}>
                    {c.status === 'open' ? 'INVESTIGATING' : c.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
