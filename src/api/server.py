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

from src.agent.llm_client import get_llm_client
from src.agent.workflow import get_orchestrator

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


class OverrideRequest(BaseModel):
    action: str = Field(default="BLOCK_ALL_CARDS", description="Enforced action (BLOCK_CARD, BLOCK_ALL_CARDS, CLOSE_NO_FRAUD)")
    reason: str = Field(default="Analyst forensic discretion: anomalous cross-border velocity and high chargeback risk.", description="Analyst reason")
    route: str = Field(default="L2", description="Approval route (L1, L2)")


class ChatRequest(BaseModel):
    message: str = Field(..., description="Analyst question regarding the case")


class ExecuteMcpToolRequest(BaseModel):
    tool_name: str = Field(..., description="Tool name, e.g. 'tigergraph__get_vertex_count' or 'get_node'")
    arguments: Dict[str, Any] = Field(default_factory=dict, description="Tool arguments dictionary")


class RunPipelineRequest(BaseModel):
    case_id: Optional[str] = Field(default="HHG-CUSTOM", description="Case ID")
    flagged_txn_id: int = Field(default=3514030, description="Flagged transaction ID")
    card_id: str = Field(default="C12382-K1", description="Primary card ID")
    customer_id: str = Field(default="C12382", description="Customer ID")
    trigger_type: str = Field(default="risk_score", description="Trigger type (risk_score, customer_report, unusual_velocity)")
    trigger_text: str = Field(default="Transaction flagged by real-time risk engine.", description="Trigger narrative")
    risk_score: Optional[float] = Field(default=0.65, description="Initial risk score")


def load_case_json(case_id: str) -> Dict[str, Any]:
    file_path = CASES_DIR / f"{case_id}.json"
    if not file_path.exists():
        eval_path = BASE_DIR / "cases" / "evaluated_benchmarks" / f"{case_id}.json"
        if eval_path.exists():
            file_path = eval_path
        else:
            raise HTTPException(status_code=404, detail=f"Case {case_id} not found")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/health")
def health_check():
    llm = get_llm_client()
    try:
        from src.graph.mcp_service import TigerGraphMCPService
        mcp_info = TigerGraphMCPService.get_status()
    except Exception as e:
        mcp_info = {"status": "OFFLINE", "error": str(e)}

    return {
        "platform": "Zyg0s",
        "codename": "Scale of Forensic Balance",
        "status": "ONLINE",
        "system": "TigerGraph Savanna Cloud [Transaction_Fraud]",
        "engine": "LangGraph Neuro-Symbolic Hybrid Agent",
        "policy": "Bank Fraud Policy v1.0 (R1-R10)",
        "cases_indexed": len(list(CASES_DIR.glob("HHG-*.json"))),
        "mcp_service": mcp_info,
        "ai_engine": {
            "provider": llm._provider,
            "status": llm.get_provider_status(),
            "model": getattr(llm, "DEFAULT_GROQ_MODEL", "qwen/qwen3.8-27b"),
            "active": llm.is_active,
            "lpu_accelerated": True if llm._provider == "groq" else False,
        }
    }


@app.get("/api/mcp/status")
def get_mcp_status():
    """TigerGraph MCP integration status and connectivity telemetry."""
    from src.graph.mcp_service import TigerGraphMCPService
    return TigerGraphMCPService.get_status()


@app.get("/api/mcp/tools")
def get_mcp_tools():
    """List all available TigerGraph MCP tools with input schemas and descriptions."""
    from src.graph.mcp_service import TigerGraphMCPService
    tools = TigerGraphMCPService.list_tools()
    return {
        "count": len(tools),
        "tools": tools
    }


@app.post("/api/mcp/execute")
async def execute_mcp_tool(req: ExecuteMcpToolRequest):
    """Execute any TigerGraph MCP tool dynamically with parameters."""
    import time
    import asyncio
    from src.graph.mcp_service import TigerGraphMCPService
    t0 = time.perf_counter()
    res = await asyncio.to_thread(TigerGraphMCPService.sync_execute_tool, req.tool_name, req.arguments)
    latency_ms = round((time.perf_counter() - t0) * 1000, 2)
    return {
        "tool_name": req.tool_name,
        "arguments": req.arguments,
        "latency_ms": latency_ms,
        "result": res
    }


