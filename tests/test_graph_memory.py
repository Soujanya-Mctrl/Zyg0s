"""
Tests for Graph-Native Case Memory system.

Validates:
1. Embedding generation (384-dim, deterministic fallback)
2. Narrative text construction
3. Cosine similarity computation
4. Reciprocal Rank Fusion (RRF) merge
5. GraphNativeCaseMemory write + retrieve cycle
"""

import pytest
from typing import List, Dict, Any

from src.memory.embeddings import (
    embed_case_narrative,
    cosine_similarity,
    build_case_narrative_text,
    _deterministic_hash_embedding,
    EMBEDDING_DIM,
)
from src.memory.closed_cases import GraphNativeCaseMemory


class TestEmbeddings:
    """Test the embedding module."""

    def test_deterministic_hash_produces_correct_dim(self):
        """Hash fallback should produce exactly EMBEDDING_DIM floats."""
        vec = _deterministic_hash_embedding("test case narrative")
        assert len(vec) == EMBEDDING_DIM
        assert all(isinstance(x, float) for x in vec)

    def test_deterministic_hash_is_repeatable(self):
        """Same input → same output (deterministic)."""
        vec1 = _deterministic_hash_embedding("case ABC fraud card_testing $500")
        vec2 = _deterministic_hash_embedding("case ABC fraud card_testing $500")
        assert vec1 == vec2

    def test_deterministic_hash_different_inputs_differ(self):
        """Different inputs → different outputs."""
        vec1 = _deterministic_hash_embedding("case A fraud")
        vec2 = _deterministic_hash_embedding("case B cleared")
        assert vec1 != vec2

    def test_deterministic_hash_is_normalized(self):
        """Output should be approximately L2-normalized (norm ≈ 1.0)."""
        vec = _deterministic_hash_embedding("normalized test vector")
        norm = sum(x * x for x in vec) ** 0.5
        assert abs(norm - 1.0) < 0.01

    def test_embed_case_narrative_returns_correct_dim(self):
        """embed_case_narrative should return EMBEDDING_DIM floats."""
        vec = embed_case_narrative("Card testing pattern detected on card C12382-K1")
        assert len(vec) == EMBEDDING_DIM

    def test_cosine_similarity_identical(self):
        """Identical vectors should have cosine similarity ≈ 1.0."""
        vec = _deterministic_hash_embedding("identical vectors")
        sim = cosine_similarity(vec, vec)
        assert abs(sim - 1.0) < 0.01

    def test_cosine_similarity_different(self):
        """Different vectors should have cosine similarity < 1.0."""
        vec1 = _deterministic_hash_embedding("card testing micro authorizations")
        vec2 = _deterministic_hash_embedding("legitimate recurring billing charge")
        sim = cosine_similarity(vec1, vec2)
        assert sim < 1.0

    def test_cosine_similarity_mismatched_dims(self):
        """Mismatched dimensions should return 0.0."""
        vec1 = [1.0, 0.0, 0.0]
        vec2 = [1.0, 0.0]
        assert cosine_similarity(vec1, vec2) == 0.0


class TestNarrativeConstruction:
    """Test narrative text construction for embedding."""

    def test_build_basic_narrative(self):
        text = build_case_narrative_text(
            case_id="HHG-001",
            outcome="closed_fraud",
            pattern="card_testing",
            pattern_description="",
            exposure_usd=1250.00,
            summary="Confirmed card testing episode",
        )
        assert "HHG-001" in text
        assert "card_testing" in text
        assert "$1,250.00" in text

    def test_build_narrative_with_evidence(self):
        text = build_case_narrative_text(
            case_id="HHG-005",
            outcome="closed_cleared",
            pattern="none",
            pattern_description="",
            exposure_usd=0.0,
            summary="Legitimate transaction",
            evidence_claims=["Customer confirmed purchase", "Established billing region"],
        )
        assert "Customer confirmed purchase" in text
        assert "Established billing region" in text

    def test_build_narrative_with_sar(self):
        text = build_case_narrative_text(
            case_id="HHG-010",
            outcome="closed_fraud",
            pattern="account_takeover",
            pattern_description="Unauthorized device access",
            exposure_usd=5000.00,
            summary="Account takeover",
            sar_narrative="Subject used compromised credentials...",
        )
        assert "SAR:" in text
        assert "Subject used compromised credentials" in text


