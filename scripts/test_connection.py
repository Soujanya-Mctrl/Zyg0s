"""
Script to test and verify TigerGraph Savanna Cloud connectivity.
"""

import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.graph.client import check_health, get_tg_connection

if __name__ == "__main__":
    print("Verifying connection to TigerGraph Savanna Cloud...")
    conn = get_tg_connection()
    health = check_health()
    print("\n[SUCCESS] Connected to TigerGraph Savanna Cloud!")
    print(f"Graph: {health['graph_name']}")
    print(f"Transactions in Graph: {health['total_transactions']:,}")
    print(f"Parties/Cardholders: {health['total_parties']:,}")
    print(f"Cards: {health['total_cards']:,}")
    print(f"Devices: {health['total_devices']:,}")
    print(f"Installed GSQL Queries: {health['installed_query_count']}")
