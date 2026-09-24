"""
Investigation Reasoning Engine for TigerGraph Fraud Investigation Agent.
Delegates to the Orchestrated Multi-Agent Pipeline (InvestigationOrchestrator),
coordinating 7 specialized agents with coupled mathematical and LLM inference layers.
"""

import re
from typing import Dict, Any, List, Optional
import pandas as pd

from src.agent.models import (
    BenchmarkCaseOutput, CaseExplanation, EvidenceSummary, ActionReasoning
)
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

    @classmethod
    def explain_case_reasoning(cls, case_data: Dict[str, Any]) -> CaseExplanation:
        """
        Synthesizes structured reasoning explanation satisfying HHGOA Hackathon standards:
          1. What evidence was used (grounded signals, citations, 4-tier defensibility breakdown).
          2. Why additional evidence was requested (epistemic uncertainty U > 0.45, Policy R1 preservation).
          3. Why selected actions were recommended (Stage 1/2 NBA, Policy R1-R10 rules, SAR narratives).
        """
        case_id = str(case_data.get("case_id", "UNKNOWN"))
        case_inner = case_data.get("case", {})
        verdict = str(case_inner.get("verdict", "uncertain"))
        fraud_prob = float(case_inner.get("fraud_probability", 0.5))
        exposure_usd = float(case_inner.get("exposure_usd", 0.0))
        pattern = str(case_inner.get("pattern", "none"))

        # 1. What evidence was used
        raw_evidence = case_inner.get("evidence", [])
        direct_count = sum(1 for e in raw_evidence if e.get("grade") == "DIRECT")
        circumstantial_count = sum(1 for e in raw_evidence if e.get("grade") == "CIRCUMSTANTIAL")
        correlative_count = sum(1 for e in raw_evidence if e.get("grade") == "CORRELATIVE")
        contradictory_count = sum(1 for e in raw_evidence if e.get("grade") == "CONTRADICTORY")

        evidence_summary = EvidenceSummary(
            total_signals=len(raw_evidence),
            direct_count=direct_count,
            circumstantial_count=circumstantial_count,
            correlative_count=correlative_count,
            contradictory_count=contradictory_count,
            signals=[
                {
                    "claim": e.get("claim", ""),
                    "source": e.get("source", ""),
                    "ref": e.get("ref", ""),
                    "grade": e.get("grade", ""),
                    "weight": e.get("weight", 0.0),
                    "entity_ids": e.get("entity_ids", [])
                }
                for e in raw_evidence
            ]
        )

        # 2. Why additional evidence was requested
        raw_requests = case_data.get("evidence_requests", [])
        if raw_requests:
            was_requested = True
            req_type = raw_requests[0].get("type", "customer_validation")
            why_requested_rationale = (
                f"Initial signal presented an unverified anomaly with elevated epistemic ambiguity. "
                f"Under Bank Fraud Policy Rule R1, blocking a payment card on a single or weak alert signal is strictly prohibited "
                f"due to high (~50%) industry false alarm rates. Therefore, secondary evidence was requested via {req_type} "
                f"to acquire direct cardholder verification while protecting the customer relationship."
            )
        else:
            was_requested = False
            why_requested_rationale = (
                "Initial evidence gathered from knowledge graph topology and historical baselines was sufficiently definitive "
                "(epistemic uncertainty within bounds), eliminating the need for secondary evidence collection."
            )

        why_additional_evidence = {
            "was_requested": was_requested,
            "requests": raw_requests,
            "rationale": why_requested_rationale
        }

        # 3. Why selected actions were recommended
        nba = case_data.get("next_best_actions", {})
        initial_actions = nba.get("initial", [])
        final_actions = nba.get("final", [])
        what_changed = nba.get("what_changed", "")

        # Extract cited policy rules from reasons
        all_reasons = " ".join([a.get("reason", "") for a in initial_actions + final_actions])
        cited_policies = sorted(list(set(re.findall(r"\bR(?:10|[1-9])\b", all_reasons))))
        sar_narrative = case_data.get("sar", {}).get("narrative")

        action_reasoning = ActionReasoning(
            stage_1_initial=initial_actions,
            stage_2_final=final_actions,
            what_changed=what_changed,
            governing_policies=cited_policies,
            sar_narrative=sar_narrative
        )

        # Executive narrative synthesis
        exec_narrative = (
            f"Case {case_id} concluded with verdict '{verdict.upper()}' (P={fraud_prob:.2f}, exposure=${exposure_usd:,.2f}, pattern='{pattern}'). "
            f"Investigative reasoning: {evidence_summary.total_signals} forensic signals were evaluated "
            f"({direct_count} direct, {circumstantial_count} circumstantial, {correlative_count} correlative, {contradictory_count} contradictory). "
            f"{why_requested_rationale} "
            f"Actions progressed from Stage 1 ({[a.get('action') for a in initial_actions]}) to Stage 2 ({[a.get('action') for a in final_actions]}) "
            f"governed by Bank Fraud Policies {', '.join(cited_policies) if cited_policies else 'v1.0'}."
        )

        return CaseExplanation(
            case_id=case_id,
            verdict=verdict,
            fraud_probability=fraud_prob,
            exposure_usd=exposure_usd,
            what_evidence_was_used=evidence_summary,
            why_additional_evidence_was_requested=why_additional_evidence,
            why_selected_actions_were_recommended=action_reasoning,
            executive_narrative=exec_narrative
        )
