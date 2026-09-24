import { Compass } from 'lucide-react';

interface InvestigationStepperProps {
  caseDetails: any;
}

export function InvestigationStepper({ caseDetails }: InvestigationStepperProps) {
  const uncertainty = caseDetails?.uncertainty_score ?? 0.5;
  const isResolved =
    caseDetails?.status === 'closed_cleared' ||
    caseDetails?.status === 'closed_fraud' ||
    caseDetails?.verdict === 'cleared' ||
    caseDetails?.verdict === 'fraud';
  const hasStage2 = Boolean(caseDetails?.next_best_actions?.final?.length);

  const stages = [
    { name: 'Trigger', active: false, complete: true },
    { name: 'Investigate', active: false, complete: true },
    { name: 'Evidence', active: false, complete: Boolean(caseDetails?.evidence?.length) },
    { name: 'Uncertainty', active: false, complete: uncertainty !== undefined },
    { name: 'More Evidence', active: !isResolved && uncertainty > 0.4, complete: isResolved || uncertainty <= 0.4 },
    { name: 'Reassess', active: !isResolved && hasStage2, complete: isResolved || hasStage2 },
    { name: 'Actions', active: false, complete: isResolved || hasStage2 },
    { name: 'Resolve', active: isResolved, complete: isResolved },
  ];

  return (
    <div className="h-9 border-t border-white/[0.08] bg-zinc-950/95 flex items-center px-6 justify-between shrink-0 font-mono text-[9px] tracking-[0.16em] uppercase select-none">
      {/* Mental Model Title */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-[#06b6d4] font-bold">REGION 05</span>
        <span className="text-zinc-700">|</span>
        <span className="text-white font-bold flex items-center gap-1.5">
          <Compass size={12} className="text-[#06b6d4]" /> WHERE ARE WE?
        </span>
      </div>

      {/* 8-Stage Progression Stepper */}
      <div className="flex items-center gap-4 overflow-x-auto py-1">
        {stages.map((stage, idx) => {
          const isComplete = stage.complete;
          const isActive = stage.active;

          return (
            <div
              key={stage.name}
              className={`flex items-center gap-1.5 transition-colors shrink-0 ${
                isActive
                  ? 'text-[#06b6d4] font-bold'
                  : isComplete
                  ? 'text-zinc-300'
                  : 'text-zinc-600'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]'
                    : isComplete
                    ? 'bg-[#10b981]'
                    : 'border border-zinc-700 bg-transparent'
                }`}
              >
                {isActive && <div className="w-1 h-1 rounded-full bg-white animate-ping" />}
              </div>
              <span>{stage.name}</span>
              {idx < stages.length - 1 && <span className="ml-2.5 text-zinc-700">→</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