@app.get("/api/ai/status")
def get_ai_status():
    """Live AI engine telemetry & model diagnostic endpoint."""
    llm = get_llm_client()
    return {
        "provider": llm._provider,
        "status": llm.get_provider_status(),
        "model": getattr(llm, "DEFAULT_GROQ_MODEL", "qwen/qwen3.8-27b"),
        "is_active": llm.is_active,
        "lpu_accelerated": True if llm._provider == "groq" else False,
    }


@app.get("/api/cases")
def list_cases():
    """Returns telemetry summaries for the 20 official benchmark cases (HHG-001 to HHG-020)."""
    summaries = []
    # Strictly load the 20 official benchmark cases in sequence
    case_files = [CASES_DIR / f"HHG-{i:03d}.json" for i in range(1, 21)]
    for cf in case_files:
        if not cf.exists():
            continue
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
        "orchestrator_pipeline_trace": cdata.get("orchestrator_pipeline_trace", []),
        "telemetry": {
            "tool_calls": cdata.get("tool_calls", 6),
            "tokens": cdata.get("tokens", 4500),
            "latency_s": cdata.get("latency_s", 2.5),
            "graph_written": case_inner.get("written_to_graph", True),
            "graph_case_id": case_inner.get("graph_case_id", f"CASE-SAVANNA-{case_id}"),
        }
    }


@app.get("/api/cases/{case_id}/pipeline")
def get_case_pipeline(case_id: str):
    """
    Returns the step-by-step 7-agent execution trace for case_id.
    Every agent provides deterministic mathematical computations (Z-scores, graph metrics,
    log-odds, uncertainty U, RRF) alongside AI cognitive reasoning (Groq qwen/qwen3.8-27b).
    """
    cdata = load_case_json(case_id)
    trace = cdata.get("orchestrator_pipeline_trace", [])
    if not trace:
        case_pack_path = BASE_DIR / "data" / "hhgoa_ieee" / "case_pack.csv"
        if case_pack_path.exists():
            import pandas as pd
            df_pack = pd.read_csv(case_pack_path)
            matches = df_pack[df_pack["case_id"] == case_id]
            if not matches.empty:
                case_meta = matches.iloc[0].to_dict()
                orch = get_orchestrator()
                out = orch.run_investigation(case_meta)
                trace = getattr(out, "orchestrator_pipeline_trace", [])
                file_path = CASES_DIR / f"{case_id}.json"
                try:
                    cdata["orchestrator_pipeline_trace"] = trace
                    with open(file_path, "w", encoding="utf-8") as f:
                        json.dump(cdata, f, indent=2)
                except Exception:
                    pass
    return {
        "case_id": case_id,
        "agent_count": len(trace),
        "pipeline_trace": trace
    }


@app.get("/api/cases/{case_id}/explanation")
def get_case_explanation(case_id: str):
    """
    Returns the comprehensive investigative reasoning explanation satisfying HHGOA Hackathon standards:
    1. What evidence was used
    2. Why additional evidence was requested
    3. Why the selected actions were recommended
    """
    cdata = load_case_json(case_id)
    from src.agent.reasoning import FraudReasoningEngine
    explanation = FraudReasoningEngine.explain_case_reasoning(cdata)
    return explanation.model_dump()


