"""
TigerGraph Agentic Fraud Investigation - FastAPI Backend Server
Provides high-density telemetry, graph topology, 2-stage NBA, and interactive
step-up auth simulation endpoints to power the React command center UI.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Root directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent
CASES_DIR = BASE_DIR / "cases"

app = FastAPI(
    title="Zyg0s - Telemetry & Reasoning API",
    version="1.0.0",
    description="Zyg0s: High-precision telemetry and cognitive reasoning backend for Agentic Fraud Investigation on TigerGraph Savanna Cloud",
)

# Enable CORS for React development (Vite default port 5173, Next.js 3000, 8000, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StepUpRequest(BaseModel):
    action_type: str = Field(default="SMS_OTP", description="Action type (SMS_OTP, BIOMETRIC, CALL)")
    outcome: str = Field(default="PASS", description="Outcome (PASS, FAIL, TIMEOUT)")


class ChatRequest(BaseModel):
    message: str = Field(..., description="Analyst question regarding the case")


def load_case_json(case_id: str) -> Dict[str, Any]:
    file_path = CASES_DIR / f"{case_id}.json"
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/health")
def health_check():
    return {
        "platform": "Zyg0s",
        "codename": "Scale of Forensic Balance",
        "status": "ONLINE",
        "system": "TigerGraph Savanna Cloud [Transaction_Fraud]",
        "engine": "LangGraph Neuro-Symbolic Hybrid Agent",
        "policy": "Bank Fraud Policy v1.0 (R1-R10)",
        "cases_indexed": len(list(CASES_DIR.glob("HHG-*.json"))),
    }


@app.get("/api/cases")
def list_cases():
    """Returns telemetry summaries for all 20 benchmark cases."""
    summaries = []
    case_files = sorted(CASES_DIR.glob("HHG-*.json"))
    for cf in case_files:
        try:
            with open(cf, "r", encoding="utf-8") as f:
                cdata = json.load(f)
            
            case_inner = cdata.get("case", {})
            nba = cdata.get("next_best_actions", {})
            initial_nba_list = nba.get("initial", [])
            final_nba_list = nba.get("final", [])
            
            initial_action = initial_nba_list[0].get("action", "MONITOR_CARD") if initial_nba_list else "MONITOR_CARD"
            final_action = final_nba_list[0].get("action", "MONITOR_CARD") if final_nba_list else "MONITOR_CARD"
            
            card_ids = case_inner.get("connected_card_ids", [])
            primary_card = card_ids[0] if card_ids else "N/A"
            customer_id = primary_card.split("-")[0] if "-" in primary_card else primary_card
            
            fraud_prob = case_inner.get("fraud_probability", 0.5)
            # Uncertainty formula U = 1.0 - abs(2*prob - 1)
            uncertainty = round(1.0 - abs(2.0 * fraud_prob - 1.0), 3)

            summaries.append({
                "case_id": cdata.get("case_id", cf.stem),
                "transaction_id": case_inner.get("first_suspicious_txn_id", "N/A"),
                "amount": case_inner.get("exposure_usd", 0.0),
                "customer_id": customer_id,
                "card_id": primary_card,
                "status": case_inner.get("status", "open"),
                "verdict": case_inner.get("verdict", "uncertain"),
                "risk_score": fraud_prob,
                "uncertainty_score": uncertainty,
                "fraud_pattern": case_inner.get("pattern", "Unknown"),
                "evidence_count": len(case_inner.get("evidence", [])),
                "similar_prior_cases": case_inner.get("similar_prior_cases", []),
                "stage_1_action": initial_action,
                "stage_2_action": final_action,
                "has_sar": cdata.get("sar", {}).get("file", False),
            })
        except Exception as e:
            continue

    return {"count": len(summaries), "cases": summaries}


@app.get("/api/cases/{case_id}")
def get_case(case_id: str):
    """Returns full investigation envelope, evidence list, 2-stage NBA, and SAR."""
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    card_ids = case_inner.get("connected_card_ids", [])
    primary_card = card_ids[0] if card_ids else "N/A"
    customer_id = primary_card.split("-")[0] if "-" in primary_card else primary_card
    fraud_prob = case_inner.get("fraud_probability", 0.5)
    uncertainty = round(1.0 - abs(2.0 * fraud_prob - 1.0), 3)

    return {
        "case_id": cdata.get("case_id", case_id),
        "customer_id": customer_id,
        "primary_card_id": primary_card,
        "first_suspicious_txn_id": case_inner.get("first_suspicious_txn_id", "N/A"),
        "exposure_usd": case_inner.get("exposure_usd", 0.0),
        "status": case_inner.get("status", "open"),
        "verdict": case_inner.get("verdict", "uncertain"),
        "risk_score": fraud_prob,
        "uncertainty_score": uncertainty,
        "pattern": case_inner.get("pattern", "unknown"),
        "summary": case_inner.get("summary", ""),
        "evidence": case_inner.get("evidence", []),
        "connected_card_ids": case_inner.get("connected_card_ids", []),
        "connected_device_profiles": case_inner.get("connected_device_profiles", []),
        "similar_prior_cases": case_inner.get("similar_prior_cases", []),
        "evidence_requests": cdata.get("evidence_requests", []),
        "next_best_actions": cdata.get("next_best_actions", {}),
        "sar": cdata.get("sar", {}),
        "telemetry": {
            "tool_calls": cdata.get("tool_calls", 6),
            "tokens": cdata.get("tokens", 4500),
            "latency_s": cdata.get("latency_s", 2.5),
            "graph_written": case_inner.get("written_to_graph", True),
            "graph_case_id": case_inner.get("graph_case_id", f"CASE-SAVANNA-{case_id}"),
        }
    }


@app.get("/api/cases/{case_id}/graph")
def get_case_graph(case_id: str):
    """
    Returns graph topology (nodes and links) formatted for Canvas/Shader force-directed
    rendering, color-coded by entity type with threat levels and degrees.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    tx_id = str(case_inner.get("first_suspicious_txn_id", "N/A"))
    card_ids = case_inner.get("connected_card_ids", [])
    primary_card = card_ids[0] if card_ids else "N/A"
    cust_id = primary_card.split("-")[0] if "-" in primary_card else primary_card
    verdict = case_inner.get("verdict", "uncertain")
    is_fraud = verdict == "fraud"
    
    nodes = []
    links = []

    # Central Transaction Node
    nodes.append({
        "id": f"tx_{tx_id}",
        "label": f"TX #{tx_id}",
        "type": "Transaction",
        "amount": case_inner.get("exposure_usd", 0.0),
        "color": "#F59E0B", # Amber
        "risk": case_inner.get("fraud_probability", 0.5),
        "size": 18,
    })

    # Customer Node
    if cust_id != "N/A":
        nodes.append({
            "id": f"cust_{cust_id}",
            "label": f"Customer {cust_id}",
            "type": "Customer",
            "color": "#3B82F6", # Electric Blue
            "risk": 0.15,
            "size": 22,
        })

    # Connected Cards
    for i, cid in enumerate(card_ids):
        card_node_id = f"card_{cid}"
        nodes.append({
            "id": card_node_id,
            "label": f"Card {cid}",
            "type": "AccountCard",
            "color": "#6366F1", # Indigo
            "risk": 0.7 if (is_fraud and i > 0) else 0.3,
            "size": 16,
        })
        if cust_id != "N/A":
            links.append({"source": f"cust_{cust_id}", "target": card_node_id, "type": "OWNS", "weight": 1.0})
        if i == 0:
            links.append({"source": card_node_id, "target": f"tx_{tx_id}", "type": "MADE", "weight": 1.0})

    # Connected Device Profiles
    for i, dev in enumerate(case_inner.get("connected_device_profiles", [])):
        dev_node_id = f"dev_{i}"
        short_dev = dev.split("|")[0].strip() if "|" in dev else dev[:20]
        nodes.append({
            "id": dev_node_id,
            "label": f"Device: {short_dev}",
            "full_profile": dev,
            "type": "DeviceProfile",
            "color": "#8B5CF6", # Purple
            "risk": 0.85 if is_fraud else 0.25,
            "size": 14,
        })
        links.append({"source": f"tx_{tx_id}", "target": dev_node_id, "type": "FROM_DEVICE", "weight": 0.8})

    # Similar Prior Closed Cases (Historical Precedents)
    for i, cc in enumerate(case_inner.get("similar_prior_cases", [])):
        cc_node_id = f"cc_{cc}"
        nodes.append({
            "id": cc_node_id,
            "label": f"Precedent {cc}",
            "type": "ClosedCase",
            "color": "#EF4444" if is_fraud else "#10B981", # Red vs Green
            "risk": 0.95 if is_fraud else 0.05,
            "size": 16,
            "is_threat_beacon": is_fraud,
        })
        # Link to primary card or device
        target_node = f"card_{primary_card}" if primary_card != "N/A" else f"tx_{tx_id}"
        links.append({"source": target_node, "target": cc_node_id, "type": "CONNECTED_TO", "weight": 0.7})

    return {
        "case_id": case_id,
        "nodes": nodes,
        "links": links,
        "metrics": {
            "node_count": len(nodes),
            "edge_count": len(links),
            "threat_density": round(sum(1 for n in nodes if n.get("risk", 0) > 0.7) / max(1, len(nodes)), 2),
        }
    }


