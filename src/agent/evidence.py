"""
Evidence Grading and Uncertainty Quantification Engine.
Implements the 4-tier defensibility framework and mathematical uncertainty assessment
prescribed by the HHGOA Hackathon standards.
"""

from typing import List, Tuple, Dict, Any
from src.agent.models import EvidenceItem, EvidenceGradeEnum


class EvidenceEngine:
    """
    Grades evidence and quantifies uncertainty and composite fraud risk.
    """

    GRADE_WEIGHTS = {
        EvidenceGradeEnum.DIRECT: 1.0,
        EvidenceGradeEnum.CIRCUMSTANTIAL: 0.6,
        EvidenceGradeEnum.CORRELATIVE: 0.3,
        EvidenceGradeEnum.CONTRADICTORY: -0.8
    }

    @classmethod
    def calculate_uncertainty_and_risk(
        cls,
        evidence_items: List[EvidenceItem],
        initial_risk_score: float = 0.5,
        min_evidence_count: int = 3
    ) -> Tuple[float, float, str]:
        """
        Calculates:
          1. fraud_probability (0.0 to 1.0)
          2. uncertainty_score (0.0 to 1.0)
          3. uncertainty_rationale (str)

        Mathematical formula:
          Confidence = |sum(w_i) / (sum(|w_i|) + eps)| * min(1.0, N / N_min)
          Uncertainty = 1.0 - Confidence
        """
        if not evidence_items:
            # Baseline uncertainty when no evidence is gathered yet
            return initial_risk_score, 0.85, "No gathered evidence; high uncertainty from baseline model score alone."

        total_weight = 0.0
        sum_abs_weight = 0.0
        n_items = len(evidence_items)
        has_direct = False
        has_contradictory = False

        for item in evidence_items:
            w = cls.GRADE_WEIGHTS.get(item.grade, item.weight)
            total_weight += w
            sum_abs_weight += abs(w)
            if item.grade == EvidenceGradeEnum.DIRECT:
                has_direct = True
            elif item.grade == EvidenceGradeEnum.CONTRADICTORY:
                has_contradictory = True

        eps = 1e-5
        weight_ratio = abs(total_weight) / (sum_abs_weight + eps)
        volume_factor = min(1.0, n_items / float(min_evidence_count))
        confidence = weight_ratio * volume_factor

        # If direct evidence is present, confidence gets a significant boost
        if has_direct:
            confidence = max(confidence, 0.85)

        uncertainty = max(0.0, min(1.0, 1.0 - confidence))

        # Risk calculation combines model score with weighted evidence sum
        # Sigmoid-like normalized bounded mapping
        normalized_ev_score = (total_weight / (sum_abs_weight + eps) + 1.0) / 2.0
        
        # 60% evidence, 40% initial model score
        raw_prob = (0.65 * normalized_ev_score) + (0.35 * initial_risk_score)
        fraud_prob = max(0.01, min(0.99, round(raw_prob, 2)))

        # Rationale synthesis
        if has_contradictory:
            rationale = "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated."
        elif has_direct:
            rationale = "Direct evidence confirmed; uncertainty resolved."
        elif uncertainty > 0.45:
            rationale = "Circumstantial or sparse signals; uncertainty exceeds threshold (0.45), requesting secondary validation."
        else:
            rationale = "Consistent multi-hop graph signals gathered; uncertainty within acceptable policy bounds."

        return fraud_prob, round(uncertainty, 2), rationale
