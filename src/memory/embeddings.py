"""
Case Narrative Embedding Module for Graph-Native Memory.

Primary: sentence-transformers/all-MiniLM-L6-v2 (384-dim, local, no API key).
Fallback: Deterministic hash-based pseudo-embedding (offline/CI safe).

The embedding is stored on the ClosedCase vertex in TigerGraph as LIST<DOUBLE>
and used for cosine similarity search against past case narratives.
"""

import hashlib
import math
from functools import lru_cache
from typing import List, Optional

EMBEDDING_DIM = 384

# Lazy-loaded model singleton
_model = None
_model_load_attempted = False


def _get_model():
    """Lazy-load sentence-transformers model. Returns None if unavailable."""
    global _model, _model_load_attempted
    if _model_load_attempted:
        return _model
    _model_load_attempted = True
    try:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[Embeddings] Loaded all-MiniLM-L6-v2 (384-dim)")
    except Exception as e:
        print(f"[Embeddings] sentence-transformers unavailable ({e}); using deterministic hash fallback")
        _model = None
    return _model


def _deterministic_hash_embedding(text: str, dim: int = EMBEDDING_DIM) -> List[float]:
    """
    Produce a repeatable pseudo-embedding from text via SHA-256 expansion.
    Not semantically meaningful but stable, fast, and offline-safe.
    Used as fallback when sentence-transformers is not installed.
    """
    # Generate enough hash bytes to fill the embedding dimension
    full_hash = b""
    for i in range(math.ceil(dim * 8 / 256)):
        chunk = hashlib.sha256(f"{text}__chunk_{i}".encode("utf-8")).digest()
        full_hash += chunk

    # Convert bytes to floats in [-1, 1]
    embedding = []
    for j in range(dim):
        byte_val = full_hash[j]
        embedding.append((byte_val / 127.5) - 1.0)

    # L2-normalize
    norm = math.sqrt(sum(x * x for x in embedding))
    if norm > 0:
        embedding = [x / norm for x in embedding]
    return embedding


def embed_case_narrative(text: str) -> List[float]:
    """
    Embed a case narrative into a 384-dim vector.

    Uses sentence-transformers if available, deterministic hash otherwise.
    Results are cached to avoid re-embedding identical narratives.

    Args:
        text: The case narrative, SAR text, or summary to embed.

    Returns:
        List of 384 floats (L2-normalized).
    """
    return _embed_cached(text)


@lru_cache(maxsize=2048)
def _embed_cached(text: str) -> List[float]:
    """LRU-cached embedding computation."""
    model = _get_model()
    if model is not None:
        try:
            vec = model.encode(text, normalize_embeddings=True)
            return vec.tolist()
        except Exception as e:
            print(f"[Embeddings] Model encode failed ({e}); using hash fallback")

    return _deterministic_hash_embedding(text)


def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    """
    Compute cosine similarity between two vectors.
    Both vectors should already be L2-normalized, so dot product = cosine sim.
    """
    if len(vec_a) != len(vec_b):
        return 0.0
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    return max(-1.0, min(1.0, dot))


def build_case_narrative_text(
    case_id: str,
    outcome: str,
    pattern: str,
    pattern_description: str,
    exposure_usd: float,
    summary: str,
    evidence_claims: Optional[List[str]] = None,
    sar_narrative: Optional[str] = None
) -> str:
    """
    Construct the text blob that will be embedded for a case.
    Combines structured fields with free-text narrative for maximum recall.
    """
    parts = [
        f"Case {case_id}: {outcome}.",
        f"Pattern: {pattern}.",
    ]
    if pattern_description:
        parts.append(f"Description: {pattern_description}.")
    parts.append(f"Exposure: ${exposure_usd:,.2f}.")
    if summary:
        parts.append(f"Summary: {summary}")
    if evidence_claims:
        parts.append("Evidence: " + "; ".join(evidence_claims))
    if sar_narrative:
        parts.append(f"SAR: {sar_narrative}")
    return " ".join(parts)
