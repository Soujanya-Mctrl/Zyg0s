"""
Batch Evaluator for the 20 Official HHGOA Benchmark Cases.
Executes the autonomous LangGraph fraud investigation agent across all 20 exam cases,
validates the output schemas, saves cases/HHG-001.json through cases/HHG-020.json,
and writes closed case nodes directly to TigerGraph Savanna Cloud.
"""

import os
import json
import time
import pandas as pd
from typing import List, Dict, Any

from src.agent.workflow import FraudAgentWorkflow
from src.agent.models import BenchmarkCaseOutput
from src.graph.client import get_tg_connection


def run_all_cases(
    case_pack_path: str = "data/hhgoa_ieee/case_pack.csv",
    output_dir: str = "cases"
):
    os.makedirs(output_dir, exist_ok=True)
    df_pack = pd.read_csv(case_pack_path)
    total_cases = len(df_pack)
    print(f"Starting investigation of {total_cases} official benchmark cases...")

    workflow = FraudAgentWorkflow()
    results: List[BenchmarkCaseOutput] = []

    # Check TigerGraph Cloud Connection
    tg_connected = False
    try:
        conn = get_tg_connection()
        print("Connected to TigerGraph Savanna Cloud for case persistence.")
        tg_connected = True
    except Exception as e:
        print(f"TigerGraph Cloud connection unavailable ({e}); proceeding with local persistence.")

    start_total = time.time()

    for idx, row in df_pack.iterrows():
        case_meta = row.to_dict()
        case_id = str(case_meta["case_id"])
        print(f"\n[{idx+1}/{total_cases}] Investigating Case {case_id}...")

        t0 = time.time()
        output: BenchmarkCaseOutput = workflow.run_case(case_meta)
        elapsed = time.time() - t0
        output.latency_s = round(elapsed, 2)

        # Write to cases/<case_id>.json
        out_file = os.path.join(output_dir, f"{case_id}.json")
        with open(out_file, "w", encoding="utf-8") as f:
            f.write(output.model_dump_json(indent=2))

        # Write to TigerGraph Savanna Cloud
        if tg_connected:
            try:
                conn.upsertVertex(
                    "Concept",
                    f"CASE_{case_id}",
                    attributes={
                        "concept_type": f"CLOSED_FRAUD_CASE_{output.case.verdict.upper()}",
                        "description": f"Outcome: {output.case.status}, Verdict: {output.case.verdict}, Pattern: {output.case.pattern}, Exposure: ${output.case.exposure_usd:,.2f}"
                    }
                )
                output.case.written_to_graph = True
            except Exception as e:
                print(f"  TigerGraph writeback warning: {e}")

        results.append(output)
        print(f"  [OK] {case_id} complete: Verdict='{output.case.verdict}', Pattern='{output.case.pattern}', Exposure=${output.case.exposure_usd:,.2f}, SAR={output.sar.file}")

    total_time = time.time() - start_total
    print(f"\n=======================================================")
    print(f"All {total_cases} benchmark cases successfully investigated in {total_time:.1f}s!")
    print(f"Answer files stored under: {os.path.abspath(output_dir)}")
    print(f"=======================================================")


if __name__ == "__main__":
    run_all_cases()
