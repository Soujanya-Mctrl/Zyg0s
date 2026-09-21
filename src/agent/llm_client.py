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

    DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile"
    FAST_GROQ_MODEL = "llama-3.1-8b-instant"

    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self._client = None
        self._provider = "deterministic"
        self._init_client()

    def _init_client(self):
        if self.groq_api_key:
            try:
                from groq import Groq
                self._client = Groq(api_key=self.groq_api_key)
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
            except Exception as e:
                pass

        self._provider = "deterministic"

    def get_provider_status(self) -> str:
        """Returns human-readable status for UI dashboard and audit logs."""
        if self._provider == "groq":
            return f"⚡ Groq Active ({self.DEFAULT_GROQ_MODEL})"
        elif self._provider == "openai":
            return "OpenAI Active"
        return "🛡️ Deterministic Mode (Offline Safe)"

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
                    max_tokens=1024
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
        if self._provider == "groq" and self._client:
            prompt = (
                f"Case Context:\n{case_context}\n\n"
                f"Analyst Question: {user_query}\n\n"
                f"Answer concisely and authoritatively. Reference specific evidence, graph paths, "
                f"and Bank Fraud Policy v1.0 rules (R1-R10) where applicable."
            )
            try:
                chat_completion = self._client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": "You are Antigravity Fraud Copilot, an expert cyber-fraud investigator grounded in TigerGraph."},
                        {"role": "user", "content": prompt}
                    ],
                    model=self.FAST_GROQ_MODEL,
                    temperature=0.3,
                    max_tokens=512
                )
                return chat_completion.choices[0].message.content or "No response generated."
            except Exception as e:
                return f"Copilot error: {e}"

        # Deterministic Copilot responses
        q = user_query.lower()
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
