import { Crosshair, Fingerprint, Gavel, Loader2, CheckCircle2, ShieldAlert, Zap, AlertCircle } from 'lucide-react';
import { MarkdownViewer } from '../../components/ui/MarkdownViewer';

interface IntelligencePanelProps {
  caseDetails: any;
  onExecuteAction?: () => void;
  onEscalateAction?: () => void;
  onOverrideAction?: () => void;
  isActionPending?: boolean;
  actionFeedback?: string | null;
  isInvestigated?: boolean;
  isInvestigating?: boolean;
  liveRiskScore?: number | null;
  liveConfidence?: number | null;
  onStartInvestigation?: () => void;
}

export function IntelligencePanel({
  caseDetails,
  onExecuteAction,
  onEscalateAction,
  onOverrideAction,
  isActionPending = false,
  actionFeedback = null,
  isInvestigated = true,
  isInvestigating = false,
  liveRiskScore = null,
  liveConfidence = null,
  onStartInvestigation,
}: IntelligencePanelProps) {
  if (!caseDetails) {
    return (
      <aside className="w-[380px] border-l border-white/[0.08] bg-black flex flex-col h-full overflow-y-auto shrink-0 p-6 items-center justify-center">
        <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <Loader2 size={14} className="animate-spin text-white" />
          Loading Intelligence...
        </div>
      </aside>
    );
  }

  const uncertaintyScore = Math.round((caseDetails.uncertainty_score ?? 0.5) * 100);

  const calculatedConfidence = caseDetails.confidence_score != null
    ? caseDetails.confidence_score
    : Math.max(0, 100 - uncertaintyScore);

  const riskScore = isInvestigating
    ? liveRiskScore
    : caseDetails.risk_score != null
    ? Math.round(caseDetails.risk_score * 100)
    : null;

  const confidenceScore = isInvestigating
    ? liveConfidence
    : calculatedConfidence;
  
  // Extract 2-stage Next-Best Action
  const nbaFinal = caseDetails.next_best_actions?.final?.[0];
  const nbaInitial = caseDetails.next_best_actions?.initial?.[0];
  const activeNba = nbaFinal || nbaInitial || {};

  // Extract evidence list
  const rawEvidence = caseDetails.evidence || [];
  const evidenceList = Array.isArray(rawEvidence) ? rawEvidence : [];

  return (
    <aside className="w-[380px] border-l border-zinc-800 bg-[#0e0e12] flex flex-col h-full overflow-y-auto shrink-0 select-none">
      
      {/* 01: Region 03 Header & Belief State */}
      <div className="p-6 border-b border-zinc-800 bg-[#121217]">
        <div className="font-mono text-[9px] text-zinc-400 tracking-[0.22em] uppercase mb-1 font-bold flex items-center justify-between">
          <span>WHAT DO WE BELIEVE?</span>
          {!isInvestigated && !isInvestigating && (
            <span className="text-[8px] px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300">
              STANDBY
            </span>
          )}
          {isInvestigating && (
            <span className="text-[8px] px-1.5 py-0.5 rounded border border-white bg-white text-black font-bold animate-pulse">
              CALCULATING LIVE
            </span>
          )}
        </div>
        <h3 className="font-mono text-xs text-white font-bold uppercase tracking-wider mb-5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Crosshair size={13} className="text-white" /> RISK • CONFIDENCE
          </span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs mb-3">
          <div className="bg-[#181822] border border-zinc-800 p-3 rounded">
            <div className="text-zinc-500 mb-1 tracking-widest uppercase text-[9px]">Risk Score</div>
            <div className="flex items-end gap-1.5">
              <span className={`text-xl font-bold ${riskScore !== null ? 'text-white' : 'text-zinc-600'}`}>
                {riskScore !== null ? riskScore : '--'}
              </span>
              <span className="text-zinc-500 text-[10px] mb-0.5">/100</span>
            </div>
          </div>
          
          <div className="bg-[#181822] border border-zinc-800 p-3 rounded">
            <div className="text-zinc-500 mb-1 tracking-widest uppercase text-[9px]">Confidence</div>
            <div className={`text-xl font-bold ${confidenceScore !== null ? 'text-white' : 'text-zinc-600'}`}>
              {confidenceScore !== null ? `${confidenceScore}%` : '--%'}
            </div>
          </div>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-[#181822] border border-zinc-800 p-3 rounded">
            <div className="text-zinc-500 mb-1 tracking-widest uppercase text-[9px]">Evidence State</div>
            <div className="text-[11px] tracking-wider uppercase font-bold text-zinc-200">
              {!isInvestigated && !isInvestigating
                ? 'STANDBY (AWAITING AGENTS)'
                : isInvestigating
                ? 'ORCHESTRATING PIPELINE...'
                : uncertaintyScore > 50
                ? 'INSUFFICIENT (NEEDS STEP-UP)'
                : 'SUFFICIENT (COLLAPSED)'}
            </div>
          </div>
          
          <div className="bg-[#181822] border border-zinc-800 p-3 rounded">
            <div className="text-zinc-500 mb-1 tracking-widest uppercase text-[9px]">Pattern</div>
            <div className="text-white tracking-widest uppercase space-y-1">
              <div className="font-bold text-xs">
                {!isInvestigated && !isInvestigating
                  ? 'ALERT STANDBY'
                  : isInvestigating
                  ? 'GRAPH DISCOVERY RUNNING...'
                  : caseDetails.pattern?.replace(/_/g, ' ') || 'NONE DETECTED'}
              </div>
              <div className="text-zinc-400 text-[10px] font-mono">
                {!isInvestigated && !isInvestigating
                  ? 'STATUS: PENDING INVESTIGATION'
                  : isInvestigating
                  ? 'STATUS: AGENT PIPELINE ACTIVE'
                  : caseDetails.verdict === 'cleared'
                  ? 'STATUS: CLEARED'
                  : caseDetails.verdict === 'fraud'
                  ? 'STATUS: FRAUD CONFIRMED'
                  : 'STATUS: UNCERTAIN ALERT'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 02: Claims & Signals */}
      <div className="p-6 border-b border-zinc-800 bg-[#0e0e12]">
        <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
          Claims & Signals ({isInvestigated ? evidenceList.length : 0})
        </h3>
        {!isInvestigated && !isInvestigating ? (
          <div className="font-mono text-xs text-zinc-500 leading-relaxed p-4 rounded bg-[#14141c] border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px]">
              <AlertCircle size={13} className="text-zinc-400" />
              <span>Evidence Pipeline Standby</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
              Claims, signal grades, and graph-traversal evidence materialize once the autonomous agent pipeline executes.
            </p>
          </div>
        ) : isInvestigating ? (
          <div className="font-mono text-xs text-white leading-relaxed p-4 rounded bg-[#14141c] border border-zinc-700 space-y-2 animate-pulse">
            <div className="flex items-center gap-2 font-bold uppercase text-[10px]">
              <Loader2 size={13} className="animate-spin text-white" />
              <span>Extracting Subgraph Claims...</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              Graph Scout and Evidence Assessor querying TigerGraph Savanna Cloud for merchant clustering and multi-hop velocity.
            </p>
          </div>
        ) : evidenceList.length > 0 ? (
          <ul className="space-y-3 font-mono text-xs">
            {evidenceList.map((ev: any, idx: number) => {
              const grade = typeof ev === 'string' ? 'CORRELATIVE' : (ev.grade || 'CORRELATIVE');
              const text = typeof ev === 'string' ? ev : (ev.claim || ev.text || 'Observed topological pattern');
              return (
                <li key={idx} className="flex items-start gap-2.5 leading-snug p-2 rounded bg-[#14141c] border border-zinc-800/80">
                  <span className="text-zinc-500 mt-0.5">•</span>
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 border border-zinc-700 bg-zinc-800 rounded mr-1.5 text-zinc-300 font-bold">
                      {grade}
                    </span>
                    <span className="text-zinc-200">{text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="font-mono text-xs text-zinc-400 leading-relaxed p-3 rounded bg-[#14141c] border border-zinc-800/80">
            {caseDetails.summary ? (
              <MarkdownViewer content={caseDetails.summary} />
            ) : (
              'Awaiting live graph traversal and multi-hop entity resolution.'
            )}
          </div>
        )}
      </div>

      {/* 03: Decision & Policy (2-Stage NBA) */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-[#101015]">
        <div>
          <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 flex items-center gap-2">
            <Gavel size={12} className="text-white" /> Next Best Action
          </h3>
          
          <div className="border border-zinc-700/80 rounded p-4 bg-[#181824] mb-4 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <Fingerprint className="text-white shrink-0" size={18} />
              <div>
                <div className="text-white font-bold text-sm tracking-tight mb-1 font-heading">
                  {!isInvestigated && !isInvestigating
                    ? 'AWAITING AGENT EVALUATION'
                    : isInvestigating
                    ? 'EVALUATING BANK POLICY...'
                    : activeNba.action?.replace(/_/g, ' ') || 'VERIFY WITH CUSTOMER'}
                </div>
                <div className="text-zinc-400 text-xs leading-relaxed font-sans">
                  {!isInvestigated && !isInvestigating
                    ? 'Bank Fraud Policy v1.0 (R1-R10) decision will be evaluated automatically once the agent pipeline runs.'
                    : isInvestigating
                    ? 'Policy Governor is synthesizing risk thresholds, merchant risk, and step-up challenge logic.'
                    : activeNba.reason || activeNba.reasoning || 'Automated policy recommendation based on Bank Fraud Policy v1.0.'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-[#14141c] border border-zinc-800/80 space-y-2 font-mono text-[10px] mb-6">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Route:</span>
              <span className="text-white font-bold">
                {!isInvestigated && !isInvestigating ? 'STANDBY' : isInvestigating ? 'CALCULATING' : activeNba.route || 'AUTO'}
              </span>
            </div>
            <div className="flex items-start justify-between text-zinc-300">
              <span className="text-zinc-500 mr-2">Bank Fraud Policy v1.0 (R1-R10)</span>
              <span className="text-white font-bold">
                {!isInvestigated && !isInvestigating ? 'PENDING PIPELINE' : isInvestigating ? 'EVALUATING...' : 'VERIFIED ✓'}
              </span>
            </div>
            {caseDetails.sar?.file && isInvestigated && (
              <div className="flex items-start justify-between text-white font-bold">
                <span className="mr-2 text-zinc-400">FinCEN SAR Generated</span>
                <span>MANDATORY</span>
              </div>
            )}
          </div>

          {actionFeedback && (
            <div className="mb-4 p-3 border border-zinc-700 bg-[#161622] rounded font-mono text-[10px] text-white flex items-center gap-2">
              <CheckCircle2 size={13} className="shrink-0 text-white" />
              <span>{actionFeedback}</span>
            </div>
          )}
        </div>

        {/* Action Controls: Uninvestigated vs Investigating vs Investigated */}
        <div className="pt-4 space-y-2">
          {!isInvestigated ? (
            <button
              onClick={onStartInvestigation}
              disabled={isInvestigating}
              className="w-full py-3 bg-white text-black font-bold font-mono text-[11px] tracking-wider uppercase hover:bg-zinc-200 border border-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(255,255,255,0.25)]"
            >
              {isInvestigating ? (
                <>
                  <Loader2 size={13} className="animate-spin text-black" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Zap size={13} className="text-black fill-black" />
                  <span>Start Autonomous Investigation</span>
                </>
              )}
            </button>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={onExecuteAction}
                  disabled={isActionPending}
                  className="py-2.5 bg-white text-black font-bold font-mono text-[10px] tracking-wider uppercase hover:bg-zinc-200 border border-white transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  title="Step-Up Approval: Execute challenge -> Cardholder passes OTP -> Clears case & uncertainty collapses"
                >
                  {isActionPending ? <Loader2 size={12} className="animate-spin text-black" /> : null}
                  Pass OTP
                </button>
                
                <button 
                  onClick={onEscalateAction}
                  disabled={isActionPending}
                  className="py-2.5 bg-[#181822] border border-zinc-700 text-white font-mono text-[10px] tracking-wider uppercase hover:bg-zinc-800 hover:border-zinc-500 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Step-Up Failure: Challenge failed/timeout -> Escalate to L2 & block cards"
                >
                  {isActionPending ? <Loader2 size={12} className="animate-spin text-white" /> : null}
                  Fail OTP
                </button>
              </div>

              <button 
                onClick={onOverrideAction}
                disabled={isActionPending}
                className="w-full py-2.5 bg-[#13131a] border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 font-mono text-[9px] tracking-widest uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                title="Human Cognitive Override: Analyst manually overrules agent policy and enforces immediate block"
              >
                <ShieldAlert size={12} className="text-white" />
                Analyst Discretionary Override
              </button>
            </>
          )}
        </div>
      </div>

    </aside>
  );
}

