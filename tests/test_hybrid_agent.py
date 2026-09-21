"""
Unit tests for the Hybrid Neuro-Symbolic Agent and Groq / LLM Client.
"""

import pytest
from src.agent.llm_client import HybridLLMClient, get_llm_client
from src.agent.models import FraudPatternEnum


def test_hybrid_client_deterministic_fallback():
    # Instantiating client without active external calls should fall back gracefully
    client = HybridLLMClient()
    # Test forensic narrative fallback
    prompt = "Draft an AML report"
    fallback = "Deterministic SAR text."
    # If no valid key or in test environment, it returns fallback or enriched text without error
    narrative = client.generate_forensic_narrative(prompt, fallback_text=fallback)
    assert len(narrative) > 0


def test_copilot_policy_query():
    client = HybridLLMClient()
    case_context = {
        "case_id": "HHG-010",
        "verdict": "fraud",
        "exposure_usd": 1000.03,
        "fraud_probability": 0.85,
        "connected_device_profiles": ["Windows | Windows 10"]
    }
    
    # Query regarding L1 vs L2 routing
    ans = client.chat_copilot("Why is approval routing set to L1 or L2?", case_context)
    assert "2,500" in ans or "approval" in ans.lower() or "policy" in ans.lower()


def test_novel_pattern_synthesis_fallback():
    client = HybridLLMClient()
    name, desc = client.synthesize_novel_pattern(
        subgraph_path="[C1] -> [D1] <- [C2]",
        customer_ids=["C1", "C2"],
        device_profiles=["D1"],
        fallback_name="undocumented",
        fallback_desc="Shared device ring."
    )
    assert len(name) > 0
    assert len(desc) > 0
