"""
Base Interfaces and Data Structures for the Orchestrated Multi-Agent Pipeline.
Defines BaseSpecializedAgent, AgentStepResult, and InvestigationContext.
Every agent couples deterministic mathematical computation with an AI cognitive reasoning layer.
"""

from abc import ABC, abstractmethod
from datetime import datetime
import time
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

from src.agent.models import (
    EvidenceItem, EvidenceGradeEnum, FraudPatternEnum,
    ActionRecommendation, ActionEnum, ApprovalRouteEnum,
    SARModel
)
from src.agent.llm_client import get_llm_client, HybridLLMClient


class AgentStepResult(BaseModel):
    """Execution telemetry and reasoning artifact produced by an individual agent."""
    agent_id: str = Field(description="Unique agent identifier, e.g. 'agent_1_alert_sentinel'")
    agent_name: str = Field(description="Display name of the agent")
    role: str = Field(description="Functional role of the agent in the pipeline")
    math_metrics: Dict[str, Any] = Field(default_factory=dict, description="Deterministic calculations, scores, Z-values, thresholds")
    ai_reasoning: str = Field(default="", description="Cognitive analysis and explanation from the LLM")
    evidence_generated: List[EvidenceItem] = Field(default_factory=list, description="Anchored evidence items formulated by this agent")
    hand_off_summary: str = Field(default="", description="Key context handed off to downstream agents in the pipeline")
    latency_ms: float = Field(default=0.0, description="Execution duration in milliseconds")
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())


class InvestigationContext:
    """Shared state passed sequentially along the multi-agent investigation pipeline."""

    def __init__(self, case_meta: Dict[str, Any], merged_df: Optional[Any] = None):
        self.case_meta = case_meta
        self.case_id = str(case_meta.get("case_id", "CASE-UNKNOWN"))
        self.trigger_type = str(case_meta.get("trigger_type", "risk_score_spike"))
        self.trigger_text = str(case_meta.get("trigger_text", ""))
        self.flagged_txn_id = int(case_meta.get("flagged_txn_id", 0))
        self.card_id = str(case_meta.get("card_id", "N/A"))
        self.customer_id = str(case_meta.get("customer_id", "N/A"))
        self.initial_risk_score = float(case_meta.get("risk_score", 0.50))

        # Dataset references
        self.merged_df = merged_df

        # Anchored transaction telemetry
        self.flagged_amt: float = 0.0
        self.flagged_ts: Optional[datetime] = None
        self.flagged_pcd: str = "W"
        self.flagged_channel: str = "online"
        self.flagged_addr1: Optional[str] = None
        self.flagged_device: str = ""
        self.device_status: str = ""
        self.full_device_profile: str = ""

        # Customer baseline statistics
        self.avg_historical_amt: float = 0.0
        self.std_historical_amt: float = 10.0
        self.established_addrs: set = set()
        self.established_devices: set = set()
        self.customer_history_count: int = 0

        # Graph topology
        self.connected_cards: List[str] = []
        self.has_shared_origin: bool = False
        self.connected_devices: List[str] = []
        self.subgraph_path: str = ""
        self.ego_threat_density: float = 0.0

        # Evidence and Uncertainty
        self.evidence_items: List[EvidenceItem] = []
        self.fraud_probability: float = 0.50
        self.uncertainty_score: float = 1.00
        self.needs_secondary_evidence: bool = False
        self.step_up_triggered: bool = False
        self.customer_response: Optional[str] = None

        # Typology
        self.pattern: str = FraudPatternEnum.NONE.value
        self.pattern_description: str = ""
        self.is_card_testing: bool = False
        self.is_recurring_dispute: bool = False
        self.is_out_of_region: bool = False

        # Next-Best Actions
        self.initial_nba: List[ActionRecommendation] = []
        self.final_nba: List[ActionRecommendation] = []
        self.what_changed: str = ""
        self.exposure_usd: float = 0.0
        self.final_verdict: str = "uncertain"
        self.final_status: str = "open"
        self.stop_reason: str = ""

        # Regulatory SAR
        self.sar: Optional[SARModel] = None

        # Graph-Native Memory
        self.similar_prior_cases: List[str] = []
        self.written_to_graph: bool = False
        self.graph_case_id: Optional[str] = None

        # Pipeline traces & MCP telemetry
        self.agent_traces: List[AgentStepResult] = []
        self.mcp_tool_calls: List[Dict[str, Any]] = []

    def add_trace(self, result: AgentStepResult):
        self.agent_traces.append(result)


class BaseSpecializedAgent(ABC):
    """
    Abstract base class for all specialized agents in the pipeline.
    Combines deterministic mathematical computing with LLM cognitive reasoning.
    """

    def __init__(self, agent_id: str, agent_name: str, role: str):
        self.agent_id = agent_id
        self.agent_name = agent_name
        self.role = role
        self.llm: HybridLLMClient = get_llm_client()

    @abstractmethod
    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        """
        Pure deterministic mathematical and statistical calculation.
        Zero LLM calls. Computes formulas, counts, Z-scores, graph metrics, thresholds.
        """
        pass

    @abstractmethod
    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        """
        Cognitive reasoning powered by Groq LLM (qwen/qwen3.8-27b).
        Consumes the mathematically anchored facts and generates narrative analysis,
        hypotheses, and defensibility critiques.
        """
        pass

    def formulate_evidence(self, math_results: Dict[str, Any], context: InvestigationContext) -> List[EvidenceItem]:
        """Optional hook for agents to create anchored EvidenceItems."""
        return []

    def process(self, context: InvestigationContext) -> AgentStepResult:
        """Execute the full dual-layer cycle (Compute -> Infer -> Formulate Evidence)."""
        t0 = time.time()

        # Layer 1: Deterministic Math
        math_results = self.compute(context)

        # Layer 2: LLM Cognitive Reasoning
        ai_reasoning = self.infer(math_results, context)

        # Layer 3: Anchored Evidence Formulation
        evidence = self.formulate_evidence(math_results, context)
        for ev in evidence:
            context.evidence_items.append(ev)

        latency = (time.time() - t0) * 1000.0

        step_result = AgentStepResult(
            agent_id=self.agent_id,
            agent_name=self.agent_name,
            role=self.role,
            math_metrics=math_results,
            ai_reasoning=ai_reasoning,
            evidence_generated=evidence,
            hand_off_summary=math_results.get("hand_off_summary", f"{self.agent_name} processing complete."),
            latency_ms=round(latency, 2),
        )

        context.add_trace(step_result)
        return step_result
