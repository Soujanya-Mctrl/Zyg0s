"""
Bulk Data Ingestion Script for HHGOA IEEE-CIS Fraud Detection Dataset.
Loads closed cases, identity device profiles, customer/card mappings,
and transactions into TigerGraph Savanna Cloud.
"""

import os
import sys
import csv
import time
import argparse
from pathlib import Path
from typing import Dict, List, Set, Any
from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.graph.client import get_tg_connection

load_dotenv(dotenv_path=REPO_ROOT / ".env")

DATA_DIR = REPO_ROOT / "data" / "hhgoa_ieee"
BATCH_SIZE = 5000


def clean_str(val: Any) -> str:
    if val is None:
        return ""
    s = str(val).strip()
    return s if s.lower() != "nan" else ""


def clean_float(val: Any, default: float = 0.0) -> float:
    if val is None or val == "":
        return default
    try:
        f = float(val)
        return f if f == f else default  # nan check
    except (ValueError, TypeError):
        return default


def load_closed_cases(conn, limit: int = None):
    csv_file = DATA_DIR / "closed_cases_history.csv"
    if not csv_file.exists():
        print(f"[ERROR] {csv_file} not found!")
        return

    print(f"\n[1/3] Ingesting Closed Cases from {csv_file.name}...")
    vertices = []
    card_vertices = {}
    customer_vertices = set()
    edges_owns = []
    edges_on_card = []
    edges_connected = []
    edges_involves = []

    with open(csv_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if limit and i >= limit:
                break

            case_id = row["case_id"].strip()
            cust_id = row["customer_id"].strip()
            card_id = row["card_id"].strip()
            opened_at = row["opened_at"].strip()
            closed_at = row["closed_at"].strip()
            outcome = row["outcome"].strip()
            pattern = row["pattern"].strip()
            exposure = clean_float(row["exposure_usd"])
            notes = row["analyst_notes"].strip()

            vertices.append((case_id, {
                "customer_id": cust_id,
                "card_id": card_id,
                "opened_at": opened_at,
                "closed_at": closed_at,
                "outcome": outcome,
                "pattern": pattern,
                "exposure_usd": exposure,
                "analyst_notes": notes
            }))

            if cust_id:
                customer_vertices.add(cust_id)

            if card_id:
                card_vertices[card_id] = cust_id
                edges_on_card.append((case_id, card_id, {}))
                if cust_id:
                    edges_owns.append((cust_id, card_id, {}))

            connected_cards = row.get("connected_card_ids", "")
            if connected_cards:
                for c_card in connected_cards.split("|"):
                    c_card = c_card.strip()
                    if c_card:
                        edges_connected.append((case_id, c_card, {}))

            txn_ids = row.get("txn_ids", "")
            if txn_ids:
                for tid in txn_ids.split("|"):
                    tid = tid.strip()
                    if tid:
                        edges_involves.append((case_id, tid, {}))

    print(f"  -> Extracted {len(vertices)} ClosedCase vertices, {len(card_vertices)} Cards, {len(customer_vertices)} Customers.")

    # Upsert Customers
    cust_list = [(c, {}) for c in customer_vertices]
    for i in range(0, len(cust_list), BATCH_SIZE):
        batch = cust_list[i : i + BATCH_SIZE]
        conn.upsertVertices("Customer", batch)

    # Upsert Cards
    card_list = [(c_id, {"customer_id": c_id.split("-")[0] if "-" in c_id else ""}) for c_id in card_vertices]
    for i in range(0, len(card_list), BATCH_SIZE):
        batch = card_list[i : i + BATCH_SIZE]
        conn.upsertVertices("AccountCard", batch)

    # Upsert ClosedCases
    for i in range(0, len(vertices), BATCH_SIZE):
        batch = vertices[i : i + BATCH_SIZE]
        conn.upsertVertices("ClosedCase", batch)

    # Upsert Edges
    if edges_owns:
        conn.upsertEdges("Customer", "OWNS", "AccountCard", edges_owns)
    if edges_on_card:
        conn.upsertEdges("ClosedCase", "ON_CARD", "AccountCard", edges_on_card)
    if edges_connected:
        conn.upsertEdges("ClosedCase", "CONNECTED_TO", "AccountCard", edges_connected)
    if edges_involves:
        for i in range(0, len(edges_involves), BATCH_SIZE):
            conn.upsertEdges("ClosedCase", "INVOLVES", "Transaction", edges_involves[i : i + BATCH_SIZE])

    print("  -> Closed Cases ingestion complete!")


def load_identities(conn, limit: int = None):
    csv_file = DATA_DIR / "identity.csv"
    if not csv_file.exists():
        print(f"[ERROR] {csv_file} not found!")
        return

    print(f"\n[2/3] Ingesting Identity Device Profiles from {csv_file.name}...")
    device_profiles = {}
    edges_from_device = []

    with open(csv_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if limit and i >= limit:
                break

            tid = row["TransactionID"].strip()
            dev_info = clean_str(row.get("DeviceInfo"))
            dev_type = clean_str(row.get("DeviceType"))
            os_ver = clean_str(row.get("id_30"))
            browser = clean_str(row.get("id_31"))
            screen = clean_str(row.get("id_33"))
            is_new = clean_str(row.get("id_15")).lower() == "new"

            profile_parts = [dev_info, os_ver, browser, screen]
            profile_id = " | ".join([p for p in profile_parts if p])
            if not profile_id:
                profile_id = f"UNKNOWN_DEVICE_{tid}"

            if profile_id not in device_profiles:
                device_profiles[profile_id] = {
                    "device_info": dev_info,
                    "device_type": dev_type,
                    "os": os_ver,
                    "browser": browser,
                    "screen": screen,
                    "is_new": is_new
                }

            edges_from_device.append((tid, profile_id, {}))

    print(f"  -> Extracted {len(device_profiles)} unique DeviceProfile vertices and {len(edges_from_device)} links.")

    # Upsert Device Profiles
    dp_list = [(k, v) for k, v in device_profiles.items()]
    for i in range(0, len(dp_list), BATCH_SIZE):
        batch = dp_list[i : i + BATCH_SIZE]
        conn.upsertVertices("DeviceProfile", batch)

    # Upsert FROM_DEVICE edges
    for i in range(0, len(edges_from_device), BATCH_SIZE):
        batch = edges_from_device[i : i + BATCH_SIZE]
        conn.upsertEdges("Transaction", "FROM_DEVICE", "DeviceProfile", batch)

    print("  -> Identity Device Profiles ingestion complete!")


def get_benchmark_cards_and_txns() -> tuple[Set[str], Set[str]]:
    pack_file = DATA_DIR / "case_pack.csv"
    if not pack_file.exists():
        return set(), set()
    cards = set()
    txns = set()
    with open(pack_file, "r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            card_id = row.get("card_id", "").strip()
            txn_id = row.get("flagged_txn_id", "").strip()
            if card_id:
                cards.add(card_id)
            if txn_id:
                txns.add(txn_id)
    return cards, txns


def load_transactions(conn, benchmark_only: bool = False, max_rows: int = None):
    csv_file = DATA_DIR / "transactions.csv"
    if not csv_file.exists():
        print(f"[ERROR] {csv_file} not found!")
        return

    benchmark_cards, benchmark_txns = get_benchmark_cards_and_txns()
    print(f"\n[3/3] Ingesting Transactions from {csv_file.name} (Benchmark Only: {benchmark_only})...")

    card_map = {}  # (customer_id, card_tuple) -> card_id
    customer_card_count = {}

    batch_txns = []
    batch_cards = []
    batch_customers = []
    batch_regions = set()
    batch_emails = set()
    batch_owns = []
    batch_made = []
    batch_billed = []
    batch_email_edges = []

    total_rows = 0
    loaded_txns = 0

    t0 = time.time()

    with open(csv_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            total_rows += 1
            if max_rows and total_rows > max_rows:
                break

            tid = row["TransactionID"].strip()
            cust_id = row["customer_id"].strip()
            card_sig = (cust_id, row["card1"], row["card2"], row["card3"], row["card4"], row["card5"], row["card6"])

            # Map card_id
            if card_sig not in card_map:
                curr_count = customer_card_count.get(cust_id, 0) + 1
                customer_card_count[cust_id] = curr_count
                card_map[card_sig] = f"{cust_id}-K{curr_count}"

            card_id = card_map[card_sig]

            if benchmark_only:
                # Include transaction if it matches benchmark cards or benchmark txns
                if card_id not in benchmark_cards and tid not in benchmark_txns:
                    continue

            amount = clean_float(row["TransactionAmt"])
            ts = clean_str(row.get("ts"))
            product_cd = clean_str(row.get("ProductCD"))
            risk_score = clean_float(row.get("risk_score"))
            channel = clean_str(row.get("channel"))
            dist1 = clean_float(row.get("dist1"))
            dist2 = clean_float(row.get("dist2"))
            addr1 = clean_str(row.get("addr1"))
            addr2 = clean_str(row.get("addr2"))
            p_email = clean_str(row.get("P_emaildomain"))
            r_email = clean_str(row.get("R_emaildomain"))

            batch_txns.append((tid, {
                "ts": ts,
                "amount": amount,
                "product_cd": product_cd,
                "risk_score": risk_score,
                "channel": channel,
                "dist1": dist1,
                "dist2": dist2,
                "addr1": addr1,
                "addr2": addr2,
                "p_emaildomain": p_email,
                "r_emaildomain": r_email
            }))

            batch_customers.append((cust_id, {}))
            batch_cards.append((card_id, {
                "customer_id": cust_id,
                "card_network": clean_str(row.get("card4")),
                "card_type": clean_str(row.get("card6"))
            }))

            batch_owns.append((cust_id, card_id, {}))
            batch_made.append((card_id, tid, {}))

            if addr1:
                batch_regions.add(addr1)
                batch_billed.append((tid, addr1, {}))

            if p_email:
                batch_emails.add(p_email)
                batch_email_edges.append((tid, p_email, {}))

            loaded_txns += 1

            # Flush batch
            if len(batch_txns) >= BATCH_SIZE:
                _flush_batches(
                    conn, batch_txns, batch_cards, batch_customers,
                    batch_regions, batch_emails, batch_owns, batch_made,
                    batch_billed, batch_email_edges
                )
                batch_txns = []
                batch_cards = []
                batch_customers = []
                batch_regions = set()
                batch_emails = set()
                batch_owns = []
                batch_made = []
                batch_billed = []
                batch_email_edges = []
                print(f"  Processed {total_rows:,} rows, loaded {loaded_txns:,} txns ({time.time() - t0:.1f}s)...")

        # Final flush
        if batch_txns:
            _flush_batches(
                conn, batch_txns, batch_cards, batch_customers,
                batch_regions, batch_emails, batch_owns, batch_made,
                batch_billed, batch_email_edges
            )

    print(f"  -> Finished! Scanned {total_rows:,} rows, loaded {loaded_txns:,} Transactions in {time.time() - t0:.1f}s.")


def _flush_batches(conn, txns, cards, customers, regions, emails, owns, made, billed, email_edges):
    if customers:
        conn.upsertVertices("Customer", customers)
    if cards:
        conn.upsertVertices("AccountCard", cards)
    if regions:
        conn.upsertVertices("BillingRegion", [(r, {}) for r in regions])
    if emails:
        conn.upsertVertices("EmailDomain", [(e, {}) for e in emails])
    if txns:
        conn.upsertVertices("Transaction", txns)

    if owns:
        conn.upsertEdges("Customer", "OWNS", "AccountCard", owns)
    if made:
        conn.upsertEdges("AccountCard", "MADE", "Transaction", made)
    if billed:
        conn.upsertEdges("Transaction", "BILLED_IN", "BillingRegion", billed)
    if email_edges:
        conn.upsertEdges("Transaction", "PURCHASER_EMAIL", "EmailDomain", email_edges)


def print_stats(conn):
    print("\n--- Current Graph Statistics: Transaction_Fraud ---")
    types = ["Customer", "AccountCard", "Transaction", "DeviceProfile", "BillingRegion", "EmailDomain", "ClosedCase", "Investigation_Case"]
    for t in types:
        try:
            cnt = conn.getVertexCount(t)
            print(f"  {t:<20}: {cnt:,}")
        except Exception as e:
            print(f"  {t:<20}: Error ({e})")


def main():
    parser = argparse.ArgumentParser(description="Ingest HHGOA IEEE-CIS Fraud dataset into TigerGraph Cloud")
    parser.add_argument("--benchmark-only", action="store_true", help="Load closed cases, identities, and all transactions for the 20 benchmark cases")
    parser.add_argument("--max-txns", type=int, default=None, help="Limit number of raw transaction rows scanned")
    parser.add_argument("--stats-only", action="store_true", help="Print vertex counts and exit")
    args = parser.parse_args()

    conn = get_tg_connection()

    if args.stats_only:
        print_stats(conn)
        return

    load_closed_cases(conn)
    load_identities(conn)
    load_transactions(conn, benchmark_only=args.benchmark_only, max_rows=args.max_txns)
    print_stats(conn)


if __name__ == "__main__":
    main()