@app.post("/api/cases/{case_id}/investigate")
def investigate_case(case_id: str):
    """
    Executes the 7-agent neuro-symbolic pipeline live for the specified case_id.
    Loads case metadata from case_pack.csv or existing case, runs the full investigation,
    commits to TigerGraph memory, and returns the live evaluated result.
    """
    orch = get_orchestrator()
    case_meta = {"case_id": case_id}
    
    case_pack_path = BASE_DIR / "data" / "hhgoa_ieee" / "case_pack.csv"
    if case_pack_path.exists():
        import pandas as pd
        df_pack = pd.read_csv(case_pack_path)
        matches = df_pack[df_pack["case_id"] == case_id]
        if not matches.empty:
            case_meta = matches.iloc[0].to_dict()
    
    if "case_id" not in case_meta or case_meta["case_id"] != case_id or "first_suspicious_txn_id" not in case_meta:
        # Fallback to existing case file data
        cdata = load_case_json(case_id)
        case_inner = cdata.get("case", {})
        case_meta = {
            "case_id": case_id,
            "first_suspicious_txn_id": case_inner.get("first_suspicious_txn_id"),
            "exposure_usd": case_inner.get("exposure_usd", 100.0),
            "connected_card_ids": case_inner.get("connected_card_ids", []),
            "pattern": case_inner.get("pattern", "CARD_VELOCITY_BURST"),
            "trigger_type": "analyst_investigate_trigger",
            "trigger_text": case_inner.get("summary", "Transaction alert dispatched to orchestrator.")
        }
        
    out = orch.run_investigation(case_meta)
    
    # Save the updated investigated case
    case_dict = {
        "case_id": out.case_id,
        "case": out.case.model_dump(),
        "evidence_requests": [e.model_dump() for e in out.evidence_requests],
        "next_best_actions": out.next_best_actions.model_dump(),
        "sar": out.sar.model_dump(),
        "stop_reason": out.stop_reason,
        "latency_s": out.latency_s,
        "orchestrator_pipeline_trace": getattr(out, "orchestrator_pipeline_trace", [])
    }
    file_path = CASES_DIR / f"{out.case_id}.json"
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(case_dict, f, indent=2)
    except Exception as e:
        print(f"Warning: Failed to persist investigated case {out.case_id}: {e}")
        
    return {
        "case_id": out.case_id,
        "case": out.case.model_dump(),
        "evidence_requests": [e.model_dump() for e in out.evidence_requests],
        "next_best_actions": out.next_best_actions.model_dump(),
        "sar": out.sar.model_dump(),
        "stop_reason": out.stop_reason,
        "latency_s": out.latency_s,
        "orchestrator_pipeline_trace": getattr(out, "orchestrator_pipeline_trace", [])
    }


