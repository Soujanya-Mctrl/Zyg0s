"""
Unit Tests for the Collaborative Multi-Agent Pipeline & Master Orchestrator.
Tests each of the 7 specialized agents individually (deterministic math + cognitive reasoning)
and tests end-to-end orchestration with uncertainty collapse and pipeline tracing.
"""

import pytest
import pandas as pd
from typing import Dict, Any

from src.agent.pipeline.base import InvestigationContext, AgentStepResult
from src.agent.pipeline.alert_sentinel import AlertSentinelAgent
from src.agent.pipeline.graph_scout import GraphScoutAgent
from src.agent.pipeline.evidence_assessor import EvidenceAssessorAgent
from src.agent.pipeline.pattern_strategist import PatternStrategistAgent
from src.agent.pipeline.policy_governor import PolicyGovernorAgent
from src.agent.pipeline.compliance_officer import ComplianceOfficerAgent
from src.agent.pipeline.memory_weaver import MemoryWeaverAgent
from src.agent.pipeline.orchestrator import InvestigationOrchestrator
from src.agent.models import (
    EvidenceItem, EvidenceGradeEnum, FraudPatternEnum,
    ActionRecommendation, ActionEnum, ApprovalRouteEnum
)


@pytest.fixture(scope="module")
def orch():
    return InvestigationOrchestrator()


@pytest.fixture
def base_context(orch):
    df_pack = pd.read_csv("data/hhgoa_ieee/case_pack.csv")
    case_meta = df_pack.iloc[0].to_dict()
    return InvestigationContext(case_meta=case_meta, merged_df=orch.merged_df)


class TestSpecializedAgents:
    """Test individual agents for deterministic mathematical computation and cognitive reasoning."""

    def test_alert_sentinel_math_and_triage(self, base_context):
        agent = AlertSentinelAgent()
        result = agent.process(base_context)

        assert isinstance(result, AgentStepResult)
        assert result.agent_id == "agent_1_alert_sentinel"
        assert "z_score" in result.math_metrics
        assert "historical_mean_usd" in result.math_metrics
        assert "triage_priority" in result.math_metrics
        assert isinstance(result.math_metrics["z_score"], float)
        assert len(result.ai_reasoning) > 0
        assert len(result.hand_off_summary) > 0
        assert base_context.flagged_amt > 0

    def test_graph_scout_topology_and_collusion(self, base_context):
        AlertSentinelAgent().process(base_context)
        agent = GraphScoutAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_2_graph_scout"
        assert "is_card_testing" in result.math_metrics
        assert "has_shared_origin" in result.math_metrics
        assert "connected_cards_count" in result.math_metrics
        assert isinstance(result.math_metrics["connected_cards_count"], int)
        assert len(result.hand_off_summary) > 0

    def test_evidence_assessor_uncertainty_quantification(self, base_context):
        AlertSentinelAgent().process(base_context)
        base_context.evidence_items.append(EvidenceItem(
            claim="Billing region matches established cardholder address history.",
            source="graph",
            ref="query:addr1",
            grade=EvidenceGradeEnum.CONTRADICTORY,
            weight=-0.7
        ))
        agent = EvidenceAssessorAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_3_evidence_assessor"
        assert "fraud_probability" in result.math_metrics
        assert "epistemic_uncertainty_U" in result.math_metrics
        assert 0.0 <= result.math_metrics["epistemic_uncertainty_U"] <= 1.0
        assert len(result.ai_reasoning) > 0

    def test_pattern_strategist_typology_synthesis(self, base_context):
        AlertSentinelAgent().process(base_context)
        GraphScoutAgent().process(base_context)
        agent = PatternStrategistAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_4_pattern_strategist"
        assert "detected_pattern" in result.math_metrics
        assert "matched_predicate" in result.math_metrics
        assert result.math_metrics["detected_pattern"] in [p.value for p in FraudPatternEnum]

    def test_policy_governor_r1_to_r10_and_nba(self, base_context):
        AlertSentinelAgent().process(base_context)
        base_context.pattern = "none"

        agent = PolicyGovernorAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_5_policy_governor"
        assert "initial_stage_1_actions" in result.math_metrics
        assert "final_stage_2_actions" in result.math_metrics
        assert "approval_threshold_limit" in result.math_metrics
        assert len(base_context.initial_nba) > 0
        assert len(base_context.final_nba) > 0
        assert len(base_context.what_changed) > 0

    def test_policy_governor_high_exposure_delegation(self, base_context):
        AlertSentinelAgent().process(base_context)
        base_context.pattern = "card_not_present_fraud"
        base_context.flagged_amt = 3500.00  # > $2,500 threshold

        agent = PolicyGovernorAgent()
        agent.process(base_context)

        # Under Policy R2, exposure > $2,500 requires L2 route
        assert base_context.final_nba[0].route == ApprovalRouteEnum.L2

    def test_compliance_officer_fincen_sar(self, base_context):
        AlertSentinelAgent().process(base_context)
        base_context.final_verdict = "fraud"
        base_context.exposure_usd = 6200.00  # > $5,000 SAR threshold
        base_context.pattern = "account_takeover"
        base_context.final_nba = [
            ActionRecommendation(
                action=ActionEnum.FILE_REPORT,
                route=ApprovalRouteEnum.L2,
                reason="Mandatory SAR filing under FinCEN BSA/AML guidelines."
            )
        ]

        agent = ComplianceOfficerAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_6_compliance_officer"
        assert result.math_metrics["sar_required"] is True
        assert base_context.sar is not None
        assert base_context.sar.file is True
        assert len(base_context.sar.narrative) > 0

    def test_memory_weaver_precedent_and_rrf(self, base_context):
        AlertSentinelAgent().process(base_context)
        agent = MemoryWeaverAgent()
        result = agent.process(base_context)

        assert result.agent_id == "agent_7_memory_weaver"
        assert "embedding_dimension" in result.math_metrics
        assert result.math_metrics["embedding_dimension"] == 384
        assert "rrf_k_parameter" in result.math_metrics
        assert result.math_metrics["rrf_k_parameter"] == 60


class TestMasterOrchestrator:
    """Test full multi-agent investigation pipeline execution."""

    def test_orchestrator_e2e_run_case_cleared(self, orch):
        df_pack = pd.read_csv("data/hhgoa_ieee/case_pack.csv")
        case_meta = df_pack.iloc[0].to_dict()
        output = orch.run_investigation(case_meta)

        assert output.case_id == "HHG-001"
        assert output.case.verdict in ("cleared", "fraud")
        assert len(output.orchestrator_pipeline_trace) >= 7

        trace = output.orchestrator_pipeline_trace
        agent_names = [t["agent_name"] for t in trace]
        assert "Alert Sentinel" in agent_names
        assert "Graph Scout" in agent_names
        assert "Evidence Assessor" in agent_names
        assert "Policy Governor" in agent_names
        assert "Compliance Officer" in agent_names
        assert "Memory Weaver" in agent_names

        for step in trace:
            assert isinstance(step["math_metrics"], dict)
            assert len(step["math_metrics"]) > 0
            assert len(step["ai_reasoning"]) > 0
            assert len(step["hand_off_summary"]) > 0
