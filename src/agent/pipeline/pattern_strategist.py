"""
Agent 4: Pattern Strategist (Fraud Typology & Novel Pattern Discovery Specialist).
Performs deterministic typology classification across 5 canonical typologies,
and executes LLM cognitive synthesis for novel / undocumented patterns (Policy R9).
"""

from typing import Dict, Any, List, Tuple
from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.agent.models import FraudPatternEnum


class PatternStrategistAgent(BaseSpecializedAgent):
    """
    Typology classification and novel pattern discovery specialist.
    Mathematical computation: Deterministic Boolean predicate matching for standard typologies.
    Cognitive inference: Novel pattern naming, modus operandi hypothesis (Policy R9).
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_4_pattern_strategist",
            agent_name="Pattern Strategist",
            role="Fraud Typology Classification & Novel Pattern Discovery (Policy R9)"
        )

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        is_card_testing = context.is_card_testing
        is_out_of_region = context.is_out_of_region
        has_shared_origin = context.has_shared_origin
        flagged_channel = context.flagged_channel
        device_status = context.device_status
        flagged_device = context.flagged_device
        established_devices = context.established_devices
        is_recurring_dispute = context.is_recurring_dispute

        # Check for legitimate benign activity
        is_benign = is_recurring_dispute or (
            context.flagged_addr1 in context.established_addrs and
            context.initial_risk_score < 0.70 and
            flagged_channel == "in_person"
        )

        matched_rule = "UNKNOWN"
        if is_benign:
            pattern = FraudPatternEnum.NONE.value
            matched_rule = "BENIGN_PROFILE_MATCH"
        elif is_card_testing:
            pattern = FraudPatternEnum.CARD_TESTING.value
            matched_rule = "CARD_TESTING_MICRO_VELOCITY"
        elif is_out_of_region:
            pattern = FraudPatternEnum.OUT_OF_REGION_USE.value
            matched_rule = "OUT_OF_REGION_IN_PERSON"
        elif device_status == "New" or (flagged_device and flagged_device not in established_devices):
            pattern = FraudPatternEnum.CARD_NOT_PRESENT_NEW_DEVICE.value
            matched_rule = "CARD_NOT_PRESENT_NEW_DEVICE"
        elif flagged_channel == "online":
            pattern = FraudPatternEnum.CARD_NOT_PRESENT_FRAUD.value
            matched_rule = "CARD_NOT_PRESENT_ONLINE"
        elif has_shared_origin:
            pattern = FraudPatternEnum.UNDOCUMENTED.value
            matched_rule = "POLICY_R9_UNDOCUMENTED_SHARED_ORIGIN"
        else:
            pattern = FraudPatternEnum.ACCOUNT_TAKEOVER.value
            matched_rule = "ACCOUNT_TAKEOVER_ANOMALY"

        context.pattern = pattern

        return {
            "detected_pattern": pattern,
            "matched_predicate": matched_rule,
            "is_novel_pattern": pattern == FraudPatternEnum.UNDOCUMENTED.value,
            "is_benign": is_benign,
            "channel": flagged_channel,
            "shared_origin_detected": has_shared_origin,
            "hand_off_summary": f"Typology classified as '{pattern}' via predicate {matched_rule}."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        pattern = math_results["detected_pattern"]

        if math_results["is_novel_pattern"]:
            # Task A: Novel / Undocumented Fraud Pattern Discovery (Policy R9)
            subpath = context.subgraph_path
            customer_ids = [context.customer_id] + context.connected_cards
            device_profiles = [context.flagged_device]

            novel_name, novel_desc = self.llm.synthesize_novel_pattern(
                subgraph_path=subpath,
                customer_ids=customer_ids,
                device_profiles=device_profiles,
                fallback_name="undocumented",
                fallback_desc="Coordinated device fingerprint sharing across multiple unrelated accounts."
            )
            context.pattern_description = novel_desc
            return f"Novel Pattern Discovered: {novel_name}. Hypothesis: {novel_desc}"

        context.pattern_description = ""
        prompt = (
            f"Case {context.case_id} Fraud Pattern Hypothesizing:\n"
            f"- Classified Typology: {pattern} (Predicate: {math_results['matched_predicate']})\n"
            f"- Transaction Amount: ${context.flagged_amt:.2f}, Channel: {math_results['channel']}\n"
            f"- Subgraph Structure: {context.subgraph_path}\n"
            f"- Assessed Fraud Probability: {context.fraud_probability:.2f}\n\n"
            f"As Pattern Strategist, provide a 2-sentence forensic hypothesis outlining the attacker's modus operandi (or customer legitimacy explanation if cleared)."
        )
        fallback = f"Pattern Strategist confirmed typology '{pattern}' with probability {context.fraud_probability:.2f} based on {math_results['matched_predicate']}."
        return self.llm.generate_forensic_narrative(prompt, fallback_text=fallback)
