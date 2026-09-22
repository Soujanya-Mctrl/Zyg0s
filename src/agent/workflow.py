"""
LangGraph 8-Stage Investigation State Machine for TigerGraph Fraud Investigation Agent.
Orchestrates the collaborative multi-agent pipeline:
Trigger (Alert Sentinel) -> Investigate (Graph Scout) -> Evidence (Evidence Assessor) ->
Uncertainty Assessment (Pattern Strategist) -> [Conditional Step-Up Challenge] ->
Next Actions (Policy Governor) -> Explain & SAR (Compliance Officer) -> Memory Commit (Memory Weaver).
"""

from typing import Dict, Any, List, Optional, TypedDict
from langgraph.graph import StateGraph, END

from src.agent.models import BenchmarkCaseOutput
from src.agent.pipeline.orchestrator import InvestigationOrchestrator


class InvestigationState(TypedDict):
    case_meta: Dict[str, Any]
    case_id: str
    stage: str
    evidence_items: List[Dict[str, Any]]
    uncertainty_score: float
    fraud_probability: float
    needs_secondary_evidence: bool
    secondary_evidence_result: Optional[Dict[str, Any]]
    initial_nba: List[Dict[str, Any]]
    final_nba: List[Dict[str, Any]]
    what_changed: str
    sar_model: Dict[str, Any]
    final_output: Optional[Dict[str, Any]]
    pipeline_trace: List[Dict[str, Any]]


# Singleton orchestrator instance
_orchestrator: Optional[InvestigationOrchestrator] = None

def get_orchestrator() -> InvestigationOrchestrator:
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = InvestigationOrchestrator()
    return _orchestrator


# Node 1: Trigger (Alert Sentinel)
def node_trigger(state: InvestigationState) -> Dict[str, Any]:
    case_meta = state["case_meta"]
    case_id = str(case_meta.get("case_id", "UNKNOWN"))
    return {
        "case_id": case_id,
        "stage": "TRIGGER",
    }


# Node 2: Investigate (Graph Scout)
def node_investigate(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "INVESTIGATE"
    }


# Node 3: Gather Evidence & Multi-Agent Deliberation
def node_gather_evidence(state: InvestigationState) -> Dict[str, Any]:
    orchestrator = get_orchestrator()
    case_meta = state["case_meta"]
    output: BenchmarkCaseOutput = orchestrator.run_investigation(case_meta)
    traces = getattr(output, "orchestrator_pipeline_trace", [])

    return {
        "stage": "GATHER_EVIDENCE",
        "evidence_items": [e.model_dump() for e in output.case.evidence],
        "uncertainty_score": round(output.case.fraud_probability if output.case.verdict == "cleared" else (1.0 - output.case.fraud_probability), 3),
        "fraud_probability": output.case.fraud_probability,
        "needs_secondary_evidence": len(output.evidence_requests) > 0,
        "initial_nba": [a.model_dump() for a in output.next_best_actions.initial],
        "final_nba": [a.model_dump() for a in output.next_best_actions.final],
        "what_changed": output.next_best_actions.what_changed,
        "sar_model": output.sar.model_dump(),
        "final_output": output.model_dump(),
        "pipeline_trace": traces,
    }


# Node 4: Assess Uncertainty
def node_assess_uncertainty(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "ASSESS_UNCERTAINTY"
    }


# Conditional Edge: Check if secondary evidence is needed
def should_gather_more_evidence(state: InvestigationState) -> str:
    if state.get("needs_secondary_evidence", False):
        return "gather_more_evidence"
    return "determine_next_actions"


# Node 5: Gather More Evidence (Step-Up / Customer validation)
def node_gather_more_evidence(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "GATHER_MORE_EVIDENCE"
    }


# Node 6: Determine Next Actions (NBA 2-stage resolution)
def node_determine_next_actions(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "TAKE_NEXT_ACTIONS"
    }


# Node 7: Explain Decision & SAR
def node_explain_decision(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "EXPLAIN_DECISION"
    }


# Node 8: Memory & Graph Writeback (Graph-Native Case Memory)
def node_update_memory(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "UPDATE_MEMORY"
    }


# Build LangGraph workflow
def build_investigation_graph():
    workflow = StateGraph(InvestigationState)

    workflow.add_node("trigger", node_trigger)
    workflow.add_node("investigate", node_investigate)
    workflow.add_node("gather_evidence", node_gather_evidence)
    workflow.add_node("assess_uncertainty", node_assess_uncertainty)
    workflow.add_node("gather_more_evidence", node_gather_more_evidence)
    workflow.add_node("determine_next_actions", node_determine_next_actions)
    workflow.add_node("explain_decision", node_explain_decision)
    workflow.add_node("update_memory", node_update_memory)

    # Wire edges
    workflow.set_entry_point("trigger")
    workflow.add_edge("trigger", "investigate")
    workflow.add_edge("investigate", "gather_evidence")
    workflow.add_edge("gather_evidence", "assess_uncertainty")

    workflow.add_conditional_edges(
        "assess_uncertainty",
        should_gather_more_evidence,
        {
            "gather_more_evidence": "gather_more_evidence",
            "determine_next_actions": "determine_next_actions"
        }
    )

    workflow.add_edge("gather_more_evidence", "determine_next_actions")
    workflow.add_edge("determine_next_actions", "explain_decision")
    workflow.add_edge("explain_decision", "update_memory")
    workflow.add_edge("update_memory", END)

    return workflow.compile()


class FraudAgentWorkflow:
    """
    High-level interface for running investigations via LangGraph state machine.
    """
    def __init__(self):
        self.graph = build_investigation_graph()

    def run_case(self, case_meta: Dict[str, Any]) -> BenchmarkCaseOutput:
        initial_state: InvestigationState = {
            "case_meta": case_meta,
            "case_id": str(case_meta.get("case_id", "UNKNOWN")),
            "stage": "INITIAL",
            "evidence_items": [],
            "uncertainty_score": 1.0,
            "fraud_probability": 0.5,
            "needs_secondary_evidence": False,
            "secondary_evidence_result": None,
            "initial_nba": [],
            "final_nba": [],
            "what_changed": "",
            "sar_model": {},
            "final_output": None,
            "pipeline_trace": []
        }

        final_state = self.graph.invoke(initial_state)
        output_dict = final_state.get("final_output")
        output = BenchmarkCaseOutput.model_validate(output_dict)
        if "pipeline_trace" in final_state:
            output.orchestrator_pipeline_trace = final_state["pipeline_trace"]
        return output