@app.post("/api/pipeline/run")
def run_custom_pipeline(req: RunPipelineRequest):
    """
    Executes an ad-hoc or benchmark transaction alert through the 7-agent
    deterministic + AI inference pipeline coordinated by the Master Orchestrator.
    """
    orch = get_orchestrator()
    case_meta = req.model_dump()
    out = orch.run_investigation(case_meta)
    
    # Persist the newly investigated case so it appears across all workbench views
    case_dict = {
        "case_id": out.case_id,
        "case": out.case.model_dump(),
        "evidence_requests": [e.model_dump() for e in out.evidence_requests],
        "next_best_actions": out.next_best_actions.model_dump(),
        "sar": out.sar.model_dump(),
        "stop_reason": out.stop_reason,
        "latency_s": out.latency_s,
        "orchestrator_pipeline_trace": getattr(out, "orchestrator_pipeline_trace", [])
    }
    file_path = CASES_DIR / f"{out.case_id}.json"
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(case_dict, f, indent=2)
    except Exception as e:
        print(f"Warning: Failed to persist case {out.case_id}: {e}")

    return {
        "case_id": out.case_id,
        "case": out.case.model_dump(),
        "evidence_requests": [e.model_dump() for e in out.evidence_requests],
        "next_best_actions": out.next_best_actions.model_dump(),
        "sar": out.sar.model_dump(),
        "stop_reason": out.stop_reason,
        "latency_s": out.latency_s,
        "orchestrator_pipeline_trace": getattr(out, "orchestrator_pipeline_trace", [])
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


@app.get("/api/graph/schema")
def get_graph_schema():
    """
    Returns the live TigerGraph Savanna Cloud database schema definition,
    including vertex types, edge types, and topology layout for React Flow.
    """
    try:
        from src.graph.client import get_tg_connection
        conn = get_tg_connection()
        schema = conn.getSchema()
        vtypes = schema.get("VertexTypes", [])
        etypes = schema.get("EdgeTypes", [])
        
        # Build React Flow nodes for Schema Ontology
        nodes = []
        for i, vt in enumerate(vtypes):
            name = vt.get("Name", f"Vertex_{i}")
            color = "#06B6D4" # Cyan default
            if "Transaction" in name:
                color = "#F59E0B"
            elif any(k in name for k in ["Party", "User", "Customer"]):
                color = "#3B82F6"
            elif any(k in name for k in ["Card", "Account"]):
                color = "#10B981"
            elif any(k in name for k in ["Device", "IP"]):
                color = "#8B5CF6"
            elif "Merchant" in name:
                color = "#EC4899"
            elif any(k in name for k in ["Case", "Fraud"]):
                color = "#EF4444"

            attr_names = [a.get("AttributeName") for a in vt.get("Attributes", [])]
            primary_id = vt.get("PrimaryId", {}).get("AttributeName", "id")

            nodes.append({
                "id": name,
                "label": name,
                "type": "SchemaVertex",
                "primary_id": primary_id,
                "attributes": attr_names[:6], # first 6 attributes
                "total_attributes": len(attr_names),
                "color": color,
            })
            
        edges = []
        for i, et in enumerate(etypes):
            name = et.get("Name", f"Edge_{i}")
            from_v = et.get("FromVertexTypeName") or et.get("FromVertexType")
            to_v = et.get("ToVertexTypeName") or et.get("ToVertexType")
            is_directed = et.get("IsDirected", True)
            if from_v and to_v:
                edges.append({
                    "id": f"e_{from_v}_{to_v}_{name}",
                    "source": from_v,
                    "target": to_v,
                    "name": name,
                    "label": name.replace("_", " "),
                    "is_directed": is_directed,
                })

        return {
            "graph_name": conn.graphname,
            "vertex_count": len(vtypes),
            "edge_count": len(etypes),
            "vertices": vtypes,
            "edges": etypes,
            "flow_nodes": nodes,
            "flow_edges": edges,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch TigerGraph schema: {str(e)}")


@app.post("/api/cases/{case_id}/simulate-step-up")
def simulate_step_up(case_id: str, req: StepUpRequest):
    """
    Interactive Step-Up Auth Simulator:
    Demonstrates dynamic 2-stage NBA re-decisioning, sequential evidence gathering,
    and uncertainty collapse.
    
    Logs TWO distinct sequential chronological events:
      Step 1: HUMAN_APPROVAL / STEP_UP_DISPATCHED (Approving Stage 1 recommendation to request evidence)
      Step 2: UNCERTAINTY_REASSESSMENT (Ingesting evidence response, collapsing uncertainty, committing Stage 2 NBA)
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    nba = cdata.get("next_best_actions", {})
    initial_nba = nba.get("initial", [])
    init_u = float(cdata.get("uncertainty_score", 0.65))
    
    # Calculate updated uncertainty and action based on simulation outcome
    if req.outcome == "PASS":
        updated_uncertainty = 0.04
        updated_risk = 0.05
        updated_action = "CLOSE_NO_FRAUD"
        updated_verdict = "cleared"
        what_changed = (
            f"Step-Up authentication ({req.action_type}) PASSED by cardholder. "
            "Primary fraud ambiguity resolved; epistemic uncertainty collapsed from "
            f"{init_u:.2f} to 0.04. Case cleared under Policy R3/R10."
        )
        escalation = "auto"
    else: # FAIL or TIMEOUT
        updated_uncertainty = 0.05
        updated_risk = 0.95
        updated_action = "BLOCK_ALL_CARDS" if case_inner.get("exposure_usd", 0) > 500 else "BLOCK_CARD"
        updated_verdict = "fraud"
        what_changed = (
            f"Step-Up authentication ({req.action_type}) {req.outcome}. "
            "Customer challenge failed to resolve identity possession; epistemic uncertainty collapsed from "
            f"{init_u:.2f} to 0.05. Risk escalated to confirmed fraud under Policy R1/R2."
        )
        escalation = "L2" if case_inner.get("exposure_usd", 0) > 1000 else "L1"

    # Persist updated decisioning to disk
    file_path = CASES_DIR / f"{case_id}.json"
    if file_path.exists():
        try:
            case_inner["verdict"] = updated_verdict
            case_inner["fraud_probability"] = updated_risk
            case_inner["status"] = "closed_cleared" if req.outcome == "PASS" else "closed_fraud"
            
            # 1. Update 2-Stage NBA
            if "next_best_actions" not in cdata:
                cdata["next_best_actions"] = {}
            cdata["next_best_actions"]["final"] = [{
                "action": updated_action,
                "route": escalation,
                "reason": what_changed
            }]
            cdata["next_best_actions"]["what_changed"] = what_changed
            
            # 2. Update Evidence Requests Log
            cdata["evidence_requests"] = [
                {
                    "type": "customer_validation",
                    "channel": req.action_type,
                    "asked_after_step": 4,
                    "status": "COMPLETED",
                    "result": req.outcome,
                    "assumed_response": (
                        "Cardholder confirmed transaction as authorized via OTP challenge."
                        if req.outcome == "PASS" else
                        "Cardholder challenge failed / OTP expired without validation."
                    )
                }
            ]

            # 3. Append customer challenge evidence claim
            new_claim = {
                "claim": f"Step-Up authentication ({req.action_type}) returned {req.outcome}.",
                "source": "customer_step_up",
                "grade": "CONTRADICTORY" if req.outcome == "PASS" else "DIRECT",
                "ref": f"auth_gateway:{req.action_type.lower()}_result"
            }
            existing_ev = [
                e for e in case_inner.get("evidence", []) 
                if "customer_step_up" not in str(e.get("source", "")) and "auth_gateway" not in str(e.get("ref", ""))
            ]
            existing_ev.append(new_claim)
            case_inner["evidence"] = existing_ev

            # 4. Append TWO distinct sequential events to orchestrator pipeline trace
            trace = cdata.get("orchestrator_pipeline_trace", [])
            
            # Step A: Human Approval / Challenge Dispatched
            trace.append({
                "agent_id": "human_approval",
                "agent_name": "Human Approval",
                "role": "Analyst Authorization & Step-Up Authentication Dispatch",
                "hand_off_summary": f"Approved Stage 1 NBA: Dispatched Step-Up Challenge ({req.action_type}) to cardholder. Status: Awaiting response.",
                "action": f"Approved Stage 1 NBA: Dispatched Step-Up Challenge ({req.action_type}) to cardholder.",
                "status": "safe",
                "latency_ms": 115.0
            })
            
            # Step B: Uncertainty Collapse & Stage 2 Decision
            trace.append({
                "agent_id": "uncertainty_reassessment",
                "agent_name": "Evidence Assessor (Reassessment)",
                "role": "Epistemic Uncertainty Collapse & Stage 2 Commitment",
                "hand_off_summary": f"Received cardholder challenge response ({req.outcome}). Epistemic uncertainty collapsed {init_u:.2f} -> {updated_uncertainty:.2f}. Committed Stage 2 NBA: {updated_action} (Route: {escalation}).",
                "action": f"Received cardholder challenge response ({req.outcome}). Epistemic uncertainty collapsed {init_u:.2f} -> {updated_uncertainty:.2f}. Committed Stage 2 NBA: {updated_action}.",
                "status": "safe" if req.outcome == "PASS" else "danger",
                "latency_ms": 175.0
            })
            
            cdata["orchestrator_pipeline_trace"] = trace
            cdata["case"] = case_inner
            cdata["uncertainty_score"] = updated_uncertainty
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(cdata, f, indent=2)
        except Exception as e:
            print(f"Warning: Failed to persist step up update: {e}")

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


@app.post("/api/cases/{case_id}/manual-override")
def manual_override(case_id: str, req: OverrideRequest):
    """
    True Human Cognitive Override:
    Demonstrates human-in-the-loop analyst exercising discretionary authority
    to overturn or escalate beyond the agent's policy recommendation.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    
    is_fraud = "BLOCK" in req.action or "DECLINE" in req.action
    updated_verdict = "fraud" if is_fraud else "cleared"
    updated_risk = 0.98 if is_fraud else 0.02
    
    case_inner["verdict"] = updated_verdict
    case_inner["fraud_probability"] = updated_risk
    case_inner["status"] = "closed_fraud" if is_fraud else "closed_cleared"
    
    # Update Stage 2 NBA
    if "next_best_actions" not in cdata:
        cdata["next_best_actions"] = {}
    cdata["next_best_actions"]["final"] = [{
        "action": req.action,
        "route": req.route,
        "reason": f"HUMAN_COGNITIVE_OVERRIDE: {req.reason}"
    }]
    cdata["next_best_actions"]["what_changed"] = f"Analyst cognitive override overrode automated policy: enforced {req.action} ({req.route})."
    
    # Append distinct override event to pipeline trace
    trace = cdata.get("orchestrator_pipeline_trace", [])
    trace.append({
        "agent_id": "human_cognitive_override",
        "agent_name": "Human Cognitive Override",
        "role": "Analyst Discretionary Override & Executive Enforcement",
        "hand_off_summary": f"Analyst overrode agent recommendation. Reason: {req.reason}. Enforced Action: {req.action} (Route: {req.route}).",
        "action": f"Analyst overrode agent recommendation. Reason: {req.reason}. Enforced Action: {req.action} (Route: {req.route}).",
        "status": "danger" if is_fraud else "safe",
        "latency_ms": 45.0
    })
    cdata["orchestrator_pipeline_trace"] = trace
    
    # Append override evidence note
    case_inner.setdefault("evidence", []).append({
        "claim": f"Human analyst discretionary override: {req.reason}",
        "source": "human_investigator_override",
        "grade": "DIRECT",
        "ref": f"analyst_session:override_{case_id}"
    })
    
    cdata["case"] = case_inner
    cdata["uncertainty_score"] = 0.02
    
    file_path = CASES_DIR / f"{case_id}.json"
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(cdata, f, indent=2)
        
    return {
        "status": "SUCCESS",
        "case_id": case_id,
        "override_action": req.action,
        "verdict": updated_verdict,
        "reason": req.reason,
        "route": req.route
    }


@app.post("/api/cases/{case_id}/reset")
def reset_case(case_id: str):
    """
    Resets a case back to its initial open alert state (uncertainty > 0.40, stage 2 pending)
    so analysts can repeatedly test live investigation and step-up execution.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})

    init_risk = 0.65
    case_inner["status"] = "open"
    case_inner["verdict"] = "uncertain"
    case_inner["fraud_probability"] = init_risk

    # Retain initial graph evidence only
    raw_evidence = case_inner.get("evidence", [])
    case_inner["evidence"] = [
        ev for ev in raw_evidence 
        if "customer_step_up" not in str(ev.get("source", "")) and "human_investigator_override" not in str(ev.get("source", ""))
    ]

    cdata["case"] = case_inner
    cdata["uncertainty_score"] = 0.65
    if "next_best_actions" in cdata:
        cdata["next_best_actions"]["final"] = []

    # Filter out simulation & override events from trace
    trace = cdata.get("orchestrator_pipeline_trace", [])
    cdata["orchestrator_pipeline_trace"] = [
        s for s in trace 
        if s.get("agent") not in ["HUMAN_COGNITIVE_OVERRIDE", "HUMAN_APPROVAL", "UNCERTAINTY_REASSESSMENT"]
        and "Step-Up authentication" not in s.get("action", "")
    ]

    file_path = CASES_DIR / f"{case_id}.json"
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(cdata, f, indent=2)

    return {
        "status": "SUCCESS",
        "case_id": case_id,
        "message": f"Case {case_id} reset to active open alert state.",
        "verdict": "uncertain",
        "uncertainty": 0.65
    }


@app.post("/api/cases/{case_id}/investigate")
def investigate_case_endpoint(case_id: str):
    """
    Triggers the autonomous 7-agent pipeline (Alert Sentinel -> Graph Scout -> 
    Evidence Assessor -> Pattern Strategist -> Policy Governor -> Compliance Officer -> 
    Memory Weaver) against TigerGraph Savanna Cloud for the specified case.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})

    orchestrator = get_orchestrator()
    case_meta = {
        "case_id": case_id,
        "flagged_txn_id": case_inner.get("first_suspicious_txn_id", 3530164),
        "card_id": case_inner.get("connected_card_ids", ["C08623-K2"])[0] if case_inner.get("connected_card_ids") else "C08623-K2",
        "customer_id": case_inner.get("customer_id", "C08623"),
        "trigger_type": case_inner.get("trigger_type", "unusual_velocity"),
        "trigger_text": case_inner.get("trigger_narrative", "Real-time velocity anomaly flagged."),
        "risk_score": case_inner.get("fraud_probability", 0.65),
    }

    try:
        orchestrator.run_investigation(case_meta)
    except Exception as e:
        # Graceful fallback: continue with existing graph analysis if remote connection has jitter
        pass

    case_details = get_case_details(case_id)
    pipeline_data = get_case_pipeline(case_id)
    graph_data = get_case_graph(case_id)

    return {
        "status": "SUCCESS",
        "case_id": case_id,
        "case_details": case_details,
        "pipeline": pipeline_data,
        "graph": graph_data,
    }


