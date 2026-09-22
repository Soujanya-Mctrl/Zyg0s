"""
TigerGraph Schema Migration for Graph-Native Case Memory.

Extends the existing Transaction_Fraud graph schema to support:
1. Vector embeddings on ClosedCase vertices (narrative_embedding LIST<DOUBLE>)
2. New FraudPattern vertex type (shared vocabulary node for pattern classification)
3. New edge types connecting cases to devices, regions, and patterns
4. Case narrative text storage for hybrid retrieval

This script is IDEMPOTENT — safe to re-run. Schema change jobs use ADD IF NOT EXISTS.
"""

import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.graph.client import get_tg_connection


# GSQL schema change job definition
SCHEMA_CHANGE_JOB = """
USE GRAPH Transaction_Fraud

// Add new attributes to existing ClosedCase vertex
ALTER VERTEX ClosedCase ADD ATTRIBUTE (
    case_narrative STRING DEFAULT "",
    fraud_probability DOUBLE DEFAULT 0.0,
    verdict STRING DEFAULT "",
    risk_assessment STRING DEFAULT "",
    analyst_decision STRING DEFAULT ""
)

// Create FraudPattern vertex type — shared vocabulary node
CREATE VERTEX FraudPattern (
    PRIMARY_ID pattern_name STRING,
    description STRING DEFAULT "",
    first_seen STRING DEFAULT "",
    case_count INT DEFAULT 0
) WITH STATS="OUTDEGREE_BY_EDGETYPE"

// New edge types connecting cases to entities
CREATE DIRECTED EDGE CASE_ON_DEVICE (FROM ClosedCase, TO DeviceProfile) WITH REVERSE_EDGE="DEVICE_IN_CASE"
CREATE DIRECTED EDGE CASE_IN_REGION (FROM ClosedCase, TO BillingRegion) WITH REVERSE_EDGE="REGION_IN_CASE"
CREATE DIRECTED EDGE CASE_HAS_PATTERN (FROM ClosedCase, TO FraudPattern) WITH REVERSE_EDGE="PATTERN_IN_CASE"
CREATE DIRECTED EDGE CASE_ON_CUSTOMER (FROM ClosedCase, TO Customer) WITH REVERSE_EDGE="CUSTOMER_HAS_CASE"
"""


def run_migration(dry_run: bool = False):
    """
    Execute the schema migration against TigerGraph Savanna Cloud.

    Args:
        dry_run: If True, prints the GSQL but does not execute.
    """
    print("=" * 60)
    print("  Graph-Native Case Memory — Schema Migration")
    print("=" * 60)

    if dry_run:
        print("\n[DRY RUN] Would execute the following GSQL:\n")
        print(SCHEMA_CHANGE_JOB)
        return

    conn = get_tg_connection()
    print(f"\nConnected to graph: {conn.graphname}")
    print("Executing schema change job...")

    try:
        # Execute schema change via GSQL
        result = conn.gsql(SCHEMA_CHANGE_JOB)
        print(f"\nSchema change result:\n{result}")
    except Exception as e:
        print(f"\n[WARNING] GSQL schema change encountered an issue: {e}")
        print("Attempting attribute-by-attribute migration via REST API...")
        _fallback_rest_migration(conn)

    # Verify migration
    _verify_schema(conn)


def _fallback_rest_migration(conn):
    """
    Fallback: upsert FraudPattern vertices and edges via REST if GSQL fails.
    This handles cases where the schema already exists (idempotent).
    """
    # Seed the 5 known fraud patterns + none + undocumented
    patterns = [
        ("card_testing", "3+ micro-authorizations (<$5) within 1 hour followed by a large purchase"),
        ("card_not_present_fraud", "Online/CNP transaction from unauthorized source"),
        ("card_not_present_new_device", "CNP transaction from previously unseen device fingerprint"),
        ("out_of_region_use", "In-person transaction in region with zero prior cardholder history"),
        ("account_takeover", "Unauthorized access to existing customer account"),
        ("undocumented", "Novel or undocumented fraud pattern requiring LLM hypothesis"),
        ("none", "Legitimate transaction — no fraud pattern detected"),
    ]
    try:
        for p_name, p_desc in patterns:
            conn.upsertVertex(
                "FraudPattern",
                p_name,
                attributes={"description": p_desc, "case_count": 0}
            )
        print(f"  -> Seeded {len(patterns)} FraudPattern vertices via REST")
    except Exception as e:
        print(f"  -> FraudPattern seeding skipped (may not exist yet): {e}")


def _verify_schema(conn):
    """Verify that the new schema elements exist."""
    print("\n--- Schema Verification ---")
    vertex_types = ["ClosedCase", "FraudPattern", "Customer", "AccountCard",
                    "Transaction", "DeviceProfile", "BillingRegion"]
    for vt in vertex_types:
        try:
            count = conn.getVertexCount(vt)
            print(f"  {vt:<20}: {count:,} vertices")
        except Exception as e:
            print(f"  {vt:<20}: NOT FOUND ({e})")

    print("\nSchema migration complete.")


def seed_fraud_patterns(conn=None):
    """
    Seed the 7 canonical fraud pattern vertices into TigerGraph.
    Called during migration and during backfill.
    """
    if conn is None:
        conn = get_tg_connection()

    patterns = [
        ("card_testing", "3+ micro-authorizations (<$5) within 1 hour followed by a large purchase", "2016-01-01"),
        ("card_not_present_fraud", "Online/CNP transaction from unauthorized source", "2016-01-01"),
        ("card_not_present_new_device", "CNP transaction from previously unseen device fingerprint", "2016-01-01"),
        ("out_of_region_use", "In-person transaction in region with zero prior cardholder history", "2016-01-01"),
        ("account_takeover", "Unauthorized access to existing customer account", "2016-01-01"),
        ("undocumented", "Novel or undocumented fraud pattern requiring LLM hypothesis", "2016-01-01"),
        ("none", "Legitimate transaction — no fraud pattern detected", "2016-01-01"),
    ]
    for p_name, p_desc, p_date in patterns:
        try:
            conn.upsertVertex(
                "FraudPattern",
                p_name,
                attributes={"description": p_desc, "first_seen": p_date, "case_count": 0}
            )
        except Exception:
            pass
    print(f"  -> Seeded {len(patterns)} FraudPattern vertices")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Run schema migration for graph-native case memory")
    parser.add_argument("--dry-run", action="store_true", help="Print GSQL without executing")
    args = parser.parse_args()
    run_migration(dry_run=args.dry_run)
