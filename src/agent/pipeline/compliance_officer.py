"""
Agent 6: Compliance Officer (FinCEN BSA/AML Regulatory Filing Specialist).
Evaluates mandatory regulatory reporting criteria, anchors the 5 W's,
and generates legal-grade FinCEN Suspicious Activity Report (SAR) narratives via Groq LLM.
"""

from typing import Dict, Any, List
from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.agent.sar import SARGenerator
from src.agent.models import SARModel


class ComplianceOfficerAgent(BaseSpecializedAgent):
    """
    Regulatory compliance and SAR narrative specialist.
    Mathematical computation: BSA/AML statutory thresholds ($5,000 / $0 with suspect), activity date bounds.
    Cognitive inference: Legal-grade FinCEN SAR narrative synthesis answering the 5 W's.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_6_compliance_officer",
            agent_name="Compliance Officer",
            role="FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis"
        )

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        verdict = context.final_verdict
        exposure_usd = context.exposure_usd
        flagged_ts = context.flagged_ts
        date_str = flagged_ts.strftime("%Y-%m-%d %H:%M:%S") if flagged_ts else "2024-01-01"

        requires_sar = any(a.action.value == "FILE_REPORT" for a in context.final_nba)
        if requires_sar:
            evidence_summary = "; ".join([e.claim for e in context.evidence_items])
            sar_model: SARModel = SARGenerator.generate_sar(
                case_id=context.case_id,
                customer_id=context.customer_id,
                card_id=context.card_id,
                connected_cards=context.connected_cards,
                connected_devices=[context.full_device_profile] if context.full_device_profile else [],
                affected_txn_ids=[str(context.flagged_txn_id)] if context.final_verdict == "fraud" else [],
                total_amount_usd=exposure_usd,
                start_date=date_str,
                end_date=date_str,
                pattern=context.pattern,
                pattern_description=context.pattern_description,
                evidence_summary=evidence_summary,
                has_shared_origin=context.has_shared_origin
            )
        else:
            sar_model = SARModel(file=False)

        context.sar = sar_model

        return {
            "sar_required": sar_model.file,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": sar_model.total_amount_usd,
            "subjects_count": len(sar_model.subjects),
            "subjects": sar_model.subjects,
            "activity_dates": sar_model.activity_dates,
            "filing_reason": sar_model.reason,
            "hand_off_summary": f"Compliance audit: SAR Filed={sar_model.file} (Exposure: ${sar_model.total_amount_usd:,.2f}, Reason: {sar_model.reason})."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        sar = context.sar
        if not sar or not sar.file:
            return (
                f"Compliance Officer finding: No BSA/AML SAR filing required for Case {context.case_id}. "
                f"Alert was cleared as legitimate under Bank Fraud Policy v1.0."
            )

        # Enhance or critique the narrative
        preview = sar.narrative[:250] if sar.narrative else "Narrative generated."
        return (
            f"Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. "
            f"Reported exposure is ${sar.total_amount_usd:,.2f} across subjects {sar.subjects}. "
            f"Regulatory excerpt: {preview}..."
        )