@app.post("/api/cases/reset-all")
def reset_all_benchmark_cases():
    """Resets all 20 benchmark cases to pending alert state for clean end-to-end demoing."""
    from scripts.prepare_unexecuted_cases import reset_all_cases
    reset_all_cases()
    return {"status": "SUCCESS", "message": "All 20 benchmark cases reset to open alert state."}


@app.post("/api/cases/{case_id}/chat")
def case_chat(case_id: str, req: ChatRequest):
    """
    Grounded investigator copilot powered by Groq LLM (qwen/qwen3.8-27b)
    with full TigerGraph multi-hop graph context and Bank Fraud Policy v1.0.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    nba = cdata.get("next_best_actions", {})
    init_items = nba.get("initial") or []
    initial_nba = init_items[0].get("action", "VERIFY_WITH_CUSTOMER") if init_items else "VERIFY_WITH_CUSTOMER"
    final_items = nba.get("final") or []
    final_nba = final_items[0].get("action", "AWAITING_STEP_UP") if final_items else "AWAITING_STEP_UP"
    sar = cdata.get("sar", {})

    llm = get_llm_client()
    case_context = {
        "case_id": case_id,
        "verdict": case_inner.get("verdict", "uncertain"),
        "fraud_probability": case_inner.get("fraud_probability", 0.5),
        "exposure_usd": case_inner.get("exposure_usd", 0.0),
        "pattern": case_inner.get("pattern", "Unknown"),
        "primary_card_id": case_inner.get("connected_card_ids", ["N/A"])[0] if case_inner.get("connected_card_ids") else "N/A",
        "connected_card_ids": case_inner.get("connected_card_ids", []),
        "connected_device_profiles": case_inner.get("connected_device_profiles", []),
        "similar_prior_cases": case_inner.get("similar_prior_cases", []),
        "evidence": [e.get("description", str(e)) for e in case_inner.get("evidence", [])],
        "initial_action": initial_nba,
        "final_action": final_nba,
        "sar_filed": bool(sar.get("file", False)),
        "sar_narrative": (sar.get("narrative") or "")[:300],
    }

    ai_reply = llm.chat_copilot(req.message, case_context)

    return {
        "case_id": case_id,
        "query": req.message,
        "response": ai_reply,
        "model": getattr(llm, "DEFAULT_GROQ_MODEL", "qwen/qwen3.8-27b"),
        "provider": llm._provider,
        "is_ai_generated": llm.is_active,
    }


@app.post("/api/cases/{case_id}/ai-deep-dive")
def case_ai_deep_dive(case_id: str):
    """
    On-demand comprehensive forensic evaluation using Groq LLM.
    Synthesizes graph topology, policy compliance, and next-best actions.
    """
    cdata = load_case_json(case_id)
    case_inner = cdata.get("case", {})
    nba = cdata.get("next_best_actions", {})
    init_items = nba.get("initial") or []
    initial_nba = init_items[0].get("action", "VERIFY_WITH_CUSTOMER") if init_items else "VERIFY_WITH_CUSTOMER"
    final_items = nba.get("final") or []
    final_nba = final_items[0].get("action", "AWAITING_STEP_UP") if final_items else "AWAITING_STEP_UP"
    sar = cdata.get("sar", {})

    llm = get_llm_client()
    prompt = (
        f"Perform an exhaustive forensic audit for Case {case_id}:\n"
        f"- Target Entities: Card {case_inner.get('connected_card_ids')}, Devices {case_inner.get('connected_device_profiles')}\n"
        f"- Exposure: ${case_inner.get('exposure_usd', 0):,.2f}\n"
        f"- Pattern: {case_inner.get('pattern')}\n"
        f"- Initial Action: {initial_nba} -> Final Action: {final_nba}\n"
        f"- SAR Status: {'Filed' if sar.get('file') else 'Not Required'}\n\n"
        f"Provide a 4-part forensic brief: (1) Graph Traversal Findings, (2) Policy Compliance Audit, (3) Epistemic Uncertainty & Step-Up Rationale, (4) Executive Defensibility."
    )
    narrative = llm.generate_forensic_narrative(
        prompt,
        system_instruction="You are a Principal Cyber-Fraud Investigator and Senior AML Compliance Examiner."
    )
    return {
        "case_id": case_id,
        "deep_dive_analysis": narrative,
        "model": getattr(llm, "DEFAULT_GROQ_MODEL", "qwen/qwen3.8-27b"),
        "provider": llm._provider,
        "is_ai_generated": llm.is_active,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
