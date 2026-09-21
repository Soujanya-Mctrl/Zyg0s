"""
Unit tests for Evidence Grading and Uncertainty Assessment.
"""

import pytest
from src.agent.models import EvidenceItem, EvidenceGradeEnum
from src.agent.evidence import EvidenceEngine


def test_evidence_engine_uncertainty():
    # Empty evidence should yield high uncertainty
    prob, unc, rationale = EvidenceEngine.calculate_uncertainty_and_risk([])
    assert unc > 0.70
    assert "No gathered evidence" in rationale

    # Consistent direct evidence should resolve uncertainty
    direct_ev = [
        EvidenceItem(claim="Confirmed chargeback", source="graph", ref="q1", grade=EvidenceGradeEnum.DIRECT, weight=1.0),
        EvidenceItem(claim="Customer denied authorization", source="customer", ref="q2", grade=EvidenceGradeEnum.DIRECT, weight=1.0),
        EvidenceItem(claim="High model score", source="model", ref="q3", grade=EvidenceGradeEnum.CORRELATIVE, weight=0.3),
    ]
    prob, unc, rationale = EvidenceEngine.calculate_uncertainty_and_risk(direct_ev)
    assert unc <= 0.20
    assert prob >= 0.75
    assert "Direct evidence confirmed" in rationale


def test_evidence_contradictory():
    # Contradictory evidence (e.g. established history vs novel device)
    ev = [
        EvidenceItem(claim="Long account age", source="graph", ref="q1", grade=EvidenceGradeEnum.CONTRADICTORY, weight=-0.8),
        EvidenceItem(claim="High risk score", source="model", ref="q2", grade=EvidenceGradeEnum.CORRELATIVE, weight=0.3),
    ]
    prob, unc, rationale = EvidenceEngine.calculate_uncertainty_and_risk(ev)
    assert "Contradictory signals present" in rationale
