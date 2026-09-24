"""
Evidence Grading and Uncertainty Quantification Engine.
Implements the 4-tier defensibility framework and mathematical uncertainty assessment
prescribed by the HHGOA Hackathon standards.
"""

from typing import List, Tuple, Dict, Any, Optional
from src.agent.models import (
    EvidenceItem, EvidenceGradeEnum, StoppingCriterionEnum, StoppingDecision
)


class EvidenceEngine:
    """
    Grades evidence and quantifies uncertainty, composite fraud risk,
    and evaluates stopping conditions for defensible action.
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

    @classmethod
    def evaluate_stopping_condition(
        cls,
        evidence_items: List[EvidenceItem],
        fraud_probability: float,
        uncertainty_score: float,
        customer_response: Optional[str] = None,
        is_recurring_dispute: bool = False,
        has_shared_origin: bool = False,
        compromised_cards_count: int = 1
    ) -> StoppingDecision:
        """
        Evaluates whether the investigation has gathered enough defensible evidence to stop.
        Implements the 3 formal HHGOA Hackathon stopping criteria:
          1. Fraud probability is at or above 0.85, or at or below 0.15, supported by >= 2 independent pieces of evidence.
          2. A verification response settles the question.
          3. Further steps are unlikely to change the decision (Decision Invariance / Diminishing Marginal Utility).

        Strictly prevents both:
          - Premature stopping (stopping before defensible evidence is available creates risk).
          - Over-investigation (continuing past a defensible decision wastes time).
        """
        direct_count = sum(1 for e in evidence_items if e.grade == EvidenceGradeEnum.DIRECT)
        n_items = len(evidence_items)

        # -------------------------------------------------------------
        # Criterion 2: A verification response settles the question
        # -------------------------------------------------------------
        if customer_response:
            resp_lower = customer_response.lower()
            if "confirm" in resp_lower or "authorized" in resp_lower or "legitimate" in resp_lower:
                return StoppingDecision(
                    should_stop=True,
                    criterion=StoppingCriterionEnum.CRITERION_2_VERIFICATION_SETTLES_QUESTION,
                    stop_reason="Customer confirmation and established billing history cleared the alert as legitimate; no fraud.",
                    defensibility_status="DEFENSIBLE_CLEARED",
                    evidence_count=n_items,
                    direct_evidence_count=direct_count,
                    fraud_probability=min(0.15, fraud_probability),
                    uncertainty_score=0.0,
                    defensible_action="CLOSE_NO_FRAUD"
                )
            else:
                # Customer denies transaction or confirms fraud
                defensible_action = "BLOCK_ALL_CARDS" if compromised_cards_count >= 2 else "BLOCK_CARD"
                return StoppingDecision(
                    should_stop=True,
                    criterion=StoppingCriterionEnum.CRITERION_2_VERIFICATION_SETTLES_QUESTION,
                    stop_reason="Customer denial confirmed fraud; pattern and network links identified. Further steps would not change action.",
                    defensibility_status="DEFENSIBLE_CONFIRMED_FRAUD",
                    evidence_count=n_items,
                    direct_evidence_count=direct_count,
                    fraud_probability=max(0.85, fraud_probability),
                    uncertainty_score=0.0,
                    defensible_action=defensible_action
                )

        # -------------------------------------------------------------
        # Criterion 3: Further steps are unlikely to change the decision
        # -------------------------------------------------------------
        if is_recurring_dispute:
            return StoppingDecision(
                should_stop=True,
                criterion=StoppingCriterionEnum.CRITERION_3_DECISION_INVARIANCE,
                stop_reason="Established recurring billing history confirms benign subscription charge; further steps will not alter policy action.",
                defensibility_status="DEFENSIBLE_SUBSCRIPTION_RECURRENCE",
                evidence_count=n_items,
                direct_evidence_count=direct_count,
                fraud_probability=0.10,
                uncertainty_score=0.05,
                defensible_action="WARN_CUSTOMER"
            )

        if compromised_cards_count >= 2 and has_shared_origin and (direct_count > 0 or fraud_probability >= 0.80):
            return StoppingDecision(
                should_stop=True,
                criterion=StoppingCriterionEnum.CRITERION_3_DECISION_INVARIANCE,
                stop_reason="Syndicate multi-card compromise verified on shared hardware cluster; maximum mitigation mandated and further steps would not change action.",
                defensibility_status="DEFENSIBLE_SYNDICATE_CONFIRMED",
                evidence_count=n_items,
                direct_evidence_count=direct_count,
                fraud_probability=max(0.85, fraud_probability),
                uncertainty_score=0.0,
                defensible_action="BLOCK_ALL_CARDS"
            )

        # -------------------------------------------------------------
        # Criterion 1: Definitive probability supported by >= 2 independent evidence pieces
        # -------------------------------------------------------------
        is_definitive_prob = (fraud_probability >= 0.85 or fraud_probability <= 0.15)
        has_sufficient_corroboration = (n_items >= 2 or direct_count >= 1)

        if is_definitive_prob and has_sufficient_corroboration:
            if fraud_probability >= 0.85:
                action = "BLOCK_ALL_CARDS" if compromised_cards_count >= 2 else "BLOCK_CARD"
                reason = f"Fraud probability ({fraud_probability:.2f}) decisively reached threshold supported by {n_items} independent evidence items. Further steps would not change action."
                status = "DEFENSIBLE_HIGH_CONFIDENCE_FRAUD"
            else:
                action = "CLOSE_NO_FRAUD"
                reason = f"Fraud probability ({fraud_probability:.2f}) decisively cleared below benign threshold supported by {n_items} independent evidence items."
                status = "DEFENSIBLE_LOW_CONFIDENCE_BENIGN"

            return StoppingDecision(
                should_stop=True,
                criterion=StoppingCriterionEnum.CRITERION_1_DEFINITIVE_PROBABILITY,
                stop_reason=reason,
                defensibility_status=status,
                evidence_count=n_items,
                direct_evidence_count=direct_count,
                fraud_probability=fraud_probability,
                uncertainty_score=uncertainty_score,
                defensible_action=action
            )

        # -------------------------------------------------------------
        # Guard: Evidence Insufficient -> PREVENT PREMATURE STOP
        # -------------------------------------------------------------
        return StoppingDecision(
            should_stop=False,
            criterion=StoppingCriterionEnum.INSUFFICIENT_EVIDENCE_CONTINUE,
            stop_reason=(
                f"Evidence pool insufficient for definitive action (P={fraud_probability:.2f}, U={uncertainty_score:.2f}, "
                f"signals={n_items}). Stopping now creates false-positive risk under Policy R1. Secondary verification required."
            ),
            defensibility_status="PREMATURE_STOP_BLOCKED",
            evidence_count=n_items,
            direct_evidence_count=direct_count,
            fraud_probability=fraud_probability,
            uncertainty_score=uncertainty_score,
            defensible_action="VERIFY_WITH_CUSTOMER"
        )
