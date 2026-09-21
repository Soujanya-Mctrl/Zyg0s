"""
Unit tests for Bank Fraud Policy v1.0 and Approval Routing.
"""

import pytest
from src.agent.models import ActionEnum, ApprovalRouteEnum
from src.agent.policy import BankFraudPolicyEngine


def test_approval_routing():
    # DECLINE_TRANSACTION -> L1
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.DECLINE_TRANSACTION) == ApprovalRouteEnum.L1

    # BLOCK_CARD <= $2,500 -> L1
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.BLOCK_CARD, exposure_usd=500.0) == ApprovalRouteEnum.L1
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.BLOCK_CARD, exposure_usd=2500.0) == ApprovalRouteEnum.L1

    # BLOCK_CARD > $2,500 -> L2
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.BLOCK_CARD, exposure_usd=2501.0) == ApprovalRouteEnum.L2

    # BLOCK_ALL_CARDS -> L2 always
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.BLOCK_ALL_CARDS) == ApprovalRouteEnum.L2

    # FILE_REPORT -> L2 always
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.FILE_REPORT) == ApprovalRouteEnum.L2

    # Autonomous actions -> auto
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.ALLOW_TRANSACTION) == ApprovalRouteEnum.AUTO
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.STEP_UP_AUTH) == ApprovalRouteEnum.AUTO
    assert BankFraudPolicyEngine.get_approval_route(ActionEnum.CLOSE_NO_FRAUD) == ApprovalRouteEnum.AUTO


def test_customer_confirms_closes_no_fraud():
    actions = BankFraudPolicyEngine.evaluate_final_nba(
        verdict="cleared",
        fraud_probability=0.05,
        pattern="none",
        exposure_usd=0.0,
        customer_response="Customer confirms they made this transaction"
    )
    assert len(actions) == 1
    assert actions[0].action == ActionEnum.CLOSE_NO_FRAUD
    assert actions[0].route == ApprovalRouteEnum.AUTO
