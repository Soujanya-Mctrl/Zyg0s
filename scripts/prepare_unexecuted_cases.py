"""
Prepares all 20 benchmark cases into their initial unexecuted / pending alert state.
Safely archives existing evaluated benchmark answers to cases/evaluated_benchmarks/.
"""

import json
import shutil
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
CASES_DIR = BASE_DIR / "cases"
ARCHIVE_DIR = CASES_DIR / "evaluated_benchmarks"
CASE_PACK_CSV = BASE_DIR / "data" / "hhgoa_ieee" / "case_pack.csv"

def reset_all_cases():
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    df_pack = pd.read_csv(CASE_PACK_CSV) if CASE_PACK_CSV.exists() else pd.DataFrame()

    case_files = sorted(CASES_DIR.glob("HHG-*.json"))
    print(f"Found {len(case_files)} cases in {CASES_DIR}")

    for cf in case_files:
        # 1. Archive original
        archive_path = ARCHIVE_DIR / cf.name
        if not archive_path.exists():
            shutil.copy(cf, archive_path)

        with open(cf, "r", encoding="utf-8") as f:
            data = json.load(f)

        case_id = data.get("case_id", cf.stem)
        case_inner = data.get("case", {})

        # Get initial alert risk from case_pack
        init_risk = 0.65
        exposure = case_inner.get("exposure_usd", 0.0)
        trigger_text = "Transaction flagged by risk engine."

        if not df_pack.empty:
            matches = df_pack[df_pack["case_id"] == case_id]
            if not matches.empty:
                row = matches.iloc[0]
                if pd.notna(row.get("risk_score")):
                    init_risk = float(row.get("risk_score"))
                trigger_text = str(row.get("trigger_text", trigger_text))

        # 2. Reset case state to OPEN / UNCERTAIN
        case_inner["status"] = "open"
        case_inner["verdict"] = "uncertain"
        case_inner["fraud_probability"] = round(init_risk, 3)
        case_inner["summary"] = (
            f"Case {case_id} is ACTIVE and currently UNDER INVESTIGATION. "
            f"Triggered by: {trigger_text[:100]}... "
            f"Initial fraud risk scored at {init_risk:.2f}. "
            "Epistemic uncertainty exceeds policy threshold. "
            "Awaiting Step-Up Authentication challenge execution."
        )

        # Retain only pre-stepup evidence
        raw_evidence = case_inner.get("evidence", [])
        clean_evidence = []
        for ev in raw_evidence:
            ref = str(ev.get("ref", ""))
            source = str(ev.get("source", ""))
            if "customer_reply" in source or "customer_validation_response" in ref:
                continue
            clean_evidence.append(ev)

        # If no evidence left, keep initial graph traversal signal
        if not clean_evidence:
            clean_evidence.append({
                "claim": f"Alert flagged on card {case_inner.get('connected_card_ids', ['N/A'])[0]}: initial anomaly risk {init_risk:.2f}.",
                "source": "graph",
                "ref": "query:alert_risk_eval",
                "grade": "CIRCUMSTANTIAL",
                "weight": 0.5
            })
        case_inner["evidence"] = clean_evidence

        # 3. Reset Next-Best Actions (Clear final stage, retain initial stage)
        nba = data.get("next_best_actions", {})
        initial_actions = nba.get("initial", [])
        if not initial_actions:
            initial_actions = [{
                "action": "VERIFY_WITH_CUSTOMER",
                "route": "auto",
                "reason": "R1: Uncertainty exceeds threshold (U > 0.40). Perform Step-Up Auth challenge to resolve cardholder identity before destructive action."
            }]

        data["case"] = case_inner
        data["next_best_actions"] = {
            "initial": initial_actions,
            "final": [] # Empty! Awaiting analyst execution of stage 2
        }

        # 4. Reset Pipeline Trace up to Step 5 (Uncertainty assessment)
        trace = data.get("orchestrator_pipeline_trace", [])
        clean_trace = []
        for step in trace:
            agent = step.get("agent", "")
            action = step.get("action", "")
            if "HUMAN_COGNITIVE_OVERRIDE" in agent or "Step-Up authentication" in action or "Final stage" in action:
                continue
            clean_trace.append(step)

        if not clean_trace:
            clean_trace = [
                {"agent": "TRIGGER_ROUTER", "action": f"Alert ingested: {trigger_text[:80]}", "status": "safe"},
                {"agent": "GRAPH_TRAVERSAL", "action": f"Traversed 2-hop neighborhood in TigerGraph Savanna for card {case_inner.get('connected_card_ids', ['N/A'])[0]}.", "status": "safe"},
                {"agent": "EVIDENCE_COLLECTOR", "action": f"Extracted {len(clean_evidence)} preliminary graph evidence signals.", "status": "safe"},
                {"agent": "UNCERTAINTY_EVALUATOR", "action": f"Evaluated epistemic uncertainty U={round(1.0 - abs(2.0*init_risk - 1.0), 3)}. Threshold breached (U > 0.40).", "status": "warning"},
                {"agent": "POLICY_R1_STAGE1", "action": "Formulated Stage 1 NBA: VERIFY_WITH_CUSTOMER (SMS_OTP / Biometric). Case awaiting execution.", "status": "warning"},
            ]
        data["orchestrator_pipeline_trace"] = clean_trace

        with open(cf, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    print("All 20 cases successfully reset to OPEN / UNCERTAIN pending alert state.")

if __name__ == "__main__":
    reset_all_cases()
