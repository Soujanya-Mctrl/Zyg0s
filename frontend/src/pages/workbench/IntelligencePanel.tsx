import { Crosshair, Fingerprint, Gavel, Loader2, CheckCircle2 } from 'lucide-react';

interface IntelligencePanelProps {
  caseDetails: any;
  onExecuteAction?: () => void;
  onEscalateAction?: () => void;
  isActionPending?: boolean;
  actionFeedback?: string | null;
}

export function IntelligencePanel({
  caseDetails,
  onExecuteAction,
  onEscalateAction,
  isActionPending = false,
  actionFeedback = null,
}: IntelligencePanelProps) {
  if (!caseDetails) {
    return (
      <aside className="w-[380px] border-l border-white/[0.08] bg-black flex flex-col h-full overflow-y-auto shrink-0 p-6 items-center justify-center">
        <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <Loader2 size={14} className="animate-spin text-[#06b6d4]" />
          Loading Intelligence...
        </div>
      </aside>
    );
  }

  const riskScore = Math.round((caseDetails.risk_score ?? 0.5) * 100);
  const uncertaintyScore = Math.round((caseDetails.uncertainty_score ?? 0.5) * 100);
  const confidenceScore = Math.max(0, 100 - uncertaintyScore);
  
  // Extract 2-stage Next-Best Action
  const nbaFinal = caseDetails.next_best_actions?.final?.[0];
  const nbaInitial = caseDetails.next_best_actions?.initial?.[0];
  const activeNba = nbaFinal || nbaInitial || {};

  // Extract evidence list
  const rawEvidence = caseDetails.evidence || [];
  const evidenceList = Array.isArray(rawEvidence) ? rawEvidence : [];

  return (
    <aside className="w-[380px] border-l border-white/[0.08] bg-black flex flex-col h-full overflow-y-auto shrink-0 select-none">
      
      {/* 01: Case Intelligence */}
      <div className="p-8 border-b border-white/[0.08]">
        <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-8 flex items-center gap-2">
          <Crosshair size={12} className="text-[#06b6d4]" /> Case Intelligence
        </h3>
        
        <div className="space-y-6 font-mono text-xs">
          <div>
            <div className="text-zinc-600 mb-1 tracking-widest uppercase">Risk</div>
            <div className="flex items-end gap-2">
              <span className={`text-xl font-bold ${riskScore > 80 ? 'text-[#ef4444]' : riskScore > 60 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
                {riskScore}
              </span>
              <span className="text-zinc-500 mb-0.5">/ 100</span>
            </div>
          </div>
          
          <div>
            <div className="text-zinc-600 mb-1 tracking-widest uppercase">Confidence</div>
            <div className="text-xl font-bold text-white">{confidenceScore}%</div>
          </div>
          
          <div>
            <div className="text-zinc-600 mb-1 tracking-widest uppercase">Uncertainty</div>
            <div className={`text-xl font-bold ${uncertaintyScore > 50 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
              {uncertaintyScore}%
            </div>
          </div>
          
          <div>
            <div className="text-zinc-600 mb-1 tracking-widest uppercase">Evidence State</div>
            <div className={`text-sm tracking-widest uppercase font-bold ${uncertaintyScore > 50 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
              {uncertaintyScore > 50 ? 'INSUFFICIENT (NEEDS STEP-UP)' : 'SUFFICIENT (COLLAPSED)'}
            </div>
          </div>
          
          <div>
            <div className="text-zinc-600 mb-1 tracking-widest uppercase">Pattern</div>
            <div className="text-white tracking-widest uppercase space-y-1">
              <div className="font-bold">{caseDetails.pattern?.replace(/_/g, ' ') || 'NONE DETECTED'}</div>
              <div className="text-[#06b6d4] text-[10px]">
                {caseDetails.verdict === 'cleared' ? 'STATUS: CLEARED' : caseDetails.verdict === 'fraud' ? 'STATUS: FRAUD CONFIRMED' : 'STATUS: UNCERTAIN ALERT'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 02: Why? (Live TigerGraph Evidence Claims) */}
      <div className="p-8 border-b border-white/[0.08] bg-white/[0.02]">
        <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 flex items-center justify-between">
          <span>Why? (Evidence)</span>
          <span className="text-zinc-600">{evidenceList.length} items</span>
        </h3>
        
        {evidenceList.length > 0 ? (
          <ul className="space-y-3 font-mono text-xs">
            {evidenceList.map((ev: any, idx: number) => {
              const grade = ev.grade || 'CORRELATIVE';
              const text = ev.claim || ev.description || (typeof ev === 'string' ? ev : JSON.stringify(ev));
              const isDirect = grade === 'DIRECT';
              const isContradictory = grade === 'CONTRADICTORY';

              return (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-zinc-300">
                  <span className={`font-bold shrink-0 ${isDirect ? 'text-[#ef4444]' : isContradictory ? 'text-[#10b981]' : 'text-[#06b6d4]'}`}>
                    {isContradictory ? '−' : '+'}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 border border-white/10 rounded mr-1.5 text-zinc-400">
                      {grade}
                    </span>
                    <span className="text-zinc-200">{text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="font-mono text-xs text-zinc-500 leading-relaxed">
            {caseDetails.summary || 'Awaiting live graph traversal and multi-hop entity resolution.'}
          </div>
        )}
      </div>

      {/* 03: Decision & Policy (2-Stage NBA) */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 flex items-center gap-2">
            <Gavel size={12} className="text-[#06b6d4]" /> Next Best Action
          </h3>
          
          <div className="border border-white/10 rounded-sm p-4 bg-zinc-900/50 mb-4">
            <div className="flex items-start gap-3 mb-2">
              <Fingerprint className="text-[#06b6d4] shrink-0" size={18} />
              <div>
                <div className="text-white font-bold text-sm tracking-tight mb-1">
                  {activeNba.action?.replace(/_/g, ' ') || 'VERIFY WITH CUSTOMER'}
                </div>
                <div className="text-zinc-400 text-xs leading-relaxed">
                  {activeNba.reason || activeNba.reasoning || 'Automated policy recommendation based on Bank Fraud Policy v1.0.'}
                </div>
              </div>
            </div>
          </div>

          <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-2">
            Route: <span className="text-white font-bold">{activeNba.route || 'AUTO'}</span>
          </div>

          <div className="space-y-2 font-mono text-[10px] mb-6">
            <div className="flex items-start justify-between text-zinc-300">
              <span className="text-zinc-500 mr-2">Bank Fraud Policy v1.0 (R1-R10)</span>
              <span className="text-[#10b981] ml-2 font-bold">VERIFIED ✓</span>
            </div>
            {caseDetails.sar?.file && (
              <div className="flex items-start justify-between text-[#ef4444]">
                <span className="mr-2">FinCEN SAR Generated</span>
                <span className="font-bold">MANDATORY</span>
              </div>
            )}
          </div>

          {actionFeedback && (
            <div className="mb-4 p-3 border border-[#06b6d4]/40 bg-[#06b6d4]/10 rounded font-mono text-[10px] text-[#06b6d4] flex items-center gap-2">
              <CheckCircle2 size={13} className="shrink-0" />
              <span>{actionFeedback}</span>
            </div>
          )}
        </div>

        {/* Action Execution Controls */}
        <div className="pt-4 grid grid-cols-2 gap-2">
          <button 
            onClick={onExecuteAction}
            disabled={isActionPending}
            className="py-2.5 bg-[#06b6d4] text-black font-bold font-mono text-[11px] tracking-widest uppercase hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
            title="Execute recommended step-up auth / clearance (Pass OTP)"
          >
            {isActionPending ? <Loader2 size={12} className="animate-spin" /> : null}
            Execute
          </button>
          
          <button 
            onClick={onEscalateAction}
            disabled={isActionPending}
            className="py-2.5 border border-white/20 text-white font-mono text-[11px] tracking-widest uppercase hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
            title="Escalate challenge failure: block card and route to L2 fraud analyst"
          >
            {isActionPending ? <Loader2 size={12} className="animate-spin" /> : null}
            Escalate
          </button>
        </div>
      </div>

    </aside>
  );
}
