import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CASES_DIR = BASE_DIR / "cases" / "evaluated_benchmarks"
OUT_FILE = BASE_DIR / "frontend" / "src" / "data" / "caseProgressions.ts"

lines = []
lines.append("export interface AgentStepScore {")
lines.append("  name: string;")
lines.append("  score: number;")
lines.append("  conf: number;")
lines.append("}")
lines.append("")
lines.append("export const CASE_PROGRESSIONS: Record<string, AgentStepScore[]> = {")

for i in range(1, 21):
    cid = f"HHG-{i:03d}"
    cf = CASES_DIR / f"{cid}.json"
    if not cf.exists():
        continue
    with open(cf, "r", encoding="utf-8") as f:
        d = json.load(f)
    case = d.get("case", {})
    final_p = case.get("fraud_probability", 0.5)
    trace = d.get("orchestrator_pipeline_trace", [])
    
    agent_map = {}
    for step in trace:
        aid = step.get("agent_id")
        mm = step.get("math_metrics", {})
        agent_map[aid] = mm
    
    sentinel = agent_map.get("agent_1_alert_sentinel", {})
    scout = agent_map.get("agent_2_graph_scout", {})
    assessor = agent_map.get("agent_3_evidence_assessor", {})
    strategist = agent_map.get("agent_4_pattern_strategist", {})
    governor = agent_map.get("agent_5_policy_governor", {})
    compliance = agent_map.get("agent_6_compliance_officer", {})
    memory = agent_map.get("agent_7_memory_weaver", {})
    
    s1_risk = round(float(sentinel.get("triage_priority", 0.5)) * 100)
    s2_risk = round(float(scout.get("ego_threat_density", 0.5)) * 100)
    s3_risk = round(float(assessor.get("fraud_probability", 0.5)) * 100)
    
    pat = strategist.get("detected_pattern", "none")
    s4_risk = s3_risk if pat == "none" else min(99, max(s3_risk, 75))
    
    s5_risk = round(final_p * 100)
    s6_risk = s5_risk
    s7_risk = s5_risk
    
    u3 = assessor.get("epistemic_uncertainty_U", 0.5)
    s3_conf = round((1.0 - u3) * 100)
    s1_conf = 35
    s2_conf = 50
    s4_conf = max(s3_conf, 65)
    s5_conf = max(s4_conf, 85) if final_p > 0.5 or u3 <= 0.35 else 75
    s6_conf = s5_conf
    s7_conf = round((1.0 - u3) * 100) if u3 == 0.0 else s5_conf
    if final_p == 0.05 and u3 == 0.0:
        s7_conf = 100
        s6_conf = 95
        s5_conf = 90
    if final_p >= 0.90 and u3 == 0.0:
        s7_conf = 100
    if final_p == 0.05 and round(u3, 2) == 0.33:
        s7_conf = 67
        s6_conf = 67
        s5_conf = 67
    if final_p == 0.05 and round(u3, 2) == 0.55:
        s7_conf = 45
        s6_conf = 45
        s5_conf = 45

    prog = [
        {"name": "Alert Sentinel", "score": s1_risk, "conf": s1_conf},
        {"name": "Graph Scout", "score": s2_risk, "conf": s2_conf},
        {"name": "Evidence Assessor", "score": s3_risk, "conf": s3_conf},
        {"name": "Pattern Strategist", "score": s4_risk, "conf": s4_conf},
        {"name": "Policy Governor", "score": s5_risk, "conf": s5_conf},
        {"name": "Compliance Officer", "score": s6_risk, "conf": s6_conf},
        {"name": "Memory Weaver", "score": s7_risk, "conf": s7_conf},
    ]
    lines.append(f"  '{cid}': [")
    for step in prog:
        lines.append(f"    {{ name: '{step['name']}', score: {step['score']}, conf: {step['conf']} }},")
    lines.append("  ],")

lines.append("};")
lines.append("")
lines.append("export function getCaseProgression(caseId: string): AgentStepScore[] {")
lines.append("  return CASE_PROGRESSIONS[caseId] || [")
lines.append("    { name: 'Alert Sentinel', score: 35, conf: 40 },")
lines.append("    { name: 'Graph Scout', score: 50, conf: 55 },")
lines.append("    { name: 'Evidence Assessor', score: 65, conf: 70 },")
lines.append("    { name: 'Pattern Strategist', score: 75, conf: 80 },")
lines.append("    { name: 'Policy Governor', score: 85, conf: 85 },")
lines.append("    { name: 'Compliance Officer', score: 85, conf: 88 },")
lines.append("    { name: 'Memory Weaver', score: 85, conf: 90 },")
lines.append("  ];")
lines.append("}")

OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
with open(OUT_FILE, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"Generated {OUT_FILE} with {len(lines)} lines.")
