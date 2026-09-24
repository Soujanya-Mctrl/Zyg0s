import { Compass } from 'lucide-react';

interface InvestigationStepperProps {
  caseDetails: any;
  isInvestigated?: boolean;
  isInvestigating?: boolean;
  activeStep?: number;
}

export function InvestigationStepper({
  caseDetails,
  isInvestigated = true,
  isInvestigating = false,
  activeStep = 0,
}: InvestigationStepperProps) {
  const uncertainty = caseDetails?.uncertainty_score ?? 0.5;
  const isResolved =
    caseDetails?.status === 'closed_cleared' ||
    caseDetails?.status === 'closed_fraud' ||
    caseDetails?.verdict === 'cleared' ||
    caseDetails?.verdict === 'fraud';
  const hasStage2 = Boolean(caseDetails?.next_best_actions?.final?.length);

  const stageNames = [
    'Trigger',
    'Investigate',
    'Evidence',
    'Uncertainty',
    'More Evidence',
    'Reassess',
    'Actions',
    'Resolve',
  ];

  let stages;
  if (!isInvestigated && !isInvestigating) {
    stages = stageNames.map((name, idx) => ({
      name,
      active: idx === 0,
      complete: idx === 0,
    }));
  } else if (isInvestigating) {
    stages = stageNames.map((name, idx) => ({
      name,
      active: idx === activeStep,
      complete: idx < activeStep,
    }));
  } else {
    stages = [
      { name: 'Trigger', active: false, complete: true },
      { name: 'Investigate', active: false, complete: true },
      { name: 'Evidence', active: false, complete: Boolean(caseDetails?.evidence?.length) },
      { name: 'Uncertainty', active: false, complete: uncertainty !== undefined },
      { name: 'More Evidence', active: !isResolved && uncertainty > 0.4, complete: isResolved || uncertainty <= 0.4 },
      { name: 'Reassess', active: !isResolved && hasStage2, complete: isResolved || hasStage2 },
      { name: 'Actions', active: false, complete: isResolved || hasStage2 },
      { name: 'Resolve', active: isResolved, complete: isResolved },
    ];
  }

  return (
    <div className="h-9 border-t border-zinc-800 bg-[#101015] flex items-center px-6 justify-between shrink-0 font-mono text-[9px] tracking-[0.16em] uppercase select-none">
      {/* Mental Model Title (Monochromatic) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-white font-bold flex items-center gap-1.5">
          <Compass size={12} className="text-white" /> WHERE ARE WE?
        </span>
      </div>

      {/* 8-Stage Progression Stepper (Monochromatic) */}
      <div className="flex items-center gap-4 overflow-x-auto py-1">
        {stages.map((stage, idx) => {
          const isComplete = stage.complete;
          const isActive = stage.active;

          return (
            <div
              key={stage.name}
              className={`flex items-center gap-1.5 transition-colors shrink-0 ${
                isActive
                  ? 'text-white font-bold bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700'
                  : isComplete
                  ? 'text-zinc-300'
                  : 'text-zinc-600'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                    : isComplete
                    ? 'bg-zinc-400'
                    : 'border border-zinc-700 bg-transparent'
                }`}
              >
                {isActive && <div className="w-1 h-1 rounded-full bg-black animate-ping" />}
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
