"""
Agent 5: Policy Governor (Bank Fraud Policy R1-R10 & 2-Stage NBA Specialist).
Calculates financial exposure thresholds, enforces approval routing (auto, L1, L2),
and produces 2-stage Next-Best Actions (Initial non-destructive vs Final mitigation).
"""

from typing import Dict, Any, List
from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.agent.policy import BankFraudPolicyEngine
from src.agent.models import ActionRecommendation, ActionEnum, ApprovalRouteEnum


class PolicyGovernorAgent(BaseSpecializedAgent):
    """
    Policy governance and Next-Best Action specialist.
    Mathematical computation: Financial exposure bounds, $2,500 L1/L2 threshold, 2-stage action logic.
    Cognitive inference: Proportionality rationale and escalation justification.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_5_policy_governor",
            agent_name="Policy Governor",
            role="Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing"
        )

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        trigger_type = context.trigger_type
        initial_risk_score = context.initial_risk_score
        flagged_amt = context.flagged_amt
        is_benign = context.pattern == "none"

        # 1. Stage 1: Initial Next-Best Actions (Before secondary evidence)
        evidence_claims = [e.claim for e in context.evidence_items]
        initial_nba = BankFraudPolicyEngine.evaluate_initial_nba(
            trigger_type=trigger_type,
            initial_risk_score=initial_risk_score,
            pattern=context.pattern,
            exposure_usd=flagged_amt,
            evidence_claims=evidence_claims,
            has_shared_origin=context.has_shared_origin,
            is_card_testing=context.is_card_testing,
            is_recurring_dispute=context.is_recurring_dispute
        )
        context.initial_nba = initial_nba

        # 2. Derive Customer Validation Outcome (Step-up resolution)
        if is_benign:
            context.customer_response = "Customer confirms they made this purchase and activity is authorized."
            final_verdict = "cleared"
            final_status = "closed_cleared"
            final_prob = 0.05
            exposure_usd = 0.0
            stop_reason = "Customer confirmation and established billing history cleared the alert as legitimate; no fraud."
        else:
            context.customer_response = "Customer states they did not make these purchases and still has the physical card."
            final_verdict = "fraud"
            final_status = "closed_fraud"
            final_prob = max(0.85, context.fraud_probability)
            exposure_usd = flagged_amt
            stop_reason = "Customer denial confirmed fraud; pattern and network links identified. Further steps would not change action."

        context.final_verdict = final_verdict
        context.final_status = final_status
        context.fraud_probability = final_prob
        context.exposure_usd = exposure_usd
        context.stop_reason = stop_reason

        # 3. Stage 2: Final Next-Best Actions (After secondary evidence)
        final_nba = BankFraudPolicyEngine.evaluate_final_nba(
            verdict=final_verdict,
            fraud_probability=final_prob,
            pattern=context.pattern,
            exposure_usd=exposure_usd,
            customer_response=context.customer_response,
            has_shared_origin=context.has_shared_origin,
            is_card_testing=context.is_card_testing,
            is_recurring_dispute=context.is_recurring_dispute,
            compromised_cards_count=len(context.connected_cards) if context.has_shared_origin else 1,
            is_undocumented=context.pattern == "undocumented"
        )
        context.final_nba = final_nba

        # 4. Generate Narrative "What Changed"
        what_changed = (
            "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
            if final_verdict == "cleared" else
            "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
        )
        context.what_changed = what_changed

        # Determine primary approval route
        primary_final_route = final_nba[0].route.value if final_nba else "auto"

        return {
            "initial_stage_1_actions": [a.action.value for a in initial_nba],
            "initial_stage_1_route": initial_nba[0].route.value if initial_nba else "auto",
            "final_stage_2_actions": [a.action.value for a in final_nba],
            "final_stage_2_route": primary_final_route,
            "financial_exposure_usd": round(exposure_usd, 2),
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": exposure_usd > 2500.0,
            "verdict": final_verdict,
            "status": final_status,
            "what_changed": what_changed,
            "hand_off_summary": f"Policy evaluated: Stage 1 [{initial_nba[0].action.value}] -> Stage 2 [{final_nba[0].action.value}] ({primary_final_route}). Exposure: ${exposure_usd:,.2f}."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        prompt = (
            f"Case {context.case_id} Bank Fraud Policy v1.0 Governance Audit:\n"
            f"- Verdict: {math_results['verdict'].upper()} (Final Status: {math_results['status']})\n"
            f"- Financial Exposure: ${math_results['financial_exposure_usd']:,.2f} (Threshold for L2: $2,500.00)\n"
            f"- Stage 1 Action (Verification): {math_results['initial_stage_1_actions']} [{math_results['initial_stage_1_route']}]\n"
            f"- Stage 2 Action (Mitigation): {math_results['final_stage_2_actions']} [{math_results['final_stage_2_route']}]\n"
            f"- Policy Transition ('What Changed'): {math_results['what_changed']}\n\n"
            f"As Policy Governor, provide a 2-sentence regulatory proportionality justification detailing compliance with Rule R1 (no premature block on single signal) and the defensibility of the final action."
        )
        fallback = (
            f"Policy Governor enforced Bank Fraud Policy v1.0: Actions progressed from "
            f"{math_results['initial_stage_1_actions']} to {math_results['final_stage_2_actions']} "
            f"under {math_results['final_stage_2_route']} authorization. Exposure is ${math_results['financial_exposure_usd']:,.2f}."
        )
        return self.llm.generate_forensic_narrative(prompt, fallback_text=fallback)
