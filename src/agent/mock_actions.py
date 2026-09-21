"""
Mock Action Simulation Harness for TigerGraph Fraud Investigation Agent.
Simulates banking actions, cardholder communications, step-up challenges,
and regulatory filings.
"""

import time
from typing import Dict, Any, Optional, List


class MockActionService:
    """
    Mock API service simulating core banking, customer communication,
    CRM, and regulatory interfaces.
    """

    @staticmethod
    def send_customer_validation(
        customer_id: str,
        card_id: str,
        txn_ids: List[str],
        amounts_usd: List[float],
        expected_scenario: str = "customer_denies"
    ) -> Dict[str, Any]:
        """
        Simulate customer validation message (SMS / in-app push).
        expected_scenario:
            - 'customer_denies': Customer states they did not authorize the transactions.
            - 'customer_confirms': Customer confirms the transactions are genuine.
            - 'no_reply': Non-responsive after 24h.
        """
        total_amt = sum(amounts_usd) if amounts_usd else 0.0
        
        if expected_scenario == "customer_confirms":
            response = "Customer confirms they made the transaction(s) and activity is authorized."
            verdict_signal = "CONFIRMED_LEGITIMATE"
        elif expected_scenario == "no_reply":
            response = "No response from cardholder after 24 hours across SMS and email channels."
            verdict_signal = "NO_RESPONSE"
        else:
            response = "Customer states they did not make these purchases and still has the physical card."
            verdict_signal = "CONFIRMED_FRAUD"

        return {
            "status": "COMPLETED",
            "channel": "SMS_AND_IN_APP_PUSH",
            "customer_id": customer_id,
            "card_id": card_id,
            "txn_ids": txn_ids,
            "total_amount_usd": total_amt,
            "assumed_response": response,
            "verdict_signal": verdict_signal,
            "timestamp": time.time()
        }

    @staticmethod
    def trigger_step_up_auth(
        user_id: str,
        challenge_type: str = "BIOMETRIC_PUSH",
        expected_outcome: str = "FAILED"
    ) -> Dict[str, Any]:
        """
        Simulate step-up 2FA biometric or OTP challenge.
        expected_outcome: 'PASSED', 'FAILED', 'TIMEOUT'.
        """
        return {
            "status": "CHALLENGE_RESOLVED",
            "user_id": user_id,
            "challenge_type": challenge_type,
            "outcome": expected_outcome,
            "timestamp": time.time()
        }

    @staticmethod
    def block_card(card_id: str, reason: str, route: str = "L1") -> Dict[str, Any]:
        """Simulate payment card block and reissue request."""
        return {
            "action": "BLOCK_CARD",
            "card_id": card_id,
            "status": "BLOCKED",
            "approval_route": route,
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def block_all_cards(customer_id: str, reason: str) -> Dict[str, Any]:
        """Simulate blocking all cards for a compromised customer profile."""
        return {
            "action": "BLOCK_ALL_CARDS",
            "customer_id": customer_id,
            "status": "ALL_CARDS_BLOCKED",
            "approval_route": "L2",
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def file_sar(sar_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Simulate regulatory Suspicious Activity Report (SAR) filing with FinCEN."""
        return {
            "action": "FILE_REPORT",
            "reference_id": f"SAR_FINCEN_{int(time.time())}",
            "status": "SUBMITTED",
            "approval_route": "L2",
            "subjects": sar_payload.get("subjects", []),
            "total_amount_usd": sar_payload.get("total_amount_usd", 0.0),
            "timestamp": time.time()
        }
