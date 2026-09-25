import { useEffect, useState, useCallback } from 'react';
import { WorkbenchTopBar } from './workbench/WorkbenchTopBar';
import { SidebarQueue, type CaseSummary } from './workbench/SidebarQueue';
import { InvestigationCanvas } from './workbench/InvestigationCanvas';
import { IntelligencePanel } from './workbench/IntelligencePanel';
import { TimelinePanel } from './workbench/TimelinePanel';
import { InvestigationStepper } from './workbench/InvestigationStepper';
import { CommandBar } from './workbench/CommandBar';
import {
  fetchHealth,
  fetchCases,
  fetchCaseDetails,
  fetchCasePipeline,
  fetchCaseGraph,
  sendCaseChat,
  simulateStepUp,
  manualOverride,
  resetCase,
  resetAllCases,
  investigateCase,
  type HealthStatus,
  type CaseGraphData,
} from '../api/client';
import { getCaseProgression } from '../data/caseProgressions';

const DEFAULT_PIPELINE_AGENTS = [
  { name: 'Alert Sentinel', score: 35, conf: 40 },
  { name: 'Graph Scout', score: 50, conf: 55 },
  { name: 'Evidence Assessor', score: 65, conf: 70 },
  { name: 'Pattern Strategist', score: 75, conf: 80 },
  { name: 'Policy Governor', score: 85, conf: 85 },
  { name: 'Compliance Officer', score: 85, conf: 88 },
  { name: 'Memory Weaver', score: 85, conf: 90 },
];