@app.post("/api/cases/{case_id}/simulate-step-up")
def simulate_step_up(case_id: str, req: StepUpRequest):
    """
    Interactive Step-Up Auth Simulator:
    Demonstrates dynamic 2-stage NBA re-decisioning and uncertainty collapse.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    nba = cdata.get("next_best_actions", {})
    initial_nba = nba.get("initial", [])
    
    # Calculate updated uncertainty and action based on simulation outcome
    if req.outcome == "PASS":
        updated_uncertainty = 0.04
        updated_risk = 0.05
        updated_action = "CLOSE_NO_FRAUD"
        updated_verdict = "cleared"
        what_changed = (
            f"Step-Up authentication ({req.action_type}) PASSED by cardholder. "
            "Primary fraud ambiguity resolved; uncertainty collapsed from "
            f"{cdata.get('uncertainty_score', 0.65):.2f} to 0.04. Case cleared under Policy R3/R10."
        )
        escalation = "auto"
    else: # FAIL or TIMEOUT
        updated_uncertainty = 0.05
        updated_risk = 0.95
        updated_action = "BLOCK_ALL_CARDS" if case_inner.get("exposure_usd", 0) > 500 else "BLOCK_CARD"
        updated_verdict = "fraud"
        what_changed = (
            f"Step-Up authentication ({req.action_type}) {req.outcome}. "
            "Customer challenge failed to resolve identity possession; uncertainty collapsed from "
            f"{cdata.get('uncertainty_score', 0.65):.2f} to 0.05. Risk escalated to confirmed fraud under Policy R1/R2."
        )
        escalation = "L2" if case_inner.get("exposure_usd", 0) > 1000 else "L1"

    return {
        "case_id": case_id,
        "step_up_action": req.action_type,
        "simulation_outcome": req.outcome,
        "initial_stage_1": initial_nba,
        "final_stage_2": {
            "action": updated_action,
            "route": escalation,
            "uncertainty_after": updated_uncertainty,
            "risk_score_after": updated_risk,
            "verdict": updated_verdict,
            "what_changed": what_changed,
        }
    }


@app.post("/api/cases/{case_id}/chat")
def case_chat(case_id: str, req: ChatRequest):
    """
    Grounded investigator copilot answering questions regarding policy rules,
    evidence grading, and multi-hop graph context.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    msg = req.message.lower()
    amount = case_inner.get("exposure_usd", 0.0)
    verdict = case_inner.get("verdict", "uncertain")
    pattern = case_inner.get("pattern", "N/A")
    evidence = case_inner.get("evidence", [])
    
    if "rule" in msg or "policy" in msg:
        reply = (
            f"Case {case_id} evaluated Bank Fraud Policy v1.0. "
            f"Pattern recognized: '{pattern}'. Exposure is ${amount:.2f}, routed under "
            f"{'L2 Senior Review' if amount >= 1000 else 'L1 Analyst Review'} threshold."
        )
    elif "why" in msg or "reason" in msg:
        reply = (
            f"Verdict: '{verdict.upper()}'. Grounded by {len(evidence)} evidence signals "
            f"from TigerGraph Savanna Cloud. Similar precedents: "
            f"{', '.join(case_inner.get('similar_prior_cases', []))}."
        )
    elif "sar" in msg or "fincen" in msg:
        sar = cdata.get("sar", {})
        if sar.get("file"):
            reply = f"FinCEN BSA/AML SAR Required: {sar.get('narrative', '')[:250]}..."
        else:
            reply = "No SAR required for this case (low exposure or legitimate resolution)."
    else:
        nba_final = cdata.get("next_best_actions", {}).get("final", [{}])[0]
        reply = (
            f"Telemetry for {case_id}: Status '{case_inner.get('status')}', "
            f"Verdict '{verdict}', Recommended NBA: {nba_final.get('action', 'MONITOR_CARD')} "
            f"({nba_final.get('route', 'auto')})."
        )

    return {"case_id": case_id, "query": req.message, "response": reply}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
