"""
Agent 3: Evidence Assessor (4-Tier Grading & Uncertainty Quantification Specialist).
Applies mathematically rigorous evidence weighting, computes the epistemic uncertainty index,
and critiques evidentiary defensibility under legal & regulatory standards.
"""

from typing import Dict, Any, List
from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.agent.evidence import EvidenceEngine
from src.agent.models import EvidenceItem, EvidenceGradeEnum


class EvidenceAssessorAgent(BaseSpecializedAgent):
    """
    Evidence grading and uncertainty quantification specialist.
    Mathematical computation: 4-tier weighted sum, log-odds probability, epistemic uncertainty U.
    Cognitive inference: Defensibility critique and verification challenge formulation.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_3_evidence_assessor",
            agent_name="Evidence Assessor",
            role="4-Tier Evidence Grading & Epistemic Uncertainty Quantification"
        )

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        evidence_items = context.evidence_items
        initial_risk_score = context.initial_risk_score

        # 1. 4-Tier Weight Breakdown
        direct_count = sum(1 for e in evidence_items if e.grade == EvidenceGradeEnum.DIRECT)
        circumstantial_count = sum(1 for e in evidence_items if e.grade == EvidenceGradeEnum.CIRCUMSTANTIAL)
        correlative_count = sum(1 for e in evidence_items if e.grade == EvidenceGradeEnum.CORRELATIVE)
        contradictory_count = sum(1 for e in evidence_items if e.grade == EvidenceGradeEnum.CONTRADICTORY)

        # 2. Derive Probability & Epistemic Uncertainty Math
        fraud_prob, uncertainty, rationale = EvidenceEngine.calculate_uncertainty_and_risk(
            evidence_items, initial_risk_score=initial_risk_score
        )

        context.fraud_probability = round(fraud_prob, 3)
        context.uncertainty_score = round(uncertainty, 3)

        # Uncertainty threshold rule (U > 0.45 requires secondary verification)
        needs_step_up = uncertainty > 0.45

        return {
            "total_evidence_signals": len(evidence_items),
            "direct_count": direct_count,
            "circumstantial_count": circumstantial_count,
            "correlative_count": correlative_count,
            "contradictory_count": contradictory_count,
            "fraud_probability": round(fraud_prob, 3),
            "epistemic_uncertainty_U": round(uncertainty, 3),
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": needs_step_up,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": rationale,
            "hand_off_summary": f"Graded {len(evidence_items)} signals: P(Fraud)={fraud_prob:.2f}, U={uncertainty:.3f}. Step-up needed: {needs_step_up}."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        prompt = (
            f"Case {context.case_id} Evidence & Epistemic Uncertainty Evaluation:\n"
            f"- Evidence Signals Formulated ({math_results['total_evidence_signals']} total):\n"
            f"  * Direct ({math_results['direct_count']}), Circumstantial ({math_results['circumstantial_count']}), "
            f"Correlative ({math_results['correlative_count']}), Contradictory ({math_results['contradictory_count']})\n"
            f"- Derived Fraud Probability: {math_results['fraud_probability']:.2f}\n"
            f"- Epistemic Uncertainty Index: U = {math_results['epistemic_uncertainty_U']:.3f} (Threshold: 0.45)\n"
            f"- Rationale: {math_results['mathematical_rationale']}\n"
            f"- Step-Up Authentication Required: {math_results['needs_step_up_challenge']}\n\n"
            f"As Evidence Assessor, deliver a 2-sentence defensibility critique on whether this evidence pool warrants immediate action or mandates customer verification to protect customer relationship under Policy Rule R1."
        )
        fallback = (
            f"Evidence Assessor verified {math_results['total_evidence_signals']} grounded signals. "
            f"Fraud probability is {math_results['fraud_probability']:.2f} with epistemic uncertainty index "
            f"U = {math_results['epistemic_uncertainty_U']:.3f}. Step-up challenge required: {math_results['needs_step_up_challenge']}."
        )
        return self.llm.generate_forensic_narrative(prompt, fallback_text=fallback)
