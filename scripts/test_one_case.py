import os
import sys
import pandas as pd
from src.agent.pipeline.orchestrator import InvestigationOrchestrator

df_pack = pd.read_csv("data/hhgoa_ieee/case_pack.csv")
case_meta = df_pack.iloc[0].to_dict()
orch = InvestigationOrchestrator()
print(f"Running investigation on {case_meta['case_id']}...")
out = orch.run_investigation(case_meta)
print(f"Verdict: {out.case.verdict}")
print(f"Pattern: {out.case.pattern}")
print(f"Trace length: {len(out.orchestrator_pipeline_trace)}")
for step in out.orchestrator_pipeline_trace:
    print(f"  [{step['agent_name']}] Role: {step['role']}")
    print(f"    Math: {list(step['math_metrics'].keys())}")
    print(f"    AI Reasoning Preview: {step['ai_reasoning'][:80]}...")
print("SUCCESS!")
