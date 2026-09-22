"""
Agent 1: Alert Sentinel (Intake & Velocity Triage Specialist).
Performs statistical baseline analysis (Z-scores, spending velocity, historical variance)
and generates a cognitive triage briefing powered by Groq LLM.
"""

from datetime import datetime, timedelta
from typing import Dict, Any, List
import pandas as pd
import numpy as np

from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.agent.models import EvidenceItem, EvidenceGradeEnum


class AlertSentinelAgent(BaseSpecializedAgent):
    """
    Ingestion and triaging specialist.
    Mathematical computation: Z-score deviations, 1h/24h velocity bursts, customer mean/std.
    Cognitive inference: Behavioral anomaly assessment and priority briefing.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_1_alert_sentinel",
            agent_name="Alert Sentinel",
            role="Intake, Velocity Baselining & Epistemic Triage"
        )

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        merged_df = context.merged_df
        flagged_txn_id = context.flagged_txn_id

        # 1. Retrieve Flagged Transaction Record
        flagged_row = merged_df[merged_df["TransactionID"] == flagged_txn_id]
        if flagged_row.empty:
            raise ValueError(f"Flagged transaction {flagged_txn_id} not found in dataset.")

        flagged_txn = flagged_row.iloc[0]
        context.flagged_amt = float(flagged_txn["TransactionAmt"])
        context.flagged_ts = flagged_txn["ts_dt"]
        context.flagged_pcd = str(flagged_txn["ProductCD"])
        context.flagged_channel = str(flagged_txn["channel"])
        context.flagged_addr1 = flagged_txn["addr1"] if pd.notna(flagged_txn["addr1"]) else None
        
        flagged_device = str(flagged_txn.get("DeviceInfo", "")) if pd.notna(flagged_txn.get("DeviceInfo")) else ""
        device_status = str(flagged_txn.get("id_15", "")) if pd.notna(flagged_txn.get("id_15")) else ""
        os_info = str(flagged_txn.get("id_30", "")) if pd.notna(flagged_txn.get("id_30")) else ""
        browser_info = str(flagged_txn.get("id_31", "")) if pd.notna(flagged_txn.get("id_31")) else ""
        screen_info = str(flagged_txn.get("id_33", "")) if pd.notna(flagged_txn.get("id_33")) else ""
        full_device_profile = " | ".join(filter(None, [flagged_device, os_info, browser_info, screen_info]))

        context.flagged_device = flagged_device
        context.device_status = device_status
        context.full_device_profile = full_device_profile

        # 2. Historical Baseline Calculations
        customer_history = merged_df[
            (merged_df["customer_id"] == context.customer_id) & 
            (merged_df["ts_dt"] < context.flagged_ts)
        ]
        context.customer_history_count = len(customer_history)
        context.established_addrs = set(customer_history["addr1"].dropna().unique())
        context.established_devices = set(customer_history["DeviceInfo"].dropna().unique())

        if not customer_history.empty:
            avg_amt = float(customer_history["TransactionAmt"].mean())
            std_amt = float(customer_history["TransactionAmt"].std()) if len(customer_history) > 1 else 10.0
            if np.isnan(std_amt) or std_amt <= 0.0:
                std_amt = 10.0
        else:
            avg_amt = context.flagged_amt
            std_amt = 10.0

        context.avg_historical_amt = avg_amt
        context.std_historical_amt = std_amt

        # 3. Z-Score and Velocity Math
        z_score = round(float((context.flagged_amt - avg_amt) / max(std_amt, 1.0)), 3)
        accel_ratio = round(float(context.flagged_amt / max(avg_amt, 1.0)), 2)

        # 1-hour and 24-hour velocity
        window_1h = merged_df[
            (merged_df["customer_id"] == context.customer_id) &
            (merged_df["ts_dt"] >= context.flagged_ts - timedelta(hours=1)) &
            (merged_df["ts_dt"] <= context.flagged_ts)
        ]
        window_24h = merged_df[
            (merged_df["customer_id"] == context.customer_id) &
            (merged_df["ts_dt"] >= context.flagged_ts - timedelta(hours=24)) &
            (merged_df["ts_dt"] <= context.flagged_ts)
        ]
        velocity_1h = len(window_1h)
        velocity_24h = len(window_24h)

        # Composite intake priority score (0.0 to 1.0)
        triage_priority = min(1.0, round(
            0.4 * context.initial_risk_score +
            0.3 * min(max(z_score, 0.0) / 4.0, 1.0) +
            0.3 * min(velocity_1h / 5.0, 1.0),
            3
        ))

        return {
            "flagged_txn_id": flagged_txn_id,
            "flagged_amount_usd": context.flagged_amt,
            "channel": context.flagged_channel,
            "customer_id": context.customer_id,
            "card_id": context.card_id,
            "historical_mean_usd": round(avg_amt, 2),
            "historical_std_usd": round(std_amt, 2),
            "z_score": z_score,
            "amount_acceleration_ratio": accel_ratio,
            "velocity_1h": velocity_1h,
            "velocity_24h": velocity_24h,
            "prior_txns_count": context.customer_history_count,
            "triage_priority": triage_priority,
            "hand_off_summary": f"Anchored TX #{flagged_txn_id} (${context.flagged_amt:.2f}, Z={z_score:+.2f}). Triage priority: {triage_priority:.2f}."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        prompt = (
            f"Case {context.case_id} Intake Telemetry:\n"
            f"- Flagged Transaction ID: #{math_results['flagged_txn_id']}\n"
            f"- Amount: ${math_results['flagged_amount_usd']:.2f} (Z-score: {math_results['z_score']:+.2f}, Ratio to Avg: {math_results['amount_acceleration_ratio']}x)\n"
            f"- Customer Spending Baseline: Mean=${math_results['historical_mean_usd']:.2f}, Std=${math_results['historical_std_usd']:.2f} over {math_results['prior_txns_count']} past transactions\n"
            f"- Spend Velocity: {math_results['velocity_1h']} txns in last 1h, {math_results['velocity_24h']} in last 24h\n"
            f"- Channel: {math_results['channel']}, Trigger: {context.trigger_type} ({context.trigger_text})\n"
            f"- Upstream Model Initial Risk: {context.initial_risk_score:.2f}, Computed Triage Priority: {math_results['triage_priority']:.2f}\n\n"
            f"As Alert Sentinel, formulate a concise 2-sentence intake briefing on whether this spending represents a statistically severe baseline anomaly."
        )
        fallback = (
            f"Alert Sentinel assessed TX #{context.flagged_txn_id} (${context.flagged_amt:.2f}) with Z-score {math_results['z_score']:+.2f} "
            f"against customer mean ${math_results['historical_mean_usd']:.2f}. Triage priority is {math_results['triage_priority']:.2f}."
        )
        return self.llm.generate_forensic_narrative(prompt, fallback_text=fallback)

    def formulate_evidence(self, math_results: Dict[str, Any], context: InvestigationContext) -> List[EvidenceItem]:
        items: List[EvidenceItem] = []
        if context.initial_risk_score >= 0.70:
            items.append(EvidenceItem(
                claim=f"Bank upstream fraud detection model flagged transaction with high risk score of {context.initial_risk_score:.2f}.",
                source="detection_model",
                ref=f"transactions.csv:risk_score({context.flagged_txn_id})",
                entity_ids=[str(context.flagged_txn_id)],
                grade=EvidenceGradeEnum.CORRELATIVE,
                weight=0.3
            ))
        if math_results["z_score"] >= 3.5:
            items.append(EvidenceItem(
                claim=f"Transaction amount of ${context.flagged_amt:.2f} represents a severe statistical outlier (Z={math_results['z_score']:+.2f}) exceeding 3.5 standard deviations from baseline.",
                source="telemetry",
                ref=f"historical_baseline:z_score(customer_id={context.customer_id})",
                entity_ids=[str(context.flagged_txn_id)],
                grade=EvidenceGradeEnum.CIRCUMSTANTIAL,
                weight=0.6
            ))
        return items
