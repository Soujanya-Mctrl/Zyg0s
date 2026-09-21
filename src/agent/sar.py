"""
Suspicious Activity Report (SAR) Narrative Generator.
Formats filings strictly according to FinCEN / BSA-AML standards,
answering the 5 W's (Who, What, When, Where, Why/How) as required by HHGOA specifications.
"""

from typing import List, Dict, Any, Optional
from src.agent.models import SARModel


class SARGenerator:
    """
    Generates FinCEN-compliant SAR narratives for confirmed or high-exposure fraud cases.
    """

    @classmethod
    def generate_sar(
        cls,
        case_id: str,
        customer_id: str,
        card_id: str,
        connected_cards: List[str],
        connected_devices: List[str],
        affected_txn_ids: List[str],
        total_amount_usd: float,
        start_date: str,
        end_date: str,
        pattern: str,
        pattern_description: str,
        evidence_summary: str,
        has_shared_origin: bool = False,
        policy_reason: str = "R2: confirmed unauthorized use"
    ) -> SARModel:
        """
        Synthesize a self-contained FinCEN narrative following regulatory guidance.
        """
        subjects = [customer_id, card_id]
        for c in connected_cards:
            if c not in subjects:
                subjects.append(c)

        devices_str = ", ".join(connected_devices) if connected_devices else "None recorded (in-person channel)"
        txns_str = ", ".join(affected_txn_ids)

        narrative_parts = [
            f"SUSPICIOUS ACTIVITY REPORT (SAR) — INVESTIGATION NARRATIVE",
            f"Case Reference: {case_id}",
            f"",
            f"I. SUMMARY (WHAT):",
            f"Between {start_date} and {end_date}, suspicious transaction activity totaling ${total_amount_usd:,.2f} USD "
            f"was identified across {len(affected_txn_ids)} transaction(s) involving card {card_id} associated with customer profile {customer_id}. "
            f"The primary suspicious pattern identified is '{pattern}'.",
            f"",
            f"II. SUBJECTS & INSTRUMENTS (WHO):",
            f"Primary Customer Identifier: {customer_id}",
            f"Primary Card Number Reference: {card_id}",
            f"Connected / Correlated Cards: {', '.join(connected_cards) if connected_cards else 'None identified'}",
            f"Associated Device Telemetry: {devices_str}",
            f"",
            f"III. TIMELINE & GEOGRAPHIC PROFILE (WHEN & WHERE):",
            f"Earliest Flagged Transaction Date: {start_date}",
            f"Latest Activity Timestamp: {end_date}",
            f"Affected Transaction Record IDs: {txns_str}",
            f"",
            f"IV. METHOD OF OPERATION & EVIDENCE (WHY & HOW):",
            f"{evidence_summary}",
        ]

        if pattern_description:
            narrative_parts.append(f"Typology Details: {pattern_description}")

        if has_shared_origin:
            narrative_parts.append(
                f"Multi-Entity Syndicate Linkage: Graph analysis revealed that the device profile ({devices_str}) "
                f"is shared across multiple cardholder profiles, indicating coordinated synthetic identity or card-not-present syndicate activity."
            )

        narrative_parts.extend([
            f"",
            f"V. INSTITUTIONAL ACTION TAKEN:",
            f"The bank initiated immediate card control actions under Bank Fraud Policy v1.0. "
            f"Customer validation confirmed unauthorized access. The card was permanently blocked and placed on fraud monitoring. "
            f"This filing is submitted pursuant to BSA/AML compliance mandates."
        ])

        full_narrative = "\n".join(narrative_parts)

        # Enhance with Groq / LLM if available
        try:
            from src.agent.llm_client import get_llm_client
            llm = get_llm_client()
            prompt = (
                f"Refine this FinCEN Suspicious Activity Report (SAR) narrative to ensure executive regulatory tone "
                f"while strictly preserving all exact names, card IDs, amounts (${total_amount_usd:,.2f}), dates, and transaction IDs:\n\n"
                f"{full_narrative}"
            )
            enhanced = llm.generate_forensic_narrative(prompt, fallback_text=full_narrative)
            final_narrative = enhanced if enhanced else full_narrative
        except Exception:
            final_narrative = full_narrative

        return SARModel(
            file=True,
            reason=policy_reason,
            narrative=final_narrative,
            subjects=subjects,
            total_amount_usd=round(total_amount_usd, 2),
            activity_dates=[start_date.split()[0], end_date.split()[0]]
        )
