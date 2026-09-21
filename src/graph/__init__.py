"""
TigerGraph connection and query interface package.
"""

from src.graph.client import get_tg_connection, check_health

__all__ = ["get_tg_connection", "check_health"]
