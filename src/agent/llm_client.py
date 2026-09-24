"""
LLM Client Module for TigerGraph Fraud Investigation Agent.
Primary Provider: Groq (llama-3.3-70b-versatile / llama-3.1-8b-instant).
Secondary Providers: OpenAI / Google Gemini.
Fallback: Zero-crash deterministic forensic generator when no API key is configured.
"""

import os
import time
from typing import Dict, Any, Optional, Tuple
from dotenv import load_dotenv

load_dotenv()


class HybridLLMClient:
    """
    Unified LLM Client providing ultra-fast inference via Groq
    with transparent deterministic fallback.
    """

    DEFAULT_GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
    FAST_GROQ_MODEL = os.getenv("GROQ_FAST_MODEL", "qwen/qwen3.8-27b")

    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self._client = None
        self._provider = "deterministic"
        self._init_client()

    def _init_client(self):
        PREFERRED_MODELS = [
            "qwen/qwen3.8-27b",
            "openai/gpt-oss-20b",
            "openai/gpt-oss-120b",
            "allam-2-7b",
            "llama-3.3-70b-versatile",
            "llama-3.1-8b-instant",
        ]

        if self.groq_api_key:
            try:
                from groq import Groq
                self._client = Groq(api_key=self.groq_api_key)
                configured = os.getenv("GROQ_MODEL")
                try:
                    available = [m.id for m in self._client.models.list().data]
                    if configured and configured in available:
                        self.DEFAULT_GROQ_MODEL = configured
                        self.FAST_GROQ_MODEL = os.getenv("GROQ_FAST_MODEL", configured)
                    else:
                        for pref in PREFERRED_MODELS:
                            if pref in available:
                                self.DEFAULT_GROQ_MODEL = pref
                                self.FAST_GROQ_MODEL = pref
                                break
                except Exception:
                    if configured:
                        self.DEFAULT_GROQ_MODEL = configured
                self._provider = "groq"
                return
            except Exception as e:
                print(f"Warning: Failed to initialize Groq client ({e}); checking fallback.")

        if self.openai_api_key:
            try:
                from openai import OpenAI
                self._client = OpenAI(api_key=self.openai_api_key)
                self._provider = "openai"
                return
            except Exception:
                pass

        self._provider = "deterministic"

    @property
    def is_active(self) -> bool:
        return self._provider == "groq" and self._client is not None

    @property
    def model_name(self) -> str:
        return self.DEFAULT_GROQ_MODEL if self._provider == "groq" else "deterministic"

    def get_provider_status(self) -> str:
        """Returns human-readable status for UI dashboard and audit logs."""
        if self._provider == "groq":
            return f"Groq Active ({self.DEFAULT_GROQ_MODEL})"
        elif self._provider == "openai":
            return "OpenAI Active"
        return "Deterministic Mode (Offline Safe)"

    def generate_forensic_narrative(
        self,
        prompt: str,
        system_instruction: str = "You are a Senior Cyber-Fraud & AML Compliance Officer.",
        fallback_text: str = ""
    ) -> str:
        """
        Generate or enrich forensic text (e.g. SAR narrative).
        Returns fallback_text if LLM is unavailable or encounters an error.
        """
        if self._provider == "groq" and self._client:
            try:
                chat_completion = self._client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ],
                    model=self.DEFAULT_GROQ_MODEL,
                    temperature=0.2,
                    max_tokens=600
                )
                content = chat_completion.choices[0].message.content
                if content and len(content.strip()) > 50:
                    return content.strip()
            except Exception as e:
                print(f"Groq narrative generation warning: {e}; using fallback.")

        elif self._provider == "openai" and self._client:
            try:
                response = self._client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ],
                    model="gpt-4o-mini",
                    temperature=0.2
                )
                content = response.choices[0].message.content
                if content:
                    return content.strip()
            except Exception as e:
                pass

        return fallback_text

    def synthesize_novel_pattern(
        self,
        subgraph_path: str,
        customer_ids: list,
        device_profiles: list,
        fallback_name: str = "undocumented",
        fallback_desc: str = "Coordinated device fingerprint sharing across multiple unrelated accounts."
    ) -> Tuple[str, str]:
        """
        Hypothesize and name novel/undocumented fraud patterns (Policy R9).
        """
        if self._provider == "groq" and self._client:
            prompt = (
                f"Analyze this anomalous multi-hop graph structure discovered on TigerGraph:\n"
                f"Subgraph: {subgraph_path}\n"
                f"Customer IDs: {customer_ids}\n"
                f"Device Telemetry: {device_profiles}\n\n"
                f"This activity does not match standard typologies. Formulate:\n"
                f"1. A concise, professional pattern name (under 4 words, snake_case).\n"
                f"2. A 2-sentence forensic hypothesis of the syndicate's modus operandi.\n\n"
                f"Respond in exactly this format:\n"
                f"NAME: <pattern_name>\n"
                f"DESCRIPTION: <hypothesis>"
            )
            try:
                chat_completion = self._client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": "You are a Principal Financial Crime Investigator."},
                        {"role": "user", "content": prompt}
                    ],
                    model=self.DEFAULT_GROQ_MODEL,
                    temperature=0.2,
                    max_tokens=256
                )
                text = chat_completion.choices[0].message.content or ""
                lines = text.strip().split("\n")
                name, desc = fallback_name, fallback_desc
                for l in lines:
                    if l.startswith("NAME:"):
                        name = l.replace("NAME:", "").strip().lower().replace(" ", "_")
                    elif l.startswith("DESCRIPTION:"):
                        desc = l.replace("DESCRIPTION:", "").strip()
                return name, desc
            except Exception as e:
                print(f"Groq novel pattern synthesis warning: {e}")

        return fallback_name, fallback_desc

    def chat_copilot(
        self,
        user_query: str,
        case_context: Dict[str, Any]
    ) -> str:
        """
        Powers the interactive 'Ask the Investigator AI' copilot in the React Command Center.
        """
        # Check for live TigerGraph MCP tool queries
        mcp_context_line = ""
        q = user_query.lower()
        try:
            from src.graph.mcp_service import TigerGraphMCPService
            if "vertex" in q or "count" in q:
                res = TigerGraphMCPService.sync_get_vertex_count()
                if res.get("success"):
                    counts = res.get("data", {}).get("counts_by_type", {})
                    active_counts = {k: v for k, v in counts.items() if v > 0}
                    mcp_context_line = f"- Live TigerGraph MCP Telemetry: Total Vertices: {res.get('data', {}).get('total', 0):,}, Active Counts: {active_counts}\n"
            elif "mcp" in q:
                mcp_status = TigerGraphMCPService.get_status()
                mcp_context_line = f"- TigerGraph MCP Protocol: Status={mcp_status.get('status')}, Tools={mcp_status.get('total_tools_exposed')}, Graph={mcp_status.get('graph_name')}\n"
        except Exception:
            pass

        if self._provider == "groq" and self._client:
            evidence_summary = "\n".join([f"- {e}" for e in case_context.get("evidence", [])[:6]])
            prompt = (
                f"You are the Lead Financial Crime Investigator Copilot on Zyg0s, an autonomous fraud detection command center grounded in TigerGraph Savanna Cloud.\n\n"
                f"CASE INVESTIGATION CONTEXT:\n"
                f"- Case ID: {case_context.get('case_id')}\n"
                f"- Verdict: {case_context.get('verdict')}\n"
                f"- Assessed Fraud Probability: {case_context.get('fraud_probability')}\n"
                f"- Financial Exposure: ${case_context.get('exposure_usd', 0):,.2f}\n"
                f"- Fraud Pattern: {case_context.get('pattern')}\n"
                f"- Primary Card: {case_context.get('primary_card_id', 'N/A')}\n"
                f"- Connected Cards: {case_context.get('connected_card_ids', [])}\n"
                f"- Connected Device Telemetry: {case_context.get('connected_device_profiles', [])}\n"
                f"- Similar Precedents in TigerGraph Memory: {case_context.get('similar_prior_cases', [])}\n"
                f"{mcp_context_line}"
                f"- Stage 1 Action (Verification): {case_context.get('initial_action', 'N/A')}\n"
                f"- Stage 2 Action (Mitigation): {case_context.get('final_action', 'N/A')}\n"
                f"- FinCEN SAR Status: {'Filed' if case_context.get('sar_filed') else 'Not Required'}\n"
                f"- Key Anchored Evidence:\n{evidence_summary if evidence_summary else '- Standard baseline telemetry.'}\n\n"
                f"ANALYST QUESTION: {user_query}\n\n"
                f"INVESTIGATOR GUIDANCE:\n"
                f"1. Explain in simple, plain English that any analyst or executive can immediately understand in 10 seconds. Avoid dense academic jargon.\n"
                f"2. Structure your reply with clean, readable Markdown:\n"
                f"   - **Summary**: 1-2 punchy sentences stating the bottom line (cleared or fraud) and why.\n"
                f"   - **What TigerGraph Found**: 2-3 concise bullet points with real facts (e.g., location match, device link, OTP result).\n"
                f"   - **Decision & Policy**: Why this action was taken under Bank Fraud Policy (e.g., Policy R3 cleared after OTP; or Policy R2 blocked after dispute).\n"
                f"3. Keep the total response concise (under 180 words) and visually scannable."
            )
            try:
                chat_completion = self._client.chat.completions.create(
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are ZYGØS Forensic Copilot. You explain fraud cases simply, clearly, and authoritatively. "
                                "Always use clean markdown formatting with bold headers and bullet points. Never write long unformatted walls of text."
                            )
                        },
                        {"role": "user", "content": prompt}
                    ],
                    model=self.FAST_GROQ_MODEL,
                    temperature=0.2,
                    max_tokens=400
                )
                content = chat_completion.choices[0].message.content
                if content and len(content.strip()) > 10:
                    return content.strip()
            except Exception as e:
                # Fall back gracefully to deterministic policy reasoning
                print(f"Copilot inference warning: {e}; using deterministic fallback.")

        # Deterministic Copilot responses
        if mcp_context_line:
            return f"**TigerGraph MCP Live Telemetry**\n{mcp_context_line.strip()}\n\nInvestigating Case {case_context.get('case_id')} with grounded graph tool capabilities."

        if "l1" in q or "l2" in q or "approval" in q or "route" in q:
            exposure = case_context.get("exposure_usd", 0.0)
            return (
                f"Approval routing is strictly governed by Bank Fraud Policy v1.0: "
                f"Actions with exposure <= $2,500 require L1 (Team Lead) approval, whereas "
                f"exposure > $2,500 or regulatory SAR filings require L2 (Fraud Manager) authorization. "
                f"Current case exposure is ${exposure:,.2f}."
            )
        elif "rule" in q or "policy" in q:
            return "This case was evaluated against Bank Fraud Policy v1.0 rules R1 through R10, ensuring no customer is blocked on a weak single signal (R1)."
        elif "device" in q or "graph" in q:
            devs = case_context.get("connected_device_profiles", [])
            return f"Connected device telemetry in TigerGraph: {', '.join(devs) if devs else 'In-person channel; no device fingerprint.'}"

        return (
            f"Case {case_context.get('case_id')} Summary: Verdict is '{case_context.get('verdict')}' "
            f"with assessed fraud probability of {case_context.get('fraud_probability', 0)*100:.0f}%. "
            f"Exposure: ${case_context.get('exposure_usd', 0):,.2f}."
        )


# Singleton accessor
_llm_client_instance: Optional[HybridLLMClient] = None

def get_llm_client() -> HybridLLMClient:
    global _llm_client_instance
    if _llm_client_instance is None:
        _llm_client_instance = HybridLLMClient()
    return _llm_client_instance
