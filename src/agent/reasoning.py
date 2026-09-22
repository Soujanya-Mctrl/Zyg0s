"""
Investigation Reasoning Engine for TigerGraph Fraud Investigation Agent.
Delegates to the Orchestrated Multi-Agent Pipeline (InvestigationOrchestrator),
coordinating 7 specialized agents with coupled mathematical and LLM inference layers.
"""

from typing import Dict, Any, List, Optional
import pandas as pd

from src.agent.models import BenchmarkCaseOutput
from src.agent.pipeline.orchestrator import InvestigationOrchestrator


class FraudReasoningEngine:
    """
    Autonomous investigator coordinating the multi-agent investigation pipeline.
    Maintains backward compatibility for all benchmark harnesses and test suites.
    """

    def __init__(
        self,
        txns_path: str = "data/hhgoa_ieee/exam_txns.csv",
        id_path: str = "data/hhgoa_ieee/exam_identities.csv"
    ):
        self.orchestrator = InvestigationOrchestrator(txns_path=txns_path, id_path=id_path)
        self.merged_df = self.orchestrator.merged_df
        self.memory = self.orchestrator.agent_memory.memory

    def investigate_case(self, case_meta: Dict[str, Any]) -> BenchmarkCaseOutput:
        """
        Execute an end-to-end autonomous multi-agent investigation for a single benchmark case.
        """
        return self.orchestrator.run_investigation(case_meta)

    def get_pipeline_trace(self, case_meta: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Return the multi-agent execution trace for UI and API endpoints."""
        return self.orchestrator.get_pipeline_trace(case_meta)
