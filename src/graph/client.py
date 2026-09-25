"""
TigerGraph Savanna Cloud Connection Client.

Provides authenticated connection management, query execution, and schema utilities.
Handles token lifecycle and auth header caching for pyTigerGraph 2.0+.
"""

import os
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv
import pyTigerGraph as tg

# Ensure environment variables are loaded
load_dotenv()

_conn_instance: Optional[tg.TigerGraphConnection] = None


def get_tg_connection(force_new: bool = False) -> tg.TigerGraphConnection:
    """
    Get or initialize an authenticated TigerGraphConnection to Savanna Cloud.
    
    Args:
        force_new: If True, forces re-authentication and creation of a new connection.
        
    Returns:
        Authenticated pyTigerGraph.TigerGraphConnection instance.
    """
    global _conn_instance
    if _conn_instance is not None and not force_new:
        return _conn_instance

    host = os.getenv("TG_HOST")
    graphname = os.getenv("TG_GRAPHNAME", "Transaction_Fraud")
    username = os.getenv("TG_USERNAME", "claudemcp")
    password = os.getenv("TG_PASSWORD")
    secret = os.getenv("TG_SECRET")
    restpp_port = os.getenv("TG_PORT", "14240")

    if not host or not password:
        raise ValueError("Missing required TigerGraph environment variables in .env (TG_HOST, TG_PASSWORD)")

    conn = tg.TigerGraphConnection(
        host=f"https://{host}",
        graphname=graphname,
        username=username,
        password=password,
        tgCloud=True,
        restppPort="443",
        gsPort=restpp_port,
    )

    # Acquire authentication token if REST++ token auth is configured
    try:
        if secret:
            token_res = conn.getToken(secret)
        else:
            token_res = conn.getToken(conn.createSecret("agent_fraud_secret"))
        token_str = token_res[0] if isinstance(token_res, tuple) else str(token_res)
        conn.apiToken = token_str
        conn._refresh_auth_headers()
    except Exception:
        # Savanna Cloud instances using direct basic auth over HTTPS
        pass

    _conn_instance = conn
    return _conn_instance


def check_health() -> Dict[str, Any]:
    """
    Verify health and connectivity to TigerGraph Savanna Cloud.
    
    Returns:
        Dictionary containing health status, vertex counts, and installed query counts.
    """
    conn = get_tg_connection()
    echo_msg = conn.echo()
    vertex_counts = conn.getVertexCount("*")
    installed_queries = list(conn.getInstalledQueries().keys())
    
    return {
        "status": "healthy",
        "echo": echo_msg,
        "graph_name": conn.graphname,
        "total_transactions": vertex_counts.get("Payment_Transaction", 0),
        "total_parties": vertex_counts.get("Party", 0),
        "total_cards": vertex_counts.get("Card", 0),
        "total_devices": vertex_counts.get("Device", 0),
        "installed_query_count": len(installed_queries),
    }


if __name__ == "__main__":
    health = check_health()
    print("TigerGraph Health Check:")
    for k, v in health.items():
        print(f"  {k}: {v}")
