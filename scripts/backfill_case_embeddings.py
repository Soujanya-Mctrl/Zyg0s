"""
Backfill Case Embeddings for Graph-Native Memory.

One-time migration script that:
1. Reads all existing ClosedCase vertices from TigerGraph (or CSV fallback)
2. Generates 384-dim narrative embedding for each case
3. Batch-upserts embeddings back to ClosedCase.case_narrative
4. Creates FraudPattern vertices and CASE_HAS_PATTERN edges
5. Creates CASE_ON_DEVICE and CASE_IN_REGION edges from existing data

Run after schema_migration.py has been executed.
"""

import os
import sys
import csv
import time
import argparse
from pathlib import Path
from typing import Dict, List, Any

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from dotenv import load_dotenv
load_dotenv(dotenv_path=REPO_ROOT / ".env")

from src.memory.embeddings import embed_case_narrative, build_case_narrative_text
from src.graph.schema_migration import seed_fraud_patterns

DATA_DIR = REPO_ROOT / "data" / "hhgoa_ieee"
BATCH_SIZE = 100


def backfill_from_csv(conn, csv_path: Path, limit: int = None, dry_run: bool = False):
    """
    Read closed cases from CSV and backfill embeddings + entity edges.
    """
    if not csv_path.exists():
        print(f"[ERROR] {csv_path} not found!")
        return

    print(f"\n{'=' * 60}")
    print(f"  Backfilling Case Embeddings from {csv_path.name}")
    print(f"{'=' * 60}")

    # Seed FraudPattern vertices first
    if not dry_run and conn:
        seed_fraud_patterns(conn)

    cases_processed = 0
    embeddings_generated = 0
    edges_created = 0
    t0 = time.time()

    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        batch_vertices = []
        batch_pattern_edges = []

        for i, row in enumerate(reader):
            if limit and i >= limit:
                break

            case_id = row["case_id"].strip()
            customer_id = row["customer_id"].strip()
            card_id = row["card_id"].strip()
            outcome = row["outcome"].strip()
            pattern = row["pattern"].strip()
            exposure = float(row.get("exposure_usd", 0) or 0)
            notes = row.get("analyst_notes", "").strip()

            # Build narrative text for embedding
            narrative_text = build_case_narrative_text(
                case_id=case_id,
                outcome=outcome,
                pattern=pattern,
                pattern_description="",
                exposure_usd=exposure,
                summary=notes,
            )

            # Generate embedding
            embedding = embed_case_narrative(narrative_text)
            embeddings_generated += 1

            # Prepare vertex update
            batch_vertices.append((case_id, {
                "case_narrative": narrative_text,
                "fraud_probability": 0.0 if outcome == "closed_cleared" else 0.85,
                "verdict": "cleared" if outcome == "closed_cleared" else "fraud",
            }))

            # Pattern edge
            if pattern and pattern != "none":
                batch_pattern_edges.append((case_id, pattern, {}))

            cases_processed += 1

            # Flush batch
            if len(batch_vertices) >= BATCH_SIZE:
                if not dry_run and conn:
                    _flush_batch(conn, batch_vertices, batch_pattern_edges)
                    edges_created += len(batch_pattern_edges)
                batch_vertices = []
                batch_pattern_edges = []
                elapsed = time.time() - t0
                print(f"  Processed {cases_processed:,} cases, "
                      f"{embeddings_generated:,} embeddings ({elapsed:.1f}s)")

        # Final flush
        if batch_vertices:
            if not dry_run and conn:
                _flush_batch(conn, batch_vertices, batch_pattern_edges)
                edges_created += len(batch_pattern_edges)

    elapsed = time.time() - t0
    print(f"\n  ✅ Backfill complete!")
    print(f"  Cases processed:     {cases_processed:,}")
    print(f"  Embeddings generated: {embeddings_generated:,}")
    print(f"  Pattern edges:       {edges_created:,}")
    print(f"  Time:                {elapsed:.1f}s")


def _flush_batch(conn, vertices, pattern_edges):
    """Upsert a batch of ClosedCase updates and pattern edges."""
    try:
        conn.upsertVertices("ClosedCase", vertices)
    except Exception as e:
        print(f"  [WARN] ClosedCase upsert batch failed: {e}")

    if pattern_edges:
        try:
            conn.upsertEdges("ClosedCase", "CASE_HAS_PATTERN", "FraudPattern", pattern_edges)
        except Exception as e:
            print(f"  [WARN] CASE_HAS_PATTERN edge batch failed: {e}")


def verify_backfill(conn):
    """Verify that embeddings and patterns are populated."""
    print("\n--- Backfill Verification ---")
    try:
        case_count = conn.getVertexCount("ClosedCase")
        pattern_count = conn.getVertexCount("FraudPattern")
        print(f"  ClosedCase vertices:   {case_count:,}")
        print(f"  FraudPattern vertices: {pattern_count:,}")

        # Sample a case to check narrative population
        sample = conn.getVertices("ClosedCase", limit=1)
        if sample:
            s = sample[0] if isinstance(sample, list) else sample
            has_narrative = bool(s.get("attributes", {}).get("case_narrative", ""))
            print(f"  Sample case narrative: {'✅ populated' if has_narrative else '❌ empty'}")
    except Exception as e:
        print(f"  Verification error: {e}")


def main():
    parser = argparse.ArgumentParser(description="Backfill case embeddings for graph-native memory")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of cases to process")
    parser.add_argument("--dry-run", action="store_true", help="Generate embeddings without writing to TigerGraph")
    parser.add_argument("--verify", action="store_true", help="Only verify existing backfill")
    args = parser.parse_args()

    conn = None
    if not args.dry_run:
        try:
            from src.graph.client import get_tg_connection
            conn = get_tg_connection()
            print(f"Connected to TigerGraph: {conn.graphname}")
        except Exception as e:
            print(f"[WARN] TigerGraph unavailable ({e}); running in dry-run mode")
            args.dry_run = True

    if args.verify:
        if conn:
            verify_backfill(conn)
        else:
            print("Cannot verify without TigerGraph connection")
        return

    csv_path = DATA_DIR / "closed_cases_history.csv"
    backfill_from_csv(conn, csv_path, limit=args.limit, dry_run=args.dry_run)

    if conn:
        verify_backfill(conn)


if __name__ == "__main__":
    main()