class TestReciprocalRankFusion:
    """Test the RRF merge algorithm."""

    def test_rrf_single_source(self):
        """Single source should produce results ranked by that source."""
        vector_results = [
            {"case_id": "A", "score": 0.95, "match_type": "vector"},
            {"case_id": "B", "score": 0.80, "match_type": "vector"},
        ]
        merged = GraphNativeCaseMemory._reciprocal_rank_fusion(
            vector_results, [], top_k=2
        )
        assert len(merged) == 2
        assert merged[0]["case_id"] == "A"
        assert merged[0]["match_type"] == "vector_only"

    def test_rrf_both_sources(self):
        """Cases appearing in both lists should be ranked higher (hybrid)."""
        vector_results = [
            {"case_id": "A", "score": 0.90, "match_type": "vector"},
            {"case_id": "B", "score": 0.80, "match_type": "vector"},
        ]
        structural_results = [
            {"case_id": "A", "score": 3.0, "match_type": "structural", "reasons": ["same_customer"]},
            {"case_id": "C", "score": 2.0, "match_type": "structural", "reasons": ["same_card"]},
        ]
        merged = GraphNativeCaseMemory._reciprocal_rank_fusion(
            vector_results, structural_results, top_k=3
        )
        # "A" appears in both → should be ranked #1
        assert merged[0]["case_id"] == "A"
        assert merged[0]["match_type"] == "hybrid"
        assert merged[0]["rrf_score"] > merged[1]["rrf_score"]

    def test_rrf_empty_inputs(self):
        """Empty inputs should produce empty results."""
        merged = GraphNativeCaseMemory._reciprocal_rank_fusion([], [], top_k=5)
        assert merged == []

    def test_rrf_top_k_limit(self):
        """Should respect top_k limit."""
        vector_results = [
            {"case_id": f"V{i}", "score": 1.0 - i * 0.1, "match_type": "vector"}
            for i in range(10)
        ]
        merged = GraphNativeCaseMemory._reciprocal_rank_fusion(
            vector_results, [], top_k=3
        )
        assert len(merged) == 3


class TestGraphNativeCaseMemory:
    """Test the GraphNativeCaseMemory class."""

    def test_write_and_retrieve_local_cache(self):
        """Writing a case should make it retrievable from local cache."""
        memory = GraphNativeCaseMemory()
        case_data = {
            "status": "closed_fraud",
            "verdict": "fraud",
            "pattern": "card_testing",
            "pattern_description": "",
            "fraud_probability": 0.92,
            "exposure_usd": 1250.00,
            "summary": "Confirmed card testing episode",
            "connected_card_ids": ["C123-K1"],
            "connected_device_profiles": ["Samsung Galaxy"],
            "affected_txn_ids": ["3514030"],
        }

        # Write (will fall back to local cache since no TG connection)
        memory.write_case_to_graph(
            case_id="TEST-001",
            case_data=case_data,
            evidence_claims=["3 micro authorizations detected"],
        )

        # Retrieve from local cache
        assert "TEST-001" in memory._local_cache
        assert "TEST-001" in memory._embedding_cache
        assert len(memory._embedding_cache["TEST-001"]) == EMBEDDING_DIM

    def test_hybrid_retrieval_finds_structural_match(self):
        """Structural search should find cases sharing the same card."""
        memory = GraphNativeCaseMemory()

        # Seed a historical case
        memory._local_cache["HIST-001"] = {
            "customer_id": "C123",
            "connected_card_ids": ["C123-K1"],
            "connected_device_profiles": ["Samsung Galaxy"],
            "pattern": "card_testing",
        }
        memory._embedding_cache["HIST-001"] = _deterministic_hash_embedding("card testing case")

        # Search by same card_id
        results = memory.find_similar_cases(
            card_id="C123-K1",
            query_text="card testing micro authorizations",
            top_k=3,
        )

        assert len(results) > 0
        assert any(r["case_id"] == "HIST-001" for r in results)

    def test_backward_compatible_add_closed_case(self):
        """add_closed_case (old API) should still work via write_case_to_graph."""
        memory = GraphNativeCaseMemory()
        memory.add_closed_case("COMPAT-001", {
            "status": "closed_fraud",
            "pattern": "out_of_region_use",
            "exposure_usd": 500.0,
            "summary": "OOR transaction",
            "evidence": [{"claim": "New region detected"}],
        })
        assert "COMPAT-001" in memory._local_cache

    def test_pattern_stats(self):
        """Pattern stats should aggregate correctly."""
        memory = GraphNativeCaseMemory()
        memory._local_cache["A"] = {"pattern": "card_testing"}
        memory._local_cache["B"] = {"pattern": "card_testing"}
        memory._local_cache["C"] = {"pattern": "none"}
        stats = memory.get_pattern_stats()
        assert stats["card_testing"] == 2
        assert stats["none"] == 1