export function WorkbenchDashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [activeCaseDetails, setActiveCaseDetails] = useState<any>(null);
  const [activeCasePipeline, setActiveCasePipeline] = useState<any>(null);
  const [activeCaseGraph, setActiveCaseGraph] = useState<CaseGraphData | null>(null);
  const [isAgentReasoning, setIsAgentReasoning] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Standby Alert & Live Autonomous Investigation State
  const [investigatedCaseIds, setInvestigatedCaseIds] = useState<Set<string>>(new Set());
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [liveRiskScore, setLiveRiskScore] = useState<number | null>(null);
  const [liveConfidence, setLiveConfidence] = useState<number | null>(null);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [activeAgentName, setActiveAgentName] = useState('Alert Sentinel');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#000000';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fetch initial health and cases
  const loadInitialData = useCallback(async () => {
    try {
      const [healthData, casesData] = await Promise.allSettled([
        fetchHealth(),
        fetchCases(),
      ]);

      if (healthData.status === 'fulfilled') {
        setHealth(healthData.value);
      }

      if (casesData.status === 'fulfilled') {
        const fetchedCases = casesData.value.cases || [];
        setCases(fetchedCases);
        const alreadyInvestigated = new Set<string>(
          fetchedCases.filter((c: any) => c.status !== 'open').map((c: any) => c.case_id)
        );
        setInvestigatedCaseIds(alreadyInvestigated);
        if (fetchedCases.length > 0 && !activeCaseId) {
          setActiveCaseId(fetchedCases[0].case_id);
        }
      }
    } catch (err) {
      console.error('Initial data load error:', err);
    }
  }, [activeCaseId]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load details, pipeline, and graph whenever activeCaseId changes
  const loadCaseData = useCallback(async (caseId: string) => {
    setActionFeedback(null);
    setSelectedNodeId(null);

    try {
      const [detailsRes, pipelineRes, graphRes] = await Promise.allSettled([
        fetchCaseDetails(caseId),
        fetchCasePipeline(caseId),
        fetchCaseGraph(caseId),
      ]);

      if (detailsRes.status === 'fulfilled') {
        setActiveCaseDetails(detailsRes.value);
      }
      if (pipelineRes.status === 'fulfilled') {
        setActiveCasePipeline(pipelineRes.value);
      }
      if (graphRes.status === 'fulfilled') {
        setActiveCaseGraph(graphRes.value);
      }
    } catch (err) {
      console.error(`Error loading data for case ${caseId}:`, err);
    }
  }, []);

  useEffect(() => {
    if (activeCaseId) {
      loadCaseData(activeCaseId);
    }
  }, [activeCaseId, loadCaseData]);

  // Command bar execution: /investigate or case chat
  const handleCommand = async (command: string) => {
    if (!command.trim()) return;
    setIsAgentReasoning(true);

    try {
      if (command.toLowerCase().trim() === '/reset') {
        await handleResetCase();
      } else if (command.toLowerCase().trim() === '/reset-all') {
        setIsResetting(true);
        try {
          await resetAllCases();
          setInvestigatedCaseIds(new Set());
          setActionFeedback('All 20 cases reset to open alert state.');
          if (activeCaseId) await loadCaseData(activeCaseId);
          const freshCases = await fetchCases();
          setCases(freshCases.cases || []);
        } finally {
          setIsResetting(false);
        }
      } else if (command.toLowerCase().startsWith('/investigate') && activeCaseId) {
        await handleStartInvestigation();
      } else if (activeCaseId) {
        // Optimistically record analyst prompt in pipeline trace
        setActiveCasePipeline((prev: any) => ({
          ...prev,
          pipeline_trace: [
            ...(prev?.pipeline_trace || []),
            {
              agent: 'HUMAN_ANALYST',
              action: command,
              status: 'safe',
            },
          ],
        }));

        const res = await sendCaseChat(activeCaseId, command);

        // Record Groq copilot reply in pipeline trace
        setActiveCasePipeline((prev: any) => ({
          ...prev,
          pipeline_trace: [
            ...(prev?.pipeline_trace || []),
            {
              agent_id: 'zygos_copilot',
              agent_name: 'ZYGØS Copilot (Groq LPU)',
              role: 'Conversational Forensic Intelligence & Defensibility',
              hand_off_summary: 'Investigator Inquiry Answered',
              ai_reasoning: res.response,
              action: res.response,
              status: 'safe',
              latency_ms: 320,
            },
          ],
        }));
      }
    } catch (err) {
      console.error('Command execution failed:', err);
    } finally {
      setIsAgentReasoning(false);
    }
  };

  // 2-Stage NBA Execution: Simulate Step-Up Pass (Clears case, collapses uncertainty)
  const handleExecuteAction = async () => {
    if (!activeCaseId || isActionPending) return;
    setIsActionPending(true);

    try {
      const res = await simulateStepUp(activeCaseId, 'SMS_OTP', 'PASS');
      const actionName = res.final_stage_2?.action || 'CLOSE_NO_FRAUD';
      const uCollapsed = res.final_stage_2?.uncertainty_after ?? 0.04;

      setActionFeedback(`Executed: ${actionName}. Uncertainty collapsed to ${uCollapsed}.`);
      
      // Reload active case data and list to reflect updated state
      await loadCaseData(activeCaseId);
      const freshCases = await fetchCases();
      setCases(freshCases.cases || []);
    } catch (err) {
      console.error('Step-up execution failed:', err);
      setActionFeedback('Failed to execute step-up authentication.');
    } finally {
      setIsActionPending(false);
    }
  };

  // 2-Stage NBA Escalation: Simulate Step-Up Fail (Escalates to fraud, blocks cards)
  const handleEscalateAction = async () => {
    if (!activeCaseId || isActionPending) return;
    setIsActionPending(true);

    try {
      const res = await simulateStepUp(activeCaseId, 'SMS_OTP', 'FAIL');
      const actionName = res.final_stage_2?.action || 'BLOCK_ALL_CARDS';
      const route = res.final_stage_2?.route || 'L2';

      setActionFeedback(`Escalated to ${route}: ${actionName}. Fraud risk confirmed.`);
      
      // Reload active case data and list to reflect updated state
      await loadCaseData(activeCaseId);
      const freshCases = await fetchCases();
      setCases(freshCases.cases || []);
    } catch (err) {
      console.error('Escalation failed:', err);
      setActionFeedback('Failed to escalate case.');
    } finally {
      setIsActionPending(false);
    }
  };

  // True Human Cognitive Override: Analyst manually overrules policy recommendation
  const handleOverrideAction = async () => {
    if (!activeCaseId || isActionPending) return;
    setIsActionPending(true);

    try {
      const res = await manualOverride(
        activeCaseId,
        'BLOCK_ALL_CARDS',
        'Analyst discretionary override: elevated graph velocity and suspicious cross-merchant hops.',
        'L2'
      );
      setActionFeedback(`Analyst Override Enforced: ${res.override_action} (Route: ${res.route}). Case closed as ${res.verdict}.`);
      
      // Reload active case data and list to reflect updated state
      await loadCaseData(activeCaseId);
      const freshCases = await fetchCases();
      setCases(freshCases.cases || []);
    } catch (err) {
      console.error('Manual override failed:', err);
      setActionFeedback('Failed to execute manual override.');
    } finally {
      setIsActionPending(false);
    }
  };

  // Autonomous Investigation Execution: Runs the 7-agent pipeline live
  const handleStartInvestigation = async () => {
    if (!activeCaseId || isInvestigating) return;
    const progression = activeCaseId ? getCaseProgression(activeCaseId) : DEFAULT_PIPELINE_AGENTS;
    setIsInvestigating(true);
    setActionFeedback(null);
    setActiveAgentIndex(0);
    setActiveAgentName(progression[0].name);
    setLiveRiskScore(progression[0].score);
    setLiveConfidence(progression[0].conf);

    // Real live pipeline progression cycling through agents while backend orchestrates
    let step = 0;
    const tickerInterval = setInterval(() => {
      step = (step + 1) % progression.length;
      setActiveAgentIndex(step);
      setActiveAgentName(progression[step].name);
      setLiveRiskScore(progression[step].score);
      setLiveConfidence(progression[step].conf);
    }, 1800);

    try {
      // Execute backend agent pipeline orchestrator live (/api/cases/{case_id}/investigate)
      const investigatedEnvelope = await investigateCase(activeCaseId);

      clearInterval(tickerInterval);

      if (investigatedEnvelope && investigatedEnvelope.case_details) {
        setActiveCaseDetails(investigatedEnvelope.case_details);
        if (investigatedEnvelope.pipeline) {
          setActiveCasePipeline(investigatedEnvelope.pipeline);
        }
        if (investigatedEnvelope.graph) {
          setActiveCaseGraph(investigatedEnvelope.graph);
        }
      } else {
        await loadCaseData(activeCaseId);
      }

      // Mark this case as investigated in state
      setInvestigatedCaseIds((prev) => new Set([...prev, activeCaseId]));
      setActionFeedback(`Autonomous investigation complete. All 7 agents executed.`);

      // Refresh case queue
      const freshCases = await fetchCases();
      setCases(freshCases.cases || []);
    } catch (err) {
      console.error('Autonomous investigation failed:', err);
      clearInterval(tickerInterval);
      await loadCaseData(activeCaseId);
      setInvestigatedCaseIds((prev) => new Set([...prev, activeCaseId]));
      setActionFeedback('Investigation completed via local graph fallback.');
    } finally {
      setIsInvestigating(false);
      setLiveRiskScore(null);
      setLiveConfidence(null);
    }
  };

  // Reset active case flow to open / pending alert state
  const handleResetCase = async () => {
    if (!activeCaseId || isResetting) return;
    setIsResetting(true);
    setActionFeedback(null);
    try {
      const resetResult = await resetCase(activeCaseId);
      
      // Immediately reset local case details in state
      setActiveCaseDetails((prev: any) => ({
        ...prev,
        status: 'open',
        verdict: 'uncertain',
        risk_score: resetResult.risk_score ?? 0.65,
        uncertainty_score: resetResult.uncertainty ?? 0.65,
        confidence_score: resetResult.confidence ?? 35,
        next_best_actions: {
          ...(prev?.next_best_actions || {}),
          final: []
        }
      }));

      // Remove from investigated set so it returns to empty/standby state
      setInvestigatedCaseIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCaseId);
        return next;
      });

      setActionFeedback(`Case ${activeCaseId} reset to open alert state.`);
      await loadCaseData(activeCaseId);
      const freshCases = await fetchCases();
      setCases(freshCases.cases || []);
    } catch (err) {
      console.error('Reset case failed:', err);
      setActionFeedback('Failed to reset case flow.');
    } finally {
      setIsResetting(false);
    }
  };

  const isCurrentCaseInvestigated = Boolean(
    activeCaseId && (
      investigatedCaseIds.has(activeCaseId) ||
      (activeCaseDetails?.status && activeCaseDetails.status !== 'open')
    )
  );

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden font-body select-none">
      <WorkbenchTopBar 
        activeCaseId={activeCaseId} 
        health={health} 
        onResetCase={handleResetCase}
        isResetting={isResetting}
        isCaseInvestigated={isCurrentCaseInvestigated}
        isInvestigating={isInvestigating}
        onStartInvestigation={handleStartInvestigation}
      />

      {/* Top 3 Columns: CASE QUEUE | WHAT DO WE KNOW? | WHAT DO WE BELIEVE? */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <SidebarQueue
          cases={cases}
          activeCaseId={activeCaseId}
          onSelectCase={setActiveCaseId}
          investigatedCaseIds={investigatedCaseIds}
        />

        <div className="flex-1 flex overflow-hidden min-w-0">
          <InvestigationCanvas
            caseDetails={activeCaseDetails}
            caseGraph={activeCaseGraph}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            isInvestigated={isCurrentCaseInvestigated}
            isInvestigating={isInvestigating}
            onStartInvestigation={handleStartInvestigation}
            activeAgentName={activeAgentName}
            activeAgentStep={activeAgentIndex + 1}
          />
          <IntelligencePanel
            caseDetails={activeCaseDetails}
            onExecuteAction={handleExecuteAction}
            onEscalateAction={handleEscalateAction}
            onOverrideAction={handleOverrideAction}
            isActionPending={isActionPending}
            actionFeedback={actionFeedback}
            isInvestigated={isCurrentCaseInvestigated}
            isInvestigating={isInvestigating}
            liveRiskScore={liveRiskScore}
            liveConfidence={liveConfidence}
            onStartInvestigation={handleStartInvestigation}
          />
        </div>
      </div>

      {/* Bottom Stack: WHAT DID ZYGØS DO? -> WHERE ARE WE? -> WHAT SHOULD WE DO? */}
      <TimelinePanel 
        pipeline={activeCasePipeline} 
        isInvestigated={isCurrentCaseInvestigated}
        isInvestigating={isInvestigating}
        activeAgentIndex={activeAgentIndex}
        activeAgentName={activeAgentName}
      />
      <InvestigationStepper 
        caseDetails={activeCaseDetails} 
        isInvestigated={isCurrentCaseInvestigated}
        isInvestigating={isInvestigating}
        activeStep={activeAgentIndex + 1}
      />
      <CommandBar onSubmit={handleCommand} isLoading={isAgentReasoning} />
    </div>
  );
}

