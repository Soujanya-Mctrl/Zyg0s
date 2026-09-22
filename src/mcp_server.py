"""
Standalone TigerGraph MCP Server Runner.

Executes the official tigergraph-mcp stdio server with pre-configured
connection parameters to TigerGraph Savanna Cloud.
Allows external MCP clients (Claude Desktop, Cursor, Antigravity) to
interact with the Transaction_Fraud graph via standard MCP protocol.

Usage:
    python src/mcp_server.py
"""

import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.graph.mcp_service import TigerGraphMCPService


async def main():
    # Ensure environment variables and auth tokens are synchronized
    TigerGraphMCPService.ensure_env()
    
    from tigergraph_mcp import serve
    await serve()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        sys.exit(0)
