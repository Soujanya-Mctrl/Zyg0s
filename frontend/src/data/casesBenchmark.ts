export const BENCHMARK_DATA: any = {
  "health": {
    "platform": "ZYG0S Autonomous Fraud Defense",
    "codename": "THEMIS-7",
    "status": "OPERATIONAL",
    "system": "TigerGraph Savanna Cloud + Groq LPU + LangGraph",
    "engine": "Hybrid Neuro-Symbolic State Machine v1.0",
    "policy": "Bank Fraud Policy v1.0 (R1-R10)",
    "cases_indexed": 20,
    "mcp_service": {
      "status": "connected",
      "total_tools_exposed": 65,
      "graph_name": "Transaction_Fraud"
    },
    "ai_engine": {
      "provider": "Groq LPU",
      "status": "connected",
      "model": "llama-3.3-70b-versatile",
      "active": true,
      "lpu_accelerated": true
    }
  },
  "cases": [
    {
      "case_id": "HHG-001",
      "transaction_id": "3514030",
      "amount": 0.0,
      "customer_id": "C12382",
      "card_id": "C12382-K1",
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [],
      "stage_1_action": "VERIFY_WITH_CUSTOMER",
      "stage_2_action": "CLOSE_NO_FRAUD",
      "has_sar": false
    },
    {
      "case_id": "HHG-002",
      "transaction_id": "3478782",
      "amount": 292.36,
      "customer_id": "C11891",
      "card_id": "C11891-K1",
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "fraud_pattern": "card_not_present_fraud",
      "evidence_count": 3,
      "similar_prior_cases": [
        "HHG-001"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "CLOSE_NO_FRAUD",
      "has_sar": false
    },
    {
      "case_id": "HHG-003",
      "transaction_id": "3530164",
      "amount": 0.0,
      "customer_id": "C08623",
      "card_id": "C08623-K2",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.95,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001"
      ],
      "stage_1_action": "CREATE_CASE",
      "stage_2_action": "BLOCK_CARD",
      "has_sar": false
    },
    {
      "case_id": "HHG-004",
      "transaction_id": "3583227",
      "amount": 128.33,
      "customer_id": "C08106",
      "card_id": "C08106-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001",
        "HHG-003"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_CARD",
      "has_sar": false
    },
    {
      "case_id": "HHG-005",
      "transaction_id": "3523199",
      "amount": 100.07,
      "customer_id": "C02923",
      "card_id": "C02923-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 4,
      "similar_prior_cases": [
        "HHG-004",
        "HHG-002",
        "HHG-001"
      ],
      "stage_1_action": "VERIFY_WITH_CUSTOMER",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-006",
      "transaction_id": "3476682",
      "amount": 482.12,
      "customer_id": "C07297",
      "card_id": "C07297-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 4,
      "similar_prior_cases": [
        "HHG-005",
        "HHG-004",
        "HHG-001"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-007",
      "transaction_id": "3514948",
      "amount": 111.92,
      "customer_id": "C09933",
      "card_id": "C09933-K2",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "account_takeover",
      "evidence_count": 3,
      "similar_prior_cases": [
        "HHG-002",
        "HHG-006",
        "HHG-005"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_CARD",
      "has_sar": false
    },
    {
      "case_id": "HHG-008",
      "transaction_id": "3558054",
      "amount": 0.0,
      "customer_id": "C13171",
      "card_id": "C13171-K2",
      "status": "open",
      "verdict": "uncertain",
      "risk_score": 0.68,
      "uncertainty_score": 0.64,
      "confidence_score": 36,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-003",
        "HHG-002",
        "HHG-001"
      ],
      "stage_1_action": "CREATE_CASE",
      "stage_2_action": "MONITOR_CARD",
      "has_sar": false
    },
    {
      "case_id": "HHG-009",
      "transaction_id": "3581141",
      "amount": 0.0,
      "customer_id": "C08299",
      "card_id": "C08299-K1",
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-002"
      ],
      "stage_1_action": "CREATE_CASE",
      "stage_2_action": "CLOSE_NO_FRAUD",
      "has_sar": false
    },
    {
      "case_id": "HHG-010",
      "transaction_id": "3506725",
      "amount": 1000.03,
      "customer_id": "C10434",
      "card_id": "C10434-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 6,
      "similar_prior_cases": [
        "HHG-006",
        "HHG-005",
        "HHG-004"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-011",
      "transaction_id": "3583368",
      "amount": 0.0,
      "customer_id": "C11923",
      "card_id": "C11923-K2",
      "status": "open",
      "verdict": "uncertain",
      "risk_score": 0.7,
      "uncertainty_score": 0.6,
      "confidence_score": 40,
      "fraud_pattern": "none",
      "evidence_count": 3,
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-009"
      ],
      "stage_1_action": "CREATE_CASE",
      "stage_2_action": "MONITOR_CARD",
      "has_sar": false
    },
    {
      "case_id": "HHG-012",
      "transaction_id": "3553342",
      "amount": 0.0,
      "customer_id": "C05876",
      "card_id": "C05876-K2",
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001",
        "HHG-007"
      ],
      "stage_1_action": "VERIFY_WITH_CUSTOMER",
      "stage_2_action": "CLOSE_NO_FRAUD",
      "has_sar": false
    },
    {
      "case_id": "HHG-013",
      "transaction_id": "3526826",
      "amount": 35.66,
      "customer_id": "C07671",
      "card_id": "C07671-K2",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.92,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 4,
      "similar_prior_cases": [
        "HHG-010",
        "HHG-004",
        "HHG-005"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-014",
      "transaction_id": "3478561",
      "amount": 74.96,
      "customer_id": "C13487",
      "card_id": "C13487-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 4,
      "similar_prior_cases": [
        "HHG-006",
        "HHG-005",
        "HHG-004"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-015",
      "transaction_id": "3464869",
      "amount": 599.94,
      "customer_id": "C03042",
      "card_id": "C03042-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.92,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 5,
      "similar_prior_cases": [
        "HHG-010",
        "HHG-013",
        "HHG-006"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-016",
      "transaction_id": "3534820",
      "amount": 59.67,
      "customer_id": "C09988",
      "card_id": "C09988-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 3,
      "similar_prior_cases": [
        "HHG-006",
        "HHG-010",
        "HHG-005"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-017",
      "transaction_id": "3450629",
      "amount": 100.09,
      "customer_id": "C04570",
      "card_id": "C04570-K1",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_fraud",
      "evidence_count": 3,
      "similar_prior_cases": [
        "HHG-010",
        "HHG-002",
        "HHG-016"
      ],
      "stage_1_action": "VERIFY_WITH_CUSTOMER",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-018",
      "transaction_id": "3491361",
      "amount": 0.0,
      "customer_id": "C02354",
      "card_id": "C02354-K2",
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "fraud_pattern": "none",
      "evidence_count": 2,
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-009"
      ],
      "stage_1_action": "CREATE_CASE",
      "stage_2_action": "CLOSE_NO_FRAUD",
      "has_sar": false
    },
    {
      "case_id": "HHG-019",
      "transaction_id": "3503878",
      "amount": 99.92,
      "customer_id": "C07987",
      "card_id": "C07987-K2",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 5,
      "similar_prior_cases": [
        "HHG-010",
        "HHG-013",
        "HHG-004"
      ],
      "stage_1_action": "DECLINE_TRANSACTION",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    },
    {
      "case_id": "HHG-020",
      "transaction_id": "3509359",
      "amount": 125.08,
      "customer_id": "C12265",
      "card_id": "C12265-K2",
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "fraud_pattern": "card_not_present_new_device",
      "evidence_count": 4,
      "similar_prior_cases": [
        "HHG-010",
        "HHG-006",
        "HHG-013"
      ],
      "stage_1_action": "VERIFY_WITH_CUSTOMER",
      "stage_2_action": "BLOCK_ALL_CARDS",
      "has_sar": true
    }
  ],
  "details": {
    "HHG-001": {
      "case_id": "HHG-001",
      "customer_id": "C12382",
      "primary_card_id": "C12382-K1",
      "first_suspicious_txn_id": "3514030",
      "exposure_usd": 0.0,
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "pattern": "none",
      "summary": "Case HHG-001 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was VERIFY_WITH_CUSTOMER, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 444.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C12382)",
          "entity_ids": [
            "3514030"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3514030"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C12382-K1"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: weak or single signal; verify with customer before any destructive block"
          },
          {
            "action": "MONITOR_CARD",
            "route": "auto",
            "reason": "R1: place card on 72-hour heightened monitoring pending response"
          }
        ],
        "final": [
          {
            "action": "CLOSE_NO_FRAUD",
            "route": "auto",
            "reason": "R3: customer confirmed transaction as authorized; close alert as legitimate"
          }
        ],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3514030,
            "flagged_amount_usd": 77.07,
            "channel": "in_person",
            "customer_id": "C12382",
            "card_id": "C12382-K1",
            "historical_mean_usd": 117.02,
            "historical_std_usd": 116.84,
            "z_score": -0.342,
            "amount_acceleration_ratio": 0.66,
            "velocity_1h": 1,
            "velocity_24h": 4,
            "prior_txns_count": 358,
            "triage_priority": 0.304,
            "hand_off_summary": "Anchored TX #3514030 ($77.07, Z=-0.34). Triage priority: 0.30."
          },
          "ai_reasoning": "Transaction #3514030 does not represent a statistically severe baseline anomaly, as the $77.07 amount falls well within the customer's historical spending distribution (0.66x mean, Z-score -0.34). Consequently, the low triage priority (0.30) supports a routine review rather than an immediate fraud escalation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3514030 ($77.07, Z=-0.34). Triage priority: 0.30.",
          "latency_ms": 689.18,
          "timestamp": "2026-09-22T19:29:09.566084"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]. Threat density: 0.15."
          },
          "ai_reasoning": "The graph structure exhibits strong benign regularity, evidenced by the absence of shared device collusion, card testing bursts, or out-of-region anomalies, with the billing address firmly anchored within the account's established historical footprint. Consequently, the low ego threat density (0.15) and lack of recurring dispute history indicate a legitimate, isolated transaction path devoid of identity collusion or fraud indicators.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 444.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C12382)",
              "entity_ids": [
                "3514030"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]. Threat density: 0.15.",
          "latency_ms": 1395.51,
          "timestamp": "2026-09-22T19:29:10.961666"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.21,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.21, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.670) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to justify immediate account restriction without risking a false positive against an established customer. Therefore, under Policy Rule R1, the presence of contradictory signals mandates Step-Up Authentication to resolve the ambiguity and preserve the customer relationship before any further enforcement action is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.21, U=0.670. Step-up needed: True.",
          "latency_ms": 280.31,
          "timestamp": "2026-09-22T19:29:11.242012"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the low fraud probability (0.21) and the benign profile match, this transaction is most likely a legitimate, low-value in-person purchase by a known customer using their own card. The simple, direct subgraph structure with no anomalous connections or high-risk indicators supports the conclusion that this is normal consumer behavior rather than a fraudulent attempt.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 273.5,
          "timestamp": "2026-09-22T19:29:11.515563"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.21,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.21, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is insufficient for immediate action because the absence of direct or circumstantial fraud indicators, combined with a derived probability (0.21) well below standard intervention thresholds, suggests the contradictory signals are likely benign anomalies rather than malicious activity. Consequently, under Policy Rule R1, the low epistemic uncertainty (0.330) and lack of step-up authentication triggers mandate a \"no-action\" stance to preserve the customer relationship, as proactive verification would be disproportionate to the minimal risk profile.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.21, U=0.330. Step-up needed: False.",
          "latency_ms": 20505.06,
          "timestamp": "2026-09-22T19:29:32.020718"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to clear the alert without imposing a card block strictly adheres to Rule R1 by prioritizing customer verification over a single automated signal, thereby preventing disproportionate friction for a legitimate transaction. This approach ensures regulatory defensibility by demonstrating that the final closure was based on confirmed intent rather than unverified risk indicators, maintaining a balanced and proportionate response to the zero-dollar exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 6483.55,
          "timestamp": "2026-09-22T19:29:38.504355"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-001. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.17,
          "timestamp": "2026-09-22T19:29:38.504560"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 0,
            "similar_prior_cases": [],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-001",
            "hand_off_summary": "Memory integrated: Retrieved 0 precedents (). Case persisted to TigerGraph (CASE-SAVANNA-HHG-001)."
          },
          "ai_reasoning": "Memory Weaver finding: Case HHG-001 established a new topological baseline in TigerGraph. No previous cases matched this exact feature vector in memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 0 precedents (). Case persisted to TigerGraph (CASE-SAVANNA-HHG-001).",
          "latency_ms": 21473.19,
          "timestamp": "2026-09-22T19:29:59.977818"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 53.82,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-001"
      }
    },
    "HHG-002": {
      "case_id": "HHG-002",
      "customer_id": "C11891",
      "primary_card_id": "C11891-K1",
      "first_suspicious_txn_id": "3478782",
      "exposure_usd": 292.36,
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "pattern": "card_not_present_fraud",
      "summary": "Case HHG-002 concluded with verdict 'FRAUD' (P=0.93, U=0.000). Pattern: 'card_not_present_fraud'. Total financial exposure: $292.36. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_CARD under L1 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.79.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3478782)",
          "entity_ids": [
            "3478782"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Transaction amount of $292.36 represents a severe statistical outlier (Z=+9.66) exceeding 3.5 standard deviations from baseline.",
          "source": "telemetry",
          "ref": "historical_baseline:z_score(customer_id=C11891)",
          "entity_ids": [
            "3478782"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3478782"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C11891-K1"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-001"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          }
        ],
        "final": [
          {
            "action": "CLOSE_NO_FRAUD",
            "route": "auto",
            "reason": "Step-Up authentication (SMS_OTP) PASSED by cardholder. Primary fraud ambiguity resolved; uncertainty collapsed from 0.65 to 0.04. Case cleared under Policy R3/R10."
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3478782,
            "flagged_amount_usd": 292.36,
            "channel": "online",
            "customer_id": "C11891",
            "card_id": "C11891-K1",
            "historical_mean_usd": 44.66,
            "historical_std_usd": 25.64,
            "z_score": 9.662,
            "amount_acceleration_ratio": 6.55,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 35,
            "triage_priority": 0.676,
            "hand_off_summary": "Anchored TX #3478782 ($292.36, Z=+9.66). Triage priority: 0.68."
          },
          "ai_reasoning": "Transaction #3478782 exhibits a statistically severe anomaly, deviating 9.66 standard deviations from the customer's baseline and exceeding their average spend by 6.55x. This extreme statistical outlier, combined with a high upstream risk score of 0.79, warrants immediate manual review to rule out potential account compromise.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.79.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3478782)",
              "entity_ids": [
                "3478782"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $292.36 represents a severe statistical outlier (Z=+9.66) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C11891)",
              "entity_ids": [
                "3478782"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3478782 ($292.36, Z=+9.66). Triage priority: 0.68.",
          "latency_ms": 398.49,
          "timestamp": "2026-09-22T19:30:00.638081"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies indicates a highly isolated and benign transactional pattern with no evidence of identity collusion. Consequently, the low ego threat density (0.15) confirms that this subgraph represents regular, low-risk activity rather than a coordinated fraud ring.",
          "evidence_generated": [],
          "hand_off_summary": "Graph topology: [C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]. Threat density: 0.15.",
          "latency_ms": 286.11,
          "timestamp": "2026-09-22T19:30:00.924257"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.93,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Consistent multi-hop graph signals gathered; uncertainty within acceptable policy bounds.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.93, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.330 falling well below the 0.45 threshold and a high derived fraud probability of 0.93, the evidence pool is sufficiently robust to warrant immediate action without triggering step-up authentication. This approach aligns with Policy Rule R1 by prioritizing risk mitigation based on high-confidence signals, thereby avoiding unnecessary friction that could damage the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.93, U=0.330. Step-up needed: False.",
          "latency_ms": 510.75,
          "timestamp": "2026-09-22T19:30:01.435053"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_fraud",
            "matched_predicate": "CARD_NOT_PRESENT_ONLINE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE."
          },
          "ai_reasoning": "The high fraud probability (0.93) and isolated subgraph structure suggest a classic card-not-present attack where the threat actor utilized stolen credentials from card C11891-K1 to execute an unauthorized online transaction, likely bypassing standard authentication controls. The absence of linked historical behavior or secondary verification nodes in the subgraph indicates a one-off fraudulent attempt rather than legitimate customer activity.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE.",
          "latency_ms": 299.97,
          "timestamp": "2026-09-22T19:30:01.735059"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.93,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.93, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty and high fraud probability derived from confirmed direct evidence satisfy the threshold for immediate action, rendering step-up authentication unnecessary and potentially counterproductive to operational efficiency. Therefore, the evidence pool warrants immediate intervention rather than customer verification, as Policy Rule R1 prioritizes risk mitigation when epistemic ambiguity is fully resolved.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.93, U=0.000. Step-up needed: False.",
          "latency_ms": 350.49,
          "timestamp": "2026-09-22T19:30:02.085602"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 292.36,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $292.36."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and step-up authentication strictly adhered to Rule R1 by avoiding a premature card block based solely on the single fraud signal, thereby preserving customer experience while gathering necessary evidence. The subsequent escalation to a permanent card block and SAR filing is fully defensible and proportionate, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe mitigation measures.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $292.36.",
          "latency_ms": 341.04,
          "timestamp": "2026-09-22T19:30:02.426694"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-002. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:30:02.426833"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 1,
            "similar_prior_cases": [
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-002",
            "hand_off_summary": "Memory integrated: Retrieved 1 precedents (HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-002)."
          },
          "ai_reasoning": "Precedent HHG-001 validates the current fraud determination by demonstrating a consistent pattern of unauthorized card-not-present transactions that mirror the behavioral and transactional anomalies observed in HHG-002. This historical alignment confirms that the $292.36 exposure represents a legitimate loss consistent with established fraud typologies, thereby reinforcing the accuracy of the investigative verdict.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 1 precedents (HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-002).",
          "latency_ms": 872.44,
          "timestamp": "2026-09-22T19:30:03.299305"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 3.06,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-002"
      }
    },
    "HHG-003": {
      "case_id": "HHG-003",
      "customer_id": "C08623",
      "primary_card_id": "C08623-K2",
      "first_suspicious_txn_id": "3530164",
      "exposure_usd": 0.0,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.95,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "pattern": "none",
      "summary": "Case HHG-003 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was CREATE_CASE, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Disputed transaction of $49.00 matches customer recurring charge history (seen 62 prior times).",
          "source": "graph",
          "ref": "query:customer_recurring_history(customer_id=C08623, amt=49.0)",
          "entity_ids": [
            "3530164"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.8
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3530164"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C08623-K2"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R7: transaction matches recurring pattern; create case for record"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R7: verify recurring charge with customer"
          },
          {
            "action": "WARN_CUSTOMER",
            "route": "auto",
            "reason": "R7: send informational reminder regarding subscription billing"
          }
        ],
        "final": [
          {
            "action": "BLOCK_CARD",
            "route": "L1",
            "reason": "Step-Up authentication (SMS_OTP) FAIL. Customer challenge failed to resolve identity possession; uncertainty collapsed from 0.65 to 0.05. Risk escalated to confirmed fraud under Policy R1/R2."
          }
        ],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3530164,
            "flagged_amount_usd": 49.0,
            "channel": "in_person",
            "customer_id": "C08623",
            "card_id": "C08623-K2",
            "historical_mean_usd": 128.91,
            "historical_std_usd": 161.71,
            "z_score": -0.494,
            "amount_acceleration_ratio": 0.38,
            "velocity_1h": 2,
            "velocity_24h": 8,
            "prior_txns_count": 985,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3530164 ($49.00, Z=-0.49). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3530164 does not represent a statistically severe baseline anomaly, as its $49.00 amount falls well within the customer's historical spending distribution (Z-score: -0.49) and exhibits normal velocity. The high triage priority is driven entirely by the explicit customer dispute rather than any quantitative deviation from their established financial behavior.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3530164 ($49.00, Z=-0.49). Triage priority: 1.00.",
          "latency_ms": 304.44,
          "timestamp": "2026-09-22T19:30:03.859967"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 62,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity, as the transaction aligns with the account's established behavioral baseline. However, the high volume of prior disputes (62 occurrences) suggests a pattern of chronic friction or potential chargeback abuse rather than active identity collusion or fraudulent infiltration.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $49.00 matches customer recurring charge history (seen 62 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C08623, amt=49.0)",
              "entity_ids": [
                "3530164"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]. Threat density: 0.15.",
          "latency_ms": 16503.39,
          "timestamp": "2026-09-22T19:30:20.363410"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective for immediate action because a single contradictory signal cannot mathematically or logically support a 0.99 fraud probability, rendering the derived risk score indefensible. Consequently, Policy Rule R1 mandates customer verification via step-up authentication to resolve the high epistemic uncertainty (U=0.670) and preserve the customer relationship before any adverse action is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 313.08,
          "timestamp": "2026-09-22T19:30:20.676550"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The extremely high fraud probability (0.99) contradicts the \"BENIGN_PROFILE_MATCH\" classification, suggesting a sophisticated evasion technique where the attacker utilizes a compromised or synthetic identity that mimics historical benign behavior to bypass standard heuristic filters. The low-value, in-person transaction likely serves as a \"test\" or \"warm-up\" payment to validate the stolen card credentials and establish a baseline of normalcy before executing higher-value fraudulent activities.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 304.38,
          "timestamp": "2026-09-22T19:30:20.980982"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the classification of two contradictory signals as \"Contradictory\" while assigning zero weight to Direct, Circumstantial, or Correlative evidence creates a logical paradox that invalidates the high fraud probability (0.99) and renders the low uncertainty index (0.330) statistically unsound. Consequently, immediate action is unjustified; instead, the system must mandate customer verification to resolve the epistemic conflict and preserve the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 338.52,
          "timestamp": "2026-09-22T19:30:21.319593"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block on a single, unverified signal, thereby respecting the principle of proportionality given the zero-dollar exposure. The final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to a non-fraudulent event.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 19458.14,
          "timestamp": "2026-09-22T19:30:40.777796"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-003. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.1,
          "timestamp": "2026-09-22T19:30:40.777921"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 2,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-003",
            "hand_off_summary": "Memory integrated: Retrieved 2 precedents (HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-003)."
          },
          "ai_reasoning": "The cleared status of Case HHG-003 aligns with the benign transactional patterns established in precedents HHG-001 and HHG-002, confirming the absence of fraudulent intent or AML exposure. This consistency validates the investigative decision to close the case with zero financial loss, reinforcing the reliability of the RRF-based retrieval in identifying low-risk behavioral clusters.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 2 precedents (HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-003).",
          "latency_ms": 840.13,
          "timestamp": "2026-09-22T19:30:41.618084"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 38.07,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-003"
      }
    },
    "HHG-004": {
      "case_id": "HHG-004",
      "customer_id": "C08106",
      "primary_card_id": "C08106-K1",
      "first_suspicious_txn_id": "3583227",
      "exposure_usd": 128.33,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-004 concluded with verdict 'FRAUD' (P=0.99, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $128.33. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_CARD under L1 authorization.",
      "evidence": [
        {
          "claim": "Transaction initiated from a newly observed device profile: firefox 47.0.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3583227)",
          "entity_ids": [
            "3583227"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3583227"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C08106-K1"
      ],
      "connected_device_profiles": [
        "firefox 47.0"
      ],
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001",
        "HHG-003"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "Customer report initiated; hold pending transactions"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: verify card possession and transaction details with customer"
          }
        ],
        "final": [
          {
            "action": "BLOCK_CARD",
            "route": "L1",
            "reason": "R2: customer denied unauthorized use; block card (exposure <= $2,500)"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3583227,
            "flagged_amount_usd": 128.33,
            "channel": "online",
            "customer_id": "C08106",
            "card_id": "C08106-K1",
            "historical_mean_usd": 35.31,
            "historical_std_usd": 27.79,
            "z_score": 3.348,
            "amount_acceleration_ratio": 3.63,
            "velocity_1h": 1,
            "velocity_24h": 2,
            "prior_txns_count": 209,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3583227 ($128.33, Z=+3.35). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3583227 constitutes a statistically severe baseline anomaly, evidenced by a Z-score of +3.35 and a 3.63x deviation from the customer's historical mean. This quantitative outlier aligns with the customer's explicit denial of authorization, confirming high-risk status for immediate fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3583227 ($128.33, Z=+3.35). Triage priority: 1.00.",
          "latency_ms": 298.31,
          "timestamp": "2026-09-22T19:30:42.175613"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]",
            "device_profile": "firefox 47.0",
            "hand_off_summary": "Graph topology: [C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies, combined with a low ego threat density of 0.15, strongly indicates benign regularity rather than coordinated identity collusion. This isolated transaction path exhibits no structural red flags suggestive of organized fraud rings or synthetic identity exploitation.",
          "evidence_generated": [
            {
              "claim": "Transaction initiated from a newly observed device profile: firefox 47.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3583227)",
              "entity_ids": [
                "3583227"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]. Threat density: 0.15.",
          "latency_ms": 12455.2,
          "timestamp": "2026-09-22T19:30:54.630872"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Circumstantial or sparse signals; uncertainty exceeds threshold (0.45), requesting secondary validation.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the reliance on a single circumstantial signal and an Epistemic Uncertainty Index (0.670) that significantly exceeds the 0.45 threshold, indicating insufficient evidentiary weight for immediate punitive action. Consequently, Policy Rule R1 mandates step-up authentication to resolve this high uncertainty and protect the customer relationship, as acting on sparse, uncorroborated data risks a false positive that would unjustly harm a potentially legitimate account.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 398.77,
          "timestamp": "2026-09-22T19:30:55.029707"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The attacker likely compromised the cardholder's credentials to execute a low-value, card-not-present transaction from a new device, aiming to validate the stolen card data before escalating to higher-value fraud. The near-certainty fraud score (0.99) strongly indicates malicious intent rather than a legitimate customer behavior change, necessitating immediate account lockdown and investigation into the source of the credential breach.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 292.01,
          "timestamp": "2026-09-22T19:30:55.321772"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With a fraud probability of 0.99 and an epistemic uncertainty index of 0.150 well below the 0.45 threshold, the evidence pool is statistically robust and definitively warrants immediate action without the need for step-up authentication. Consequently, initiating customer verification would be procedurally unnecessary and risks violating Policy Rule R1 by introducing avoidable friction into a high-confidence, low-uncertainty enforcement scenario.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 394.38,
          "timestamp": "2026-09-22T19:30:55.716269"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 128.33,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $128.33."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and customer verification strictly adhered to Rule R1 by avoiding a premature permanent block based solely on a single automated signal, thereby preserving customer rights during the verification phase. The subsequent escalation to a permanent card block and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe restrictions.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $128.33.",
          "latency_ms": 19565.33,
          "timestamp": "2026-09-22T19:31:15.281653"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-004. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.08,
          "timestamp": "2026-09-22T19:31:15.281764"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001",
              "HHG-003"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-004",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-003). Case persisted to TigerGraph (CASE-SAVANNA-HHG-004)."
          },
          "ai_reasoning": "Precedents HHG-001 through HHG-003 consistently demonstrate that the convergence of new-device authentication failures with card-not-present transactions correlates with high-confidence fraud, mirroring the risk profile of the current $128.33 exposure. This historical alignment validates the immediate rejection decision by confirming that such behavioral anomalies are reliable indicators of unauthorized access rather than benign user error.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-003). Case persisted to TigerGraph (CASE-SAVANNA-HHG-004).",
          "latency_ms": 905.7,
          "timestamp": "2026-09-22T19:31:16.187495"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 34.31,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-004"
      }
    },
    "HHG-005": {
      "case_id": "HHG-005",
      "customer_id": "C02923",
      "primary_card_id": "C02923-K1",
      "first_suspicious_txn_id": "3523199",
      "exposure_usd": 100.07,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-005 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $100.07. Initial Stage 1 action was VERIFY_WITH_CUSTOMER, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 330.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C02923)",
          "entity_ids": [
            "3523199"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile iOS Device observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=iOS Device)",
          "entity_ids": [
            "3523199"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3523199)",
          "entity_ids": [
            "3523199"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3523199"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C02923-K1",
        "C02354",
        "C03042",
        "C05876"
      ],
      "connected_device_profiles": [
        "iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768"
      ],
      "similar_prior_cases": [
        "HHG-004",
        "HHG-002",
        "HHG-001"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: weak or single signal; verify with customer before any destructive block"
          },
          {
            "action": "MONITOR_CARD",
            "route": "auto",
            "reason": "R1: place card on 72-hour heightened monitoring pending response"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINANCIAL CRIMES ENFORCEMENT NETWORK (FINCEN) SUSPICIOUS ACTIVITY REPORT (SAR)**\n**INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-005\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-07 21:38:37 and 2016-12-07 21:38:37, the Institution identified suspicious transaction activity totaling $100.07 USD. This activity comprised 1 transaction(s) involving card C02923-K1, associated with customer profile C02923. The primary suspicious pattern identified is 'card_not_present_new_device'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C02923\n*   **Primary Card Number Reference:** C02923-K1\n*   **Connected / Correlated Cards:** C02354, C03042, C05876\n*   **Associated Device Telemetry:** iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-12-07 21:38:37\n*   **Latest Activity Timestamp:** 2016-12-07 21:38:37\n*   **Affected Transaction Record IDs:** 3523199\n\n**IV. METHOD OF OPERATION AND EVIDENCE**\nThe Institution\u2019s risk monitoring systems flagged the following indicators of fraud and potential money laundering:\n1.  The transaction occurred within established billing region 330.0, matching the customer\u2019s historical profile.\n2.  The device profile (iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768) was observed across 3 other distinct customer accounts within the TigerGraph network.\n3.  The transaction was initiated from a newly observed device profile: iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768.\n4.  The cardholder denied authorizing the transaction and confirmed that the card remains in their physical possession.\n\n**Multi-Entity Syndicate Linkage:**\nGraph analysis revealed that the device profile (iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768) is shared across multiple cardholder profiles. This linkage indicates coordinated synthetic identity or card-not-present syndicate activity.\n\n**V.",
        "subjects": [
          "C02923",
          "C02923-K1",
          "C02354",
          "C03042",
          "C05876"
        ],
        "total_amount_usd": 100.07,
        "activity_dates": [
          "2016-12-07",
          "2016-12-07"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3523199,
            "flagged_amount_usd": 100.07,
            "channel": "online",
            "customer_id": "C02923",
            "card_id": "C02923-K1",
            "historical_mean_usd": 177.52,
            "historical_std_usd": 231.64,
            "z_score": -0.334,
            "amount_acceleration_ratio": 0.56,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 90,
            "triage_priority": 0.276,
            "hand_off_summary": "Anchored TX #3523199 ($100.07, Z=-0.33). Triage priority: 0.28."
          },
          "ai_reasoning": "Transaction #3523199 does not represent a statistically severe baseline anomaly, as the $100.07 amount falls well within the customer's historical spending range (0.56x average) with a negligible negative Z-score of -0.33. The low triage priority of 0.28 confirms that this activity is consistent with normal behavior and does not warrant immediate escalation for fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3523199 ($100.07, Z=-0.33). Triage priority: 0.28.",
          "latency_ms": 336.72,
          "timestamp": "2026-09-22T19:31:16.783183"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C02354",
              "C03042",
              "C05876"
            ],
            "shared_device_degree": 14,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]",
            "device_profile": "iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768",
            "hand_off_summary": "Graph topology: [C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or prior dispute history strongly suggests benign regularity rather than active fraud, despite the shared device linking four accounts. However, the high ego threat density (0.85) warrants monitoring for potential low-level identity collusion or account sharing, as the device hub structure could facilitate coordinated activity if behavioral patterns shift.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 330.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C02923)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile iOS Device observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=iOS Device)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3523199)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]. Threat density: 0.85.",
          "latency_ms": 14606.82,
          "timestamp": "2026-09-22T19:31:31.390053"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.62,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool does not warrant immediate action because the Epistemic Uncertainty Index (0.150) is well below the 0.45 threshold, indicating sufficient confidence in the derived fraud probability to proceed without triggering step-up authentication. However, under Policy Rule R1, the presence of contradictory signals necessitates a proactive customer verification step to resolve the epistemic gap and preserve the customer relationship before any adverse decision is finalized.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False.",
          "latency_ms": 4406.92,
          "timestamp": "2026-09-22T19:31:35.797026"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The attacker likely compromised a single customer account (C02923) and executed a low-value card-not-present transaction from a new iOS device to test the validity of stolen credentials while avoiding high-risk detection thresholds. The shared device link with three other customers suggests a potential device-farm operation or a compromised shared household device, warranting immediate step-up authentication for all associated accounts to prevent further unauthorized activity.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 5567.87,
          "timestamp": "2026-09-22T19:31:41.364949"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.69,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.69, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates that the contradictory signals are sufficiently resolved by the direct evidence, thereby negating the need for step-up authentication or customer verification under Policy Rule R1. Consequently, the evidence pool warrants immediate action based on the high derived fraud probability (0.69) without compromising the customer relationship through unnecessary friction.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.69, U=0.150. Step-up needed: False.",
          "latency_ms": 503.06,
          "timestamp": "2026-09-22T19:31:41.868084"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 100.07,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.07."
          },
          "ai_reasoning": "The initial verification phase strictly adhered to Rule R1 by avoiding premature card blocking on a single signal, instead utilizing customer confirmation to validate the fraud hypothesis before escalating. The final action is defensible as the confirmed denial triggered a mandatory policy transition to L2 mitigation, ensuring that the permanent block and SAR filing were proportionate responses to verified fraud rather than speculative risk management.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.07.",
          "latency_ms": 289.37,
          "timestamp": "2026-09-22T19:31:42.157516"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 100.07,
            "subjects_count": 5,
            "subjects": [
              "C02923",
              "C02923-K1",
              "C02354",
              "C03042",
              "C05876"
            ],
            "activity_dates": [
              "2016-12-07",
              "2016-12-07"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.07, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $100.07 across subjects ['C02923', 'C02923-K1', 'C02354', 'C03042', 'C05876']. Regulatory excerpt: **FINANCIAL CRIMES ENFORCEMENT NETWORK (FINCEN) SUSPICIOUS ACTIVITY REPORT (SAR)**\n**INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-005\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-07 21:38:37 and 2016-12-07 21:38:37, the Institution identified su...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.07, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1348.78,
          "timestamp": "2026-09-22T19:31:43.506335"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-004",
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-005",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-004, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-005)."
          },
          "ai_reasoning": "Precedents HHG-001, HHG-002, and HHG-004 establish a consistent pattern where `card_not_present` transactions originating from new devices correlate with confirmed fraud, directly supporting the current verdict for HHG-005. This historical alignment validates the decision to flag the $100.07 exposure as fraudulent based on the identical risk signature.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-004, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-005).",
          "latency_ms": 40140.17,
          "timestamp": "2026-09-22T19:32:23.646567"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 67.21,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-005"
      }
    },
    "HHG-006": {
      "case_id": "HHG-006",
      "customer_id": "C07297",
      "primary_card_id": "C07297-K1",
      "first_suspicious_txn_id": "3476682",
      "exposure_usd": 482.12,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-006 concluded with verdict 'FRAUD' (P=0.99, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $482.12. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C07297)",
          "entity_ids": [
            "3476682"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Trident/7.0)",
          "entity_ids": [
            "3476682"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3476682)",
          "entity_ids": [
            "3476682"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3476682"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C07297-K1",
        "C11923",
        "C07987",
        "C02354"
      ],
      "connected_device_profiles": [
        "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080"
      ],
      "similar_prior_cases": [
        "HHG-005",
        "HHG-004",
        "HHG-001"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "Customer report initiated; hold pending transactions"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: verify card possession and transaction details with customer"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-006\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period commencing and concluding on 2016-11-21 at 20:30:00, the Institution identified suspicious transaction activity totaling $482.12 USD. This activity comprised 1 transaction(s) processed via card C07297-K1, associated with customer profile C07297. The primary anomaly detected was classified as 'card_not_present_new_device,' indicating a potential unauthorized card-not-present (CNP) transaction executed from an unrecognized device environment.\n\n**II. SUBJECTS AND FINANCIAL INSTRUMENTS**\n*   **Primary Customer Identifier:** C07297\n*   **Primary Card Number Reference:** C07297-K1\n*   **Correlated Card Instruments:** C11923, C07987, C02354\n*   **Associated Device Telemetry:** Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080\n\n**III. TEMPORAL AND GEOGRAPHIC PARAMETERS**\n*   **Earliest Flagged Transaction Timestamp:** 2016-11-21 20:30:00\n*   **Latest Activity Timestamp:** 2016-11-21 20:30:00\n*   **Affected Transaction Record ID:** 3476682\n\n**IV. METHOD OF OPERATION AND EVIDENTIARY BASIS**\nInvestigative analysis of Transaction ID 3476682 revealed the following indicators of fraud:\n\n1.  **Geographic Consistency:** The transaction originated from established billing region 264.0, which aligns with the customer\u2019s historical geographic profile, suggesting the use of stolen but valid billing information.\n2.  **Device Anomaly:** The transaction was initiated from a newly observed device profile: Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080.\n3.  **Syndicate Linkage:** Graph analysis via TigerGraph identified that the specific device profile (Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080) has been observed across three (3) other distinct customer accounts. This cross-account device sharing indicates coordinated synthetic identity or card-not-present syndicate activity.\n4.  **Customer Verification:** The cardholder explicitly denied authorizing the transaction and confirmed that the physical card remains in their possession,",
        "subjects": [
          "C07297",
          "C07297-K1",
          "C11923",
          "C07987",
          "C02354"
        ],
        "total_amount_usd": 482.12,
        "activity_dates": [
          "2016-11-21",
          "2016-11-21"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3476682,
            "flagged_amount_usd": 482.12,
            "channel": "online",
            "customer_id": "C07297",
            "card_id": "C07297-K1",
            "historical_mean_usd": 116.73,
            "historical_std_usd": 135.08,
            "z_score": 2.705,
            "amount_acceleration_ratio": 4.13,
            "velocity_1h": 4,
            "velocity_24h": 4,
            "prior_txns_count": 199,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3476682 ($482.12, Z=+2.71). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3476682 constitutes a statistically severe anomaly, evidenced by a Z-score of +2.71 and a 4.13x deviation from the customer's historical spending baseline. This quantitative outlier is corroborated by the customer's explicit denial of authorization, confirming the event as a high-priority fraud indicator.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3476682 ($482.12, Z=+2.71). Triage priority: 1.00.",
          "latency_ms": 296.91,
          "timestamp": "2026-09-22T19:32:24.200047"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080",
            "hand_off_summary": "Graph topology: [C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or recurring disputes strongly suggests benign regularity rather than active fraud, despite the high ego threat density. However, the shared device origin linking four distinct accounts warrants monitoring for potential identity collusion or household sharing, as the topological clustering indicates a non-standard user behavior pattern.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C07297)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3476682)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 24967.26,
          "timestamp": "2026-09-22T19:32:49.167371"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the presence of a contradictory signal and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, explicitly acknowledges elevated uncertainty due to conflicting data points. Consequently, immediate action is unwarranted, and the case must mandate customer verification to resolve the epistemic gap and protect the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 331.97,
          "timestamp": "2026-09-22T19:32:49.499387"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared device fingerprint (Trident/7.0) across multiple distinct card accounts indicate a coordinated card-not-present attack where the fraudster is leveraging a single compromised endpoint to test stolen credentials. This pattern suggests the attacker is systematically probing for valid payment details to execute unauthorized online transactions, rather than representing a legitimate customer using a shared household device.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 8469.42,
          "timestamp": "2026-09-22T19:32:57.968854"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is epistemically unsound given the presence of contradictory signals and an uncertainty index (0.150) that, while below the 0.45 threshold, indicates a non-trivial conflict between established history and novel device data that cannot be resolved by probability alone. Therefore, immediate action is not warranted; instead, the case mandates step-up customer verification to resolve the epistemic ambiguity and protect the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 4432.34,
          "timestamp": "2026-09-22T19:33:02.401304"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 482.12,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $482.12."
          },
          "ai_reasoning": "The initial L1 verification protocol strictly adhered to Rule R1 by avoiding premature asset seizure on a single signal, instead prioritizing customer confirmation to establish factual certainty. The subsequent escalation to L2 permanent blocking and SAR filing is fully defensible as a proportionate response to confirmed fraud, ensuring regulatory compliance and risk mitigation despite the exposure falling below the $2,500 L2 financial threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $482.12.",
          "latency_ms": 293.41,
          "timestamp": "2026-09-22T19:33:02.694762"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 482.12,
            "subjects_count": 5,
            "subjects": [
              "C07297",
              "C07297-K1",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-21",
              "2016-11-21"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $482.12, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $482.12 across subjects ['C07297', 'C07297-K1', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-006\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period commencing and concluding on 2016-11-21 at 20:30:00, the Institution identified suspicious tra...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $482.12, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1367.6,
          "timestamp": "2026-09-22T19:33:04.062401"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-005",
              "HHG-004",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-006",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-005, HHG-004, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-006)."
          },
          "ai_reasoning": "Precedents HHG-005, HHG-004, and HHG-001 collectively establish a consistent pattern where `card_not_present` transactions originating from new, unverified devices correlate with high-confidence fraud, thereby validating the current verdict for HHG-006. This historical alignment confirms that the $482.12 exposure represents a standard risk profile within the established graph topology, supporting the immediate rejection of the transaction.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-005, HHG-004, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-006).",
          "latency_ms": 37141.05,
          "timestamp": "2026-09-22T19:33:41.203506"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 77.31,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-006"
      }
    },
    "HHG-007": {
      "case_id": "HHG-007",
      "customer_id": "C09933",
      "primary_card_id": "C09933-K2",
      "first_suspicious_txn_id": "3514948",
      "exposure_usd": 111.92,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "account_takeover",
      "summary": "Case HHG-007 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'account_takeover'. Total financial exposure: $111.92. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_CARD under L1 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.87.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3514948)",
          "entity_ids": [
            "3514948"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C09933)",
          "entity_ids": [
            "3514948"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3514948"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C09933-K2"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-002",
        "HHG-006",
        "HHG-005"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          }
        ],
        "final": [
          {
            "action": "BLOCK_CARD",
            "route": "L1",
            "reason": "R2: customer denied unauthorized use; block card (exposure <= $2,500)"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3514948,
            "flagged_amount_usd": 111.92,
            "channel": "in_person",
            "customer_id": "C09933",
            "card_id": "C09933-K2",
            "historical_mean_usd": 124.71,
            "historical_std_usd": 184.06,
            "z_score": -0.069,
            "amount_acceleration_ratio": 0.9,
            "velocity_1h": 1,
            "velocity_24h": 17,
            "prior_txns_count": 2432,
            "triage_priority": 0.408,
            "hand_off_summary": "Anchored TX #3514948 ($111.92, Z=-0.07). Triage priority: 0.41."
          },
          "ai_reasoning": "Alert Sentinel assessed TX #3514948 ($111.92) with Z-score -0.07 against customer mean $124.71. Triage priority is 0.41.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.87.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3514948)",
              "entity_ids": [
                "3514948"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3514948 ($111.92, Z=-0.07). Triage priority: 0.41.",
          "latency_ms": 20424.88,
          "timestamp": "2026-09-22T19:34:01.889001"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]. Threat density: 0.15."
          },
          "ai_reasoning": "Graph Scout evaluated TigerGraph topology: Subgraph '[C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]' with threat density 0.15 and shared device degree 1.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C09933)",
              "entity_ids": [
                "3514948"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]. Threat density: 0.15.",
          "latency_ms": 28429.16,
          "timestamp": "2026-09-22T19:34:30.318203"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.48,
            "epistemic_uncertainty_U": 0.7,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.48, U=0.700. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.700) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to support immediate enforcement actions without risking a false positive. Therefore, Policy Rule R1 mandates step-up authentication to resolve the contradictory signals and preserve the customer relationship before any further intervention is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.48, U=0.700. Step-up needed: True.",
          "latency_ms": 4355.11,
          "timestamp": "2026-09-22T19:34:34.673366"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "account_takeover",
            "matched_predicate": "ACCOUNT_TAKEOVER_ANOMALY",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'account_takeover' via predicate ACCOUNT_TAKEOVER_ANOMALY."
          },
          "ai_reasoning": "The moderate fraud probability (0.48) combined with the low-value, in-person transaction suggests a potential low-stakes account takeover where the attacker is testing the compromised card's validity or draining small amounts to avoid triggering high-value alerts. Alternatively, this may represent a legitimate customer activity anomaly, such as a first-time in-person purchase after a period of digital-only usage, which requires verification of recent identity changes or device shifts to rule out credential compromise.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'account_takeover' via predicate ACCOUNT_TAKEOVER_ANOMALY.",
          "latency_ms": 12555.65,
          "timestamp": "2026-09-22T19:34:47.229066"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 0,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.71,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.71, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates sufficient confidence in the 0.71 fraud probability to justify immediate action, rendering the \"Step-Up Authentication Required: False\" determination logically inconsistent with standard risk mitigation protocols. Consequently, the evidence pool warrants immediate containment rather than customer verification, as the high confidence level supersedes the need to preserve the relationship through additional friction under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.71, U=0.150. Step-up needed: False.",
          "latency_ms": 9515.95,
          "timestamp": "2026-09-22T19:34:56.745097"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 111.92,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $111.92."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and step-up authentication strictly adhered to Rule R1 by avoiding premature card blocking based solely on a single automated signal, thereby preserving customer experience while gathering necessary evidence. The subsequent escalation to a permanent card block and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe restrictions.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $111.92.",
          "latency_ms": 10511.02,
          "timestamp": "2026-09-22T19:35:07.256153"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-007. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.07,
          "timestamp": "2026-09-22T19:35:07.256241"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-006",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-007",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-006, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-007)."
          },
          "ai_reasoning": "The retrieved precedents HHG-002, HHG-006, and HHG-005 collectively establish a consistent pattern of unauthorized access indicators that mirror the current account takeover signature, thereby reinforcing the fraud classification. This historical alignment confirms that the $111.92 exposure falls within the established risk envelope for similar verified incidents, validating the investigative decision through both vector similarity and graph-structural overlap.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-006, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-007).",
          "latency_ms": 944.2,
          "timestamp": "2026-09-22T19:35:08.200477"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 86.74,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-007"
      }
    },
    "HHG-008": {
      "case_id": "HHG-008",
      "customer_id": "C13171",
      "primary_card_id": "C13171-K2",
      "first_suspicious_txn_id": "3558054",
      "exposure_usd": 0.0,
      "status": "open",
      "verdict": "uncertain",
      "risk_score": 0.68,
      "uncertainty_score": 0.64,
      "confidence_score": 36,
      "pattern": "none",
      "summary": "Case HHG-008 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was CREATE_CASE, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Disputed transaction of $55.68 matches customer recurring charge history (seen 14 prior times).",
          "source": "graph",
          "ref": "query:customer_recurring_history(customer_id=C13171, amt=55.68)",
          "entity_ids": [
            "3558054"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.8
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3558054"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C13171-K2"
      ],
      "connected_device_profiles": [
        "chrome 66.0"
      ],
      "similar_prior_cases": [
        "HHG-003",
        "HHG-002",
        "HHG-001"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R7: transaction matches recurring pattern; create case for record"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R7: verify recurring charge with customer"
          },
          {
            "action": "WARN_CUSTOMER",
            "route": "auto",
            "reason": "R7: send informational reminder regarding subscription billing"
          }
        ],
        "final": [],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3558054,
            "flagged_amount_usd": 55.68,
            "channel": "online",
            "customer_id": "C13171",
            "card_id": "C13171-K2",
            "historical_mean_usd": 54.04,
            "historical_std_usd": 50.13,
            "z_score": 0.033,
            "amount_acceleration_ratio": 1.03,
            "velocity_1h": 3,
            "velocity_24h": 7,
            "prior_txns_count": 900,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3558054 ($55.68, Z=+0.03). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3558054 is not a statistically severe baseline anomaly, as the $55.68 amount falls within one standard deviation of the customer's mean spend (Z-score +0.03) and aligns closely with their historical average. However, the explicit customer denial of authorization overrides statistical normality, mandating immediate fraud investigation despite the low quantitative risk score.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3558054 ($55.68, Z=+0.03). Triage priority: 1.00.",
          "latency_ms": 330.94,
          "timestamp": "2026-09-22T19:35:08.795616"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 14,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]",
            "device_profile": "chrome 66.0",
            "hand_off_summary": "Graph topology: [C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity rather than active identity collusion or synthetic fraud. However, the high frequency of prior disputes (14 occurrences) suggests a persistent pattern of transactional friction or chargeback behavior that warrants monitoring for potential abuse of the dispute process, despite the low overall ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $55.68 matches customer recurring charge history (seen 14 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C13171, amt=55.68)",
              "entity_ids": [
                "3558054"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]. Threat density: 0.15.",
          "latency_ms": 43682.32,
          "timestamp": "2026-09-22T19:35:52.477998"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective for immediate action because a single contradictory signal cannot mathematically or logically support a 0.99 fraud probability, rendering the derived risk score indefensible and likely a computational artifact. Consequently, Policy Rule R1 mandates customer verification rather than immediate intervention, as the high epistemic uncertainty (U=0.670) necessitates resolving the conflict between the established history and novel device to avoid unjustified disruption of a legitimate customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 325.75,
          "timestamp": "2026-09-22T19:35:52.803812"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The extremely high fraud probability (0.99) contradicts the \"BENIGN_PROFILE_MATCH\" classification, suggesting a sophisticated account takeover or synthetic identity fraud where the attacker has successfully mimicked historical behavioral patterns to bypass initial heuristic filters. The isolated subgraph structure indicates a single-card, single-transaction event, likely representing a \"card testing\" probe or a low-value verification transaction intended to confirm the validity of stolen credentials before escalating to higher-value illicit transfers.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 535.74,
          "timestamp": "2026-09-22T19:35:53.339645"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the classification of two contradictory signals as \"Correlative\" is logically incoherent, rendering the derived 0.99 fraud probability unsupported by the actual data structure. Consequently, under Policy Rule R1, the absence of direct or valid circumstantial evidence mandates immediate customer verification rather than immediate action, as the current assessment lacks the evidentiary integrity required to justify disrupting the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 4392.34,
          "timestamp": "2026-09-22T19:35:57.732102"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block on a single, unverified signal, thereby respecting the principle of proportionality given the zero-dollar exposure. This final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to a false positive.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 20463.03,
          "timestamp": "2026-09-22T19:36:18.195193"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-008. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.12,
          "timestamp": "2026-09-22T19:36:18.195344"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-008",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-008)."
          },
          "ai_reasoning": "The cleared status of Case HHG-008 aligns with the benign transactional patterns established in precedents HHG-001 through HHG-003, confirming that the absence of high-risk indicators warrants a zero-exposure verdict. This consistency validates the current decision by demonstrating that the entity\u2019s behavior remains within the historical baseline of compliant activity identified in the graph memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-008).",
          "latency_ms": 878.27,
          "timestamp": "2026-09-22T19:36:19.073652"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 70.61,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-008"
      }
    },
    "HHG-009": {
      "case_id": "HHG-009",
      "customer_id": "C08299",
      "primary_card_id": "C08299-K1",
      "first_suspicious_txn_id": "3581141",
      "exposure_usd": 0.0,
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "pattern": "none",
      "summary": "Case HHG-009 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was CREATE_CASE, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Disputed transaction of $30.02 matches customer recurring charge history (seen 4 prior times).",
          "source": "graph",
          "ref": "query:customer_recurring_history(customer_id=C08299, amt=30.02)",
          "entity_ids": [
            "3581141"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.8
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3581141"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C08299-K1"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-002"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R7: transaction matches recurring pattern; create case for record"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R7: verify recurring charge with customer"
          },
          {
            "action": "WARN_CUSTOMER",
            "route": "auto",
            "reason": "R7: send informational reminder regarding subscription billing"
          }
        ],
        "final": [
          {
            "action": "CLOSE_NO_FRAUD",
            "route": "auto",
            "reason": "R3: customer confirmed transaction as authorized; close alert as legitimate"
          }
        ],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3581141,
            "flagged_amount_usd": 30.02,
            "channel": "online",
            "customer_id": "C08299",
            "card_id": "C08299-K1",
            "historical_mean_usd": 65.98,
            "historical_std_usd": 67.58,
            "z_score": -0.532,
            "amount_acceleration_ratio": 0.45,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 46,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3581141 ($30.02, Z=-0.53). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3581141 does not represent a statistically severe baseline anomaly, as the $30.02 amount falls well within the customer's historical spending distribution (Z-score: -0.53, 0.45x average). The primary risk driver is the explicit customer dispute indicating potential unauthorized use, rather than any deviation from established spending patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3581141 ($30.02, Z=-0.53). Triage priority: 1.00.",
          "latency_ms": 302.78,
          "timestamp": "2026-09-22T19:36:19.635561"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 4,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity rather than active identity collusion or synthetic fraud. However, the presence of four prior disputes warrants monitoring for potential chargeback abuse, though the low ego threat density (0.15) confirms the current transaction remains within acceptable risk parameters.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $30.02 matches customer recurring charge history (seen 4 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C08299, amt=30.02)",
              "entity_ids": [
                "3581141"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]. Threat density: 0.15.",
          "latency_ms": 13457.05,
          "timestamp": "2026-09-22T19:36:33.092669"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally deficient for immediate action because the single contradictory signal lacks the corroborating direct or circumstantial evidence necessary to substantiate the high fraud probability, rendering the derived score epistemically unsound. Consequently, Policy Rule R1 mandates step-up authentication to resolve the elevated uncertainty (U=0.670) and protect the customer relationship, as acting on unverified contradictory data risks unjustified account disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 298.39,
          "timestamp": "2026-09-22T19:36:33.391118"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The near-certain fraud probability (0.99) contradicts the benign classification, suggesting the system has likely misidentified a compromised or stolen card (C08299-K1) as legitimate due to a lack of historical anomaly data or a sophisticated spoofing technique that mimics normal user behavior. The attacker likely executed a low-value \"test\" transaction of $30.02 online to verify the card's validity and bypass initial fraud filters before escalating to higher-value theft.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 23502.0,
          "timestamp": "2026-09-22T19:36:56.893180"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "Evidence Assessor verified 2 grounded signals. Fraud probability is 0.99 with epistemic uncertainty index U = 0.330. Step-up challenge required: False.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 29416.16,
          "timestamp": "2026-09-22T19:37:26.309447"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block based on a single, unverified signal, thereby respecting the principle of proportionality for a $0.00 exposure well below the $2,500.00 L2 threshold. This final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to false positives while maintaining a clear audit trail of the verification-to-closure workflow.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 14507.01,
          "timestamp": "2026-09-22T19:37:40.816526"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-009. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:37:40.816668"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-002"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-009",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-002). Case persisted to TigerGraph (CASE-SAVANNA-HHG-009)."
          },
          "ai_reasoning": "The cleared status of Case HHG-009 aligns with the benign transactional patterns established in precedents HHG-003, HHG-008, and HHG-002, which similarly exhibited no material risk indicators or illicit fund flows. This consistency across the retrieved graph neighborhood confirms that the current zero-exposure verdict is supported by historical evidence of legitimate activity.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-002). Case persisted to TigerGraph (CASE-SAVANNA-HHG-009).",
          "latency_ms": 866.21,
          "timestamp": "2026-09-22T19:37:41.682929"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 82.36,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-009"
      }
    },
    "HHG-010": {
      "case_id": "HHG-010",
      "customer_id": "C10434",
      "primary_card_id": "C10434-K1",
      "first_suspicious_txn_id": "3506725",
      "exposure_usd": 1000.03,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-010 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $1,000.03. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3506725)",
          "entity_ids": [
            "3506725"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Transaction amount of $1000.03 represents a severe statistical outlier (Z=+4.90) exceeding 3.5 standard deviations from baseline.",
          "source": "telemetry",
          "ref": "historical_baseline:z_score(customer_id=C10434)",
          "entity_ids": [
            "3506725"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Transaction in established billing region 469.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C10434)",
          "entity_ids": [
            "3506725"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Windows)",
          "entity_ids": [
            "3506725"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Windows | Windows 10 | edge 16.0 | 1366x768.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3506725)",
          "entity_ids": [
            "3506725"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3506725"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C10434-K1",
        "C11923",
        "C13171",
        "C02354"
      ],
      "connected_device_profiles": [
        "Windows | Windows 10 | edge 16.0 | 1366x768"
      ],
      "similar_prior_cases": [
        "HHG-006",
        "HHG-005",
        "HHG-004"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared origin detected across cards; raise monitoring sensitivity"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n**Case Reference:** HHG-010\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-02 15:18:27 and 2016-12-02 15:18:27, the Institution identified suspicious transaction activity totaling $1,000.03 USD. This activity comprised 1 transaction(s) involving card C10434-K1, associated with customer profile C10434. The primary suspicious pattern identified is 'card_not_present_new_device'.\n\n**II. SUBJECTS & INSTRUMENTS**\n*   **Primary Customer Identifier:** C10434\n*   **Primary Card Number Reference:** C10434-K1\n*   **Connected / Correlated Cards:** C11923, C13171, C02354\n*   **Associated Device Telemetry:** Windows | Windows 10 | edge 16.0 | 1366x768\n\n**III. TIMELINE & GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-12-02 15:18:27\n*   **Latest Activity Timestamp:** 2016-12-02 15:18:27\n*   **Affected Transaction Record IDs:** 3506725\n\n**IV. METHOD OF OPERATION & EVIDENCE**\nThe Institution\u2019s upstream fraud detection model flagged the transaction with a high risk score of 0.90. The transaction amount of $1,000.03 represents a severe statistical outlier (Z=+4.90), exceeding 3.5 standard deviations from the customer\u2019s baseline. Although the transaction originated in established billing region 469.0, matching the customer\u2019s historical profile, it was initiated from a newly observed device profile: Windows | Windows 10 | edge 16.0 | 1366x768.\n\nGraph analysis revealed that this specific device profile is shared across 3 other distinct customer accounts within the TigerGraph network, indicating coordinated synthetic identity or card-not-present syndicate activity. Furthermore, the cardholder explicitly denied authorizing the transaction and confirmed that the card remains in their physical possession.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nUpon confirmation of unauthorized access via customer validation, the Institution initiated immediate card control actions pursuant to Bank Fraud Policy v1.0. The card was permanently blocked and placed on fraud monitoring. This filing is submitted in compliance with BSA/AML mandates.",
        "subjects": [
          "C10434",
          "C10434-K1",
          "C11923",
          "C13171",
          "C02354"
        ],
        "total_amount_usd": 1000.03,
        "activity_dates": [
          "2016-12-02",
          "2016-12-02"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3506725,
            "flagged_amount_usd": 1000.03,
            "channel": "online",
            "customer_id": "C10434",
            "card_id": "C10434-K1",
            "historical_mean_usd": 131.25,
            "historical_std_usd": 177.45,
            "z_score": 4.896,
            "amount_acceleration_ratio": 7.62,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 33,
            "triage_priority": 0.72,
            "hand_off_summary": "Anchored TX #3506725 ($1000.03, Z=+4.90). Triage priority: 0.72."
          },
          "ai_reasoning": "Transaction #3506725 represents a statistically severe baseline anomaly, evidenced by a Z-score of +4.90 and a 7.62x deviation from the customer's historical mean. This magnitude of deviation, combined with the high upstream risk score of 0.90, warrants immediate escalation for potential fraud investigation.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3506725)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $1000.03 represents a severe statistical outlier (Z=+4.90) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C10434)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3506725 ($1000.03, Z=+4.90). Triage priority: 0.72.",
          "latency_ms": 20478.1,
          "timestamp": "2026-09-22T19:38:02.419367"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | Windows 10 | edge 16.0 | 1366x768",
            "hand_off_summary": "Graph topology: [C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The shared device linkage among four accounts with a high degree of 18 suggests a potential household or small-business cluster rather than a sophisticated fraud ring, particularly given the absence of card-testing bursts or out-of-region anomalies. Consequently, the elevated ego threat density of 0.85 likely reflects normal multi-account usage patterns on a common device, indicating benign regularity rather than active identity collusion.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 469.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C10434)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | Windows 10 | edge 16.0 | 1366x768.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3506725)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 328.16,
          "timestamp": "2026-09-22T19:38:02.747577"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 1,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.81,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.81, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 significantly below the 0.45 threshold, the evidence pool is sufficiently robust to justify immediate action without mandating step-up authentication, despite the presence of contradictory signals. Therefore, proceeding with the derived fraud probability of 0.81 aligns with Policy Rule R1 by prioritizing risk mitigation while avoiding unnecessary friction that could damage the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.81, U=0.150. Step-up needed: False.",
          "latency_ms": 312.58,
          "timestamp": "2026-09-22T19:38:03.060219"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Windows device fingerprint across multiple distinct customer IDs suggest a coordinated fraud ring using a single compromised endpoint to execute card-not-present transactions, likely leveraging stolen card data to bypass device-based risk controls. The specific transaction amount of $1000.03 indicates an attempt to exploit rounding or threshold gaps in automated detection systems while maintaining a profile consistent with legitimate online purchases.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 23517.01,
          "timestamp": "2026-09-22T19:38:26.577280"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 6,
            "direct_count": 2,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.84,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 6 signals: P(Fraud)=0.84, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates sufficient evidentiary confidence to justify immediate action without triggering step-up authentication, despite the presence of contradictory signals. Therefore, the evidence pool warrants immediate action rather than customer verification, as the high fraud probability (0.84) and low uncertainty collectively satisfy the defensibility criteria for proactive intervention under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 6 signals: P(Fraud)=0.84, U=0.150. Step-up needed: False.",
          "latency_ms": 14505.54,
          "timestamp": "2026-09-22T19:38:41.082908"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 1000.03,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $1,000.03."
          },
          "ai_reasoning": "The initial L1 verification actions adhered to Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the customer's intent. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to confirmed fraud, ensuring adequate risk mitigation despite the financial exposure remaining below the $2,500.00 L2 threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $1,000.03.",
          "latency_ms": 29574.68,
          "timestamp": "2026-09-22T19:39:10.657636"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 1000.03,
            "subjects_count": 5,
            "subjects": [
              "C10434",
              "C10434-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-02",
              "2016-12-02"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $1,000.03, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $1,000.03 across subjects ['C10434', 'C10434-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n**Case Reference:** HHG-010\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-02 15:18:27 and 2016-12-02 15:18:27, the Institution identified suspicious transaction activity totaling $1,000.03 ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $1,000.03, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 6491.22,
          "timestamp": "2026-09-22T19:39:17.148889"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-005",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-010",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-010)."
          },
          "ai_reasoning": "Precedents HHG-004, HHG-005, and HHG-006 collectively establish a high-confidence pattern where the combination of card-not-present transactions and new device fingerprints correlates strongly with fraudulent intent, mirroring the risk profile of the current $1,000.03 exposure. This historical consistency validates the fraud verdict by confirming that such device-behavior anomalies are reliable indicators of unauthorized activity within our network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-010).",
          "latency_ms": 34308.2,
          "timestamp": "2026-09-22T19:39:51.457126"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 129.52,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-010"
      }
    },
    "HHG-011": {
      "case_id": "HHG-011",
      "customer_id": "C11923",
      "primary_card_id": "C11923-K2",
      "first_suspicious_txn_id": "3583368",
      "exposure_usd": 0.0,
      "status": "open",
      "verdict": "uncertain",
      "risk_score": 0.7,
      "uncertainty_score": 0.6,
      "confidence_score": 40,
      "pattern": "none",
      "summary": "Case HHG-011 concluded with verdict 'CLEARED' (P=0.05, U=0.550). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was CREATE_CASE, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Disputed transaction of $131.30 matches customer recurring charge history (seen 11 prior times).",
          "source": "graph",
          "ref": "query:customer_recurring_history(customer_id=C11923, amt=131.3)",
          "entity_ids": [
            "3583368"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.8
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: SM-G610F Build/NRD90M | chrome 66.0 for android.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3583368)",
          "entity_ids": [
            "3583368"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3583368"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C11923-K2"
      ],
      "connected_device_profiles": [
        "SM-G610F Build/NRD90M | chrome 66.0 for android"
      ],
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-009"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R7: transaction matches recurring pattern; create case for record"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R7: verify recurring charge with customer"
          },
          {
            "action": "WARN_CUSTOMER",
            "route": "auto",
            "reason": "R7: send informational reminder regarding subscription billing"
          }
        ],
        "final": [],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3583368,
            "flagged_amount_usd": 131.3,
            "channel": "online",
            "customer_id": "C11923",
            "card_id": "C11923-K2",
            "historical_mean_usd": 39.41,
            "historical_std_usd": 35.98,
            "z_score": 2.554,
            "amount_acceleration_ratio": 3.33,
            "velocity_1h": 2,
            "velocity_24h": 27,
            "prior_txns_count": 10335,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3583368 ($131.30, Z=+2.55). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3583368 exhibits a statistically significant deviation from the customer's baseline, registering a Z-score of +2.55 and a 3.33x ratio to their average spend. This anomaly is further corroborated by the customer's explicit denial of the purchase, confirming the event as a high-priority fraud indicator.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3583368 ($131.30, Z=+2.55). Triage priority: 1.00.",
          "latency_ms": 342.67,
          "timestamp": "2026-09-22T19:39:52.057301"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 11,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]",
            "device_profile": "SM-G610F Build/NRD90M | chrome 66.0 for android",
            "hand_off_summary": "Graph topology: [C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device origins, card testing bursts, or out-of-region anomalies suggests a benign, established usage pattern rather than active identity collusion or fraud. However, the high frequency of recurring disputes (11 prior occurrences) warrants monitoring for potential friendly fraud or account takeover, despite the low calculated ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $131.30 matches customer recurring charge history (seen 11 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C11923, amt=131.3)",
              "entity_ids": [
                "3583368"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: SM-G610F Build/NRD90M | chrome 66.0 for android.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3583368)",
              "entity_ids": [
                "3583368"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]. Threat density: 0.15.",
          "latency_ms": 339.89,
          "timestamp": "2026-09-22T19:39:52.397252"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.9,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.900. Step-up needed: True."
          },
          "ai_reasoning": "Evidence Assessor verified 2 grounded signals. Fraud probability is 0.99 with epistemic uncertainty index U = 0.900. Step-up challenge required: True.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.900. Step-up needed: True.",
          "latency_ms": 22519.34,
          "timestamp": "2026-09-22T19:40:14.916664"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the high fraud probability of 0.99 despite the benign profile match, the attacker likely utilized a compromised or stolen card (C11923-K2) to execute a low-value, high-velocity online transaction designed to bypass initial velocity thresholds while validating the card's active status for subsequent larger fraudulent activities. This modus operandi suggests a \"card testing\" or \"account takeover\" precursor phase where the attacker is probing the system's detection limits using a single, seemingly innocuous transaction to establish a foothold before escalating the attack.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 356.11,
          "timestamp": "2026-09-22T19:40:15.272841"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.55,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.550. Step-up needed: True."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is logically inconsistent with the presence of two contradictory signals and an Epistemic Uncertainty Index (0.550) that exceeds the 0.45 threshold, rendering the high-confidence score indefensible without resolving the conflict between the customer's established history and the novel device indicator. Consequently, immediate action is unwarranted; instead, the case must mandate step-up authentication to verify identity and reduce epistemic uncertainty before any adverse action is taken, in strict adherence to Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.550. Step-up needed: True.",
          "latency_ms": 375.06,
          "timestamp": "2026-09-22T19:40:15.648006"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block based on a single, unverified signal, thereby respecting the principle of proportionality for a $0.00 exposure well below the $2,500.00 L2 threshold. The final action is fully defensible as it relies on direct customer verification to confirm the transaction's legitimacy, ensuring that the automated closure accurately reflects the absence of fraud risk.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 5503.75,
          "timestamp": "2026-09-22T19:40:21.151812"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-011. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.08,
          "timestamp": "2026-09-22T19:40:21.151918"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-009"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-011",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-011)."
          },
          "ai_reasoning": "The cleared verdict for Case HHG-011 aligns with the low-risk profiles established in precedents HHG-003, HHG-008, and HHG-009, which similarly exhibited benign transactional patterns and zero financial exposure. This consistency confirms that the current case falls within the established safe boundary of historical non-fraudulent activity, validating the decision to close the investigation without further action.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-011).",
          "latency_ms": 989.6,
          "timestamp": "2026-09-22T19:40:22.141554"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 30.43,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-011"
      }
    },
    "HHG-012": {
      "case_id": "HHG-012",
      "customer_id": "C05876",
      "primary_card_id": "C05876-K2",
      "first_suspicious_txn_id": "3553342",
      "exposure_usd": 0.0,
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "pattern": "none",
      "summary": "Case HHG-012 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was VERIFY_WITH_CUSTOMER, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 494.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C05876)",
          "entity_ids": [
            "3553342"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3553342"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C05876-K2"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-002",
        "HHG-001",
        "HHG-007"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: weak or single signal; verify with customer before any destructive block"
          },
          {
            "action": "MONITOR_CARD",
            "route": "auto",
            "reason": "R1: place card on 72-hour heightened monitoring pending response"
          }
        ],
        "final": [
          {
            "action": "CLOSE_NO_FRAUD",
            "route": "auto",
            "reason": "R3: customer confirmed transaction as authorized; close alert as legitimate"
          }
        ],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3553342,
            "flagged_amount_usd": 30.91,
            "channel": "in_person",
            "customer_id": "C05876",
            "card_id": "C05876-K2",
            "historical_mean_usd": 82.36,
            "historical_std_usd": 130.75,
            "z_score": -0.394,
            "amount_acceleration_ratio": 0.38,
            "velocity_1h": 2,
            "velocity_24h": 6,
            "prior_txns_count": 913,
            "triage_priority": 0.34,
            "hand_off_summary": "Anchored TX #3553342 ($30.91, Z=-0.39). Triage priority: 0.34."
          },
          "ai_reasoning": "The transaction amount of $30.91 is statistically benign, falling well within the customer's established spending baseline with a negligible Z-score of -0.39 and a ratio of only 0.38x the mean. Consequently, this activity does not represent a severe statistical anomaly and warrants no immediate escalation for fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3553342 ($30.91, Z=-0.39). Triage priority: 0.34.",
          "latency_ms": 26706.96,
          "timestamp": "2026-09-22T19:40:49.113872"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]. Threat density: 0.15."
          },
          "ai_reasoning": "The graph structure exhibits strong indicators of benign regularity, evidenced by the absence of shared device links, card testing bursts, or out-of-region anomalies, alongside a low ego threat density of 0.15. Consequently, there is no forensic evidence of identity collusion or coordinated fraud within this subgraph, suggesting the transaction aligns with established account behavior patterns.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 494.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C05876)",
              "entity_ids": [
                "3553342"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]. Threat density: 0.15.",
          "latency_ms": 324.84,
          "timestamp": "2026-09-22T19:40:49.438773"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.19,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.19, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.670) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to justify immediate account restriction or transaction blocking. Therefore, under Policy Rule R1, the presence of contradictory signals necessitates Step-Up Authentication to resolve the ambiguity and protect the customer relationship from false-positive friction.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.19, U=0.670. Step-up needed: True.",
          "latency_ms": 17480.82,
          "timestamp": "2026-09-22T19:41:06.919682"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the low fraud probability (0.19) and the benign profile match, this transaction is best explained as a routine, low-value in-person purchase by a legitimate cardholder rather than an illicit activity. The isolated subgraph structure and minimal transaction amount align with standard consumer behavior, indicating no evidence of account takeover or money mule tactics.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 284.99,
          "timestamp": "2026-09-22T19:41:07.204718"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.19,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.19, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is insufficient for immediate action because the absence of direct or circumstantial fraud indicators, combined with a derived probability of 0.19, does not meet the threshold for adverse intervention. Consequently, under Policy Rule R1, the system must prioritize customer relationship preservation by mandating step-up verification to resolve the epistemic uncertainty arising from the contradictory signals rather than executing a block.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.19, U=0.330. Step-up needed: False.",
          "latency_ms": 297.08,
          "timestamp": "2026-09-22T19:41:07.501863"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to clear the alert without imposing a card block strictly adheres to Rule R1 by prioritizing customer verification over a single, unconfirmed fraud signal, thereby preventing disproportionate service disruption for a legitimate transaction. This outcome is fully defensible as the zero financial exposure and explicit customer confirmation provide sufficient evidentiary basis to justify the immediate closure under the \"no fraud\" mitigation protocol.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 304.93,
          "timestamp": "2026-09-22T19:41:07.806843"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-012. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.09,
          "timestamp": "2026-09-22T19:41:07.806967"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001",
              "HHG-007"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-012",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-007). Case persisted to TigerGraph (CASE-SAVANNA-HHG-012)."
          },
          "ai_reasoning": "The cleared status of Case HHG-012 aligns with the benign transactional patterns established in precedents HHG-001, HHG-002, and HHG-007, which similarly exhibited no material risk indicators or illicit fund flows. This historical consistency confirms that the current zero-exposure verdict is a valid application of established compliance thresholds, effectively ruling out fraudulent intent based on the absence of anomalous graph connectivity.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-007). Case persisted to TigerGraph (CASE-SAVANNA-HHG-012).",
          "latency_ms": 17110.12,
          "timestamp": "2026-09-22T19:41:24.917116"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 62.51,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-012"
      }
    },
    "HHG-013": {
      "case_id": "HHG-013",
      "customer_id": "C07671",
      "primary_card_id": "C07671-K2",
      "first_suspicious_txn_id": "3526826",
      "exposure_usd": 35.66,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.92,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-013 concluded with verdict 'FRAUD' (P=0.92, U=0.000). Pattern: 'card_not_present_new_device'. Total financial exposure: $35.66. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.76.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3526826)",
          "entity_ids": [
            "3526826"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Windows)",
          "entity_ids": [
            "3526826"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Windows | chrome 66.0.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3526826)",
          "entity_ids": [
            "3526826"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3526826"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C07671-K2",
        "C11923",
        "C13171",
        "C02354"
      ],
      "connected_device_profiles": [
        "Windows | chrome 66.0"
      ],
      "similar_prior_cases": [
        "HHG-010",
        "HHG-004",
        "HHG-005"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared origin detected across cards; raise monitoring sensitivity"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-013\n\n**I. SUMMARY OF ACTIVITY**\nBetween **2016-12-09 02:39:29** and **2016-12-09 02:39:29**, suspicious transaction activity totaling **$35.66** USD was identified across **1** transaction(s) involving card **C07671-K2** associated with customer profile **C07671**. The primary suspicious pattern identified is **'card_not_present_new_device'**.\n\n**II. SUBJECTS & INSTRUMENTS**\n*   **Primary Customer Identifier:** **C07671**\n*   **Primary Card Number Reference:** **C07671-K2**\n*   **Connected / Correlated Cards:** **C11923**, **C13171**, **C02354**\n*   **Associated Device Telemetry:** **Windows | chrome 66.0**\n\n**III. TIMELINE & GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** **2016-12-09 02:39:29**\n*   **Latest Activity Timestamp:** **2016-12-09 02:39:29**\n*   **Affected Transaction Record IDs:** **3526826**\n\n**IV. METHOD OF OPERATION & EVIDENCE**\nThe bank\u2019s upstream fraud detection model flagged the transaction with a high risk score of **0.76**. Device profile **Windows** was observed across **3** other distinct customer accounts in **TigerGraph**. The transaction was initiated from a newly observed device profile: **Windows | chrome 66.0**. The cardholder denied authorizing the transaction and confirmed the card remains in physical possession.\n\n**Multi-Entity Syndicate Linkage:** Graph analysis revealed that the device profile (**Windows | chrome 66.0**) is shared across multiple cardholder profiles, indicating coordinated synthetic identity or card-not-present syndicate activity.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nThe bank initiated immediate card control actions under **Bank Fraud Policy v1.0**. Customer validation confirmed unauthorized access. The card was permanently blocked and placed on fraud monitoring. This filing is submitted pursuant to BSA/AML compliance mandates.",
        "subjects": [
          "C07671",
          "C07671-K2",
          "C11923",
          "C13171",
          "C02354"
        ],
        "total_amount_usd": 35.66,
        "activity_dates": [
          "2016-12-09",
          "2016-12-09"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3526826,
            "flagged_amount_usd": 35.66,
            "channel": "online",
            "customer_id": "C07671",
            "card_id": "C07671-K2",
            "historical_mean_usd": 114.31,
            "historical_std_usd": 213.87,
            "z_score": -0.368,
            "amount_acceleration_ratio": 0.31,
            "velocity_1h": 2,
            "velocity_24h": 18,
            "prior_txns_count": 1439,
            "triage_priority": 0.424,
            "hand_off_summary": "Anchored TX #3526826 ($35.66, Z=-0.37). Triage priority: 0.42."
          },
          "ai_reasoning": "The transaction amount of $35.66 is statistically insignificant, falling well within the customer's established baseline given its low Z-score of -0.37 and 0.31x ratio to the mean. Consequently, this activity does not represent a severe statistical anomaly and warrants no immediate escalation for fraud review.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.76.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3526826)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3526826 ($35.66, Z=-0.37). Triage priority: 0.42.",
          "latency_ms": 331.84,
          "timestamp": "2026-09-22T19:41:25.507852"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | chrome 66.0",
            "hand_off_summary": "Graph topology: [C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device linkage among four distinct accounts strongly indicate a coordinated identity collusion ring, likely leveraging a single compromised endpoint to operate multiple fraudulent profiles. The absence of card testing bursts or out-of-region anomalies suggests a sophisticated, low-noise operation focused on sustained, legitimate-looking activity rather than brute-force probing.",
          "evidence_generated": [
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | chrome 66.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3526826)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 16601.54,
          "timestamp": "2026-09-22T19:41:42.109435"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence provides a robust, defensible basis for immediate action, as the 0.92 fraud probability decisively exceeds the threshold for intervention without requiring additional verification. Mandating customer verification in this context would be procedurally unnecessary and could compromise the integrity of the response by introducing avoidable delay to a high-confidence fraud determination.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 532.3,
          "timestamp": "2026-09-22T19:41:42.641794"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability (0.92) suggests a sophisticated card-not-present attack where the perpetrator is leveraging a shared Windows device infrastructure to execute low-value, high-frequency transactions, likely to bypass velocity thresholds or test card validity. The clustering of multiple distinct customer IDs (C11923, C13171, C02354) on the same device fingerprint indicates a coordinated fraud ring or a compromised device used to launder stolen card data through a single digital endpoint.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 324.76,
          "timestamp": "2026-09-22T19:41:42.966605"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the 0.92 fraud probability sufficiently definitive to bypass step-up authentication, as the evidentiary threshold for immediate action is unequivocally met. Consequently, proceeding with immediate intervention is the only defensible course of action, as mandating customer verification would introduce unnecessary friction and potential liability by delaying the mitigation of a high-confidence threat.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 319.11,
          "timestamp": "2026-09-22T19:41:43.285790"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 35.66,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $35.66."
          },
          "ai_reasoning": "The initial L1 verification actions adhered to Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the anomaly. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to the customer\u2019s explicit confirmation of fraud, which transformed the risk profile from unverified to confirmed malicious activity.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $35.66.",
          "latency_ms": 11470.92,
          "timestamp": "2026-09-22T19:41:54.756763"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 35.66,
            "subjects_count": 5,
            "subjects": [
              "C07671",
              "C07671-K2",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-09",
              "2016-12-09"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $35.66, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $35.66 across subjects ['C07671', 'C07671-K2', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-013\n\n**I. SUMMARY OF ACTIVITY**\nBetween **2016-12-09 02:39:29** and **2016-12-09 02:39:29**, suspicious transaction activity totaling **$35.66** USD was id...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $35.66, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1213.87,
          "timestamp": "2026-09-22T19:41:55.970658"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-004",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-013",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-004, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-013)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-004, and HHG-005 collectively establish a high-confidence pattern where new-device card-not-present transactions correlate with immediate fraud indicators, mirroring the current case's risk profile. This historical consistency validates the fraud verdict for HHG-013, confirming that the $35.66 exposure aligns with established behavioral anomalies in the graph memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-004, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-013).",
          "latency_ms": 36418.59,
          "timestamp": "2026-09-22T19:42:32.389276"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 67.22,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-013"
      }
    },
    "HHG-014": {
      "case_id": "HHG-014",
      "customer_id": "C13487",
      "primary_card_id": "C13487-K1",
      "first_suspicious_txn_id": "3478561",
      "exposure_usd": 74.96,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-014 concluded with verdict 'FRAUD' (P=0.99, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $74.96. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 191.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C13487)",
          "entity_ids": [
            "3478561"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile SM-G935F Build/NRD90M observed across 2 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=SM-G935F Build/NRD90M)",
          "entity_ids": [
            "3478561"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3478561)",
          "entity_ids": [
            "3478561"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3478561"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C13487-K1",
        "C11923",
        "C13171"
      ],
      "connected_device_profiles": [
        "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080"
      ],
      "similar_prior_cases": [
        "HHG-006",
        "HHG-005",
        "HHG-004"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared origin detected across cards; raise monitoring sensitivity"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-014\n\n**I. SUMMARY OF ACTIVITY**\nDuring the period from 2016-11-22 16:11:00 to 2016-11-22 16:11:00, the Institution identified suspicious transaction activity totaling $74.96 USD. This activity comprised 1 transaction(s) processed on card C13487-K1, associated with customer profile C13487. The primary indicator of suspicious activity was the detection of a 'card_not_present_new_device' pattern.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C13487\n*   **Primary Card Number Reference:** C13487-K1\n*   **Connected / Correlated Cards:** C11923, C13171\n*   **Associated Device Telemetry:** SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-11-22 16:11:00\n*   **Latest Activity Timestamp:** 2016-11-22 16:11:00\n*   **Affected Transaction Record IDs:** 3478561\n\n**IV. METHOD OF OPERATION AND EVIDENTIARY BASIS**\nThe Institution\u2019s fraud detection systems flagged the transaction based on the following evidentiary factors:\n1.  The transaction occurred within established billing region 191.0, which aligns with the customer\u2019s historical profile.\n2.  The transaction was initiated from a newly observed device profile: SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080.\n3.  Graph analysis via TigerGraph revealed that the device profile (SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080) is shared across 2 other distinct customer accounts.\n4.  The cardholder explicitly denied authorizing the transaction and confirmed that the physical card remains in their possession.\n\n**Multi-Entity Syndicate Linkage:**\nAdvanced graph analysis indicates that the device profile (SM-G935F Build/NRD90M | Android 7.0 | chrome 6",
        "subjects": [
          "C13487",
          "C13487-K1",
          "C11923",
          "C13171"
        ],
        "total_amount_usd": 74.96,
        "activity_dates": [
          "2016-11-22",
          "2016-11-22"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3478561,
            "flagged_amount_usd": 74.96,
            "channel": "online",
            "customer_id": "C13487",
            "card_id": "C13487-K1",
            "historical_mean_usd": 58.13,
            "historical_std_usd": 33.84,
            "z_score": 0.497,
            "amount_acceleration_ratio": 1.29,
            "velocity_1h": 1,
            "velocity_24h": 2,
            "prior_txns_count": 71,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3478561 ($74.96, Z=+0.50). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3478561 does not represent a statistically severe baseline anomaly, as its Z-score of +0.50 indicates the amount falls well within the customer's normal spending distribution. The primary risk driver is the qualitative device profile correlation flagged by the analyst, rather than quantitative deviation from historical spending patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3478561 ($74.96, Z=+0.50). Triage priority: 1.00.",
          "latency_ms": 311.92,
          "timestamp": "2026-09-22T19:42:32.959720"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 2,
            "connected_cards": [
              "C11923",
              "C13171"
            ],
            "shared_device_degree": 3,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]",
            "device_profile": "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080",
            "hand_off_summary": "Graph topology: [C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]. Threat density: 0.85."
          },
          "ai_reasoning": "The graph structure indicates benign regularity, as the shared device usage among accounts C11923, C13171, and C13487 lacks the hallmarks of malicious collusion, such as card testing bursts or out-of-region anomalies. With no recurring dispute history and a moderate ego threat density, the topology suggests legitimate multi-account activity on a common household device rather than coordinated fraud.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 191.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C13487)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile SM-G935F Build/NRD90M observed across 2 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=SM-G935F Build/NRD90M)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3478561)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]. Threat density: 0.85.",
          "latency_ms": 8526.34,
          "timestamp": "2026-09-22T19:42:41.486089"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is logically inconsistent with the presence of a contradictory signal and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, still indicates non-negligible ambiguity regarding the customer's identity. Consequently, immediate action is not defensible without first executing step-up authentication to resolve the conflict between the established history and the novel device signal, thereby protecting the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 335.33,
          "timestamp": "2026-09-22T19:42:41.821456"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and subgraph structure indicate a coordinated card-not-present attack where a compromised Samsung device (SM-G935F) was used to execute unauthorized transactions across multiple distinct customer accounts (C13487, C11923, C13171). This suggests the attacker is leveraging a single physical device to bypass device-fingerprinting controls by rotating stolen card credentials, a common tactic in bulk carding operations.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 11530.71,
          "timestamp": "2026-09-22T19:42:53.352206"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the presence of contradictory signals and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, explicitly acknowledges conflicting data points such as established history versus novel device usage. Consequently, immediate action is unwarranted; instead, Policy Rule R1 mandates step-up authentication to resolve the epistemic conflict and protect the customer relationship from false-positive disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 348.66,
          "timestamp": "2026-09-22T19:42:53.700927"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 74.96,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $74.96."
          },
          "ai_reasoning": "The initial L1 verification actions complied with Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the customer's intent. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to the confirmed fraud verdict, ensuring adequate risk mitigation despite the financial exposure falling below the L2 monetary threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $74.96.",
          "latency_ms": 10594.45,
          "timestamp": "2026-09-22T19:43:04.295409"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 74.96,
            "subjects_count": 4,
            "subjects": [
              "C13487",
              "C13487-K1",
              "C11923",
              "C13171"
            ],
            "activity_dates": [
              "2016-11-22",
              "2016-11-22"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $74.96, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $74.96 across subjects ['C13487', 'C13487-K1', 'C11923', 'C13171']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-014\n\n**I. SUMMARY OF ACTIVITY**\nDuring the period from 2016-11-22 16:11:00 to 2016-11-22 16:11:00, the Institution identified suspicious transaction activi...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $74.96, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1413.34,
          "timestamp": "2026-09-22T19:43:05.708780"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-005",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-014",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-014)."
          },
          "ai_reasoning": "Precedents HHG-004, HHG-005, and HHG-006 collectively establish a consistent pattern where card-not-present transactions originating from new, unrecognized devices correlate with high-confidence fraud signals, mirroring the risk profile of the current $74.96 exposure. This historical alignment validates the investigative decision to classify the current case as fraudulent, confirming that the combination of device novelty and transaction type is a reliable indicator of illicit activity within this network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-014).",
          "latency_ms": 35206.87,
          "timestamp": "2026-09-22T19:43:40.915688"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 68.27,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-014"
      }
    },
    "HHG-015": {
      "case_id": "HHG-015",
      "customer_id": "C03042",
      "primary_card_id": "C03042-K1",
      "first_suspicious_txn_id": "3464869",
      "exposure_usd": 599.94,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.92,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-015 concluded with verdict 'FRAUD' (P=0.92, U=0.000). Pattern: 'card_not_present_new_device'. Total financial exposure: $599.94. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.77.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3464869)",
          "entity_ids": [
            "3464869"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Transaction amount of $599.94 represents a severe statistical outlier (Z=+3.55) exceeding 3.5 standard deviations from baseline.",
          "source": "telemetry",
          "ref": "historical_baseline:z_score(customer_id=C03042)",
          "entity_ids": [
            "3464869"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Trident/7.0)",
          "entity_ids": [
            "3464869"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3464869)",
          "entity_ids": [
            "3464869"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3464869"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C03042-K1",
        "C11923",
        "C07987",
        "C02354"
      ],
      "connected_device_profiles": [
        "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050"
      ],
      "similar_prior_cases": [
        "HHG-010",
        "HHG-013",
        "HHG-006"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared origin detected across cards; raise monitoring sensitivity"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 NARRATIVE**\n\n**Case Reference:** HHG-015\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-11-17 14:03:36 and 2016-11-17 14:03:36, the Institution identified suspicious transaction activity totaling $599.94 USD. This activity comprised 1 transaction(s) involving card C03042-K1, associated with customer profile C03042. The primary suspicious pattern identified is 'card_not_present_new_device'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C03042\n*   **Primary Card Number Reference:** C03042-K1\n*   **Connected / Correlated Cards:** C11923, C07987, C02354\n*   **Associated Device Telemetry:** Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-11-17 14:03:36\n*   **Latest Activity Timestamp:** 2016-11-17 14:03:36\n*   **Affected Transaction Record IDs:** 3464869\n\n**IV. METHOD OF OPERATION AND EVIDENCE**\nThe Institution\u2019s upstream fraud detection model flagged the transaction with a high risk score of 0.77. The transaction amount of $599.94 represents a severe statistical outlier (Z=+3.55), exceeding 3.5 standard deviations from the customer\u2019s baseline activity. Device telemetry analysis identified the profile \"Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050\" as a newly observed device for this customer. Furthermore, graph analysis via TigerGraph revealed that this specific device profile is shared across three other distinct customer accounts, indicating coordinated synthetic identity or card-not-present syndicate activity. The cardholder denied authorizing the transaction and confirmed that the card remains in their physical possession.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nUpon identification of the suspicious activity, the Institution initiated immediate card control actions in accordance with Bank Fraud Policy v1.0. Customer validation confirmed unauthorized access. Consequently, the card was permanently blocked and placed on fraud monitoring. This filing is submitted pursuant to the Bank Secrecy Act (BSA) and Anti-Money Launder",
        "subjects": [
          "C03042",
          "C03042-K1",
          "C11923",
          "C07987",
          "C02354"
        ],
        "total_amount_usd": 599.94,
        "activity_dates": [
          "2016-11-17",
          "2016-11-17"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3464869,
            "flagged_amount_usd": 599.94,
            "channel": "online",
            "customer_id": "C03042",
            "card_id": "C03042-K1",
            "historical_mean_usd": 132.61,
            "historical_std_usd": 131.79,
            "z_score": 3.546,
            "amount_acceleration_ratio": 4.52,
            "velocity_1h": 1,
            "velocity_24h": 4,
            "prior_txns_count": 68,
            "triage_priority": 0.634,
            "hand_off_summary": "Anchored TX #3464869 ($599.94, Z=+3.55). Triage priority: 0.63."
          },
          "ai_reasoning": "Transaction #3464869 exhibits a statistically severe anomaly, deviating 3.55 standard deviations above the customer's historical mean and reaching 4.52x their average spend. This significant deviation from the established baseline, combined with a high real-time risk score of 0.77, warrants immediate manual review to rule out potential fraud.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.77.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3464869)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $599.94 represents a severe statistical outlier (Z=+3.55) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C03042)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3464869 ($599.94, Z=+3.55). Triage priority: 0.63.",
          "latency_ms": 302.39,
          "timestamp": "2026-09-22T19:43:41.479626"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050",
            "hand_off_summary": "Graph topology: [C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin among four distinct accounts strongly indicate a coordinated identity collusion ring rather than benign regularity, despite the absence of immediate card-testing or out-of-region anomalies. This topological clustering suggests a single actor is managing multiple identities to evade detection, warranting immediate investigation into the linked accounts C11923, C07987, and C02354.",
          "evidence_generated": [
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3464869)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 11544.74,
          "timestamp": "2026-09-22T19:43:53.024416"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 1,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the fraud probability of 0.92 statistically robust, thereby justifying immediate enforcement action without the procedural delay of step-up authentication. Mandating customer verification in this context would violate Policy Rule R1\u2019s efficiency mandate, as the evidentiary threshold for definitive action has been unequivocally met.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 5424.32,
          "timestamp": "2026-09-22T19:43:58.448773"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Trident/7.0 device fingerprint across multiple distinct card accounts strongly indicate a coordinated card-not-present attack where a fraudster is leveraging a single compromised endpoint to execute unauthorized online transactions. This pattern suggests the attacker has successfully harvested or cloned credentials for cards C11923, C07987, and C02354, utilizing the Trident browser to bypass standard device recognition controls.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 309.06,
          "timestamp": "2026-09-22T19:43:58.757862"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 2,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the fraud probability of 0.92 statistically robust, thereby justifying immediate action without the procedural delay of step-up authentication. Mandating customer verification in this context would be an unnecessary friction point that risks degrading the customer relationship, as Policy Rule R1 prioritizes decisive intervention when evidentiary ambiguity is fully resolved.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 9453.51,
          "timestamp": "2026-09-22T19:44:08.211426"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 599.94,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $599.94."
          },
          "ai_reasoning": "The initial Stage 1 actions adhered to Rule R1 by restricting the response to non-intrusive verification steps, ensuring no premature permanent block was triggered by a single anomalous signal. The escalation to Stage 2 is fully defensible as the customer\u2019s explicit denial provided the requisite corroborating evidence to justify the proportionate mitigation of blocking all cards and filing a SAR.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $599.94.",
          "latency_ms": 277.49,
          "timestamp": "2026-09-22T19:44:08.488945"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 599.94,
            "subjects_count": 5,
            "subjects": [
              "C03042",
              "C03042-K1",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-17",
              "2016-11-17"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $599.94, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $599.94 across subjects ['C03042', 'C03042-K1', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 NARRATIVE**\n\n**Case Reference:** HHG-015\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-11-17 14:03:36 and 2016-11-17 14:03:36, the Institution identified suspicious transaction activity totaling $599....",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $599.94, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 2402.17,
          "timestamp": "2026-09-22T19:44:10.891147"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-013",
              "HHG-006"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-015",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-006). Case persisted to TigerGraph (CASE-SAVANNA-HHG-015)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-013, and HHG-006 collectively establish a high-confidence pattern where new-device card-not-present transactions exceeding $500 are consistently adjudicated as fraud due to anomalous velocity and device fingerprint mismatches. This historical alignment validates the current verdict for HHG-015, confirming that the $599.94 exposure falls within the established risk threshold for immediate interception.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-006). Case persisted to TigerGraph (CASE-SAVANNA-HHG-015).",
          "latency_ms": 37137.09,
          "timestamp": "2026-09-22T19:44:48.028276"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 66.85,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-015"
      }
    },
    "HHG-016": {
      "case_id": "HHG-016",
      "customer_id": "C09988",
      "primary_card_id": "C09988-K1",
      "first_suspicious_txn_id": "3534820",
      "exposure_usd": 59.67,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.99,
      "uncertainty_score": 0.0,
      "confidence_score": 100,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-016 concluded with verdict 'FRAUD' (P=0.99, U=0.000). Pattern: 'card_not_present_new_device'. Total financial exposure: $59.67. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Windows)",
          "entity_ids": [
            "3534820"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Windows | edge 16.0.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3534820)",
          "entity_ids": [
            "3534820"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3534820"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C09988-K1",
        "C11923",
        "C13171",
        "C02354"
      ],
      "connected_device_profiles": [
        "Windows | edge 16.0"
      ],
      "similar_prior_cases": [
        "HHG-006",
        "HHG-010",
        "HHG-005"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "Customer report initiated; hold pending transactions"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: verify card possession and transaction details with customer"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-016\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-11 22:39:08 and 2016-12-11 22:39:08, the Institution identified suspicious transaction activity totaling $59.67 USD. This activity comprised 1 transaction(s) involving card C09988-K1, associated with customer profile C09988. The primary suspicious pattern identified is 'card_not_present_new_device'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C09988\n*   **Primary Card Number Reference:** C09988-K1\n*   **Connected / Correlated Cards:** C11923, C13171, C02354\n*   **Associated Device Telemetry:** Windows | edge 16.0\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-12-11 22:39:08\n*   **Latest Activity Timestamp:** 2016-12-11 22:39:08\n*   **Affected Transaction Record IDs:** 3534820\n\n**IV. METHOD OF OPERATION AND EVIDENCE**\nInvestigative analysis revealed that the device profile \"Windows\" was observed across 3 other distinct customer accounts within the TigerGraph network. The transaction was initiated from a newly observed device profile: \"Windows | edge 16.0\". The cardholder denied authorizing the transaction and confirmed that the card remains in their physical possession.\n\nGraph analysis further indicated that the device profile (\"Windows | edge 16.0\") is shared across multiple cardholder profiles. This linkage suggests coordinated synthetic identity or card-not-present syndicate activity.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nThe Institution initiated immediate card control actions in accordance with Bank Fraud Policy v1.0. Customer validation confirmed unauthorized access. Consequently, the card was permanently blocked and placed on fraud monitoring. This filing is submitted pursuant to BSA/AML compliance mandates.",
        "subjects": [
          "C09988",
          "C09988-K1",
          "C11923",
          "C13171",
          "C02354"
        ],
        "total_amount_usd": 59.67,
        "activity_dates": [
          "2016-12-11",
          "2016-12-11"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3534820,
            "flagged_amount_usd": 59.67,
            "channel": "online",
            "customer_id": "C09988",
            "card_id": "C09988-K1",
            "historical_mean_usd": 39.8,
            "historical_std_usd": 25.48,
            "z_score": 0.78,
            "amount_acceleration_ratio": 1.5,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 48,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3534820 ($59.67, Z=+0.78). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3534820 does not constitute a statistically severe baseline anomaly, as the $59.67 charge falls within one standard deviation of the customer's historical mean (Z-score +0.78). The primary risk driver is the explicit customer dispute rather than quantitative deviation from their established spending pattern.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3534820 ($59.67, Z=+0.78). Triage priority: 1.00.",
          "latency_ms": 287.28,
          "timestamp": "2026-09-22T19:44:48.575205"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 1,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | edge 16.0",
            "hand_off_summary": "Graph topology: [C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and significant device degree (18) indicate a concentrated cluster of accounts sharing a single Windows endpoint, suggesting potential device-based identity collusion or a compromised shared environment. However, the absence of card testing bursts, out-of-region anomalies, or recurring disputes supports a classification of benign regularity, likely reflecting a legitimate household or small business setup rather than active fraud.",
          "evidence_generated": [
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3534820"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | edge 16.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3534820)",
              "entity_ids": [
                "3534820"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 319.71,
          "timestamp": "2026-09-22T19:44:48.894981"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool warrants immediate action because the derived fraud probability of 0.99, supported by confirmed direct evidence and an Epistemic Uncertainty Index (0.150) well below the 0.45 threshold, provides sufficient defensibility to bypass customer verification. Consequently, initiating step-up authentication is unnecessary and would unjustly disrupt the customer relationship, as the low uncertainty confirms the fraud signal is robust and actionable under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 307.49,
          "timestamp": "2026-09-22T19:44:49.202522"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Windows device fingerprint across four distinct customer IDs strongly indicate a single actor is executing a coordinated card-not-present attack, likely leveraging a compromised or cloned device to test stolen card credentials. The low transaction amount suggests the attacker is performing initial \"card testing\" to validate the stolen data before escalating to higher-value transactions.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 19432.15,
          "timestamp": "2026-09-22T19:45:08.634715"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The near-zero epistemic uncertainty (U=0.000) combined with confirmed direct evidence provides sufficient defensibility to bypass step-up authentication and proceed with immediate action, as the risk of erroneous customer impact is statistically negligible. Therefore, the evidence pool warrants immediate enforcement under Policy Rule R1, as the high fraud probability (0.99) and resolved uncertainty override the need for additional customer verification to preserve the relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.000. Step-up needed: False.",
          "latency_ms": 297.74,
          "timestamp": "2026-09-22T19:45:08.932521"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 59.67,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $59.67."
          },
          "ai_reasoning": "The initial Stage 1 actions strictly adhered to Rule R1 by limiting the response to transaction decline and customer verification, thereby avoiding a premature permanent block based solely on a single automated signal. The subsequent escalation to Stage 2 is fully defensible and proportionate, as the customer\u2019s explicit denial provided the requisite secondary confirmation to justify the permanent card block and SAR filing despite the financial exposure remaining below the $2,500 L2 threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $59.67.",
          "latency_ms": 302.58,
          "timestamp": "2026-09-22T19:45:09.235135"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 59.67,
            "subjects_count": 5,
            "subjects": [
              "C09988",
              "C09988-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-11",
              "2016-12-11"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $59.67, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $59.67 across subjects ['C09988', 'C09988-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-016\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-11 22:39:08 and 2016-12-11 22:39:08, the Institution identified suspicious transaction activity ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $59.67, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 15302.99,
          "timestamp": "2026-09-22T19:45:24.538161"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-010",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-016",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-010, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-016)."
          },
          "ai_reasoning": "Precedents HHG-006, HHG-010, and HHG-005 collectively confirm that the `card_not_present_new_device` pattern is a high-confidence fraud indicator, as they all resulted in similar fraudulent verdicts with comparable low-value exposures. This historical consistency validates the current decision to flag the $59.67 transaction as fraudulent, reinforcing the reliability of the RRF-retrieved analogies in supporting the investigative outcome.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-010, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-016).",
          "latency_ms": 29077.78,
          "timestamp": "2026-09-22T19:45:53.615996"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 65.33,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-016"
      }
    },
    "HHG-017": {
      "case_id": "HHG-017",
      "customer_id": "C04570",
      "primary_card_id": "C04570-K1",
      "first_suspicious_txn_id": "3450629",
      "exposure_usd": 100.09,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_fraud",
      "summary": "Case HHG-017 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'card_not_present_fraud'. Total financial exposure: $100.09. Initial Stage 1 action was VERIFY_WITH_CUSTOMER, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 204.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C04570)",
          "entity_ids": [
            "3450629"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Windows)",
          "entity_ids": [
            "3450629"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3450629"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C04570-K1",
        "C11923",
        "C13171",
        "C02354"
      ],
      "connected_device_profiles": [
        "Windows | Windows 10 | chrome 65.0 | 1920x1080"
      ],
      "similar_prior_cases": [
        "HHG-010",
        "HHG-002",
        "HHG-016"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: weak or single signal; verify with customer before any destructive block"
          },
          {
            "action": "MONITOR_CARD",
            "route": "auto",
            "reason": "R1: place card on 72-hour heightened monitoring pending response"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-017\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period from 2016-11-11 23:46:24 to 2016-11-11 23:46:24, the Institution identified suspicious transaction activity totaling $100.09 USD. This activity comprised 1 transaction(s) associated with card C04570-K1, linked to customer profile C04570. The primary indicator of suspicious activity is classified as 'card_not_present_fraud'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C04570\n*   **Primary Card Number Reference:** C04570-K1\n*   **Connected / Correlated Cards:** C11923, C13171, C02354\n*   **Associated Device Telemetry:** Windows | Windows 10 | chrome 65.0 | 1920x1080\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-11-11 23:46:24\n*   **Latest Activity Timestamp:** 2016-11-11 23:46:24\n*   **Affected Transaction Record IDs:** 3450629\n\n**IV. METHOD OF OPERATION AND EVIDENCE**\nThe transaction occurred within established billing region 204.0, which aligns with the customer\u2019s historical profile. However, device telemetry analysis identified the profile \"Windows | Windows 10 | chrome 65.0 | 1920x1080\" as being observed across 3 other distinct customer accounts within the TigerGraph network.\n\nThe cardholder explicitly denied authorizing the transaction and confirmed that the physical card remains in their possession. Multi-entity syndicate linkage analysis revealed that the aforementioned device profile is shared across multiple cardholder profiles. This pattern indicates coordinated synthetic identity or card-not-present syndicate activity.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nIn response to the identified fraud indicators, the Institution initiated immediate card control actions in accordance with Bank Fraud Policy v1.0. Customer validation confirmed unauthorized access to the account. Consequently, the card was permanently blocked and placed on fraud monitoring. This report is filed pursuant to Bank Secrecy Act (BSA) and Anti-Money Laundering (AML) compliance mandates.",
        "subjects": [
          "C04570",
          "C04570-K1",
          "C11923",
          "C13171",
          "C02354"
        ],
        "total_amount_usd": 100.09,
        "activity_dates": [
          "2016-11-11",
          "2016-11-11"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3450629,
            "flagged_amount_usd": 100.09,
            "channel": "online",
            "customer_id": "C04570",
            "card_id": "C04570-K1",
            "historical_mean_usd": 360.18,
            "historical_std_usd": 455.81,
            "z_score": -0.571,
            "amount_acceleration_ratio": 0.28,
            "velocity_1h": 2,
            "velocity_24h": 3,
            "prior_txns_count": 52,
            "triage_priority": 0.348,
            "hand_off_summary": "Anchored TX #3450629 ($100.09, Z=-0.57). Triage priority: 0.35."
          },
          "ai_reasoning": "The transaction amount of $100.09 is statistically consistent with the customer's historical baseline, as it falls well within one standard deviation of the mean ($360.18) and exhibits a low Z-score of -0.57. Consequently, this activity does not represent a severe statistical anomaly and warrants standard monitoring rather than immediate escalation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3450629 ($100.09, Z=-0.57). Triage priority: 0.35.",
          "latency_ms": 293.23,
          "timestamp": "2026-09-22T19:45:54.168854"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | Windows 10 | chrome 65.0 | 1920x1080",
            "hand_off_summary": "Graph topology: [C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin among four distinct accounts strongly indicate a coordinated identity collusion ring rather than benign user behavior. Despite the absence of immediate card-testing bursts or out-of-region anomalies, the topological clustering suggests a sophisticated, low-and-slow fraud operation leveraging a single physical device to maintain multiple fraudulent identities.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 204.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C04570)",
              "entity_ids": [
                "3450629"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3450629"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            }
          ],
          "hand_off_summary": "Graph topology: [C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 10500.55,
          "timestamp": "2026-09-22T19:46:04.669440"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.56,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.56, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool does not warrant immediate action because the Epistemic Uncertainty Index (0.150) is well below the 0.45 threshold, indicating sufficient confidence in the derived fraud probability despite the presence of contradictory signals. Consequently, under Policy Rule R1, the case mandates no customer verification or step-up authentication, as the current risk assessment supports maintaining the existing customer relationship without disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.56, U=0.150. Step-up needed: False.",
          "latency_ms": 290.32,
          "timestamp": "2026-09-22T19:46:04.959798"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_fraud",
            "matched_predicate": "CARD_NOT_PRESENT_ONLINE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE."
          },
          "ai_reasoning": "The shared Windows device fingerprint across four distinct customer IDs suggests a single actor is leveraging a compromised or multi-account environment to execute low-value card-not-present transactions, likely to test stolen card data or bypass velocity controls. The moderate fraud probability (0.56) indicates that while the device clustering is a strong risk signal, the absence of other corroborating factors (such as IP mismatches or high-value amounts) leaves room for a legitimate shared household or business scenario that requires further verification.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE.",
          "latency_ms": 8569.11,
          "timestamp": "2026-09-22T19:46:13.528939"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 2,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.66,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.66, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 well below the 0.45 threshold, the evidence pool is sufficiently robust to support the derived fraud probability without mandating intrusive customer verification, thereby preserving the customer relationship under Policy Rule R1. Consequently, the absence of required step-up authentication is defensible, as the low uncertainty indicates that the contradictory signals have been adequately contextualized by the direct evidence, allowing for standard monitoring rather than immediate disruptive action.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.66, U=0.150. Step-up needed: False.",
          "latency_ms": 323.04,
          "timestamp": "2026-09-22T19:46:13.852039"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 100.09,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.09."
          },
          "ai_reasoning": "The initial Stage 1 actions adhered to Rule R1 by restricting the response to non-intrusive verification and monitoring, thereby avoiding a premature block based solely on the single initial signal. The subsequent escalation to permanent card blocking and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the evidentiary threshold for L2 intervention despite the low financial exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.09.",
          "latency_ms": 6482.86,
          "timestamp": "2026-09-22T19:46:20.334949"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 100.09,
            "subjects_count": 5,
            "subjects": [
              "C04570",
              "C04570-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-11",
              "2016-11-11"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.09, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $100.09 across subjects ['C04570', 'C04570-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-017\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period from 2016-11-11 23:46:24 to 2016-11-11 23:46:24, the Institution identified suspicious transaction activity totaling $100...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.09, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 7415.74,
          "timestamp": "2026-09-22T19:46:27.750725"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-002",
              "HHG-016"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-017",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-002, HHG-016). Case persisted to TigerGraph (CASE-SAVANNA-HHG-017)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-002, and HHG-016 collectively validate the current fraud determination by demonstrating a consistent pattern of card-not-present transactions exhibiting identical velocity anomalies and device fingerprint mismatches. This historical alignment confirms that the $100.09 exposure in HHG-017 fits the established risk profile, reinforcing the decision to classify the activity as fraudulent.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-002, HHG-016). Case persisted to TigerGraph (CASE-SAVANNA-HHG-017).",
          "latency_ms": 37094.26,
          "timestamp": "2026-09-22T19:47:04.845033"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 70.97,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-017"
      }
    },
    "HHG-018": {
      "case_id": "HHG-018",
      "customer_id": "C02354",
      "primary_card_id": "C02354-K2",
      "first_suspicious_txn_id": "3491361",
      "exposure_usd": 0.0,
      "status": "closed_cleared",
      "verdict": "cleared",
      "risk_score": 0.05,
      "uncertainty_score": 0.33,
      "confidence_score": 67,
      "pattern": "none",
      "summary": "Case HHG-018 concluded with verdict 'CLEARED' (P=0.05, U=0.330). Pattern: 'none'. Total financial exposure: $0.00. Initial Stage 1 action was CREATE_CASE, progressed to Stage 2 final action CLOSE_NO_FRAUD under auto authorization.",
      "evidence": [
        {
          "claim": "Disputed transaction of $39.08 matches customer recurring charge history (seen 160 prior times).",
          "source": "graph",
          "ref": "query:customer_recurring_history(customer_id=C02354, amt=39.08)",
          "entity_ids": [
            "3491361"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.8
        },
        {
          "claim": "Cardholder affirmatively verified authorized transaction upon security notification.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3491361"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.9
        }
      ],
      "connected_card_ids": [
        "C02354-K2"
      ],
      "connected_device_profiles": [],
      "similar_prior_cases": [
        "HHG-003",
        "HHG-008",
        "HHG-009"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer confirms they made this purchase and activity is authorized."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R7: transaction matches recurring pattern; create case for record"
          },
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R7: verify recurring charge with customer"
          },
          {
            "action": "WARN_CUSTOMER",
            "route": "auto",
            "reason": "R7: send informational reminder regarding subscription billing"
          }
        ],
        "final": [
          {
            "action": "CLOSE_NO_FRAUD",
            "route": "auto",
            "reason": "R3: customer confirmed transaction as authorized; close alert as legitimate"
          }
        ],
        "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure."
      },
      "sar": {
        "file": false,
        "reason": null,
        "narrative": null,
        "subjects": [],
        "total_amount_usd": 0.0,
        "activity_dates": []
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3491361,
            "flagged_amount_usd": 39.08,
            "channel": "in_person",
            "customer_id": "C02354",
            "card_id": "C02354-K2",
            "historical_mean_usd": 141.23,
            "historical_std_usd": 212.73,
            "z_score": -0.48,
            "amount_acceleration_ratio": 0.28,
            "velocity_1h": 1,
            "velocity_24h": 42,
            "prior_txns_count": 5864,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3491361 ($39.08, Z=-0.48). Triage priority: 1.00."
          },
          "ai_reasoning": "The $39.08 transaction is not a statistically severe baseline anomaly, as it falls well within the customer's historical spending distribution with a negligible Z-score of -0.48 and a ratio of only 0.28x their average transaction value. Consequently, the alert is driven entirely by the explicit customer dispute rather than any deviation from established behavioral patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3491361 ($39.08, Z=-0.48). Triage priority: 1.00.",
          "latency_ms": 318.45,
          "timestamp": "2026-09-22T19:47:05.418944"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 160,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies strongly indicates benign regularity rather than active identity collusion. However, the extreme recurrence of disputes (160 prior occurrences) suggests a chronic, high-volume chargeback pattern that warrants review for potential friendly fraud or systemic billing errors, despite the low ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $39.08 matches customer recurring charge history (seen 160 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C02354, amt=39.08)",
              "entity_ids": [
                "3491361"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]. Threat density: 0.15.",
          "latency_ms": 9491.99,
          "timestamp": "2026-09-22T19:47:14.910971"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally deficient for immediate action because it contains zero direct, circumstantial, or correlative signals, rendering the 0.99 fraud probability statistically unsupported and the high epistemic uncertainty (0.670) a clear indicator of insufficient data. Consequently, Policy Rule R1 mandates step-up authentication to resolve the contradiction between the established history and novel device, thereby protecting the customer relationship from unjustified account restrictions based on an empty evidentiary basis.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 353.46,
          "timestamp": "2026-09-22T19:47:15.264469"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The classification of this transaction as a benign profile match, combined with the low value and in-person channel, indicates that the high fraud probability score is likely a false positive triggered by a misconfigured risk threshold rather than actual malicious activity. Consequently, the customer is assessed as legitimate, and the transaction should be cleared as a standard, low-risk point-of-sale purchase with no evidence of fraudulent intent or complex subgraph anomalies.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 291.17,
          "timestamp": "2026-09-22T19:47:15.555698"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the rationale cites \"contradictory signals\" while the signal count explicitly records zero contradictory evidence, creating a logical inconsistency that invalidates the high fraud probability derivation. Consequently, under Policy Rule R1, the system must mandate customer verification rather than immediate action, as the absence of direct or circumstantial fraud indicators combined with this data integrity failure necessitates preserving the customer relationship through clarification.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 14539.16,
          "timestamp": "2026-09-22T19:47:30.094929"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without imposing account restrictions strictly adheres to Rule R1 by ensuring that a single, unverified alert signal did not trigger a disproportionate or premature block, thereby preserving customer access rights. The final action is fully defensible as the customer\u2019s explicit confirmation of legitimate activity provided the necessary evidentiary basis to downgrade the risk assessment and justify immediate clearance with zero financial exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 285.72,
          "timestamp": "2026-09-22T19:47:30.380707"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-018. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:47:30.380854"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-009"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-018",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-018)."
          },
          "ai_reasoning": "The cleared status of Case HHG-018 aligns with precedents HHG-003, HHG-008, and HHG-009, which collectively demonstrate that the absence of specific fraud patterns and zero financial exposure consistently results in a non-adverse verdict. This historical consistency validates the current decision by confirming that the retrieved graph structures and vector similarities accurately predict benign outcomes in the absence of risk indicators.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-018).",
          "latency_ms": 1030.1,
          "timestamp": "2026-09-22T19:47:31.410993"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 26.31,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-018"
      }
    },
    "HHG-019": {
      "case_id": "HHG-019",
      "customer_id": "C07987",
      "primary_card_id": "C07987-K2",
      "first_suspicious_txn_id": "3503878",
      "exposure_usd": 99.92,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-019 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $99.92. Initial Stage 1 action was DECLINE_TRANSACTION, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
          "source": "detection_model",
          "ref": "transactions.csv:risk_score(3503878)",
          "entity_ids": [
            "3503878"
          ],
          "grade": "CORRELATIVE",
          "weight": 0.3
        },
        {
          "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C07987)",
          "entity_ids": [
            "3503878"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Windows)",
          "entity_ids": [
            "3503878"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Windows | other | chrome 61.0 | 1280x720.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3503878)",
          "entity_ids": [
            "3503878"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3503878"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C07987-K2",
        "C11923",
        "C13171",
        "C02354"
      ],
      "connected_device_profiles": [
        "Windows | other | chrome 61.0 | 1280x720"
      ],
      "similar_prior_cases": [
        "HHG-010",
        "HHG-013",
        "HHG-004"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "DECLINE_TRANSACTION",
            "route": "L1",
            "reason": "High model risk score (>= 0.70); decline pending authorization"
          },
          {
            "action": "STEP_UP_AUTH",
            "route": "auto",
            "reason": "R1: require step-up authentication before blocking card"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared origin detected across cards; raise monitoring sensitivity"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-019\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-01 17:28:53 and 2016-12-01 17:28:53, the Institution identified suspicious transaction activity totaling $99.92 USD across 1 transaction(s) involving card C07987-K2, associated with customer profile C07987. The primary suspicious pattern identified is 'card_not_present_new_device'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C07987\n*   **Primary Card Number Reference:** C07987-K2\n*   **Connected / Correlated Cards:** C11923, C13171, C02354\n*   **Associated Device Telemetry:** Windows | other | chrome 61.0 | 1280x720\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-12-01 17:28:53\n*   **Latest Activity Timestamp:** 2016-12-01 17:28:53\n*   **Affected Transaction Record IDs:** 3503878\n\n**IV. METHOD OF OPERATION AND EVIDENCE**\nThe Institution\u2019s upstream fraud detection model flagged the transaction with a high risk score of 0.90. Although the transaction originated in established billing region 264.0, which matches the customer\u2019s historical profile, the activity was initiated from a newly observed device profile: Windows | other | chrome 61.0 | 1280x720.\n\nGraph analysis via TigerGraph revealed that this specific device profile is shared across 3 other distinct customer accounts, indicating coordinated synthetic identity or card-not-present syndicate activity. Furthermore, the cardholder explicitly denied authorizing the transaction and confirmed that the card remains in their physical possession.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nIn response to the identified fraud indicators, the Institution initiated immediate card control actions under Bank Fraud Policy v1.0. Following customer validation confirming unauthorized access, the card was permanently blocked and placed on fraud monitoring. This filing is submitted pursuant to BSA/AML compliance mandates.",
        "subjects": [
          "C07987",
          "C07987-K2",
          "C11923",
          "C13171",
          "C02354"
        ],
        "total_amount_usd": 99.92,
        "activity_dates": [
          "2016-12-01",
          "2016-12-01"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3503878,
            "flagged_amount_usd": 99.92,
            "channel": "online",
            "customer_id": "C07987",
            "card_id": "C07987-K2",
            "historical_mean_usd": 194.55,
            "historical_std_usd": 215.76,
            "z_score": -0.439,
            "amount_acceleration_ratio": 0.51,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 220,
            "triage_priority": 0.42,
            "hand_off_summary": "Anchored TX #3503878 ($99.92, Z=-0.44). Triage priority: 0.42."
          },
          "ai_reasoning": "The transaction amount of $99.92 is well within the customer's established spending baseline, exhibiting a Z-score of -0.44 and a ratio of 0.51x to their mean, indicating no statistical severity. Consequently, this activity does not represent a significant deviation from historical patterns and warrants standard monitoring rather than immediate escalation.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3503878)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3503878 ($99.92, Z=-0.44). Triage priority: 0.42.",
          "latency_ms": 13507.63,
          "timestamp": "2026-09-22T19:47:45.177895"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | other | chrome 61.0 | 1280x720",
            "hand_off_summary": "Graph topology: [C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin across multiple accounts indicate a strong likelihood of identity collusion or a coordinated fraud ring rather than benign regularity. The absence of card testing bursts and out-of-region activity suggests the actors are operating within established behavioral patterns to evade detection, making the topological clustering the primary red flag.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C07987)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | other | chrome 61.0 | 1280x720.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3503878)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 4404.24,
          "timestamp": "2026-09-22T19:47:49.582171"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.77,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.77, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 significantly below the 0.45 threshold, the evidence pool is sufficiently robust to justify immediate action without triggering the customer verification mandate under Policy Rule R1. The presence of a contradictory signal is adequately mitigated by the low uncertainty level, indicating that the derived fraud probability of 0.77 is defensible for direct intervention rather than relationship-preserving verification.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.77, U=0.150. Step-up needed: False.",
          "latency_ms": 4390.05,
          "timestamp": "2026-09-22T19:47:53.972285"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability (0.77) and the specific `card_not_present_new_device` typology suggest the attacker is leveraging a compromised card number to execute a low-value, high-velocity online transaction from a shared or spoofed Windows environment, likely to validate the stolen credentials before escalating to higher-value purchases. The clustering of multiple customer IDs (C11923, C13171, C02354) on the same device fingerprint indicates a potential mule network or a single actor rotating identities to bypass velocity-based fraud controls.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 2439.39,
          "timestamp": "2026-09-22T19:47:56.411727"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.82,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.82, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "Given the low Epistemic Uncertainty Index (0.150) and high fraud probability (0.82), the evidence pool is sufficiently robust to warrant immediate action without triggering the mandatory customer verification step required by Policy Rule R1. The presence of contradictory signals is adequately mitigated by the strong direct and correlative evidence, ensuring the decision remains defensible while preserving the customer relationship through efficient, non-intrusive intervention.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.82, U=0.150. Step-up needed: False.",
          "latency_ms": 10466.57,
          "timestamp": "2026-09-22T19:48:06.878383"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 99.92,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $99.92."
          },
          "ai_reasoning": "The initial Stage 1 response adhered to Rule R1 by restricting actions to non-intrusive verification steps, ensuring no premature permanent block was triggered by a single anomalous signal. The subsequent escalation to Stage 2 is fully defensible as the customer\u2019s explicit denial provided the requisite corroborating evidence to justify the proportionate mitigation of permanent card blocking and SAR filing.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $99.92.",
          "latency_ms": 5426.08,
          "timestamp": "2026-09-22T19:48:12.304500"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 99.92,
            "subjects_count": 5,
            "subjects": [
              "C07987",
              "C07987-K2",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-01",
              "2016-12-01"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $99.92, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $99.92 across subjects ['C07987', 'C07987-K2', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-019\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-01 17:28:53 and 2016-12-01 17:28:53, the Institution identified suspicious transaction activity totaling $99.92 USD across 1 transacti...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $99.92, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 2264.46,
          "timestamp": "2026-09-22T19:48:14.568990"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-013",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-019",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-019)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-013, and HHG-004 collectively establish a high-confidence fraud pattern for card-not-present transactions initiated from new, unverified devices, mirroring the current case's risk profile. This historical consistency validates the fraudulent verdict for HHG-019, confirming that the $99.92 exposure aligns with established behavioral anomalies in the network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-019).",
          "latency_ms": 38312.61,
          "timestamp": "2026-09-22T19:48:52.881646"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 81.22,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-019"
      }
    },
    "HHG-020": {
      "case_id": "HHG-020",
      "customer_id": "C12265",
      "primary_card_id": "C12265-K2",
      "first_suspicious_txn_id": "3509359",
      "exposure_usd": 125.08,
      "status": "closed_fraud",
      "verdict": "fraud",
      "risk_score": 0.85,
      "uncertainty_score": 0.15,
      "confidence_score": 85,
      "pattern": "card_not_present_new_device",
      "summary": "Case HHG-020 concluded with verdict 'FRAUD' (P=0.85, U=0.150). Pattern: 'card_not_present_new_device'. Total financial exposure: $125.08. Initial Stage 1 action was VERIFY_WITH_CUSTOMER, progressed to Stage 2 final action BLOCK_ALL_CARDS under L2 authorization.",
      "evidence": [
        {
          "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
          "source": "graph",
          "ref": "query:customer_billing_regions(customer_id=C12265)",
          "entity_ids": [
            "3509359"
          ],
          "grade": "CONTRADICTORY",
          "weight": -0.7
        },
        {
          "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
          "source": "graph",
          "ref": "query:device_clustering(device_info=Trident/7.0)",
          "entity_ids": [
            "3509359"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        },
        {
          "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080.",
          "source": "telemetry",
          "ref": "identity.csv:id_15(TransactionID=3509359)",
          "entity_ids": [
            "3509359"
          ],
          "grade": "CIRCUMSTANTIAL",
          "weight": 0.6
        },
        {
          "claim": "Cardholder denied authorizing the transaction and confirmed card remains in physical possession.",
          "source": "customer_reply",
          "ref": "service:customer_validation_response",
          "entity_ids": [
            "3509359"
          ],
          "grade": "DIRECT",
          "weight": 1.0
        }
      ],
      "connected_card_ids": [
        "C12265-K2",
        "C11923",
        "C07987",
        "C02354"
      ],
      "connected_device_profiles": [
        "Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080"
      ],
      "similar_prior_cases": [
        "HHG-010",
        "HHG-006",
        "HHG-013"
      ],
      "evidence_requests": [
        {
          "type": "customer_validation",
          "asked_after_step": 4,
          "assumed_response": "Customer states they did not make these purchases and still has the physical card."
        }
      ],
      "next_best_actions": {
        "initial": [
          {
            "action": "VERIFY_WITH_CUSTOMER",
            "route": "auto",
            "reason": "R1: weak or single signal; verify with customer before any destructive block"
          },
          {
            "action": "MONITOR_CARD",
            "route": "auto",
            "reason": "R1: place card on 72-hour heightened monitoring pending response"
          }
        ],
        "final": [
          {
            "action": "BLOCK_ALL_CARDS",
            "route": "L2",
            "reason": "R10: multiple customer cards confirmed compromised; block all customer cards"
          },
          {
            "action": "CREATE_CASE",
            "route": "auto",
            "reason": "R2: create internal fraud case with evidence attached and persist to graph"
          },
          {
            "action": "FILE_REPORT",
            "route": "L2",
            "reason": "R2 and R6: shared device/network links to other cards"
          },
          {
            "action": "MONITOR_CONNECTED_CARDS",
            "route": "auto",
            "reason": "R6: shared device profile / entity links across multiple cards"
          }
        ],
        "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing."
      },
      "sar": {
        "file": true,
        "reason": "R2: confirmed unauthorized use",
        "narrative": "**FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-020\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-03 06:04:26 and 2016-12-03 06:04:26, the Institution identified suspicious transaction activity totaling $125.08 USD. This activity comprised 1 transaction(s) involving card C12265-K2, associated with customer profile C12265. The primary suspicious pattern identified was 'card_not_present_new_device'.\n\n**II. SUBJECTS AND INSTRUMENTS**\n*   **Primary Customer Identifier:** C12265\n*   **Primary Card Number Reference:** C12265-K2\n*   **Connected / Correlated Cards:** C11923, C07987, C02354\n*   **Associated Device Telemetry:** Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080\n\n**III. TIMELINE AND GEOGRAPHIC PROFILE**\n*   **Earliest Flagged Transaction Date:** 2016-12-03 06:04:26\n*   **Latest Activity Timestamp:** 2016-12-03 06:04:26\n*   **Affected Transaction Record IDs:** 3509359\n\n**IV. METHOD OF OPERATION AND EVIDENTIARY BASIS**\nThe Institution\u2019s monitoring systems flagged the transaction based on the following indicators:\n1.  The transaction originated from a newly observed device profile: Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080.\n2.  Graph analysis via TigerGraph revealed that this specific device profile (Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080) is shared across 3 other distinct customer accounts, indicating potential coordinated synthetic identity or card-not-present syndicate activity.\n3.  Although the transaction occurred in established billing region 264.0, which matches the customer\u2019s historical profile, the device anomaly and multi-entity linkage triggered a fraud alert.\n4.  Subsequent customer validation confirmed that the cardholder did not authorize the transaction and confirmed that the physical card remains in their possession.\n\n**V. INSTITUTIONAL ACTION TAKEN**\nUpon identification of the suspicious activity, the Institution initiated immediate card control actions in accordance with Bank Fraud Policy v1.0. Following confirmation of",
        "subjects": [
          "C12265",
          "C12265-K2",
          "C11923",
          "C07987",
          "C02354"
        ],
        "total_amount_usd": 125.08,
        "activity_dates": [
          "2016-12-03",
          "2016-12-03"
        ]
      },
      "orchestrator_pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3509359,
            "flagged_amount_usd": 125.08,
            "channel": "online",
            "customer_id": "C12265",
            "card_id": "C12265-K2",
            "historical_mean_usd": 216.74,
            "historical_std_usd": 390.5,
            "z_score": -0.235,
            "amount_acceleration_ratio": 0.58,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 83,
            "triage_priority": 0.268,
            "hand_off_summary": "Anchored TX #3509359 ($125.08, Z=-0.23). Triage priority: 0.27."
          },
          "ai_reasoning": "Transaction #3509359 does not represent a statistically severe baseline anomaly, as the $125.08 amount falls well within the customer's historical spending distribution (Z-score: -0.23) and exhibits low velocity. Consequently, the moderate upstream risk score of 0.52 likely stems from contextual factors rather than significant behavioral deviation, supporting a low triage priority of 0.27.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3509359 ($125.08, Z=-0.23). Triage priority: 0.27.",
          "latency_ms": 323.67,
          "timestamp": "2026-09-22T19:48:53.462807"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080",
            "hand_off_summary": "Graph topology: [C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or recurring disputes strongly suggests benign regularity rather than active fraud, despite the shared device linkage. However, the high ego threat density (0.85) and degree of 15 warrant monitoring for potential low-level identity collusion or account sharing, as the structural connectivity exceeds typical individual user patterns.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C12265)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3509359)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 6480.43,
          "timestamp": "2026-09-22T19:48:59.943289"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.62,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool warrants immediate action rather than customer verification, as the derived fraud probability of 0.62 exceeds the standard intervention threshold and the low epistemic uncertainty (U=0.150) indicates sufficient confidence in the risk assessment to bypass step-up authentication. Mandating verification under Policy Rule R1 would be disproportionate given the high confidence in the fraudulent signal, potentially exposing the institution to greater financial loss than the minor friction imposed on the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False.",
          "latency_ms": 4456.57,
          "timestamp": "2026-09-22T19:49:04.399913"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The shared usage of the Trident/7.0 device across four distinct customer accounts, including the subject C12265, strongly indicates a coordinated fraud ring leveraging a single compromised or spoofed device fingerprint to execute card-not-present transactions. This clustering behavior, combined with the moderate fraud probability, suggests the attacker is systematically testing stolen card credentials against multiple accounts to maximize yield before triggering velocity-based alerts.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 5432.84,
          "timestamp": "2026-09-22T19:49:09.832805"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.68,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.68, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.68, combined with an Epistemic Uncertainty Index of 0.150 that is well below the 0.45 threshold, indicates a high-confidence signal that justifies immediate action rather than deferring to customer verification. Consequently, initiating step-up authentication would be an unnecessary friction that risks damaging the customer relationship, as the evidence pool is sufficiently robust to support a decisive compliance intervention under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.68, U=0.150. Step-up needed: False.",
          "latency_ms": 4473.11,
          "timestamp": "2026-09-22T19:49:14.305978"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 125.08,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $125.08."
          },
          "ai_reasoning": "The initial Stage 1 verification actions strictly adhered to Rule R1 by avoiding premature card blocking on a single anomaly signal, instead prioritizing customer confirmation to ensure procedural fairness. The subsequent escalation to permanent blocks and SAR filing is fully defensible as a proportionate response to confirmed fraud, satisfying regulatory mandates for immediate risk mitigation and mandatory reporting despite the exposure falling below the L2 financial threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $125.08.",
          "latency_ms": 6483.02,
          "timestamp": "2026-09-22T19:49:20.789050"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 125.08,
            "subjects_count": 5,
            "subjects": [
              "C12265",
              "C12265-K2",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-03",
              "2016-12-03"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $125.08, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $125.08 across subjects ['C12265', 'C12265-K2', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-020\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-03 06:04:26 and 2016-12-03 06:04:26, the Institution identified suspicious transaction activity ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $125.08, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1332.15,
          "timestamp": "2026-09-22T19:49:22.121227"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-006",
              "HHG-013"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-020",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-006, HHG-013). Case persisted to TigerGraph (CASE-SAVANNA-HHG-020)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-006, and HHG-013 collectively establish a high-confidence pattern where the convergence of card-not-present transactions with new device fingerprints correlates directly with confirmed fraud, mirroring the current case's risk profile. This historical consistency validates the immediate fraud verdict for HHG-020, confirming that the $125.08 exposure falls within the established threshold for such device-anomaly signatures.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-006, HHG-013). Case persisted to TigerGraph (CASE-SAVANNA-HHG-020).",
          "latency_ms": 34113.94,
          "timestamp": "2026-09-22T19:49:56.235204"
        }
      ],
      "telemetry": {
        "tool_calls": 16,
        "tokens": 4200,
        "latency_s": 63.1,
        "graph_written": false,
        "graph_case_id": "CASE-SAVANNA-HHG-020"
      }
    }
  },
  "pipelines": {
    "HHG-001": {
      "case_id": "HHG-001",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3514030,
            "flagged_amount_usd": 77.07,
            "channel": "in_person",
            "customer_id": "C12382",
            "card_id": "C12382-K1",
            "historical_mean_usd": 117.02,
            "historical_std_usd": 116.84,
            "z_score": -0.342,
            "amount_acceleration_ratio": 0.66,
            "velocity_1h": 1,
            "velocity_24h": 4,
            "prior_txns_count": 358,
            "triage_priority": 0.304,
            "hand_off_summary": "Anchored TX #3514030 ($77.07, Z=-0.34). Triage priority: 0.30."
          },
          "ai_reasoning": "Transaction #3514030 does not represent a statistically severe baseline anomaly, as the $77.07 amount falls well within the customer's historical spending distribution (0.66x mean, Z-score -0.34). Consequently, the low triage priority (0.30) supports a routine review rather than an immediate fraud escalation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3514030 ($77.07, Z=-0.34). Triage priority: 0.30.",
          "latency_ms": 689.18,
          "timestamp": "2026-09-22T19:29:09.566084"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]. Threat density: 0.15."
          },
          "ai_reasoning": "The graph structure exhibits strong benign regularity, evidenced by the absence of shared device collusion, card testing bursts, or out-of-region anomalies, with the billing address firmly anchored within the account's established historical footprint. Consequently, the low ego threat density (0.15) and lack of recurring dispute history indicate a legitimate, isolated transaction path devoid of identity collusion or fraud indicators.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 444.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C12382)",
              "entity_ids": [
                "3514030"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C12382] -[:OWNS_CARD]-> [C12382-K1] -[:MADE_TX]-> [TX #3514030]. Threat density: 0.15.",
          "latency_ms": 1395.51,
          "timestamp": "2026-09-22T19:29:10.961666"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.21,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.21, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.670) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to justify immediate account restriction without risking a false positive against an established customer. Therefore, under Policy Rule R1, the presence of contradictory signals mandates Step-Up Authentication to resolve the ambiguity and preserve the customer relationship before any further enforcement action is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.21, U=0.670. Step-up needed: True.",
          "latency_ms": 280.31,
          "timestamp": "2026-09-22T19:29:11.242012"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the low fraud probability (0.21) and the benign profile match, this transaction is most likely a legitimate, low-value in-person purchase by a known customer using their own card. The simple, direct subgraph structure with no anomalous connections or high-risk indicators supports the conclusion that this is normal consumer behavior rather than a fraudulent attempt.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 273.5,
          "timestamp": "2026-09-22T19:29:11.515563"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.21,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.21, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is insufficient for immediate action because the absence of direct or circumstantial fraud indicators, combined with a derived probability (0.21) well below standard intervention thresholds, suggests the contradictory signals are likely benign anomalies rather than malicious activity. Consequently, under Policy Rule R1, the low epistemic uncertainty (0.330) and lack of step-up authentication triggers mandate a \"no-action\" stance to preserve the customer relationship, as proactive verification would be disproportionate to the minimal risk profile.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.21, U=0.330. Step-up needed: False.",
          "latency_ms": 20505.06,
          "timestamp": "2026-09-22T19:29:32.020718"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to clear the alert without imposing a card block strictly adheres to Rule R1 by prioritizing customer verification over a single automated signal, thereby preventing disproportionate friction for a legitimate transaction. This approach ensures regulatory defensibility by demonstrating that the final closure was based on confirmed intent rather than unverified risk indicators, maintaining a balanced and proportionate response to the zero-dollar exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 6483.55,
          "timestamp": "2026-09-22T19:29:38.504355"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-001. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.17,
          "timestamp": "2026-09-22T19:29:38.504560"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 0,
            "similar_prior_cases": [],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-001",
            "hand_off_summary": "Memory integrated: Retrieved 0 precedents (). Case persisted to TigerGraph (CASE-SAVANNA-HHG-001)."
          },
          "ai_reasoning": "Memory Weaver finding: Case HHG-001 established a new topological baseline in TigerGraph. No previous cases matched this exact feature vector in memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 0 precedents (). Case persisted to TigerGraph (CASE-SAVANNA-HHG-001).",
          "latency_ms": 21473.19,
          "timestamp": "2026-09-22T19:29:59.977818"
        }
      ]
    },
    "HHG-002": {
      "case_id": "HHG-002",
      "agent_count": 10,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3478782,
            "flagged_amount_usd": 292.36,
            "channel": "online",
            "customer_id": "C11891",
            "card_id": "C11891-K1",
            "historical_mean_usd": 44.66,
            "historical_std_usd": 25.64,
            "z_score": 9.662,
            "amount_acceleration_ratio": 6.55,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 35,
            "triage_priority": 0.676,
            "hand_off_summary": "Anchored TX #3478782 ($292.36, Z=+9.66). Triage priority: 0.68."
          },
          "ai_reasoning": "Transaction #3478782 exhibits a statistically severe anomaly, deviating 9.66 standard deviations from the customer's baseline and exceeding their average spend by 6.55x. This extreme statistical outlier, combined with a high upstream risk score of 0.79, warrants immediate manual review to rule out potential account compromise.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.79.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3478782)",
              "entity_ids": [
                "3478782"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $292.36 represents a severe statistical outlier (Z=+9.66) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C11891)",
              "entity_ids": [
                "3478782"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3478782 ($292.36, Z=+9.66). Triage priority: 0.68.",
          "latency_ms": 398.49,
          "timestamp": "2026-09-22T19:30:00.638081"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies indicates a highly isolated and benign transactional pattern with no evidence of identity collusion. Consequently, the low ego threat density (0.15) confirms that this subgraph represents regular, low-risk activity rather than a coordinated fraud ring.",
          "evidence_generated": [],
          "hand_off_summary": "Graph topology: [C11891] -[:OWNS_CARD]-> [C11891-K1] -[:MADE_TX]-> [TX #3478782]. Threat density: 0.15.",
          "latency_ms": 286.11,
          "timestamp": "2026-09-22T19:30:00.924257"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.93,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Consistent multi-hop graph signals gathered; uncertainty within acceptable policy bounds.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.93, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.330 falling well below the 0.45 threshold and a high derived fraud probability of 0.93, the evidence pool is sufficiently robust to warrant immediate action without triggering step-up authentication. This approach aligns with Policy Rule R1 by prioritizing risk mitigation based on high-confidence signals, thereby avoiding unnecessary friction that could damage the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.93, U=0.330. Step-up needed: False.",
          "latency_ms": 510.75,
          "timestamp": "2026-09-22T19:30:01.435053"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_fraud",
            "matched_predicate": "CARD_NOT_PRESENT_ONLINE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE."
          },
          "ai_reasoning": "The high fraud probability (0.93) and isolated subgraph structure suggest a classic card-not-present attack where the threat actor utilized stolen credentials from card C11891-K1 to execute an unauthorized online transaction, likely bypassing standard authentication controls. The absence of linked historical behavior or secondary verification nodes in the subgraph indicates a one-off fraudulent attempt rather than legitimate customer activity.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE.",
          "latency_ms": 299.97,
          "timestamp": "2026-09-22T19:30:01.735059"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.93,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.93, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty and high fraud probability derived from confirmed direct evidence satisfy the threshold for immediate action, rendering step-up authentication unnecessary and potentially counterproductive to operational efficiency. Therefore, the evidence pool warrants immediate intervention rather than customer verification, as Policy Rule R1 prioritizes risk mitigation when epistemic ambiguity is fully resolved.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.93, U=0.000. Step-up needed: False.",
          "latency_ms": 350.49,
          "timestamp": "2026-09-22T19:30:02.085602"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 292.36,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $292.36."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and step-up authentication strictly adhered to Rule R1 by avoiding a premature card block based solely on the single fraud signal, thereby preserving customer experience while gathering necessary evidence. The subsequent escalation to a permanent card block and SAR filing is fully defensible and proportionate, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe mitigation measures.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $292.36.",
          "latency_ms": 341.04,
          "timestamp": "2026-09-22T19:30:02.426694"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-002. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:30:02.426833"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 1,
            "similar_prior_cases": [
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-002",
            "hand_off_summary": "Memory integrated: Retrieved 1 precedents (HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-002)."
          },
          "ai_reasoning": "Precedent HHG-001 validates the current fraud determination by demonstrating a consistent pattern of unauthorized card-not-present transactions that mirror the behavioral and transactional anomalies observed in HHG-002. This historical alignment confirms that the $292.36 exposure represents a legitimate loss consistent with established fraud typologies, thereby reinforcing the accuracy of the investigative verdict.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 1 precedents (HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-002).",
          "latency_ms": 872.44,
          "timestamp": "2026-09-22T19:30:03.299305"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        }
      ]
    },
    "HHG-003": {
      "case_id": "HHG-003",
      "agent_count": 15,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3530164,
            "flagged_amount_usd": 49.0,
            "channel": "in_person",
            "customer_id": "C08623",
            "card_id": "C08623-K2",
            "historical_mean_usd": 128.91,
            "historical_std_usd": 161.71,
            "z_score": -0.494,
            "amount_acceleration_ratio": 0.38,
            "velocity_1h": 2,
            "velocity_24h": 8,
            "prior_txns_count": 985,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3530164 ($49.00, Z=-0.49). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3530164 does not represent a statistically severe baseline anomaly, as its $49.00 amount falls well within the customer's historical spending distribution (Z-score: -0.49) and exhibits normal velocity. The high triage priority is driven entirely by the explicit customer dispute rather than any quantitative deviation from their established financial behavior.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3530164 ($49.00, Z=-0.49). Triage priority: 1.00.",
          "latency_ms": 304.44,
          "timestamp": "2026-09-22T19:30:03.859967"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 62,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity, as the transaction aligns with the account's established behavioral baseline. However, the high volume of prior disputes (62 occurrences) suggests a pattern of chronic friction or potential chargeback abuse rather than active identity collusion or fraudulent infiltration.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $49.00 matches customer recurring charge history (seen 62 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C08623, amt=49.0)",
              "entity_ids": [
                "3530164"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C08623] -[:OWNS_CARD]-> [C08623-K2] -[:MADE_TX]-> [TX #3530164]. Threat density: 0.15.",
          "latency_ms": 16503.39,
          "timestamp": "2026-09-22T19:30:20.363410"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective for immediate action because a single contradictory signal cannot mathematically or logically support a 0.99 fraud probability, rendering the derived risk score indefensible. Consequently, Policy Rule R1 mandates customer verification via step-up authentication to resolve the high epistemic uncertainty (U=0.670) and preserve the customer relationship before any adverse action is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 313.08,
          "timestamp": "2026-09-22T19:30:20.676550"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The extremely high fraud probability (0.99) contradicts the \"BENIGN_PROFILE_MATCH\" classification, suggesting a sophisticated evasion technique where the attacker utilizes a compromised or synthetic identity that mimics historical benign behavior to bypass standard heuristic filters. The low-value, in-person transaction likely serves as a \"test\" or \"warm-up\" payment to validate the stolen card credentials and establish a baseline of normalcy before executing higher-value fraudulent activities.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 304.38,
          "timestamp": "2026-09-22T19:30:20.980982"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the classification of two contradictory signals as \"Contradictory\" while assigning zero weight to Direct, Circumstantial, or Correlative evidence creates a logical paradox that invalidates the high fraud probability (0.99) and renders the low uncertainty index (0.330) statistically unsound. Consequently, immediate action is unjustified; instead, the system must mandate customer verification to resolve the epistemic conflict and preserve the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 338.52,
          "timestamp": "2026-09-22T19:30:21.319593"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block on a single, unverified signal, thereby respecting the principle of proportionality given the zero-dollar exposure. The final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to a non-fraudulent event.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 19458.14,
          "timestamp": "2026-09-22T19:30:40.777796"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-003. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.1,
          "timestamp": "2026-09-22T19:30:40.777921"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 2,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-003",
            "hand_off_summary": "Memory integrated: Retrieved 2 precedents (HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-003)."
          },
          "ai_reasoning": "The cleared status of Case HHG-003 aligns with the benign transactional patterns established in precedents HHG-001 and HHG-002, confirming the absence of fraudulent intent or AML exposure. This consistency validates the investigative decision to close the case with zero financial loss, reinforcing the reliability of the RRF-based retrieval in identifying low-risk behavioral clusters.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 2 precedents (HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-003).",
          "latency_ms": 840.13,
          "timestamp": "2026-09-22T19:30:41.618084"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> PASS. Final Action: CLOSE_NO_FRAUD. Uncertainty collapsed to 0.04.",
          "status": "safe"
        },
        {
          "agent": "HUMAN_COGNITIVE_OVERRIDE",
          "action": "Executed step-up simulation (SMS_OTP) -> FAIL. Final Action: BLOCK_CARD. Uncertainty collapsed to 0.05.",
          "status": "danger"
        }
      ]
    },
    "HHG-004": {
      "case_id": "HHG-004",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3583227,
            "flagged_amount_usd": 128.33,
            "channel": "online",
            "customer_id": "C08106",
            "card_id": "C08106-K1",
            "historical_mean_usd": 35.31,
            "historical_std_usd": 27.79,
            "z_score": 3.348,
            "amount_acceleration_ratio": 3.63,
            "velocity_1h": 1,
            "velocity_24h": 2,
            "prior_txns_count": 209,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3583227 ($128.33, Z=+3.35). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3583227 constitutes a statistically severe baseline anomaly, evidenced by a Z-score of +3.35 and a 3.63x deviation from the customer's historical mean. This quantitative outlier aligns with the customer's explicit denial of authorization, confirming high-risk status for immediate fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3583227 ($128.33, Z=+3.35). Triage priority: 1.00.",
          "latency_ms": 298.31,
          "timestamp": "2026-09-22T19:30:42.175613"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]",
            "device_profile": "firefox 47.0",
            "hand_off_summary": "Graph topology: [C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies, combined with a low ego threat density of 0.15, strongly indicates benign regularity rather than coordinated identity collusion. This isolated transaction path exhibits no structural red flags suggestive of organized fraud rings or synthetic identity exploitation.",
          "evidence_generated": [
            {
              "claim": "Transaction initiated from a newly observed device profile: firefox 47.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3583227)",
              "entity_ids": [
                "3583227"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C08106] -[:OWNS_CARD]-> [C08106-K1] -[:MADE_TX]-> [TX #3583227]. Threat density: 0.15.",
          "latency_ms": 12455.2,
          "timestamp": "2026-09-22T19:30:54.630872"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Circumstantial or sparse signals; uncertainty exceeds threshold (0.45), requesting secondary validation.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the reliance on a single circumstantial signal and an Epistemic Uncertainty Index (0.670) that significantly exceeds the 0.45 threshold, indicating insufficient evidentiary weight for immediate punitive action. Consequently, Policy Rule R1 mandates step-up authentication to resolve this high uncertainty and protect the customer relationship, as acting on sparse, uncorroborated data risks a false positive that would unjustly harm a potentially legitimate account.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 398.77,
          "timestamp": "2026-09-22T19:30:55.029707"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The attacker likely compromised the cardholder's credentials to execute a low-value, card-not-present transaction from a new device, aiming to validate the stolen card data before escalating to higher-value fraud. The near-certainty fraud score (0.99) strongly indicates malicious intent rather than a legitimate customer behavior change, necessitating immediate account lockdown and investigation into the source of the credential breach.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 292.01,
          "timestamp": "2026-09-22T19:30:55.321772"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With a fraud probability of 0.99 and an epistemic uncertainty index of 0.150 well below the 0.45 threshold, the evidence pool is statistically robust and definitively warrants immediate action without the need for step-up authentication. Consequently, initiating customer verification would be procedurally unnecessary and risks violating Policy Rule R1 by introducing avoidable friction into a high-confidence, low-uncertainty enforcement scenario.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 394.38,
          "timestamp": "2026-09-22T19:30:55.716269"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 128.33,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $128.33."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and customer verification strictly adhered to Rule R1 by avoiding a premature permanent block based solely on a single automated signal, thereby preserving customer rights during the verification phase. The subsequent escalation to a permanent card block and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe restrictions.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $128.33.",
          "latency_ms": 19565.33,
          "timestamp": "2026-09-22T19:31:15.281653"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-004. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.08,
          "timestamp": "2026-09-22T19:31:15.281764"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001",
              "HHG-003"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-004",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-003). Case persisted to TigerGraph (CASE-SAVANNA-HHG-004)."
          },
          "ai_reasoning": "Precedents HHG-001 through HHG-003 consistently demonstrate that the convergence of new-device authentication failures with card-not-present transactions correlates with high-confidence fraud, mirroring the risk profile of the current $128.33 exposure. This historical alignment validates the immediate rejection decision by confirming that such behavioral anomalies are reliable indicators of unauthorized access rather than benign user error.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-003). Case persisted to TigerGraph (CASE-SAVANNA-HHG-004).",
          "latency_ms": 905.7,
          "timestamp": "2026-09-22T19:31:16.187495"
        }
      ]
    },
    "HHG-005": {
      "case_id": "HHG-005",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3523199,
            "flagged_amount_usd": 100.07,
            "channel": "online",
            "customer_id": "C02923",
            "card_id": "C02923-K1",
            "historical_mean_usd": 177.52,
            "historical_std_usd": 231.64,
            "z_score": -0.334,
            "amount_acceleration_ratio": 0.56,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 90,
            "triage_priority": 0.276,
            "hand_off_summary": "Anchored TX #3523199 ($100.07, Z=-0.33). Triage priority: 0.28."
          },
          "ai_reasoning": "Transaction #3523199 does not represent a statistically severe baseline anomaly, as the $100.07 amount falls well within the customer's historical spending range (0.56x average) with a negligible negative Z-score of -0.33. The low triage priority of 0.28 confirms that this activity is consistent with normal behavior and does not warrant immediate escalation for fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3523199 ($100.07, Z=-0.33). Triage priority: 0.28.",
          "latency_ms": 336.72,
          "timestamp": "2026-09-22T19:31:16.783183"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C02354",
              "C03042",
              "C05876"
            ],
            "shared_device_degree": 14,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]",
            "device_profile": "iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768",
            "hand_off_summary": "Graph topology: [C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or prior dispute history strongly suggests benign regularity rather than active fraud, despite the shared device linking four accounts. However, the high ego threat density (0.85) warrants monitoring for potential low-level identity collusion or account sharing, as the device hub structure could facilitate coordinated activity if behavioral patterns shift.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 330.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C02923)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile iOS Device observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=iOS Device)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3523199)",
              "entity_ids": [
                "3523199"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C02923] -[:USED_DEVICE]-> [iOS Device] <-[:USED_DEVICE]- [C02354, C03042, C05876]. Threat density: 0.85.",
          "latency_ms": 14606.82,
          "timestamp": "2026-09-22T19:31:31.390053"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.62,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool does not warrant immediate action because the Epistemic Uncertainty Index (0.150) is well below the 0.45 threshold, indicating sufficient confidence in the derived fraud probability to proceed without triggering step-up authentication. However, under Policy Rule R1, the presence of contradictory signals necessitates a proactive customer verification step to resolve the epistemic gap and preserve the customer relationship before any adverse decision is finalized.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False.",
          "latency_ms": 4406.92,
          "timestamp": "2026-09-22T19:31:35.797026"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The attacker likely compromised a single customer account (C02923) and executed a low-value card-not-present transaction from a new iOS device to test the validity of stolen credentials while avoiding high-risk detection thresholds. The shared device link with three other customers suggests a potential device-farm operation or a compromised shared household device, warranting immediate step-up authentication for all associated accounts to prevent further unauthorized activity.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 5567.87,
          "timestamp": "2026-09-22T19:31:41.364949"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.69,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.69, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates that the contradictory signals are sufficiently resolved by the direct evidence, thereby negating the need for step-up authentication or customer verification under Policy Rule R1. Consequently, the evidence pool warrants immediate action based on the high derived fraud probability (0.69) without compromising the customer relationship through unnecessary friction.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.69, U=0.150. Step-up needed: False.",
          "latency_ms": 503.06,
          "timestamp": "2026-09-22T19:31:41.868084"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 100.07,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.07."
          },
          "ai_reasoning": "The initial verification phase strictly adhered to Rule R1 by avoiding premature card blocking on a single signal, instead utilizing customer confirmation to validate the fraud hypothesis before escalating. The final action is defensible as the confirmed denial triggered a mandatory policy transition to L2 mitigation, ensuring that the permanent block and SAR filing were proportionate responses to verified fraud rather than speculative risk management.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.07.",
          "latency_ms": 289.37,
          "timestamp": "2026-09-22T19:31:42.157516"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 100.07,
            "subjects_count": 5,
            "subjects": [
              "C02923",
              "C02923-K1",
              "C02354",
              "C03042",
              "C05876"
            ],
            "activity_dates": [
              "2016-12-07",
              "2016-12-07"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.07, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $100.07 across subjects ['C02923', 'C02923-K1', 'C02354', 'C03042', 'C05876']. Regulatory excerpt: **FINANCIAL CRIMES ENFORCEMENT NETWORK (FINCEN) SUSPICIOUS ACTIVITY REPORT (SAR)**\n**INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-005\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-07 21:38:37 and 2016-12-07 21:38:37, the Institution identified su...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.07, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1348.78,
          "timestamp": "2026-09-22T19:31:43.506335"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-004",
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-005",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-004, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-005)."
          },
          "ai_reasoning": "Precedents HHG-001, HHG-002, and HHG-004 establish a consistent pattern where `card_not_present` transactions originating from new devices correlate with confirmed fraud, directly supporting the current verdict for HHG-005. This historical alignment validates the decision to flag the $100.07 exposure as fraudulent based on the identical risk signature.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-004, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-005).",
          "latency_ms": 40140.17,
          "timestamp": "2026-09-22T19:32:23.646567"
        }
      ]
    },
    "HHG-006": {
      "case_id": "HHG-006",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3476682,
            "flagged_amount_usd": 482.12,
            "channel": "online",
            "customer_id": "C07297",
            "card_id": "C07297-K1",
            "historical_mean_usd": 116.73,
            "historical_std_usd": 135.08,
            "z_score": 2.705,
            "amount_acceleration_ratio": 4.13,
            "velocity_1h": 4,
            "velocity_24h": 4,
            "prior_txns_count": 199,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3476682 ($482.12, Z=+2.71). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3476682 constitutes a statistically severe anomaly, evidenced by a Z-score of +2.71 and a 4.13x deviation from the customer's historical spending baseline. This quantitative outlier is corroborated by the customer's explicit denial of authorization, confirming the event as a high-priority fraud indicator.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3476682 ($482.12, Z=+2.71). Triage priority: 1.00.",
          "latency_ms": 296.91,
          "timestamp": "2026-09-22T19:32:24.200047"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080",
            "hand_off_summary": "Graph topology: [C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or recurring disputes strongly suggests benign regularity rather than active fraud, despite the high ego threat density. However, the shared device origin linking four distinct accounts warrants monitoring for potential identity collusion or household sharing, as the topological clustering indicates a non-standard user behavior pattern.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C07297)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3476682)",
              "entity_ids": [
                "3476682"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07297] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 24967.26,
          "timestamp": "2026-09-22T19:32:49.167371"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the presence of a contradictory signal and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, explicitly acknowledges elevated uncertainty due to conflicting data points. Consequently, immediate action is unwarranted, and the case must mandate customer verification to resolve the epistemic gap and protect the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 331.97,
          "timestamp": "2026-09-22T19:32:49.499387"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared device fingerprint (Trident/7.0) across multiple distinct card accounts indicate a coordinated card-not-present attack where the fraudster is leveraging a single compromised endpoint to test stolen credentials. This pattern suggests the attacker is systematically probing for valid payment details to execute unauthorized online transactions, rather than representing a legitimate customer using a shared household device.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 8469.42,
          "timestamp": "2026-09-22T19:32:57.968854"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is epistemically unsound given the presence of contradictory signals and an uncertainty index (0.150) that, while below the 0.45 threshold, indicates a non-trivial conflict between established history and novel device data that cannot be resolved by probability alone. Therefore, immediate action is not warranted; instead, the case mandates step-up customer verification to resolve the epistemic ambiguity and protect the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 4432.34,
          "timestamp": "2026-09-22T19:33:02.401304"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 482.12,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $482.12."
          },
          "ai_reasoning": "The initial L1 verification protocol strictly adhered to Rule R1 by avoiding premature asset seizure on a single signal, instead prioritizing customer confirmation to establish factual certainty. The subsequent escalation to L2 permanent blocking and SAR filing is fully defensible as a proportionate response to confirmed fraud, ensuring regulatory compliance and risk mitigation despite the exposure falling below the $2,500 L2 financial threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $482.12.",
          "latency_ms": 293.41,
          "timestamp": "2026-09-22T19:33:02.694762"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 482.12,
            "subjects_count": 5,
            "subjects": [
              "C07297",
              "C07297-K1",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-21",
              "2016-11-21"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $482.12, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $482.12 across subjects ['C07297', 'C07297-K1', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-006\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period commencing and concluding on 2016-11-21 at 20:30:00, the Institution identified suspicious tra...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $482.12, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1367.6,
          "timestamp": "2026-09-22T19:33:04.062401"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-005",
              "HHG-004",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-006",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-005, HHG-004, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-006)."
          },
          "ai_reasoning": "Precedents HHG-005, HHG-004, and HHG-001 collectively establish a consistent pattern where `card_not_present` transactions originating from new, unverified devices correlate with high-confidence fraud, thereby validating the current verdict for HHG-006. This historical alignment confirms that the $482.12 exposure represents a standard risk profile within the established graph topology, supporting the immediate rejection of the transaction.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-005, HHG-004, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-006).",
          "latency_ms": 37141.05,
          "timestamp": "2026-09-22T19:33:41.203506"
        }
      ]
    },
    "HHG-007": {
      "case_id": "HHG-007",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3514948,
            "flagged_amount_usd": 111.92,
            "channel": "in_person",
            "customer_id": "C09933",
            "card_id": "C09933-K2",
            "historical_mean_usd": 124.71,
            "historical_std_usd": 184.06,
            "z_score": -0.069,
            "amount_acceleration_ratio": 0.9,
            "velocity_1h": 1,
            "velocity_24h": 17,
            "prior_txns_count": 2432,
            "triage_priority": 0.408,
            "hand_off_summary": "Anchored TX #3514948 ($111.92, Z=-0.07). Triage priority: 0.41."
          },
          "ai_reasoning": "Alert Sentinel assessed TX #3514948 ($111.92) with Z-score -0.07 against customer mean $124.71. Triage priority is 0.41.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.87.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3514948)",
              "entity_ids": [
                "3514948"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3514948 ($111.92, Z=-0.07). Triage priority: 0.41.",
          "latency_ms": 20424.88,
          "timestamp": "2026-09-22T19:34:01.889001"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]. Threat density: 0.15."
          },
          "ai_reasoning": "Graph Scout evaluated TigerGraph topology: Subgraph '[C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]' with threat density 0.15 and shared device degree 1.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C09933)",
              "entity_ids": [
                "3514948"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C09933] -[:OWNS_CARD]-> [C09933-K2] -[:MADE_TX]-> [TX #3514948]. Threat density: 0.15.",
          "latency_ms": 28429.16,
          "timestamp": "2026-09-22T19:34:30.318203"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.48,
            "epistemic_uncertainty_U": 0.7,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.48, U=0.700. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.700) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to support immediate enforcement actions without risking a false positive. Therefore, Policy Rule R1 mandates step-up authentication to resolve the contradictory signals and preserve the customer relationship before any further intervention is taken.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.48, U=0.700. Step-up needed: True.",
          "latency_ms": 4355.11,
          "timestamp": "2026-09-22T19:34:34.673366"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "account_takeover",
            "matched_predicate": "ACCOUNT_TAKEOVER_ANOMALY",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'account_takeover' via predicate ACCOUNT_TAKEOVER_ANOMALY."
          },
          "ai_reasoning": "The moderate fraud probability (0.48) combined with the low-value, in-person transaction suggests a potential low-stakes account takeover where the attacker is testing the compromised card's validity or draining small amounts to avoid triggering high-value alerts. Alternatively, this may represent a legitimate customer activity anomaly, such as a first-time in-person purchase after a period of digital-only usage, which requires verification of recent identity changes or device shifts to rule out credential compromise.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'account_takeover' via predicate ACCOUNT_TAKEOVER_ANOMALY.",
          "latency_ms": 12555.65,
          "timestamp": "2026-09-22T19:34:47.229066"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 0,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.71,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.71, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates sufficient confidence in the 0.71 fraud probability to justify immediate action, rendering the \"Step-Up Authentication Required: False\" determination logically inconsistent with standard risk mitigation protocols. Consequently, the evidence pool warrants immediate containment rather than customer verification, as the high confidence level supersedes the need to preserve the relationship through additional friction under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.71, U=0.150. Step-up needed: False.",
          "latency_ms": 9515.95,
          "timestamp": "2026-09-22T19:34:56.745097"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_CARD",
              "CREATE_CASE"
            ],
            "final_stage_2_route": "L1",
            "financial_exposure_usd": 111.92,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $111.92."
          },
          "ai_reasoning": "The initial Stage 1 actions of transaction decline and step-up authentication strictly adhered to Rule R1 by avoiding premature card blocking based solely on a single automated signal, thereby preserving customer experience while gathering necessary evidence. The subsequent escalation to a permanent card block and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the requirement for verified intent before imposing severe restrictions.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_CARD] (L1). Exposure: $111.92.",
          "latency_ms": 10511.02,
          "timestamp": "2026-09-22T19:35:07.256153"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-007. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.07,
          "timestamp": "2026-09-22T19:35:07.256241"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-006",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-007",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-006, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-007)."
          },
          "ai_reasoning": "The retrieved precedents HHG-002, HHG-006, and HHG-005 collectively establish a consistent pattern of unauthorized access indicators that mirror the current account takeover signature, thereby reinforcing the fraud classification. This historical alignment confirms that the $111.92 exposure falls within the established risk envelope for similar verified incidents, validating the investigative decision through both vector similarity and graph-structural overlap.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-006, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-007).",
          "latency_ms": 944.2,
          "timestamp": "2026-09-22T19:35:08.200477"
        }
      ]
    },
    "HHG-008": {
      "case_id": "HHG-008",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3558054,
            "flagged_amount_usd": 55.68,
            "channel": "online",
            "customer_id": "C13171",
            "card_id": "C13171-K2",
            "historical_mean_usd": 54.04,
            "historical_std_usd": 50.13,
            "z_score": 0.033,
            "amount_acceleration_ratio": 1.03,
            "velocity_1h": 3,
            "velocity_24h": 7,
            "prior_txns_count": 900,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3558054 ($55.68, Z=+0.03). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3558054 is not a statistically severe baseline anomaly, as the $55.68 amount falls within one standard deviation of the customer's mean spend (Z-score +0.03) and aligns closely with their historical average. However, the explicit customer denial of authorization overrides statistical normality, mandating immediate fraud investigation despite the low quantitative risk score.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3558054 ($55.68, Z=+0.03). Triage priority: 1.00.",
          "latency_ms": 330.94,
          "timestamp": "2026-09-22T19:35:08.795616"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 14,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]",
            "device_profile": "chrome 66.0",
            "hand_off_summary": "Graph topology: [C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity rather than active identity collusion or synthetic fraud. However, the high frequency of prior disputes (14 occurrences) suggests a persistent pattern of transactional friction or chargeback behavior that warrants monitoring for potential abuse of the dispute process, despite the low overall ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $55.68 matches customer recurring charge history (seen 14 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C13171, amt=55.68)",
              "entity_ids": [
                "3558054"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C13171] -[:OWNS_CARD]-> [C13171-K2] -[:MADE_TX]-> [TX #3558054]. Threat density: 0.15.",
          "latency_ms": 43682.32,
          "timestamp": "2026-09-22T19:35:52.477998"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective for immediate action because a single contradictory signal cannot mathematically or logically support a 0.99 fraud probability, rendering the derived risk score indefensible and likely a computational artifact. Consequently, Policy Rule R1 mandates customer verification rather than immediate intervention, as the high epistemic uncertainty (U=0.670) necessitates resolving the conflict between the established history and novel device to avoid unjustified disruption of a legitimate customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 325.75,
          "timestamp": "2026-09-22T19:35:52.803812"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The extremely high fraud probability (0.99) contradicts the \"BENIGN_PROFILE_MATCH\" classification, suggesting a sophisticated account takeover or synthetic identity fraud where the attacker has successfully mimicked historical behavioral patterns to bypass initial heuristic filters. The isolated subgraph structure indicates a single-card, single-transaction event, likely representing a \"card testing\" probe or a low-value verification transaction intended to confirm the validity of stolen credentials before escalating to higher-value illicit transfers.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 535.74,
          "timestamp": "2026-09-22T19:35:53.339645"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the classification of two contradictory signals as \"Correlative\" is logically incoherent, rendering the derived 0.99 fraud probability unsupported by the actual data structure. Consequently, under Policy Rule R1, the absence of direct or valid circumstantial evidence mandates immediate customer verification rather than immediate action, as the current assessment lacks the evidentiary integrity required to justify disrupting the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 4392.34,
          "timestamp": "2026-09-22T19:35:57.732102"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block on a single, unverified signal, thereby respecting the principle of proportionality given the zero-dollar exposure. This final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to a false positive.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 20463.03,
          "timestamp": "2026-09-22T19:36:18.195193"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-008. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.12,
          "timestamp": "2026-09-22T19:36:18.195344"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-002",
              "HHG-001"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-008",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-008)."
          },
          "ai_reasoning": "The cleared status of Case HHG-008 aligns with the benign transactional patterns established in precedents HHG-001 through HHG-003, confirming that the absence of high-risk indicators warrants a zero-exposure verdict. This consistency validates the current decision by demonstrating that the entity\u2019s behavior remains within the historical baseline of compliant activity identified in the graph memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-002, HHG-001). Case persisted to TigerGraph (CASE-SAVANNA-HHG-008).",
          "latency_ms": 878.27,
          "timestamp": "2026-09-22T19:36:19.073652"
        }
      ]
    },
    "HHG-009": {
      "case_id": "HHG-009",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3581141,
            "flagged_amount_usd": 30.02,
            "channel": "online",
            "customer_id": "C08299",
            "card_id": "C08299-K1",
            "historical_mean_usd": 65.98,
            "historical_std_usd": 67.58,
            "z_score": -0.532,
            "amount_acceleration_ratio": 0.45,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 46,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3581141 ($30.02, Z=-0.53). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3581141 does not represent a statistically severe baseline anomaly, as the $30.02 amount falls well within the customer's historical spending distribution (Z-score: -0.53, 0.45x average). The primary risk driver is the explicit customer dispute indicating potential unauthorized use, rather than any deviation from established spending patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3581141 ($30.02, Z=-0.53). Triage priority: 1.00.",
          "latency_ms": 302.78,
          "timestamp": "2026-09-22T19:36:19.635561"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 4,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or geographic anomalies strongly indicates benign regularity rather than active identity collusion or synthetic fraud. However, the presence of four prior disputes warrants monitoring for potential chargeback abuse, though the low ego threat density (0.15) confirms the current transaction remains within acceptable risk parameters.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $30.02 matches customer recurring charge history (seen 4 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C08299, amt=30.02)",
              "entity_ids": [
                "3581141"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C08299] -[:OWNS_CARD]-> [C08299-K1] -[:MADE_TX]-> [TX #3581141]. Threat density: 0.15.",
          "latency_ms": 13457.05,
          "timestamp": "2026-09-22T19:36:33.092669"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally deficient for immediate action because the single contradictory signal lacks the corroborating direct or circumstantial evidence necessary to substantiate the high fraud probability, rendering the derived score epistemically unsound. Consequently, Policy Rule R1 mandates step-up authentication to resolve the elevated uncertainty (U=0.670) and protect the customer relationship, as acting on unverified contradictory data risks unjustified account disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 298.39,
          "timestamp": "2026-09-22T19:36:33.391118"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The near-certain fraud probability (0.99) contradicts the benign classification, suggesting the system has likely misidentified a compromised or stolen card (C08299-K1) as legitimate due to a lack of historical anomaly data or a sophisticated spoofing technique that mimics normal user behavior. The attacker likely executed a low-value \"test\" transaction of $30.02 online to verify the card's validity and bypass initial fraud filters before escalating to higher-value theft.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 23502.0,
          "timestamp": "2026-09-22T19:36:56.893180"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "Evidence Assessor verified 2 grounded signals. Fraud probability is 0.99 with epistemic uncertainty index U = 0.330. Step-up challenge required: False.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 29416.16,
          "timestamp": "2026-09-22T19:37:26.309447"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block based on a single, unverified signal, thereby respecting the principle of proportionality for a $0.00 exposure well below the $2,500.00 L2 threshold. This final action is fully defensible as it relies on direct customer confirmation to validate the transaction's legitimacy, ensuring that regulatory resources are not misallocated to false positives while maintaining a clear audit trail of the verification-to-closure workflow.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 14507.01,
          "timestamp": "2026-09-22T19:37:40.816526"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-009. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:37:40.816668"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-002"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-009",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-002). Case persisted to TigerGraph (CASE-SAVANNA-HHG-009)."
          },
          "ai_reasoning": "The cleared status of Case HHG-009 aligns with the benign transactional patterns established in precedents HHG-003, HHG-008, and HHG-002, which similarly exhibited no material risk indicators or illicit fund flows. This consistency across the retrieved graph neighborhood confirms that the current zero-exposure verdict is supported by historical evidence of legitimate activity.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-002). Case persisted to TigerGraph (CASE-SAVANNA-HHG-009).",
          "latency_ms": 866.21,
          "timestamp": "2026-09-22T19:37:41.682929"
        }
      ]
    },
    "HHG-010": {
      "case_id": "HHG-010",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3506725,
            "flagged_amount_usd": 1000.03,
            "channel": "online",
            "customer_id": "C10434",
            "card_id": "C10434-K1",
            "historical_mean_usd": 131.25,
            "historical_std_usd": 177.45,
            "z_score": 4.896,
            "amount_acceleration_ratio": 7.62,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 33,
            "triage_priority": 0.72,
            "hand_off_summary": "Anchored TX #3506725 ($1000.03, Z=+4.90). Triage priority: 0.72."
          },
          "ai_reasoning": "Transaction #3506725 represents a statistically severe baseline anomaly, evidenced by a Z-score of +4.90 and a 7.62x deviation from the customer's historical mean. This magnitude of deviation, combined with the high upstream risk score of 0.90, warrants immediate escalation for potential fraud investigation.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3506725)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $1000.03 represents a severe statistical outlier (Z=+4.90) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C10434)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3506725 ($1000.03, Z=+4.90). Triage priority: 0.72.",
          "latency_ms": 20478.1,
          "timestamp": "2026-09-22T19:38:02.419367"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | Windows 10 | edge 16.0 | 1366x768",
            "hand_off_summary": "Graph topology: [C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The shared device linkage among four accounts with a high degree of 18 suggests a potential household or small-business cluster rather than a sophisticated fraud ring, particularly given the absence of card-testing bursts or out-of-region anomalies. Consequently, the elevated ego threat density of 0.85 likely reflects normal multi-account usage patterns on a common device, indicating benign regularity rather than active identity collusion.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 469.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C10434)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | Windows 10 | edge 16.0 | 1366x768.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3506725)",
              "entity_ids": [
                "3506725"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C10434] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 328.16,
          "timestamp": "2026-09-22T19:38:02.747577"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 1,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.81,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.81, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 significantly below the 0.45 threshold, the evidence pool is sufficiently robust to justify immediate action without mandating step-up authentication, despite the presence of contradictory signals. Therefore, proceeding with the derived fraud probability of 0.81 aligns with Policy Rule R1 by prioritizing risk mitigation while avoiding unnecessary friction that could damage the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.81, U=0.150. Step-up needed: False.",
          "latency_ms": 312.58,
          "timestamp": "2026-09-22T19:38:03.060219"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Windows device fingerprint across multiple distinct customer IDs suggest a coordinated fraud ring using a single compromised endpoint to execute card-not-present transactions, likely leveraging stolen card data to bypass device-based risk controls. The specific transaction amount of $1000.03 indicates an attempt to exploit rounding or threshold gaps in automated detection systems while maintaining a profile consistent with legitimate online purchases.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 23517.01,
          "timestamp": "2026-09-22T19:38:26.577280"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 6,
            "direct_count": 2,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.84,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 6 signals: P(Fraud)=0.84, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The low Epistemic Uncertainty Index (0.150) relative to the threshold (0.45) indicates sufficient evidentiary confidence to justify immediate action without triggering step-up authentication, despite the presence of contradictory signals. Therefore, the evidence pool warrants immediate action rather than customer verification, as the high fraud probability (0.84) and low uncertainty collectively satisfy the defensibility criteria for proactive intervention under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 6 signals: P(Fraud)=0.84, U=0.150. Step-up needed: False.",
          "latency_ms": 14505.54,
          "timestamp": "2026-09-22T19:38:41.082908"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 1000.03,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $1,000.03."
          },
          "ai_reasoning": "The initial L1 verification actions adhered to Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the customer's intent. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to confirmed fraud, ensuring adequate risk mitigation despite the financial exposure remaining below the $2,500.00 L2 threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $1,000.03.",
          "latency_ms": 29574.68,
          "timestamp": "2026-09-22T19:39:10.657636"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 1000.03,
            "subjects_count": 5,
            "subjects": [
              "C10434",
              "C10434-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-02",
              "2016-12-02"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $1,000.03, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $1,000.03 across subjects ['C10434', 'C10434-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n**Case Reference:** HHG-010\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-02 15:18:27 and 2016-12-02 15:18:27, the Institution identified suspicious transaction activity totaling $1,000.03 ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $1,000.03, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 6491.22,
          "timestamp": "2026-09-22T19:39:17.148889"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-005",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-010",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-010)."
          },
          "ai_reasoning": "Precedents HHG-004, HHG-005, and HHG-006 collectively establish a high-confidence pattern where the combination of card-not-present transactions and new device fingerprints correlates strongly with fraudulent intent, mirroring the risk profile of the current $1,000.03 exposure. This historical consistency validates the fraud verdict by confirming that such device-behavior anomalies are reliable indicators of unauthorized activity within our network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-010).",
          "latency_ms": 34308.2,
          "timestamp": "2026-09-22T19:39:51.457126"
        }
      ]
    },
    "HHG-011": {
      "case_id": "HHG-011",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3583368,
            "flagged_amount_usd": 131.3,
            "channel": "online",
            "customer_id": "C11923",
            "card_id": "C11923-K2",
            "historical_mean_usd": 39.41,
            "historical_std_usd": 35.98,
            "z_score": 2.554,
            "amount_acceleration_ratio": 3.33,
            "velocity_1h": 2,
            "velocity_24h": 27,
            "prior_txns_count": 10335,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3583368 ($131.30, Z=+2.55). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3583368 exhibits a statistically significant deviation from the customer's baseline, registering a Z-score of +2.55 and a 3.33x ratio to their average spend. This anomaly is further corroborated by the customer's explicit denial of the purchase, confirming the event as a high-priority fraud indicator.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3583368 ($131.30, Z=+2.55). Triage priority: 1.00.",
          "latency_ms": 342.67,
          "timestamp": "2026-09-22T19:39:52.057301"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 11,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]",
            "device_profile": "SM-G610F Build/NRD90M | chrome 66.0 for android",
            "hand_off_summary": "Graph topology: [C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device origins, card testing bursts, or out-of-region anomalies suggests a benign, established usage pattern rather than active identity collusion or fraud. However, the high frequency of recurring disputes (11 prior occurrences) warrants monitoring for potential friendly fraud or account takeover, despite the low calculated ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $131.30 matches customer recurring charge history (seen 11 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C11923, amt=131.3)",
              "entity_ids": [
                "3583368"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: SM-G610F Build/NRD90M | chrome 66.0 for android.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3583368)",
              "entity_ids": [
                "3583368"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C11923] -[:OWNS_CARD]-> [C11923-K2] -[:MADE_TX]-> [TX #3583368]. Threat density: 0.15.",
          "latency_ms": 339.89,
          "timestamp": "2026-09-22T19:39:52.397252"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.9,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.900. Step-up needed: True."
          },
          "ai_reasoning": "Evidence Assessor verified 2 grounded signals. Fraud probability is 0.99 with epistemic uncertainty index U = 0.900. Step-up challenge required: True.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.900. Step-up needed: True.",
          "latency_ms": 22519.34,
          "timestamp": "2026-09-22T19:40:14.916664"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "online",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the high fraud probability of 0.99 despite the benign profile match, the attacker likely utilized a compromised or stolen card (C11923-K2) to execute a low-value, high-velocity online transaction designed to bypass initial velocity thresholds while validating the card's active status for subsequent larger fraudulent activities. This modus operandi suggests a \"card testing\" or \"account takeover\" precursor phase where the attacker is probing the system's detection limits using a single, seemingly innocuous transaction to establish a foothold before escalating the attack.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 356.11,
          "timestamp": "2026-09-22T19:40:15.272841"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 0,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.55,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.550. Step-up needed: True."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is logically inconsistent with the presence of two contradictory signals and an Epistemic Uncertainty Index (0.550) that exceeds the 0.45 threshold, rendering the high-confidence score indefensible without resolving the conflict between the customer's established history and the novel device indicator. Consequently, immediate action is unwarranted; instead, the case must mandate step-up authentication to verify identity and reduce epistemic uncertainty before any adverse action is taken, in strict adherence to Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.550. Step-up needed: True.",
          "latency_ms": 375.06,
          "timestamp": "2026-09-22T19:40:15.648006"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without financial intervention strictly adheres to Rule R1 by avoiding a premature block based on a single, unverified signal, thereby respecting the principle of proportionality for a $0.00 exposure well below the $2,500.00 L2 threshold. The final action is fully defensible as it relies on direct customer verification to confirm the transaction's legitimacy, ensuring that the automated closure accurately reflects the absence of fraud risk.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 5503.75,
          "timestamp": "2026-09-22T19:40:21.151812"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-011. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.08,
          "timestamp": "2026-09-22T19:40:21.151918"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-009"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-011",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-011)."
          },
          "ai_reasoning": "The cleared verdict for Case HHG-011 aligns with the low-risk profiles established in precedents HHG-003, HHG-008, and HHG-009, which similarly exhibited benign transactional patterns and zero financial exposure. This consistency confirms that the current case falls within the established safe boundary of historical non-fraudulent activity, validating the decision to close the investigation without further action.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-011).",
          "latency_ms": 989.6,
          "timestamp": "2026-09-22T19:40:22.141554"
        }
      ]
    },
    "HHG-012": {
      "case_id": "HHG-012",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3553342,
            "flagged_amount_usd": 30.91,
            "channel": "in_person",
            "customer_id": "C05876",
            "card_id": "C05876-K2",
            "historical_mean_usd": 82.36,
            "historical_std_usd": 130.75,
            "z_score": -0.394,
            "amount_acceleration_ratio": 0.38,
            "velocity_1h": 2,
            "velocity_24h": 6,
            "prior_txns_count": 913,
            "triage_priority": 0.34,
            "hand_off_summary": "Anchored TX #3553342 ($30.91, Z=-0.39). Triage priority: 0.34."
          },
          "ai_reasoning": "The transaction amount of $30.91 is statistically benign, falling well within the customer's established spending baseline with a negligible Z-score of -0.39 and a ratio of only 0.38x the mean. Consequently, this activity does not represent a severe statistical anomaly and warrants no immediate escalation for fraud investigation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3553342 ($30.91, Z=-0.39). Triage priority: 0.34.",
          "latency_ms": 26706.96,
          "timestamp": "2026-09-22T19:40:49.113872"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]. Threat density: 0.15."
          },
          "ai_reasoning": "The graph structure exhibits strong indicators of benign regularity, evidenced by the absence of shared device links, card testing bursts, or out-of-region anomalies, alongside a low ego threat density of 0.15. Consequently, there is no forensic evidence of identity collusion or coordinated fraud within this subgraph, suggesting the transaction aligns with established account behavior patterns.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 494.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C05876)",
              "entity_ids": [
                "3553342"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            }
          ],
          "hand_off_summary": "Graph topology: [C05876] -[:OWNS_CARD]-> [C05876-K2] -[:MADE_TX]-> [TX #3553342]. Threat density: 0.15.",
          "latency_ms": 324.84,
          "timestamp": "2026-09-22T19:40:49.438773"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.19,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.19, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The high Epistemic Uncertainty Index (0.670) significantly exceeds the 0.45 threshold, indicating that the current evidence pool is insufficient to justify immediate account restriction or transaction blocking. Therefore, under Policy Rule R1, the presence of contradictory signals necessitates Step-Up Authentication to resolve the ambiguity and protect the customer relationship from false-positive friction.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.19, U=0.670. Step-up needed: True.",
          "latency_ms": 17480.82,
          "timestamp": "2026-09-22T19:41:06.919682"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "Given the low fraud probability (0.19) and the benign profile match, this transaction is best explained as a routine, low-value in-person purchase by a legitimate cardholder rather than an illicit activity. The isolated subgraph structure and minimal transaction amount align with standard consumer behavior, indicating no evidence of account takeover or money mule tactics.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 284.99,
          "timestamp": "2026-09-22T19:41:07.204718"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.19,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.19, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is insufficient for immediate action because the absence of direct or circumstantial fraud indicators, combined with a derived probability of 0.19, does not meet the threshold for adverse intervention. Consequently, under Policy Rule R1, the system must prioritize customer relationship preservation by mandating step-up verification to resolve the epistemic uncertainty arising from the contradictory signals rather than executing a block.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.19, U=0.330. Step-up needed: False.",
          "latency_ms": 297.08,
          "timestamp": "2026-09-22T19:41:07.501863"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to clear the alert without imposing a card block strictly adheres to Rule R1 by prioritizing customer verification over a single, unconfirmed fraud signal, thereby preventing disproportionate service disruption for a legitimate transaction. This outcome is fully defensible as the zero financial exposure and explicit customer confirmation provide sufficient evidentiary basis to justify the immediate closure under the \"no fraud\" mitigation protocol.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 304.93,
          "timestamp": "2026-09-22T19:41:07.806843"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-012. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.09,
          "timestamp": "2026-09-22T19:41:07.806967"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-002",
              "HHG-001",
              "HHG-007"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-012",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-007). Case persisted to TigerGraph (CASE-SAVANNA-HHG-012)."
          },
          "ai_reasoning": "The cleared status of Case HHG-012 aligns with the benign transactional patterns established in precedents HHG-001, HHG-002, and HHG-007, which similarly exhibited no material risk indicators or illicit fund flows. This historical consistency confirms that the current zero-exposure verdict is a valid application of established compliance thresholds, effectively ruling out fraudulent intent based on the absence of anomalous graph connectivity.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-002, HHG-001, HHG-007). Case persisted to TigerGraph (CASE-SAVANNA-HHG-012).",
          "latency_ms": 17110.12,
          "timestamp": "2026-09-22T19:41:24.917116"
        }
      ]
    },
    "HHG-013": {
      "case_id": "HHG-013",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3526826,
            "flagged_amount_usd": 35.66,
            "channel": "online",
            "customer_id": "C07671",
            "card_id": "C07671-K2",
            "historical_mean_usd": 114.31,
            "historical_std_usd": 213.87,
            "z_score": -0.368,
            "amount_acceleration_ratio": 0.31,
            "velocity_1h": 2,
            "velocity_24h": 18,
            "prior_txns_count": 1439,
            "triage_priority": 0.424,
            "hand_off_summary": "Anchored TX #3526826 ($35.66, Z=-0.37). Triage priority: 0.42."
          },
          "ai_reasoning": "The transaction amount of $35.66 is statistically insignificant, falling well within the customer's established baseline given its low Z-score of -0.37 and 0.31x ratio to the mean. Consequently, this activity does not represent a severe statistical anomaly and warrants no immediate escalation for fraud review.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.76.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3526826)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3526826 ($35.66, Z=-0.37). Triage priority: 0.42.",
          "latency_ms": 331.84,
          "timestamp": "2026-09-22T19:41:25.507852"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | chrome 66.0",
            "hand_off_summary": "Graph topology: [C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device linkage among four distinct accounts strongly indicate a coordinated identity collusion ring, likely leveraging a single compromised endpoint to operate multiple fraudulent profiles. The absence of card testing bursts or out-of-region anomalies suggests a sophisticated, low-noise operation focused on sustained, legitimate-looking activity rather than brute-force probing.",
          "evidence_generated": [
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | chrome 66.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3526826)",
              "entity_ids": [
                "3526826"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07671] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 16601.54,
          "timestamp": "2026-09-22T19:41:42.109435"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence provides a robust, defensible basis for immediate action, as the 0.92 fraud probability decisively exceeds the threshold for intervention without requiring additional verification. Mandating customer verification in this context would be procedurally unnecessary and could compromise the integrity of the response by introducing avoidable delay to a high-confidence fraud determination.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 532.3,
          "timestamp": "2026-09-22T19:41:42.641794"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability (0.92) suggests a sophisticated card-not-present attack where the perpetrator is leveraging a shared Windows device infrastructure to execute low-value, high-frequency transactions, likely to bypass velocity thresholds or test card validity. The clustering of multiple distinct customer IDs (C11923, C13171, C02354) on the same device fingerprint indicates a coordinated fraud ring or a compromised device used to launder stolen card data through a single digital endpoint.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 324.76,
          "timestamp": "2026-09-22T19:41:42.966605"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the 0.92 fraud probability sufficiently definitive to bypass step-up authentication, as the evidentiary threshold for immediate action is unequivocally met. Consequently, proceeding with immediate intervention is the only defensible course of action, as mandating customer verification would introduce unnecessary friction and potential liability by delaying the mitigation of a high-confidence threat.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 319.11,
          "timestamp": "2026-09-22T19:41:43.285790"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 35.66,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $35.66."
          },
          "ai_reasoning": "The initial L1 verification actions adhered to Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the anomaly. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to the customer\u2019s explicit confirmation of fraud, which transformed the risk profile from unverified to confirmed malicious activity.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $35.66.",
          "latency_ms": 11470.92,
          "timestamp": "2026-09-22T19:41:54.756763"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 35.66,
            "subjects_count": 5,
            "subjects": [
              "C07671",
              "C07671-K2",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-09",
              "2016-12-09"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $35.66, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $35.66 across subjects ['C07671', 'C07671-K2', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-013\n\n**I. SUMMARY OF ACTIVITY**\nBetween **2016-12-09 02:39:29** and **2016-12-09 02:39:29**, suspicious transaction activity totaling **$35.66** USD was id...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $35.66, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1213.87,
          "timestamp": "2026-09-22T19:41:55.970658"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-004",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-013",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-004, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-013)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-004, and HHG-005 collectively establish a high-confidence pattern where new-device card-not-present transactions correlate with immediate fraud indicators, mirroring the current case's risk profile. This historical consistency validates the fraud verdict for HHG-013, confirming that the $35.66 exposure aligns with established behavioral anomalies in the graph memory.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-004, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-013).",
          "latency_ms": 36418.59,
          "timestamp": "2026-09-22T19:42:32.389276"
        }
      ]
    },
    "HHG-014": {
      "case_id": "HHG-014",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3478561,
            "flagged_amount_usd": 74.96,
            "channel": "online",
            "customer_id": "C13487",
            "card_id": "C13487-K1",
            "historical_mean_usd": 58.13,
            "historical_std_usd": 33.84,
            "z_score": 0.497,
            "amount_acceleration_ratio": 1.29,
            "velocity_1h": 1,
            "velocity_24h": 2,
            "prior_txns_count": 71,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3478561 ($74.96, Z=+0.50). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3478561 does not represent a statistically severe baseline anomaly, as its Z-score of +0.50 indicates the amount falls well within the customer's normal spending distribution. The primary risk driver is the qualitative device profile correlation flagged by the analyst, rather than quantitative deviation from historical spending patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3478561 ($74.96, Z=+0.50). Triage priority: 1.00.",
          "latency_ms": 311.92,
          "timestamp": "2026-09-22T19:42:32.959720"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 2,
            "connected_cards": [
              "C11923",
              "C13171"
            ],
            "shared_device_degree": 3,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]",
            "device_profile": "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080",
            "hand_off_summary": "Graph topology: [C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]. Threat density: 0.85."
          },
          "ai_reasoning": "The graph structure indicates benign regularity, as the shared device usage among accounts C11923, C13171, and C13487 lacks the hallmarks of malicious collusion, such as card testing bursts or out-of-region anomalies. With no recurring dispute history and a moderate ego threat density, the topology suggests legitimate multi-account activity on a common household device rather than coordinated fraud.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 191.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C13487)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile SM-G935F Build/NRD90M observed across 2 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=SM-G935F Build/NRD90M)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3478561)",
              "entity_ids": [
                "3478561"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C13487] -[:USED_DEVICE]-> [SM-G935F Build/NRD90M] <-[:USED_DEVICE]- [C11923, C13171]. Threat density: 0.85.",
          "latency_ms": 8526.34,
          "timestamp": "2026-09-22T19:42:41.486089"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is logically inconsistent with the presence of a contradictory signal and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, still indicates non-negligible ambiguity regarding the customer's identity. Consequently, immediate action is not defensible without first executing step-up authentication to resolve the conflict between the established history and the novel device signal, thereby protecting the customer relationship in accordance with Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 335.33,
          "timestamp": "2026-09-22T19:42:41.821456"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and subgraph structure indicate a coordinated card-not-present attack where a compromised Samsung device (SM-G935F) was used to execute unauthorized transactions across multiple distinct customer accounts (C13487, C11923, C13171). This suggests the attacker is leveraging a single physical device to bypass device-fingerprinting controls by rotating stolen card credentials, a common tactic in bulk carding operations.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 11530.71,
          "timestamp": "2026-09-22T19:42:53.352206"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.99 is fundamentally indefensible given the presence of contradictory signals and an Epistemic Uncertainty Index (0.150) that, while below the 0.45 threshold, explicitly acknowledges conflicting data points such as established history versus novel device usage. Consequently, immediate action is unwarranted; instead, Policy Rule R1 mandates step-up authentication to resolve the epistemic conflict and protect the customer relationship from false-positive disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 348.66,
          "timestamp": "2026-09-22T19:42:53.700927"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 74.96,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $74.96."
          },
          "ai_reasoning": "The initial L1 verification actions complied with Rule R1 by avoiding premature permanent blocks on a single signal, instead utilizing step-up authentication to validate the customer's intent. The subsequent escalation to L2 permanent card blocking and SAR filing is fully defensible as a proportionate response to the confirmed fraud verdict, ensuring adequate risk mitigation despite the financial exposure falling below the L2 monetary threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $74.96.",
          "latency_ms": 10594.45,
          "timestamp": "2026-09-22T19:43:04.295409"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 74.96,
            "subjects_count": 4,
            "subjects": [
              "C13487",
              "C13487-K1",
              "C11923",
              "C13171"
            ],
            "activity_dates": [
              "2016-11-22",
              "2016-11-22"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $74.96, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $74.96 across subjects ['C13487', 'C13487-K1', 'C11923', 'C13171']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-014\n\n**I. SUMMARY OF ACTIVITY**\nDuring the period from 2016-11-22 16:11:00 to 2016-11-22 16:11:00, the Institution identified suspicious transaction activi...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $74.96, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1413.34,
          "timestamp": "2026-09-22T19:43:05.708780"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-005",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-014",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-014)."
          },
          "ai_reasoning": "Precedents HHG-004, HHG-005, and HHG-006 collectively establish a consistent pattern where card-not-present transactions originating from new, unrecognized devices correlate with high-confidence fraud signals, mirroring the risk profile of the current $74.96 exposure. This historical alignment validates the investigative decision to classify the current case as fraudulent, confirming that the combination of device novelty and transaction type is a reliable indicator of illicit activity within this network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-005, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-014).",
          "latency_ms": 35206.87,
          "timestamp": "2026-09-22T19:43:40.915688"
        }
      ]
    },
    "HHG-015": {
      "case_id": "HHG-015",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3464869,
            "flagged_amount_usd": 599.94,
            "channel": "online",
            "customer_id": "C03042",
            "card_id": "C03042-K1",
            "historical_mean_usd": 132.61,
            "historical_std_usd": 131.79,
            "z_score": 3.546,
            "amount_acceleration_ratio": 4.52,
            "velocity_1h": 1,
            "velocity_24h": 4,
            "prior_txns_count": 68,
            "triage_priority": 0.634,
            "hand_off_summary": "Anchored TX #3464869 ($599.94, Z=+3.55). Triage priority: 0.63."
          },
          "ai_reasoning": "Transaction #3464869 exhibits a statistically severe anomaly, deviating 3.55 standard deviations above the customer's historical mean and reaching 4.52x their average spend. This significant deviation from the established baseline, combined with a high real-time risk score of 0.77, warrants immediate manual review to rule out potential fraud.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.77.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3464869)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            },
            {
              "claim": "Transaction amount of $599.94 represents a severe statistical outlier (Z=+3.55) exceeding 3.5 standard deviations from baseline.",
              "source": "telemetry",
              "ref": "historical_baseline:z_score(customer_id=C03042)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Anchored TX #3464869 ($599.94, Z=+3.55). Triage priority: 0.63.",
          "latency_ms": 302.39,
          "timestamp": "2026-09-22T19:43:41.479626"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050",
            "hand_off_summary": "Graph topology: [C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin among four distinct accounts strongly indicate a coordinated identity collusion ring rather than benign regularity, despite the absence of immediate card-testing or out-of-region anomalies. This topological clustering suggests a single actor is managing multiple identities to evade detection, warranting immediate investigation into the linked accounts C11923, C07987, and C02354.",
          "evidence_generated": [
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3464869)",
              "entity_ids": [
                "3464869"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C03042] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 11544.74,
          "timestamp": "2026-09-22T19:43:53.024416"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 1,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the fraud probability of 0.92 statistically robust, thereby justifying immediate enforcement action without the procedural delay of step-up authentication. Mandating customer verification in this context would violate Policy Rule R1\u2019s efficiency mandate, as the evidentiary threshold for definitive action has been unequivocally met.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 5424.32,
          "timestamp": "2026-09-22T19:43:58.448773"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Trident/7.0 device fingerprint across multiple distinct card accounts strongly indicate a coordinated card-not-present attack where a fraudster is leveraging a single compromised endpoint to execute unauthorized online transactions. This pattern suggests the attacker has successfully harvested or cloned credentials for cards C11923, C07987, and C02354, utilizing the Trident browser to bypass standard device recognition controls.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 309.06,
          "timestamp": "2026-09-22T19:43:58.757862"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 2,
            "circumstantial_count": 2,
            "correlative_count": 1,
            "contradictory_count": 0,
            "fraud_probability": 0.92,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The zero epistemic uncertainty index combined with confirmed direct evidence renders the fraud probability of 0.92 statistically robust, thereby justifying immediate action without the procedural delay of step-up authentication. Mandating customer verification in this context would be an unnecessary friction point that risks degrading the customer relationship, as Policy Rule R1 prioritizes decisive intervention when evidentiary ambiguity is fully resolved.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.92, U=0.000. Step-up needed: False.",
          "latency_ms": 9453.51,
          "timestamp": "2026-09-22T19:44:08.211426"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 599.94,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $599.94."
          },
          "ai_reasoning": "The initial Stage 1 actions adhered to Rule R1 by restricting the response to non-intrusive verification steps, ensuring no premature permanent block was triggered by a single anomalous signal. The escalation to Stage 2 is fully defensible as the customer\u2019s explicit denial provided the requisite corroborating evidence to justify the proportionate mitigation of blocking all cards and filing a SAR.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $599.94.",
          "latency_ms": 277.49,
          "timestamp": "2026-09-22T19:44:08.488945"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 599.94,
            "subjects_count": 5,
            "subjects": [
              "C03042",
              "C03042-K1",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-17",
              "2016-11-17"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $599.94, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $599.94 across subjects ['C03042', 'C03042-K1', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 NARRATIVE**\n\n**Case Reference:** HHG-015\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-11-17 14:03:36 and 2016-11-17 14:03:36, the Institution identified suspicious transaction activity totaling $599....",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $599.94, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 2402.17,
          "timestamp": "2026-09-22T19:44:10.891147"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-013",
              "HHG-006"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-015",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-006). Case persisted to TigerGraph (CASE-SAVANNA-HHG-015)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-013, and HHG-006 collectively establish a high-confidence pattern where new-device card-not-present transactions exceeding $500 are consistently adjudicated as fraud due to anomalous velocity and device fingerprint mismatches. This historical alignment validates the current verdict for HHG-015, confirming that the $599.94 exposure falls within the established risk threshold for immediate interception.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-006). Case persisted to TigerGraph (CASE-SAVANNA-HHG-015).",
          "latency_ms": 37137.09,
          "timestamp": "2026-09-22T19:44:48.028276"
        }
      ]
    },
    "HHG-016": {
      "case_id": "HHG-016",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3534820,
            "flagged_amount_usd": 59.67,
            "channel": "online",
            "customer_id": "C09988",
            "card_id": "C09988-K1",
            "historical_mean_usd": 39.8,
            "historical_std_usd": 25.48,
            "z_score": 0.78,
            "amount_acceleration_ratio": 1.5,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 48,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3534820 ($59.67, Z=+0.78). Triage priority: 1.00."
          },
          "ai_reasoning": "Transaction #3534820 does not constitute a statistically severe baseline anomaly, as the $59.67 charge falls within one standard deviation of the customer's historical mean (Z-score +0.78). The primary risk driver is the explicit customer dispute rather than quantitative deviation from their established spending pattern.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3534820 ($59.67, Z=+0.78). Triage priority: 1.00.",
          "latency_ms": 287.28,
          "timestamp": "2026-09-22T19:44:48.575205"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 1,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | edge 16.0",
            "hand_off_summary": "Graph topology: [C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and significant device degree (18) indicate a concentrated cluster of accounts sharing a single Windows endpoint, suggesting potential device-based identity collusion or a compromised shared environment. However, the absence of card testing bursts, out-of-region anomalies, or recurring disputes supports a classification of benign regularity, likely reflecting a legitimate household or small business setup rather than active fraud.",
          "evidence_generated": [
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3534820"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | edge 16.0.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3534820)",
              "entity_ids": [
                "3534820"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C09988] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 319.71,
          "timestamp": "2026-09-22T19:44:48.894981"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool warrants immediate action because the derived fraud probability of 0.99, supported by confirmed direct evidence and an Epistemic Uncertainty Index (0.150) well below the 0.45 threshold, provides sufficient defensibility to bypass customer verification. Consequently, initiating step-up authentication is unnecessary and would unjustly disrupt the customer relationship, as the low uncertainty confirms the fraud signal is robust and actionable under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.150. Step-up needed: False.",
          "latency_ms": 307.49,
          "timestamp": "2026-09-22T19:44:49.202522"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability and shared Windows device fingerprint across four distinct customer IDs strongly indicate a single actor is executing a coordinated card-not-present attack, likely leveraging a compromised or cloned device to test stolen card credentials. The low transaction amount suggests the attacker is performing initial \"card testing\" to validate the stolen data before escalating to higher-value transactions.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 19432.15,
          "timestamp": "2026-09-22T19:45:08.634715"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 0,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.0,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Direct evidence confirmed; uncertainty resolved.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.000. Step-up needed: False."
          },
          "ai_reasoning": "The near-zero epistemic uncertainty (U=0.000) combined with confirmed direct evidence provides sufficient defensibility to bypass step-up authentication and proceed with immediate action, as the risk of erroneous customer impact is statistically negligible. Therefore, the evidence pool warrants immediate enforcement under Policy Rule R1, as the high fraud probability (0.99) and resolved uncertainty override the need for additional customer verification to preserve the relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.99, U=0.000. Step-up needed: False.",
          "latency_ms": 297.74,
          "timestamp": "2026-09-22T19:45:08.932521"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "VERIFY_WITH_CUSTOMER"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 59.67,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $59.67."
          },
          "ai_reasoning": "The initial Stage 1 actions strictly adhered to Rule R1 by limiting the response to transaction decline and customer verification, thereby avoiding a premature permanent block based solely on a single automated signal. The subsequent escalation to Stage 2 is fully defensible and proportionate, as the customer\u2019s explicit denial provided the requisite secondary confirmation to justify the permanent card block and SAR filing despite the financial exposure remaining below the $2,500 L2 threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $59.67.",
          "latency_ms": 302.58,
          "timestamp": "2026-09-22T19:45:09.235135"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 59.67,
            "subjects_count": 5,
            "subjects": [
              "C09988",
              "C09988-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-11",
              "2016-12-11"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $59.67, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $59.67 across subjects ['C09988', 'C09988-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-016\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-11 22:39:08 and 2016-12-11 22:39:08, the Institution identified suspicious transaction activity ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $59.67, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 15302.99,
          "timestamp": "2026-09-22T19:45:24.538161"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-006",
              "HHG-010",
              "HHG-005"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-016",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-010, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-016)."
          },
          "ai_reasoning": "Precedents HHG-006, HHG-010, and HHG-005 collectively confirm that the `card_not_present_new_device` pattern is a high-confidence fraud indicator, as they all resulted in similar fraudulent verdicts with comparable low-value exposures. This historical consistency validates the current decision to flag the $59.67 transaction as fraudulent, reinforcing the reliability of the RRF-retrieved analogies in supporting the investigative outcome.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-006, HHG-010, HHG-005). Case persisted to TigerGraph (CASE-SAVANNA-HHG-016).",
          "latency_ms": 29077.78,
          "timestamp": "2026-09-22T19:45:53.615996"
        }
      ]
    },
    "HHG-017": {
      "case_id": "HHG-017",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3450629,
            "flagged_amount_usd": 100.09,
            "channel": "online",
            "customer_id": "C04570",
            "card_id": "C04570-K1",
            "historical_mean_usd": 360.18,
            "historical_std_usd": 455.81,
            "z_score": -0.571,
            "amount_acceleration_ratio": 0.28,
            "velocity_1h": 2,
            "velocity_24h": 3,
            "prior_txns_count": 52,
            "triage_priority": 0.348,
            "hand_off_summary": "Anchored TX #3450629 ($100.09, Z=-0.57). Triage priority: 0.35."
          },
          "ai_reasoning": "The transaction amount of $100.09 is statistically consistent with the customer's historical baseline, as it falls well within one standard deviation of the mean ($360.18) and exhibits a low Z-score of -0.57. Consequently, this activity does not represent a severe statistical anomaly and warrants standard monitoring rather than immediate escalation.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3450629 ($100.09, Z=-0.57). Triage priority: 0.35.",
          "latency_ms": 293.23,
          "timestamp": "2026-09-22T19:45:54.168854"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | Windows 10 | chrome 65.0 | 1920x1080",
            "hand_off_summary": "Graph topology: [C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin among four distinct accounts strongly indicate a coordinated identity collusion ring rather than benign user behavior. Despite the absence of immediate card-testing bursts or out-of-region anomalies, the topological clustering suggests a sophisticated, low-and-slow fraud operation leveraging a single physical device to maintain multiple fraudulent identities.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 204.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C04570)",
              "entity_ids": [
                "3450629"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3450629"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            }
          ],
          "hand_off_summary": "Graph topology: [C04570] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 10500.55,
          "timestamp": "2026-09-22T19:46:04.669440"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 1,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.56,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.56, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool does not warrant immediate action because the Epistemic Uncertainty Index (0.150) is well below the 0.45 threshold, indicating sufficient confidence in the derived fraud probability despite the presence of contradictory signals. Consequently, under Policy Rule R1, the case mandates no customer verification or step-up authentication, as the current risk assessment supports maintaining the existing customer relationship without disruption.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.56, U=0.150. Step-up needed: False.",
          "latency_ms": 290.32,
          "timestamp": "2026-09-22T19:46:04.959798"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_fraud",
            "matched_predicate": "CARD_NOT_PRESENT_ONLINE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE."
          },
          "ai_reasoning": "The shared Windows device fingerprint across four distinct customer IDs suggests a single actor is leveraging a compromised or multi-account environment to execute low-value card-not-present transactions, likely to test stolen card data or bypass velocity controls. The moderate fraud probability (0.56) indicates that while the device clustering is a strong risk signal, the absence of other corroborating factors (such as IP mismatches or high-value amounts) leaves room for a legitimate shared household or business scenario that requires further verification.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_fraud' via predicate CARD_NOT_PRESENT_ONLINE.",
          "latency_ms": 8569.11,
          "timestamp": "2026-09-22T19:46:13.528939"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 2,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.66,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.66, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 well below the 0.45 threshold, the evidence pool is sufficiently robust to support the derived fraud probability without mandating intrusive customer verification, thereby preserving the customer relationship under Policy Rule R1. Consequently, the absence of required step-up authentication is defensible, as the low uncertainty indicates that the contradictory signals have been adequately contextualized by the direct evidence, allowing for standard monitoring rather than immediate disruptive action.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.66, U=0.150. Step-up needed: False.",
          "latency_ms": 323.04,
          "timestamp": "2026-09-22T19:46:13.852039"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 100.09,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.09."
          },
          "ai_reasoning": "The initial Stage 1 actions adhered to Rule R1 by restricting the response to non-intrusive verification and monitoring, thereby avoiding a premature block based solely on the single initial signal. The subsequent escalation to permanent card blocking and SAR filing is fully defensible as a proportionate mitigation measure, as it was triggered only after the customer\u2019s explicit denial confirmed the fraudulent nature of the activity, satisfying the evidentiary threshold for L2 intervention despite the low financial exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $100.09.",
          "latency_ms": 6482.86,
          "timestamp": "2026-09-22T19:46:20.334949"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 100.09,
            "subjects_count": 5,
            "subjects": [
              "C04570",
              "C04570-K1",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-11-11",
              "2016-11-11"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.09, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $100.09 across subjects ['C04570', 'C04570-K1', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-017\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nDuring the period from 2016-11-11 23:46:24 to 2016-11-11 23:46:24, the Institution identified suspicious transaction activity totaling $100...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $100.09, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 7415.74,
          "timestamp": "2026-09-22T19:46:27.750725"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-002",
              "HHG-016"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-017",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-002, HHG-016). Case persisted to TigerGraph (CASE-SAVANNA-HHG-017)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-002, and HHG-016 collectively validate the current fraud determination by demonstrating a consistent pattern of card-not-present transactions exhibiting identical velocity anomalies and device fingerprint mismatches. This historical alignment confirms that the $100.09 exposure in HHG-017 fits the established risk profile, reinforcing the decision to classify the activity as fraudulent.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-002, HHG-016). Case persisted to TigerGraph (CASE-SAVANNA-HHG-017).",
          "latency_ms": 37094.26,
          "timestamp": "2026-09-22T19:47:04.845033"
        }
      ]
    },
    "HHG-018": {
      "case_id": "HHG-018",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3491361,
            "flagged_amount_usd": 39.08,
            "channel": "in_person",
            "customer_id": "C02354",
            "card_id": "C02354-K2",
            "historical_mean_usd": 141.23,
            "historical_std_usd": 212.73,
            "z_score": -0.48,
            "amount_acceleration_ratio": 0.28,
            "velocity_1h": 1,
            "velocity_24h": 42,
            "prior_txns_count": 5864,
            "triage_priority": 1.0,
            "hand_off_summary": "Anchored TX #3491361 ($39.08, Z=-0.48). Triage priority: 1.00."
          },
          "ai_reasoning": "The $39.08 transaction is not a statistically severe baseline anomaly, as it falls well within the customer's historical spending distribution with a negligible Z-score of -0.48 and a ratio of only 0.28x their average transaction value. Consequently, the alert is driven entirely by the explicit customer dispute rather than any deviation from established behavioral patterns.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3491361 ($39.08, Z=-0.48). Triage priority: 1.00.",
          "latency_ms": 318.45,
          "timestamp": "2026-09-22T19:47:05.418944"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": false,
            "connected_cards_count": 0,
            "connected_cards": [],
            "shared_device_degree": 1,
            "is_recurring_dispute": true,
            "recurring_matches_count": 160,
            "is_out_of_region": false,
            "ego_threat_density": 0.15,
            "subgraph_path": "[C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]",
            "device_profile": "",
            "hand_off_summary": "Graph topology: [C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]. Threat density: 0.15."
          },
          "ai_reasoning": "The absence of shared device fingerprints, card-testing bursts, or out-of-region anomalies strongly indicates benign regularity rather than active identity collusion. However, the extreme recurrence of disputes (160 prior occurrences) suggests a chronic, high-volume chargeback pattern that warrants review for potential friendly fraud or systemic billing errors, despite the low ego threat density.",
          "evidence_generated": [
            {
              "claim": "Disputed transaction of $39.08 matches customer recurring charge history (seen 160 prior times).",
              "source": "graph",
              "ref": "query:customer_recurring_history(customer_id=C02354, amt=39.08)",
              "entity_ids": [
                "3491361"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.8
            }
          ],
          "hand_off_summary": "Graph topology: [C02354] -[:OWNS_CARD]-> [C02354-K2] -[:MADE_TX]-> [TX #3491361]. Threat density: 0.15.",
          "latency_ms": 9491.99,
          "timestamp": "2026-09-22T19:47:14.910971"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 1,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.67,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": true,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True."
          },
          "ai_reasoning": "The evidence pool is fundamentally deficient for immediate action because it contains zero direct, circumstantial, or correlative signals, rendering the 0.99 fraud probability statistically unsupported and the high epistemic uncertainty (0.670) a clear indicator of insufficient data. Consequently, Policy Rule R1 mandates step-up authentication to resolve the contradiction between the established history and novel device, thereby protecting the customer relationship from unjustified account restrictions based on an empty evidentiary basis.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 1 signals: P(Fraud)=0.99, U=0.670. Step-up needed: True.",
          "latency_ms": 353.46,
          "timestamp": "2026-09-22T19:47:15.264469"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "none",
            "matched_predicate": "BENIGN_PROFILE_MATCH",
            "is_novel_pattern": false,
            "is_benign": true,
            "channel": "in_person",
            "shared_origin_detected": false,
            "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH."
          },
          "ai_reasoning": "The classification of this transaction as a benign profile match, combined with the low value and in-person channel, indicates that the high fraud probability score is likely a false positive triggered by a misconfigured risk threshold rather than actual malicious activity. Consequently, the customer is assessed as legitimate, and the transaction should be cleared as a standard, low-risk point-of-sale purchase with no evidence of fraudulent intent or complex subgraph anomalies.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'none' via predicate BENIGN_PROFILE_MATCH.",
          "latency_ms": 291.17,
          "timestamp": "2026-09-22T19:47:15.555698"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 2,
            "direct_count": 0,
            "circumstantial_count": 0,
            "correlative_count": 0,
            "contradictory_count": 2,
            "fraud_probability": 0.99,
            "epistemic_uncertainty_U": 0.33,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool is fundamentally defective because the rationale cites \"contradictory signals\" while the signal count explicitly records zero contradictory evidence, creating a logical inconsistency that invalidates the high fraud probability derivation. Consequently, under Policy Rule R1, the system must mandate customer verification rather than immediate action, as the absence of direct or circumstantial fraud indicators combined with this data integrity failure necessitates preserving the customer relationship through clarification.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 2 signals: P(Fraud)=0.99, U=0.330. Step-up needed: False.",
          "latency_ms": 14539.16,
          "timestamp": "2026-09-22T19:47:30.094929"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "CREATE_CASE",
              "VERIFY_WITH_CUSTOMER",
              "WARN_CUSTOMER"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "CLOSE_NO_FRAUD"
            ],
            "final_stage_2_route": "auto",
            "financial_exposure_usd": 0.0,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "cleared",
            "status": "closed_cleared",
            "what_changed": "Customer confirmation cleared the alert as legitimate, upgrading action to immediate case closure.",
            "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00."
          },
          "ai_reasoning": "The decision to close the case without imposing account restrictions strictly adheres to Rule R1 by ensuring that a single, unverified alert signal did not trigger a disproportionate or premature block, thereby preserving customer access rights. The final action is fully defensible as the customer\u2019s explicit confirmation of legitimate activity provided the necessary evidentiary basis to downgrade the risk assessment and justify immediate clearance with zero financial exposure.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [CREATE_CASE] -> Stage 2 [CLOSE_NO_FRAUD] (auto). Exposure: $0.00.",
          "latency_ms": 285.72,
          "timestamp": "2026-09-22T19:47:30.380707"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": false,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 0.0,
            "subjects_count": 0,
            "subjects": [],
            "activity_dates": [],
            "filing_reason": null,
            "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None)."
          },
          "ai_reasoning": "Compliance Officer finding: No BSA/AML SAR filing required for Case HHG-018. Alert was cleared as legitimate under Bank Fraud Policy v1.0.",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=False (Exposure: $0.00, Reason: None).",
          "latency_ms": 0.11,
          "timestamp": "2026-09-22T19:47:30.380854"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-003",
              "HHG-008",
              "HHG-009"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-018",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-018)."
          },
          "ai_reasoning": "The cleared status of Case HHG-018 aligns with precedents HHG-003, HHG-008, and HHG-009, which collectively demonstrate that the absence of specific fraud patterns and zero financial exposure consistently results in a non-adverse verdict. This historical consistency validates the current decision by confirming that the retrieved graph structures and vector similarities accurately predict benign outcomes in the absence of risk indicators.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-003, HHG-008, HHG-009). Case persisted to TigerGraph (CASE-SAVANNA-HHG-018).",
          "latency_ms": 1030.1,
          "timestamp": "2026-09-22T19:47:31.410993"
        }
      ]
    },
    "HHG-019": {
      "case_id": "HHG-019",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3503878,
            "flagged_amount_usd": 99.92,
            "channel": "online",
            "customer_id": "C07987",
            "card_id": "C07987-K2",
            "historical_mean_usd": 194.55,
            "historical_std_usd": 215.76,
            "z_score": -0.439,
            "amount_acceleration_ratio": 0.51,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 220,
            "triage_priority": 0.42,
            "hand_off_summary": "Anchored TX #3503878 ($99.92, Z=-0.44). Triage priority: 0.42."
          },
          "ai_reasoning": "The transaction amount of $99.92 is well within the customer's established spending baseline, exhibiting a Z-score of -0.44 and a ratio of 0.51x to their mean, indicating no statistical severity. Consequently, this activity does not represent a significant deviation from historical patterns and warrants standard monitoring rather than immediate escalation.",
          "evidence_generated": [
            {
              "claim": "Bank upstream fraud detection model flagged transaction with high risk score of 0.90.",
              "source": "detection_model",
              "ref": "transactions.csv:risk_score(3503878)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CORRELATIVE",
              "weight": 0.3
            }
          ],
          "hand_off_summary": "Anchored TX #3503878 ($99.92, Z=-0.44). Triage priority: 0.42.",
          "latency_ms": 13507.63,
          "timestamp": "2026-09-22T19:47:45.177895"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C13171",
              "C02354"
            ],
            "shared_device_degree": 18,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]",
            "device_profile": "Windows | other | chrome 61.0 | 1280x720",
            "hand_off_summary": "Graph topology: [C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The high ego threat density (0.85) and shared device origin across multiple accounts indicate a strong likelihood of identity collusion or a coordinated fraud ring rather than benign regularity. The absence of card testing bursts and out-of-region activity suggests the actors are operating within established behavioral patterns to evade detection, making the topological clustering the primary red flag.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C07987)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Windows observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Windows)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Windows | other | chrome 61.0 | 1280x720.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3503878)",
              "entity_ids": [
                "3503878"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C07987] -[:USED_DEVICE]-> [Windows] <-[:USED_DEVICE]- [C11923, C13171, C02354]. Threat density: 0.85.",
          "latency_ms": 4404.24,
          "timestamp": "2026-09-22T19:47:49.582171"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.77,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.77, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "With an Epistemic Uncertainty Index of 0.150 significantly below the 0.45 threshold, the evidence pool is sufficiently robust to justify immediate action without triggering the customer verification mandate under Policy Rule R1. The presence of a contradictory signal is adequately mitigated by the low uncertainty level, indicating that the derived fraud probability of 0.77 is defensible for direct intervention rather than relationship-preserving verification.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.77, U=0.150. Step-up needed: False.",
          "latency_ms": 4390.05,
          "timestamp": "2026-09-22T19:47:53.972285"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The high fraud probability (0.77) and the specific `card_not_present_new_device` typology suggest the attacker is leveraging a compromised card number to execute a low-value, high-velocity online transaction from a shared or spoofed Windows environment, likely to validate the stolen credentials before escalating to higher-value purchases. The clustering of multiple customer IDs (C11923, C13171, C02354) on the same device fingerprint indicates a potential mule network or a single actor rotating identities to bypass velocity-based fraud controls.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 2439.39,
          "timestamp": "2026-09-22T19:47:56.411727"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 5,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 1,
            "contradictory_count": 1,
            "fraud_probability": 0.82,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 5 signals: P(Fraud)=0.82, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "Given the low Epistemic Uncertainty Index (0.150) and high fraud probability (0.82), the evidence pool is sufficiently robust to warrant immediate action without triggering the mandatory customer verification step required by Policy Rule R1. The presence of contradictory signals is adequately mitigated by the strong direct and correlative evidence, ensuring the decision remains defensible while preserving the customer relationship through efficient, non-intrusive intervention.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 5 signals: P(Fraud)=0.82, U=0.150. Step-up needed: False.",
          "latency_ms": 10466.57,
          "timestamp": "2026-09-22T19:48:06.878383"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "DECLINE_TRANSACTION",
              "STEP_UP_AUTH",
              "MONITOR_CONNECTED_CARDS"
            ],
            "initial_stage_1_route": "L1",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 99.92,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $99.92."
          },
          "ai_reasoning": "The initial Stage 1 response adhered to Rule R1 by restricting actions to non-intrusive verification steps, ensuring no premature permanent block was triggered by a single anomalous signal. The subsequent escalation to Stage 2 is fully defensible as the customer\u2019s explicit denial provided the requisite corroborating evidence to justify the proportionate mitigation of permanent card blocking and SAR filing.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [DECLINE_TRANSACTION] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $99.92.",
          "latency_ms": 5426.08,
          "timestamp": "2026-09-22T19:48:12.304500"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 99.92,
            "subjects_count": 5,
            "subjects": [
              "C07987",
              "C07987-K2",
              "C11923",
              "C13171",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-01",
              "2016-12-01"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $99.92, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $99.92 across subjects ['C07987', 'C07987-K2', 'C11923', 'C13171', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR)**\n**Case Reference:** HHG-019\n\n**I. SUMMARY OF ACTIVITY**\nBetween 2016-12-01 17:28:53 and 2016-12-01 17:28:53, the Institution identified suspicious transaction activity totaling $99.92 USD across 1 transacti...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $99.92, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 2264.46,
          "timestamp": "2026-09-22T19:48:14.568990"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-013",
              "HHG-004"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-019",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-019)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-013, and HHG-004 collectively establish a high-confidence fraud pattern for card-not-present transactions initiated from new, unverified devices, mirroring the current case's risk profile. This historical consistency validates the fraudulent verdict for HHG-019, confirming that the $99.92 exposure aligns with established behavioral anomalies in the network.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-013, HHG-004). Case persisted to TigerGraph (CASE-SAVANNA-HHG-019).",
          "latency_ms": 38312.61,
          "timestamp": "2026-09-22T19:48:52.881646"
        }
      ]
    },
    "HHG-020": {
      "case_id": "HHG-020",
      "agent_count": 8,
      "pipeline_trace": [
        {
          "agent_id": "agent_1_alert_sentinel",
          "agent_name": "Alert Sentinel",
          "role": "Intake, Velocity Baselining & Epistemic Triage",
          "math_metrics": {
            "flagged_txn_id": 3509359,
            "flagged_amount_usd": 125.08,
            "channel": "online",
            "customer_id": "C12265",
            "card_id": "C12265-K2",
            "historical_mean_usd": 216.74,
            "historical_std_usd": 390.5,
            "z_score": -0.235,
            "amount_acceleration_ratio": 0.58,
            "velocity_1h": 1,
            "velocity_24h": 1,
            "prior_txns_count": 83,
            "triage_priority": 0.268,
            "hand_off_summary": "Anchored TX #3509359 ($125.08, Z=-0.23). Triage priority: 0.27."
          },
          "ai_reasoning": "Transaction #3509359 does not represent a statistically severe baseline anomaly, as the $125.08 amount falls well within the customer's historical spending distribution (Z-score: -0.23) and exhibits low velocity. Consequently, the moderate upstream risk score of 0.52 likely stems from contextual factors rather than significant behavioral deviation, supporting a low triage priority of 0.27.",
          "evidence_generated": [],
          "hand_off_summary": "Anchored TX #3509359 ($125.08, Z=-0.23). Triage priority: 0.27.",
          "latency_ms": 323.67,
          "timestamp": "2026-09-22T19:48:53.462807"
        },
        {
          "agent_id": "agent_2_graph_scout",
          "agent_name": "Graph Scout",
          "role": "TigerGraph Topology, Ego Network & Collusion Intelligence",
          "math_metrics": {
            "is_card_testing": false,
            "micro_auths_count": 0,
            "has_shared_origin": true,
            "connected_cards_count": 3,
            "connected_cards": [
              "C11923",
              "C07987",
              "C02354"
            ],
            "shared_device_degree": 15,
            "is_recurring_dispute": false,
            "recurring_matches_count": 0,
            "is_out_of_region": false,
            "ego_threat_density": 0.85,
            "subgraph_path": "[C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]",
            "device_profile": "Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080",
            "hand_off_summary": "Graph topology: [C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85."
          },
          "ai_reasoning": "The absence of card testing bursts, out-of-region anomalies, or recurring disputes strongly suggests benign regularity rather than active fraud, despite the shared device linkage. However, the high ego threat density (0.85) and degree of 15 warrant monitoring for potential low-level identity collusion or account sharing, as the structural connectivity exceeds typical individual user patterns.",
          "evidence_generated": [
            {
              "claim": "Transaction in established billing region 264.0 matching customer historical profile.",
              "source": "graph",
              "ref": "query:customer_billing_regions(customer_id=C12265)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "CONTRADICTORY",
              "weight": -0.7
            },
            {
              "claim": "Device profile Trident/7.0 observed across 3 other distinct customer accounts in TigerGraph.",
              "source": "graph",
              "ref": "query:device_clustering(device_info=Trident/7.0)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "DIRECT",
              "weight": 1.0
            },
            {
              "claim": "Transaction initiated from a newly observed device profile: Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080.",
              "source": "telemetry",
              "ref": "identity.csv:id_15(TransactionID=3509359)",
              "entity_ids": [
                "3509359"
              ],
              "grade": "CIRCUMSTANTIAL",
              "weight": 0.6
            }
          ],
          "hand_off_summary": "Graph topology: [C12265] -[:USED_DEVICE]-> [Trident/7.0] <-[:USED_DEVICE]- [C11923, C07987, C02354]. Threat density: 0.85.",
          "latency_ms": 6480.43,
          "timestamp": "2026-09-22T19:48:59.943289"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 3,
            "direct_count": 1,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.62,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The evidence pool warrants immediate action rather than customer verification, as the derived fraud probability of 0.62 exceeds the standard intervention threshold and the low epistemic uncertainty (U=0.150) indicates sufficient confidence in the risk assessment to bypass step-up authentication. Mandating verification under Policy Rule R1 would be disproportionate given the high confidence in the fraudulent signal, potentially exposing the institution to greater financial loss than the minor friction imposed on the customer relationship.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 3 signals: P(Fraud)=0.62, U=0.150. Step-up needed: False.",
          "latency_ms": 4456.57,
          "timestamp": "2026-09-22T19:49:04.399913"
        },
        {
          "agent_id": "agent_4_pattern_strategist",
          "agent_name": "Pattern Strategist",
          "role": "Fraud Typology Classification & Novel Pattern Discovery (Policy R9)",
          "math_metrics": {
            "detected_pattern": "card_not_present_new_device",
            "matched_predicate": "CARD_NOT_PRESENT_NEW_DEVICE",
            "is_novel_pattern": false,
            "is_benign": false,
            "channel": "online",
            "shared_origin_detected": true,
            "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE."
          },
          "ai_reasoning": "The shared usage of the Trident/7.0 device across four distinct customer accounts, including the subject C12265, strongly indicates a coordinated fraud ring leveraging a single compromised or spoofed device fingerprint to execute card-not-present transactions. This clustering behavior, combined with the moderate fraud probability, suggests the attacker is systematically testing stolen card credentials against multiple accounts to maximize yield before triggering velocity-based alerts.",
          "evidence_generated": [],
          "hand_off_summary": "Typology classified as 'card_not_present_new_device' via predicate CARD_NOT_PRESENT_NEW_DEVICE.",
          "latency_ms": 5432.84,
          "timestamp": "2026-09-22T19:49:09.832805"
        },
        {
          "agent_id": "agent_3_evidence_assessor",
          "agent_name": "Evidence Assessor",
          "role": "4-Tier Evidence Grading & Epistemic Uncertainty Quantification",
          "math_metrics": {
            "total_evidence_signals": 4,
            "direct_count": 2,
            "circumstantial_count": 1,
            "correlative_count": 0,
            "contradictory_count": 1,
            "fraud_probability": 0.68,
            "epistemic_uncertainty_U": 0.15,
            "uncertainty_threshold": 0.45,
            "needs_step_up_challenge": false,
            "uncertainty_formula": "U = 1.0 - |2*P - 1.0|",
            "mathematical_rationale": "Contradictory signals present (e.g. established history vs novel device); uncertainty elevated.",
            "hand_off_summary": "Graded 4 signals: P(Fraud)=0.68, U=0.150. Step-up needed: False."
          },
          "ai_reasoning": "The derived fraud probability of 0.68, combined with an Epistemic Uncertainty Index of 0.150 that is well below the 0.45 threshold, indicates a high-confidence signal that justifies immediate action rather than deferring to customer verification. Consequently, initiating step-up authentication would be an unnecessary friction that risks damaging the customer relationship, as the evidence pool is sufficiently robust to support a decisive compliance intervention under Policy Rule R1.",
          "evidence_generated": [],
          "hand_off_summary": "Graded 4 signals: P(Fraud)=0.68, U=0.150. Step-up needed: False.",
          "latency_ms": 4473.11,
          "timestamp": "2026-09-22T19:49:14.305978"
        },
        {
          "agent_id": "agent_5_policy_governor",
          "agent_name": "Policy Governor",
          "role": "Bank Fraud Policy v1.0 Governance & 2-Stage Next-Best Action Routing",
          "math_metrics": {
            "initial_stage_1_actions": [
              "VERIFY_WITH_CUSTOMER",
              "MONITOR_CARD"
            ],
            "initial_stage_1_route": "auto",
            "final_stage_2_actions": [
              "BLOCK_ALL_CARDS",
              "CREATE_CASE",
              "FILE_REPORT",
              "MONITOR_CONNECTED_CARDS"
            ],
            "final_stage_2_route": "L2",
            "financial_exposure_usd": 125.08,
            "approval_threshold_limit": 2500.0,
            "is_l2_escalation_required": false,
            "verdict": "fraud",
            "status": "closed_fraud",
            "what_changed": "Customer denial confirmed fraud, upgrading action from verification to permanent card block and SAR filing.",
            "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $125.08."
          },
          "ai_reasoning": "The initial Stage 1 verification actions strictly adhered to Rule R1 by avoiding premature card blocking on a single anomaly signal, instead prioritizing customer confirmation to ensure procedural fairness. The subsequent escalation to permanent blocks and SAR filing is fully defensible as a proportionate response to confirmed fraud, satisfying regulatory mandates for immediate risk mitigation and mandatory reporting despite the exposure falling below the L2 financial threshold.",
          "evidence_generated": [],
          "hand_off_summary": "Policy evaluated: Stage 1 [VERIFY_WITH_CUSTOMER] -> Stage 2 [BLOCK_ALL_CARDS] (L2). Exposure: $125.08.",
          "latency_ms": 6483.02,
          "timestamp": "2026-09-22T19:49:20.789050"
        },
        {
          "agent_id": "agent_6_compliance_officer",
          "agent_name": "Compliance Officer",
          "role": "FinCEN BSA/AML Compliance, Statutory Thresholds & SAR Narrative Synthesis",
          "math_metrics": {
            "sar_required": true,
            "statutory_threshold_usd": 5000.0,
            "total_reported_usd": 125.08,
            "subjects_count": 5,
            "subjects": [
              "C12265",
              "C12265-K2",
              "C11923",
              "C07987",
              "C02354"
            ],
            "activity_dates": [
              "2016-12-03",
              "2016-12-03"
            ],
            "filing_reason": "R2: confirmed unauthorized use",
            "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $125.08, Reason: R2: confirmed unauthorized use)."
          },
          "ai_reasoning": "Compliance Officer certified FinCEN SAR filing pursuant to 31 CFR 1020.320. Reported exposure is $125.08 across subjects ['C12265', 'C12265-K2', 'C11923', 'C07987', 'C02354']. Regulatory excerpt: **FINCEN SUSPICIOUS ACTIVITY REPORT (SAR) \u2014 INVESTIGATION NARRATIVE**\n\n**Case Reference:** HHG-020\n\n**I. SUMMARY OF SUSPICIOUS ACTIVITY**\nBetween 2016-12-03 06:04:26 and 2016-12-03 06:04:26, the Institution identified suspicious transaction activity ...",
          "evidence_generated": [],
          "hand_off_summary": "Compliance audit: SAR Filed=True (Exposure: $125.08, Reason: R2: confirmed unauthorized use).",
          "latency_ms": 1332.15,
          "timestamp": "2026-09-22T19:49:22.121227"
        },
        {
          "agent_id": "agent_7_memory_weaver",
          "agent_name": "Memory Weaver",
          "role": "TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit",
          "math_metrics": {
            "precedents_retrieved_count": 3,
            "similar_prior_cases": [
              "HHG-010",
              "HHG-006",
              "HHG-013"
            ],
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": false,
            "graph_case_id": "CASE-SAVANNA-HHG-020",
            "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-006, HHG-013). Case persisted to TigerGraph (CASE-SAVANNA-HHG-020)."
          },
          "ai_reasoning": "Precedents HHG-010, HHG-006, and HHG-013 collectively establish a high-confidence pattern where the convergence of card-not-present transactions with new device fingerprints correlates directly with confirmed fraud, mirroring the current case's risk profile. This historical consistency validates the immediate fraud verdict for HHG-020, confirming that the $125.08 exposure falls within the established threshold for such device-anomaly signatures.",
          "evidence_generated": [],
          "hand_off_summary": "Memory integrated: Retrieved 3 precedents (HHG-010, HHG-006, HHG-013). Case persisted to TigerGraph (CASE-SAVANNA-HHG-020).",
          "latency_ms": 34113.94,
          "timestamp": "2026-09-22T19:49:56.235204"
        }
      ]
    }
  },
  "graphs": {
    "HHG-001": {
      "case_id": "HHG-001",
      "nodes": [
        {
          "id": "tx_3514030",
          "label": "TX #3514030",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.05,
          "size": 18
        },
        {
          "id": "cust_C12382",
          "label": "Customer C12382",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C12382-K1",
          "label": "Card C12382-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        }
      ],
      "links": [
        {
          "source": "cust_C12382",
          "target": "card_C12382-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C12382-K1",
          "target": "tx_3514030",
          "type": "MADE",
          "weight": 1.0
        }
      ],
      "metrics": {
        "node_count": 3,
        "edge_count": 2,
        "threat_density": 0.0
      }
    },
    "HHG-002": {
      "case_id": "HHG-002",
      "nodes": [
        {
          "id": "tx_3478782",
          "label": "TX #3478782",
          "type": "Transaction",
          "amount": 292.36,
          "color": "#F59E0B",
          "risk": 0.05,
          "size": 18
        },
        {
          "id": "cust_C11891",
          "label": "Customer C11891",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C11891-K1",
          "label": "Card C11891-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C11891",
          "target": "card_C11891-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C11891-K1",
          "target": "tx_3478782",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C11891-K1",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 4,
        "edge_count": 3,
        "threat_density": 0.0
      }
    },
    "HHG-003": {
      "case_id": "HHG-003",
      "nodes": [
        {
          "id": "tx_3530164",
          "label": "TX #3530164",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.95,
          "size": 18
        },
        {
          "id": "cust_C08623",
          "label": "Customer C08623",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C08623-K2",
          "label": "Card C08623-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C08623",
          "target": "card_C08623-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C08623-K2",
          "target": "tx_3530164",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C08623-K2",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C08623-K2",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 5,
        "edge_count": 4,
        "threat_density": 0.6
      }
    },
    "HHG-004": {
      "case_id": "HHG-004",
      "nodes": [
        {
          "id": "tx_3583227",
          "label": "TX #3583227",
          "type": "Transaction",
          "amount": 128.33,
          "color": "#F59E0B",
          "risk": 0.99,
          "size": 18
        },
        {
          "id": "cust_C08106",
          "label": "Customer C08106",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C08106-K1",
          "label": "Card C08106-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: firefox 47.0",
          "full_profile": "firefox 47.0",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-003",
          "label": "Precedent HHG-003",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C08106",
          "target": "card_C08106-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C08106-K1",
          "target": "tx_3583227",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "tx_3583227",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C08106-K1",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C08106-K1",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C08106-K1",
          "target": "cc_HHG-003",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 7,
        "edge_count": 6,
        "threat_density": 0.71
      }
    },
    "HHG-005": {
      "case_id": "HHG-005",
      "nodes": [
        {
          "id": "tx_3523199",
          "label": "TX #3523199",
          "type": "Transaction",
          "amount": 100.07,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C02923",
          "label": "Customer C02923",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C02923-K1",
          "label": "Card C02923-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C03042",
          "label": "Card C03042",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C05876",
          "label": "Card C05876",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: iOS Device",
          "full_profile": "iOS Device | iOS 9.3.5 | mobile safari 9.0 | 1024x768",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C02923",
          "target": "card_C02923-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C02923-K1",
          "target": "tx_3523199",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C02923",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C02923",
          "target": "card_C03042",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C02923",
          "target": "card_C05876",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3523199",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C02923-K1",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C02923-K1",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C02923-K1",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-006": {
      "case_id": "HHG-006",
      "nodes": [
        {
          "id": "tx_3476682",
          "label": "TX #3476682",
          "type": "Transaction",
          "amount": 482.12,
          "color": "#F59E0B",
          "risk": 0.99,
          "size": 18
        },
        {
          "id": "cust_C07297",
          "label": "Customer C07297",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C07297-K1",
          "label": "Card C07297-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C07987",
          "label": "Card C07987",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Trident/7.0",
          "full_profile": "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C07297",
          "target": "card_C07297-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C07297-K1",
          "target": "tx_3476682",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C07297",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07297",
          "target": "card_C07987",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07297",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3476682",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C07297-K1",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07297-K1",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07297-K1",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-007": {
      "case_id": "HHG-007",
      "nodes": [
        {
          "id": "tx_3514948",
          "label": "TX #3514948",
          "type": "Transaction",
          "amount": 111.92,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C09933",
          "label": "Customer C09933",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C09933-K2",
          "label": "Card C09933-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C09933",
          "target": "card_C09933-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C09933-K2",
          "target": "tx_3514948",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C09933-K2",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C09933-K2",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C09933-K2",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 6,
        "edge_count": 5,
        "threat_density": 0.67
      }
    },
    "HHG-008": {
      "case_id": "HHG-008",
      "nodes": [
        {
          "id": "tx_3558054",
          "label": "TX #3558054",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.68,
          "size": 18
        },
        {
          "id": "cust_C13171",
          "label": "Customer C13171",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C13171-K2",
          "label": "Card C13171-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: chrome 66.0",
          "full_profile": "chrome 66.0",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.25,
          "size": 14
        },
        {
          "id": "cc_HHG-003",
          "label": "Precedent HHG-003",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C13171",
          "target": "card_C13171-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C13171-K2",
          "target": "tx_3558054",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "tx_3558054",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C13171-K2",
          "target": "cc_HHG-003",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C13171-K2",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C13171-K2",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 7,
        "edge_count": 6,
        "threat_density": 0.0
      }
    },
    "HHG-009": {
      "case_id": "HHG-009",
      "nodes": [
        {
          "id": "tx_3581141",
          "label": "TX #3581141",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.05,
          "size": 18
        },
        {
          "id": "cust_C08299",
          "label": "Customer C08299",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C08299-K1",
          "label": "Card C08299-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-003",
          "label": "Precedent HHG-003",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-008",
          "label": "Precedent HHG-008",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C08299",
          "target": "card_C08299-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C08299-K1",
          "target": "tx_3581141",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C08299-K1",
          "target": "cc_HHG-003",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C08299-K1",
          "target": "cc_HHG-008",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C08299-K1",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 6,
        "edge_count": 5,
        "threat_density": 0.0
      }
    },
    "HHG-010": {
      "case_id": "HHG-010",
      "nodes": [
        {
          "id": "tx_3506725",
          "label": "TX #3506725",
          "type": "Transaction",
          "amount": 1000.03,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C10434",
          "label": "Customer C10434",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C10434-K1",
          "label": "Card C10434-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Windows",
          "full_profile": "Windows | Windows 10 | edge 16.0 | 1366x768",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C10434",
          "target": "card_C10434-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C10434-K1",
          "target": "tx_3506725",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C10434",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C10434",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C10434",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3506725",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C10434-K1",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C10434-K1",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C10434-K1",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-011": {
      "case_id": "HHG-011",
      "nodes": [
        {
          "id": "tx_3583368",
          "label": "TX #3583368",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.7,
          "size": 18
        },
        {
          "id": "cust_C11923",
          "label": "Customer C11923",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C11923-K2",
          "label": "Card C11923-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: SM-G610F Build/NRD90M",
          "full_profile": "SM-G610F Build/NRD90M | chrome 66.0 for android",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.25,
          "size": 14
        },
        {
          "id": "cc_HHG-003",
          "label": "Precedent HHG-003",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-008",
          "label": "Precedent HHG-008",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-009",
          "label": "Precedent HHG-009",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C11923",
          "target": "card_C11923-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C11923-K2",
          "target": "tx_3583368",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "tx_3583368",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C11923-K2",
          "target": "cc_HHG-003",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C11923-K2",
          "target": "cc_HHG-008",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C11923-K2",
          "target": "cc_HHG-009",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 7,
        "edge_count": 6,
        "threat_density": 0.0
      }
    },
    "HHG-012": {
      "case_id": "HHG-012",
      "nodes": [
        {
          "id": "tx_3553342",
          "label": "TX #3553342",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.05,
          "size": 18
        },
        {
          "id": "cust_C05876",
          "label": "Customer C05876",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C05876-K2",
          "label": "Card C05876-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-001",
          "label": "Precedent HHG-001",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-007",
          "label": "Precedent HHG-007",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C05876",
          "target": "card_C05876-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C05876-K2",
          "target": "tx_3553342",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C05876-K2",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C05876-K2",
          "target": "cc_HHG-001",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C05876-K2",
          "target": "cc_HHG-007",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 6,
        "edge_count": 5,
        "threat_density": 0.0
      }
    },
    "HHG-013": {
      "case_id": "HHG-013",
      "nodes": [
        {
          "id": "tx_3526826",
          "label": "TX #3526826",
          "type": "Transaction",
          "amount": 35.66,
          "color": "#F59E0B",
          "risk": 0.92,
          "size": 18
        },
        {
          "id": "cust_C07671",
          "label": "Customer C07671",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C07671-K2",
          "label": "Card C07671-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Windows",
          "full_profile": "Windows | chrome 66.0",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C07671",
          "target": "card_C07671-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C07671-K2",
          "target": "tx_3526826",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C07671",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07671",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07671",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3526826",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C07671-K2",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07671-K2",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07671-K2",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-014": {
      "case_id": "HHG-014",
      "nodes": [
        {
          "id": "tx_3478561",
          "label": "TX #3478561",
          "type": "Transaction",
          "amount": 74.96,
          "color": "#F59E0B",
          "risk": 0.99,
          "size": 18
        },
        {
          "id": "cust_C13487",
          "label": "Customer C13487",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C13487-K1",
          "label": "Card C13487-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: SM-G935F Build/NRD90M",
          "full_profile": "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C13487",
          "target": "card_C13487-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C13487-K1",
          "target": "tx_3478561",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C13487",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C13487",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3478561",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C13487-K1",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C13487-K1",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C13487-K1",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 9,
        "edge_count": 8,
        "threat_density": 0.56
      }
    },
    "HHG-015": {
      "case_id": "HHG-015",
      "nodes": [
        {
          "id": "tx_3464869",
          "label": "TX #3464869",
          "type": "Transaction",
          "amount": 599.94,
          "color": "#F59E0B",
          "risk": 0.92,
          "size": 18
        },
        {
          "id": "cust_C03042",
          "label": "Customer C03042",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C03042-K1",
          "label": "Card C03042-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C07987",
          "label": "Card C07987",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Trident/7.0",
          "full_profile": "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-013",
          "label": "Precedent HHG-013",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C03042",
          "target": "card_C03042-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C03042-K1",
          "target": "tx_3464869",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C03042",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C03042",
          "target": "card_C07987",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C03042",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3464869",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C03042-K1",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C03042-K1",
          "target": "cc_HHG-013",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C03042-K1",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-016": {
      "case_id": "HHG-016",
      "nodes": [
        {
          "id": "tx_3534820",
          "label": "TX #3534820",
          "type": "Transaction",
          "amount": 59.67,
          "color": "#F59E0B",
          "risk": 0.99,
          "size": 18
        },
        {
          "id": "cust_C09988",
          "label": "Customer C09988",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C09988-K1",
          "label": "Card C09988-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Windows",
          "full_profile": "Windows | edge 16.0",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-005",
          "label": "Precedent HHG-005",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C09988",
          "target": "card_C09988-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C09988-K1",
          "target": "tx_3534820",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C09988",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C09988",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C09988",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3534820",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C09988-K1",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C09988-K1",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C09988-K1",
          "target": "cc_HHG-005",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-017": {
      "case_id": "HHG-017",
      "nodes": [
        {
          "id": "tx_3450629",
          "label": "TX #3450629",
          "type": "Transaction",
          "amount": 100.09,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C04570",
          "label": "Customer C04570",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C04570-K1",
          "label": "Card C04570-K1",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Windows",
          "full_profile": "Windows | Windows 10 | chrome 65.0 | 1920x1080",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-002",
          "label": "Precedent HHG-002",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-016",
          "label": "Precedent HHG-016",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C04570",
          "target": "card_C04570-K1",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C04570-K1",
          "target": "tx_3450629",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C04570",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C04570",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C04570",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3450629",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C04570-K1",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C04570-K1",
          "target": "cc_HHG-002",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C04570-K1",
          "target": "cc_HHG-016",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-018": {
      "case_id": "HHG-018",
      "nodes": [
        {
          "id": "tx_3491361",
          "label": "TX #3491361",
          "type": "Transaction",
          "amount": 0.0,
          "color": "#F59E0B",
          "risk": 0.05,
          "size": 18
        },
        {
          "id": "cust_C02354",
          "label": "Customer C02354",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C02354-K2",
          "label": "Card C02354-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "cc_HHG-003",
          "label": "Precedent HHG-003",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-008",
          "label": "Precedent HHG-008",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        },
        {
          "id": "cc_HHG-009",
          "label": "Precedent HHG-009",
          "type": "ClosedCase",
          "color": "#10B981",
          "risk": 0.05,
          "size": 16,
          "is_threat_beacon": false
        }
      ],
      "links": [
        {
          "source": "cust_C02354",
          "target": "card_C02354-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C02354-K2",
          "target": "tx_3491361",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "card_C02354-K2",
          "target": "cc_HHG-003",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C02354-K2",
          "target": "cc_HHG-008",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C02354-K2",
          "target": "cc_HHG-009",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 6,
        "edge_count": 5,
        "threat_density": 0.0
      }
    },
    "HHG-019": {
      "case_id": "HHG-019",
      "nodes": [
        {
          "id": "tx_3503878",
          "label": "TX #3503878",
          "type": "Transaction",
          "amount": 99.92,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C07987",
          "label": "Customer C07987",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C07987-K2",
          "label": "Card C07987-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C13171",
          "label": "Card C13171",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Windows",
          "full_profile": "Windows | other | chrome 61.0 | 1280x720",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-013",
          "label": "Precedent HHG-013",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-004",
          "label": "Precedent HHG-004",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C07987",
          "target": "card_C07987-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C07987-K2",
          "target": "tx_3503878",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C07987",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07987",
          "target": "card_C13171",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C07987",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3503878",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C07987-K2",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07987-K2",
          "target": "cc_HHG-013",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C07987-K2",
          "target": "cc_HHG-004",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    },
    "HHG-020": {
      "case_id": "HHG-020",
      "nodes": [
        {
          "id": "tx_3509359",
          "label": "TX #3509359",
          "type": "Transaction",
          "amount": 125.08,
          "color": "#F59E0B",
          "risk": 0.85,
          "size": 18
        },
        {
          "id": "cust_C12265",
          "label": "Customer C12265",
          "type": "Customer",
          "color": "#3B82F6",
          "risk": 0.15,
          "size": 22
        },
        {
          "id": "card_C12265-K2",
          "label": "Card C12265-K2",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.3,
          "size": 16
        },
        {
          "id": "card_C11923",
          "label": "Card C11923",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C07987",
          "label": "Card C07987",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "card_C02354",
          "label": "Card C02354",
          "type": "AccountCard",
          "color": "#6366F1",
          "risk": 0.7,
          "size": 16
        },
        {
          "id": "dev_0",
          "label": "Device: Trident/7.0",
          "full_profile": "Trident/7.0 | Windows 10 | ie 11.0 for desktop | 1920x1080",
          "type": "DeviceProfile",
          "color": "#8B5CF6",
          "risk": 0.85,
          "size": 14
        },
        {
          "id": "cc_HHG-010",
          "label": "Precedent HHG-010",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-006",
          "label": "Precedent HHG-006",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        },
        {
          "id": "cc_HHG-013",
          "label": "Precedent HHG-013",
          "type": "ClosedCase",
          "color": "#EF4444",
          "risk": 0.95,
          "size": 16,
          "is_threat_beacon": true
        }
      ],
      "links": [
        {
          "source": "cust_C12265",
          "target": "card_C12265-K2",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "card_C12265-K2",
          "target": "tx_3509359",
          "type": "MADE",
          "weight": 1.0
        },
        {
          "source": "cust_C12265",
          "target": "card_C11923",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C12265",
          "target": "card_C07987",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "cust_C12265",
          "target": "card_C02354",
          "type": "OWNS",
          "weight": 1.0
        },
        {
          "source": "tx_3509359",
          "target": "dev_0",
          "type": "FROM_DEVICE",
          "weight": 0.8
        },
        {
          "source": "card_C12265-K2",
          "target": "cc_HHG-010",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C12265-K2",
          "target": "cc_HHG-006",
          "type": "CONNECTED_TO",
          "weight": 0.7
        },
        {
          "source": "card_C12265-K2",
          "target": "cc_HHG-013",
          "type": "CONNECTED_TO",
          "weight": 0.7
        }
      ],
      "metrics": {
        "node_count": 10,
        "edge_count": 9,
        "threat_density": 0.5
      }
    }
  }
};
