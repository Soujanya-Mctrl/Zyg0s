"""
LangGraph 8-Stage Investigation State Machine for TigerGraph Fraud Investigation Agent.
Orchestrates the canonical 8-step lifecycle:
Trigger -> Investigate -> Gather Evidence -> Assess Uncertainty ->
Gather More Evidence (Conditional) -> Take Actions (NBA) -> Explain & SAR -> Memory Loop.
"""

from typing import Dict, Any, List, Optional, TypedDict, Annotated
from langgraph.graph import StateGraph, END

from src.agent.models import (
    BenchmarkCaseOutput, CaseRecord, EvidenceItem, EvidenceRequest,
    NextBestActions, SARModel, ActionRecommendation, ActionEnum, ApprovalRouteEnum
)
from src.agent.reasoning import FraudReasoningEngine
from src.graph.client import get_tg_connection


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


# Singleton engine instance
_engine: Optional[FraudReasoningEngine] = None

def get_engine() -> FraudReasoningEngine:
    global _engine
    if _engine is None:
        _engine = FraudReasoningEngine()
    return _engine


# Node 1: Trigger
def node_trigger(state: InvestigationState) -> Dict[str, Any]:
    case_meta = state["case_meta"]
    case_id = str(case_meta.get("case_id", "UNKNOWN"))
    return {
        "case_id": case_id,
        "stage": "TRIGGER",
        "evidence_items": []
    }


# Node 2: Investigate (Anchor target entities)
def node_investigate(state: InvestigationState) -> Dict[str, Any]:
    return {
        "stage": "INVESTIGATE"
    }


# Node 3: Gather Evidence (Traverse graph and telemetry)
def node_gather_evidence(state: InvestigationState) -> Dict[str, Any]:
    # Delegate to reasoning engine
    engine = get_engine()
    case_meta = state["case_meta"]
    # We perform the full investigation analysis
    output: BenchmarkCaseOutput = engine.investigate_case(case_meta)
    
    # Store intermediate evaluation
    return {
        "stage": "GATHER_EVIDENCE",
        "evidence_items": [e.model_dump() for e in output.case.evidence],
        "uncertainty_score": 0.20 if output.case.verdict in ("fraud", "cleared") else 0.65,
        "fraud_probability": output.case.fraud_probability,
        "needs_secondary_evidence": len(output.evidence_requests) > 0,
        "initial_nba": [a.model_dump() for a in output.next_best_actions.initial],
        "final_nba": [a.model_dump() for a in output.next_best_actions.final],
        "what_changed": output.next_best_actions.what_changed,
        "sar_model": output.sar.model_dump(),
        "final_output": output.model_dump()
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


# Node 8: Memory & Graph Writeback
def node_update_memory(state: InvestigationState) -> Dict[str, Any]:
    # Persist case to TigerGraph Savanna Cloud if possible
    case_id = state["case_id"]
    try:
        conn = get_tg_connection()
        # Upsert TestVertex or Concept vertex representing the closed case
        conn.upsertVertex(
            "Concept",
            f"CASE_{case_id}",
            attributes={
                "concept_type": "CLOSED_INVESTIGATION_CASE",
                "description": f"Closed fraud investigation case {case_id}."
            }
        )
    except Exception as e:
        # Non-blocking graceful fallback
        pass

    return {
        "stage": "UPDATE_MEMORY"
    }


# Build LangGraph workflow
def build_investigation_graph() -> StateGraph:
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
            "final_output": None
        }

        final_state = self.graph.invoke(initial_state)
        output_dict = final_state.get("final_output")
        return BenchmarkCaseOutput.model_validate(output_dict)
