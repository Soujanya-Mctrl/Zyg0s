"""
TigerGraph MCP (Model Context Protocol) Service Bridge.

Provides a unified programmatic interface to the official tigergraph-mcp package,
exposing graph schema inspection, node/edge lookups, multi-hop neighbor traversals,
and GSQL query executions as standardized MCP tools for autonomous agents.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv

logger = logging.getLogger("zyg0s.mcp_service")


import concurrent.futures
import threading

_bg_loop: Optional[asyncio.AbstractEventLoop] = None
_bg_thread: Optional[threading.Thread] = None
_bg_lock = threading.Lock()


def _get_persistent_loop() -> asyncio.AbstractEventLoop:
    """
    Get or create a dedicated background event loop running in a daemon thread.
    This guarantees that AsyncTigerGraphConnection's cached aiohttp sessions
    are always executed in the same persistent event loop, eliminating
    'Event loop is closed' errors across synchronous and asynchronous callers.
    """
    global _bg_loop, _bg_thread
    with _bg_lock:
        if _bg_loop is None or not _bg_loop.is_running():
            _bg_loop = asyncio.new_event_loop()
            _bg_thread = threading.Thread(target=_bg_loop.run_forever, daemon=True, name="TigerGraphMCP-EventLoop")
            _bg_thread.start()
        return _bg_loop


class TigerGraphMCPService:
    """
    Programmatic service bridge to TigerGraph MCP.
    Integrates with TigerGraph Savanna Cloud, managing environment configuration,
    token synchronization, tool discovery, and execution.
    """

    _initialized = False
    _token = None

    @classmethod
    def ensure_env(cls) -> None:
        """
        Normalize and synchronize TigerGraph environment variables
        so that tigergraph-mcp connects cleanly to Savanna Cloud.
        """
        load_dotenv()
        
        raw_host = os.getenv("TG_HOST", "")
        # Strip any existing scheme to ensure clean consistency
        clean_host = raw_host.replace("http://", "").replace("https://", "").strip("/")
        if clean_host:
            os.environ["TG_HOST"] = clean_host

        # Acquire token synchronously if not already present
        if not os.getenv("TG_API_TOKEN") and not cls._token:
            try:
                from src.graph.client import get_tg_connection
                sync_conn = get_tg_connection()
                cls._token = sync_conn.apiToken
                if cls._token:
                    os.environ["TG_API_TOKEN"] = cls._token
            except Exception as e:
                logger.warning(f"Could not auto-acquire TigerGraph token for MCP: {e}")

        # tigergraph-mcp AsyncTigerGraphConnection requires https:// prefix for Cloud
        if clean_host:
            os.environ["TG_HOST"] = f"https://{clean_host}"

        os.environ.setdefault("TG_TGCLOUD", "true")
        os.environ.setdefault("TG_RESTPP_PORT", "443")
        os.environ.setdefault("TG_GS_PORT", os.getenv("TG_PORT", "14240"))
        os.environ.setdefault("TG_GRAPHNAME", "Transaction_Fraud")

        cls._initialized = True

    @classmethod
    def _parse_mcp_output(cls, result: Any) -> Dict[str, Any]:
        """
        Extract JSON payload from tigergraph_mcp TextContent output.
        """
        if isinstance(result, list) and len(result) > 0:
            item = result[0]
            text = getattr(item, "text", str(item))
            # Try to extract JSON from markdown fences if present
            match = re.search(r"```json\s*([\s\S]*?)\s*```", text)
            if match:
                try:
                    return json.loads(match.group(1))
                except Exception:
                    pass
            try:
                return json.loads(text)
            except Exception:
                return {"text": text}
        elif isinstance(result, dict):
            return result
        return {"raw": str(result)}

    # -------------------------------------------------------------------------
    # Asynchronous MCP Tool Methods
    # -------------------------------------------------------------------------

    @classmethod
    async def get_vertex_count(
        cls,
        vertex_type: Optional[str] = None,
        graph_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Retrieve vertex counts by type or total across Transaction_Fraud."""
        cls.ensure_env()
        from tigergraph_mcp import server
        kwargs: Dict[str, Any] = {}
        if vertex_type:
            kwargs["vertex_type"] = vertex_type
        kwargs["graph_name"] = graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        raw = await server.get_vertex_count(**kwargs)
        return cls._parse_mcp_output(raw)

    @classmethod
    async def get_node(
        cls,
        vertex_type: str,
        vertex_id: str,
        graph_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Fetch a specific vertex and its attributes via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        raw = await server.get_node(
            vertex_type=vertex_type,
            vertex_id=str(vertex_id),
            graph_name=graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        )
        return cls._parse_mcp_output(raw)

    @classmethod
    async def get_nodes(
        cls,
        vertex_type: str,
        vertex_ids: List[str],
        graph_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Batch fetch vertices of a specific type via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        raw = await server.get_nodes(
            vertex_type=vertex_type,
            vertex_ids=[str(v) for v in vertex_ids],
            graph_name=graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        )
        return cls._parse_mcp_output(raw)

    @classmethod
    async def get_neighbors(
        cls,
        vertex_type: str,
        vertex_id: str,
        edge_type: Optional[str] = None,
        target_vertex_type: Optional[str] = None,
        limit: Optional[int] = None,
        graph_name: Optional[str] = None,
        **kwargs: Any,
    ) -> Dict[str, Any]:
        """Retrieve 1-hop connected neighbors from seed vertex via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        
        # Handle plural argument aliases gracefully
        if not edge_type and "edge_types" in kwargs:
            val = kwargs["edge_types"]
            edge_type = val[0] if isinstance(val, (list, tuple)) and len(val) > 0 else (val if isinstance(val, str) else None)
            
        if not target_vertex_type and "target_vertex_types" in kwargs:
            val = kwargs["target_vertex_types"]
            target_vertex_type = val[0] if isinstance(val, (list, tuple)) and len(val) > 0 else (val if isinstance(val, str) else None)

        call_kwargs: Dict[str, Any] = {
            "vertex_type": vertex_type,
            "vertex_id": str(vertex_id),
            "graph_name": graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud"),
        }
        if edge_type:
            call_kwargs["edge_type"] = edge_type
        if target_vertex_type:
            call_kwargs["target_vertex_type"] = target_vertex_type
        if limit:
            call_kwargs["limit"] = limit

        raw = await server.get_neighbors(**call_kwargs)
        return cls._parse_mcp_output(raw)

    @classmethod
    async def get_node_edges(
        cls,
        vertex_type: str,
        vertex_id: str,
        edge_type: Optional[str] = None,
        limit: Optional[int] = 100,
        graph_name: Optional[str] = None,
        **kwargs: Any,
    ) -> Dict[str, Any]:
        """Retrieve incident edges for a vertex via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        
        if not edge_type and "edge_types" in kwargs:
            val = kwargs["edge_types"]
            edge_type = val[0] if isinstance(val, (list, tuple)) and len(val) > 0 else (val if isinstance(val, str) else None)

        call_kwargs: Dict[str, Any] = {
            "vertex_type": vertex_type,
            "vertex_id": str(vertex_id),
            "limit": limit,
            "graph_name": graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud"),
        }
        if edge_type:
            call_kwargs["edge_type"] = edge_type

        raw = await server.get_node_edges(**call_kwargs)
        return cls._parse_mcp_output(raw)

    @classmethod
    async def run_installed_query(
        cls,
        query_name: str,
        params: Optional[Dict[str, Any]] = None,
        graph_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Execute a pre-installed GSQL query via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        raw = await server.run_installed_query(
            query_name=query_name,
            params=params or {},
            graph_name=graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        )
        return cls._parse_mcp_output(raw)

    @classmethod
    async def get_graph_schema(cls, graph_name: Optional[str] = None) -> Dict[str, Any]:
        """Introspect active graph schema via TigerGraph MCP."""
        cls.ensure_env()
        from tigergraph_mcp import server
        raw = await server.get_graph_schema(
            graph_name=graph_name or os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        )
        return cls._parse_mcp_output(raw)

    @classmethod
    async def execute_tool(cls, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generic tool execution dispatcher for any discovered TigerGraph MCP tool.
        Supports both 'tigergraph__<name>' and bare '<name>'.
        """
        cls.ensure_env()
        from tigergraph_mcp import server
        import inspect

        canonical_name = tool_name if tool_name.startswith("tigergraph__") else f"tigergraph__{tool_name}"
        clean_fn = canonical_name.replace("tigergraph__", "")

        func = getattr(server, clean_fn, None)
        if not func or not callable(func):
            return {
                "success": False,
                "error": f"Tool '{tool_name}' not supported by TigerGraph MCP server.",
                "available_tools_sample": ["get_vertex_count", "get_node", "get_neighbors", "run_installed_query", "get_graph_schema"]
            }

        # Adapt arguments: convert edge_types -> edge_type if function accepts edge_type
        args_copy = dict(arguments or {})
        sig = inspect.signature(func)
        param_names = set(sig.parameters.keys())

        if "edge_types" in args_copy and "edge_type" in param_names and "edge_types" not in param_names:
            val = args_copy.pop("edge_types")
            args_copy["edge_type"] = val[0] if isinstance(val, (list, tuple)) and len(val) > 0 else str(val)

        if "target_vertex_types" in args_copy and "target_vertex_type" in param_names and "target_vertex_types" not in param_names:
            val = args_copy.pop("target_vertex_types")
            args_copy["target_vertex_type"] = val[0] if isinstance(val, (list, tuple)) and len(val) > 0 else str(val)

        # Filter out unknown keyword args if function doesn't take **kwargs
        has_var_keyword = any(p.kind == inspect.Parameter.VAR_KEYWORD for p in sig.parameters.values())
        if not has_var_keyword:
            args_copy = {k: v for k, v in args_copy.items() if k in param_names}

        # Ensure graph_name default
        if "graph_name" in param_names and "graph_name" not in args_copy:
            args_copy["graph_name"] = os.getenv("TG_GRAPHNAME", "Transaction_Fraud")

        try:
            raw = await func(**args_copy)
            return cls._parse_mcp_output(raw)
        except Exception as e:
            logger.error(f"Execution error on MCP tool {tool_name}: {e}")
            return {
                "success": False,
                "tool_name": tool_name,
                "error": str(e),
                "arguments": arguments
            }

    @classmethod
    def list_tools(cls) -> List[Dict[str, Any]]:
        """
        Return the list of all available TigerGraph MCP tools with schemas.
        """
        cls.ensure_env()
        from tigergraph_mcp import server
        tools = server.get_all_tools()
        result = []
        for t in tools:
            result.append({
                "name": t.name,
                "description": t.description,
                "inputSchema": t.inputSchema if hasattr(t, "inputSchema") else {},
                "category": t.name.split("__")[1].split("_")[0] if "__" in t.name else "general"
            })
        return result

    @classmethod
    def get_status(cls) -> Dict[str, Any]:
        """
        Returns health and connectivity status of the TigerGraph MCP integration.
        """
        cls.ensure_env()
        host = os.getenv("TG_HOST", "")
        graph = os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
        has_token = bool(os.getenv("TG_API_TOKEN"))

        return {
            "mcp_server": "tigergraph-mcp",
            "version": "1.0.0",
            "status": "CONNECTED" if has_token else "CONFIGURED",
            "host": host,
            "graph_name": graph,
            "auth_token_bound": has_token,
            "cloud_mode": os.getenv("TG_TGCLOUD") == "true",
            "total_tools_exposed": len(cls.list_tools()),
        }

    # -------------------------------------------------------------------------
    # Synchronous Execution Helpers (for pipeline agents & sync workflows)
    # -------------------------------------------------------------------------

    @classmethod
    def _run_sync(cls, coro, timeout: float = 20.0) -> Any:
        """
        Safely execute an async coroutine from synchronous context
        using a persistent background event loop.
        """
        try:
            loop = _get_persistent_loop()
            future = asyncio.run_coroutine_threadsafe(coro, loop)
            return future.result(timeout=timeout)
        except concurrent.futures.TimeoutError:
            logger.error("Timed out waiting for TigerGraph MCP coroutine execution.")
            return {"success": False, "error": "TigerGraph MCP execution timed out"}
        except Exception as e:
            logger.error(f"Error running sync MCP call: {e}")
            return {"success": False, "error": str(e)}

    @classmethod
    def sync_get_vertex_count(
        cls,
        vertex_type: Optional[str] = None,
        graph_name: Optional[str] = None
    ) -> Dict[str, Any]:
        return cls._run_sync(cls.get_vertex_count(vertex_type, graph_name))

    @classmethod
    def sync_get_node(
        cls,
        vertex_type: str,
        vertex_id: str,
        graph_name: Optional[str] = None
    ) -> Dict[str, Any]:
        return cls._run_sync(cls.get_node(vertex_type, vertex_id, graph_name))

    @classmethod
    def sync_get_neighbors(
        cls,
        vertex_type: str,
        vertex_id: str,
        edge_type: Optional[str] = None,
        target_vertex_type: Optional[str] = None,
        limit: Optional[int] = None,
        graph_name: Optional[str] = None,
        **kwargs: Any
    ) -> Dict[str, Any]:
        return cls._run_sync(cls.get_neighbors(
            vertex_type=vertex_type,
            vertex_id=vertex_id,
            edge_type=edge_type,
            target_vertex_type=target_vertex_type,
            limit=limit,
            graph_name=graph_name,
            **kwargs
        ))

    @classmethod
    def sync_execute_tool(cls, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        return cls._run_sync(cls.execute_tool(tool_name, arguments))

