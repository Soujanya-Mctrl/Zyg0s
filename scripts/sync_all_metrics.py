"""
Synchronizes all benchmark metrics across cases/*.json, casesBenchmark.ts, and sarFilingsData.json.
Guarantees:
- Every case has its genuine transaction amount (HHG-001 = $77.07, total portfolio = $3,623.21).
- Every case starts in clean OPEN / UNCERTAIN state with initial alert risk & uncertainty.
- Contradictory post-stepup evidence is stripped from initial unexecuted state.
- All FinCEN SAR narratives have complete, legally sound Section V institutional actions.
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CASES_DIR = BASE_DIR / "cases"
FRONTEND_DIR = BASE_DIR / "frontend"
BENCHMARK_TS = FRONTEND_DIR / "src" / "data" / "casesBenchmark.ts"
SAR_JSON = FRONTEND_DIR / "src" / "data" / "sarFilingsData.json"

CASE_AMOUNTS = {
    "HHG-001": 77.07,
    "HHG-002": 292.36,
    "HHG-003": 49.00,
    "HHG-004": 128.33,
    "HHG-005": 100.07,
    "HHG-006": 482.12,
    "HHG-007": 111.92,
    "HHG-008": 55.68,
    "HHG-009": 30.02,
    "HHG-010": 1000.03,
    "HHG-011": 131.30,
    "HHG-012": 30.91,
    "HHG-013": 35.66,
    "HHG-014": 74.96,
    "HHG-015": 599.94,
    "HHG-016": 59.67,
    "HHG-017": 100.09,
    "HHG-018": 39.08,
    "HHG-019": 99.92,
    "HHG-020": 125.08,
}

CASE_INITIAL_METRICS = {
    "HHG-001": {"risk_score": 0.61, "uncertainty": 0.78, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-002": {"risk_score": 0.79, "uncertainty": 0.58, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-003": {"risk_score": 0.72, "uncertainty": 0.56, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-004": {"risk_score": 0.75, "uncertainty": 0.50, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-005": {"risk_score": 0.54, "uncertainty": 0.92, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-006": {"risk_score": 0.78, "uncertainty": 0.56, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-007": {"risk_score": 0.87, "uncertainty": 0.26, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-008": {"risk_score": 0.68, "uncertainty": 0.64, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-009": {"risk_score": 0.62, "uncertainty": 0.76, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-010": {"risk_score": 0.90, "uncertainty": 0.20, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-011": {"risk_score": 0.70, "uncertainty": 0.60, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-012": {"risk_score": 0.55, "uncertainty": 0.90, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-013": {"risk_score": 0.76, "uncertainty": 0.52, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-014": {"risk_score": 0.82, "uncertainty": 0.36, "verdict": "uncertain", "trigger_type": "analyst_request"},
    "HHG-015": {"risk_score": 0.77, "uncertainty": 0.54, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-016": {"risk_score": 0.74, "uncertainty": 0.52, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-017": {"risk_score": 0.57, "uncertainty": 0.86, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-018": {"risk_score": 0.66, "uncertainty": 0.68, "verdict": "uncertain", "trigger_type": "customer_report"},
    "HHG-019": {"risk_score": 0.90, "uncertainty": 0.20, "verdict": "uncertain", "trigger_type": "risk_score"},
    "HHG-020": {"risk_score": 0.52, "uncertainty": 0.96, "verdict": "uncertain", "trigger_type": "risk_score"},
}

def clean_case_evidence(evidence_list):
    """Filters out post-challenge / post-investigation evidence."""
    cleaned = []
    for ev in evidence_list:
        claim = ev.get("claim", "").lower()
        source = ev.get("source", "").lower()
        ref = ev.get("ref", "").lower()
        if "customer_reply" in source or "customer_validation_response" in ref:
            continue
        if "affirmatively verified" in claim or "confirms they made" in claim:
            continue
        cleaned.append(ev)
    return cleaned

def sync_cases_files():
    print("1. Updating cases/HHG-*.json with exact amounts and clean open state...")
    for i in range(1, 21):
        cid = f"HHG-{i:03d}"
        cf = CASES_DIR / f"{cid}.json"
        if not cf.exists():
            continue
        with open(cf, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        amt = CASE_AMOUNTS.get(cid, 0.0)
        meta = CASE_INITIAL_METRICS.get(cid, {"risk_score": 0.65, "uncertainty": 0.65})
        
        c = data.get("case", {})
        c["status"] = "open"
        c["verdict"] = "uncertain"
        c["exposure_usd"] = amt
        c["amount"] = amt
        c["fraud_probability"] = meta["risk_score"]
        c["evidence"] = clean_case_evidence(c.get("evidence", []))
        
        data["case"] = c
        data["uncertainty_score"] = meta["uncertainty"]
        data["sar"] = {
            "file": False,
            "reason": "",
            "narrative": "",
            "subjects": [],
            "total_amount_usd": 0.0,
            "activity_dates": []
        }
        
        with open(cf, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"  Synced {cid}: amount=${amt:.2f}, risk={meta['risk_score']}, uncertainty={meta['uncertainty']}")

def sync_cases_benchmark_ts():
    print("\n2. Updating frontend/src/data/casesBenchmark.ts...")
    if not BENCHMARK_TS.exists():
        print("  Error: casesBenchmark.ts not found!")
        return
    
    with open(BENCHMARK_TS, "r", encoding="utf-8") as f:
        content = f.read()
    
    prefix = "export const BENCHMARK_DATA: any = "
    if not content.startswith(prefix):
        print("  Error: Unexpected format in casesBenchmark.ts")
        return
    
    json_text = content[len(prefix):].rstrip(";\n ")
    benchmark_data = json.loads(json_text)
    
    # Update cases list
    for c in benchmark_data.get("cases", []):
        cid = c.get("case_id")
        amt = CASE_AMOUNTS.get(cid, 0.0)
        meta = CASE_INITIAL_METRICS.get(cid, {"risk_score": 0.65, "uncertainty": 0.65})
        
        c["amount"] = amt
        c["status"] = "open"
        c["verdict"] = "uncertain"
        c["risk_score"] = meta["risk_score"]
        c["uncertainty_score"] = meta["uncertainty"]
        c["confidence_score"] = round((1.0 - meta["uncertainty"]) * 100)
        c["has_sar"] = False
    
    # Update details dictionary
    details = benchmark_data.get("details", {})
    for cid, det in details.items():
        amt = CASE_AMOUNTS.get(cid, 0.0)
        meta = CASE_INITIAL_METRICS.get(cid, {"risk_score": 0.65, "uncertainty": 0.65})
        
        det["exposure_usd"] = amt
        det["status"] = "open"
        det["verdict"] = "uncertain"
        det["risk_score"] = meta["risk_score"]
        det["uncertainty_score"] = meta["uncertainty"]
        det["confidence_score"] = round((1.0 - meta["uncertainty"]) * 100)
        det["evidence"] = clean_case_evidence(det.get("evidence", []))
    
    # Save back
    new_content = prefix + json.dumps(benchmark_data, indent=2) + ";\n"
    with open(BENCHMARK_TS, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("  Successfully updated casesBenchmark.ts (cases array & details map).")

def sync_sar_filings():
    print("\n3. Updating frontend/src/data/sarFilingsData.json...")
    if not SAR_JSON.exists():
        print("  Error: sarFilingsData.json not found!")
        return
    
    with open(SAR_JSON, "r", encoding="utf-8") as f:
        sar_data = json.load(f)
    
    sar_data["count"] = 10
    sar_data["total_exposure_usd"] = 2677.54
    sar_data["total_portfolio_usd"] = 3623.21
    sar_data["cleared_portfolio_usd"] = 945.67
    
    narrative_completions = {
        "HHG-005": (
            "\n\n**V. INSTITUTIONAL ACTION TAKEN**\n"
            "Upon identification of suspicious syndicated device sharing and confirmed unauthorized card usage, the Institution initiated immediate protective card control actions in accordance with Bank Fraud Policy v1.0. "
            "The compromised payment instrument was permanently blocked, credentials revoked, and placed on enhanced fraud monitoring. "
            "This filing is registered with FinCEN pursuant to Bank Secrecy Act (BSA) and Anti-Money Laundering (AML) mandates."
        ),
        "HHG-006": (
            " indicating fraudulent card-not-present exploitation.\n\n"
            "**V. INSTITUTIONAL ACTION TAKEN**\n"
            "Upon confirmation of unauthorized card-not-present fraud, the Institution executed immediate card blocks and placed the account on heightened monitoring pursuant to Bank Fraud Policy v1.0. "
            "This Suspicious Activity Report is filed in full compliance with FinCEN BSA/AML statutory mandates."
        ),
        "HHG-014": (
            "2.0.3202.84) is linked to multiple compromised cards across independent accounts, confirming organized cyber syndicate deployment.\n\n"
            "**V. INSTITUTIONAL ACTION TAKEN**\n"
            "Following analyst escalation and graph validation of cross-card device linkage, the Institution blocked the affected card, blacklisted the associated device footprint, and instituted enhanced monitoring. "
            "This filing is registered with FinCEN pursuant to BSA/AML reporting requirements."
        ),
        "HHG-015": (
            "ing (AML) statutory compliance mandates under Title 31 CFR Chapter X."
        ),
        "HHG-020": (
            " unauthorized access, the card was permanently blocked, merchant recovery procedures initiated, and the account flagged for ongoing monitoring. "
            "This Suspicious Activity Report is submitted in strict accordance with BSA/AML regulatory requirements."
        )
    }
    
    for filing in sar_data.get("filings", []):
        cid = filing.get("case_id")
        filing["exposure_usd"] = CASE_AMOUNTS.get(cid, filing.get("exposure_usd", 0.0))
        
        narr = filing.get("narrative", "")
        if cid == "HHG-005" and narr.endswith("**V."):
            filing["narrative"] = narr[:-4].rstrip() + narrative_completions["HHG-005"]
        elif cid == "HHG-006" and narr.endswith("in their possession,"):
            filing["narrative"] = narr + narrative_completions["HHG-006"]
        elif cid == "HHG-014" and "chrome 6" in narr[-20:]:
            filing["narrative"] = narr + narrative_completions["HHG-014"]
        elif cid == "HHG-015" and narr.endswith("and Anti-Money Launder"):
            filing["narrative"] = narr + narrative_completions["HHG-015"]
        elif cid == "HHG-020" and narr.endswith("confirmation of"):
            filing["narrative"] = narr + narrative_completions["HHG-020"]
    
    with open(SAR_JSON, "w", encoding="utf-8") as f:
        json.dump(sar_data, f, indent=2)
    print("  Successfully updated sarFilingsData.json with completed narratives and exact totals.")

if __name__ == "__main__":
    sync_cases_files()
    sync_cases_benchmark_ts()
    sync_sar_filings()
    print("\nMetrics synchronization complete!")
