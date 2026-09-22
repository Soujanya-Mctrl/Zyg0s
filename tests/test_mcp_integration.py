"""
Automated Test Suite for TigerGraph MCP (Model Context Protocol) Integration.
Validates:
1. TigerGraphMCPService environment initialization and tool discovery.
2. Vertex counting and node inspection tools against TigerGraph Savanna Cloud.
3. GraphScoutAgent MCP tool execution and telemetry recording.
4. FastAPI REST endpoints (/api/mcp/status, /api/mcp/tools, /api/mcp/execute).
"""

import pytest
from fastapi.testclient import TestClient

from src.graph.mcp_service import TigerGraphMCPService
from src.agent.pipeline.base import InvestigationContext
from src.agent.pipeline.graph_scout import GraphScoutAgent
from src.api.server import app


class TestTigerGraphMCP:
    """Test suite for TigerGraph MCP service bridge and multi-agent integration."""

    def test_mcp_service_initialization_and_status(self):
        """Verify environment normalization and MCP status reporting."""
        status = TigerGraphMCPService.get_status()
        assert status["mcp_server"] == "tigergraph-mcp"
        assert status["graph_name"] == "Transaction_Fraud"
        assert status["cloud_mode"] is True
        assert status["total_tools_exposed"] >= 60

    def test_mcp_list_tools(self):
        """Verify discovery of registered TigerGraph MCP tools."""
        tools = TigerGraphMCPService.list_tools()
        assert len(tools) >= 60
        tool_names = [t["name"] for t in tools]
        assert "tigergraph__get_node" in tool_names
        assert "tigergraph__get_vertex_count" in tool_names
        assert "tigergraph__get_neighbors" in tool_names
        assert "tigergraph__run_installed_query" in tool_names
        assert "tigergraph__get_graph_schema" in tool_names

    def test_mcp_get_vertex_count(self):
        """Verify live vertex count query via TigerGraph MCP."""
        res = TigerGraphMCPService.sync_get_vertex_count("Customer")
        assert res.get("success") is True
        data = res.get("data", {})
        assert data.get("vertex_type") == "Customer"
        assert data.get("count", 0) > 0

    def test_mcp_get_node(self):
        """Verify node lookup via TigerGraph MCP."""
        res = TigerGraphMCPService.sync_get_node("Customer", "C13256")
        assert res.get("success") is True
        data = res.get("data", {})
        assert data.get("v_id") == "C13256"
        assert data.get("v_type") == "Customer"

    def test_mcp_generic_tool_execution(self):
        """Verify generic dispatcher executes tools with arguments."""
        res = TigerGraphMCPService.sync_execute_tool(
            "tigergraph__get_vertex_count",
            {"vertex_type": "Transaction"}
        )
        assert res.get("success") is True
        assert res.get("data", {}).get("count", 0) > 100000

    def test_graph_scout_mcp_integration(self):
        """Verify that GraphScoutAgent invokes MCP tools and populates telemetry."""
        import pandas as pd
        from datetime import datetime

        # Create dummy context with target customer C13256
        dummy_df = pd.DataFrame([{
            "customer_id": "C13256",
            "TransactionAmt": 150.0,
            "ts_dt": datetime(2026, 11, 15, 12, 0, 0),
            "DeviceInfo": "SM-G960F",
            "ProductCD": "W",
            "card_id": "C13256-K1"
        }])

        context = InvestigationContext(
            case_meta={
                "case_id": "HHG-TEST-MCP",
                "customer_id": "C13256",
                "card_id": "C13256-K1",
                "flagged_txn_id": 3514030,
                "risk_score": 0.72
            },
            merged_df=dummy_df
        )
        context.flagged_ts = datetime(2026, 11, 15, 12, 0, 0)
        context.flagged_amt = 150.0

        agent = GraphScoutAgent()
        math_res = agent.compute(context)

        # Assert MCP tool calls were logged
        assert "mcp_tool_calls" in math_res
        assert len(math_res["mcp_tool_calls"]) > 0
        assert len(context.mcp_tool_calls) > 0
        tools_called = [c["tool"] for c in math_res["mcp_tool_calls"]]
        assert "tigergraph__get_node" in tools_called
        assert "tigergraph__get_neighbors" in tools_called

    def test_mcp_api_endpoints(self):
        """Verify FastAPI endpoints for MCP status, tool discovery, and execution."""
        client = TestClient(app)

        # 1. Health check includes MCP service
        res_health = client.get("/api/health")
        assert res_health.status_code == 200
        assert "mcp_service" in res_health.json()

        # 2. GET /api/mcp/status
        res_status = client.get("/api/mcp/status")
        assert res_status.status_code == 200
        assert res_status.json()["graph_name"] == "Transaction_Fraud"

        # 3. GET /api/mcp/tools
        res_tools = client.get("/api/mcp/tools")
        assert res_tools.status_code == 200
        assert res_tools.json()["count"] >= 60

        # 4. POST /api/mcp/execute
        res_exec = client.post("/api/mcp/execute", json={
            "tool_name": "tigergraph__get_vertex_count",
            "arguments": {"vertex_type": "AccountCard"}
        })
        assert res_exec.status_code == 200
        data = res_exec.json()
        assert data["tool_name"] == "tigergraph__get_vertex_count"
        assert data["latency_ms"] > 0
        assert data["result"]["success"] is True
