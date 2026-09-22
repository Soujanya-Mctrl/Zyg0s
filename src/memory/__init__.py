"""
Memory module for Zyg0s Fraud Investigation Agent.
Graph-native case memory backed by TigerGraph Savanna Cloud.
"""
from src.memory.closed_cases import GraphNativeCaseMemory, ClosedCaseMemory

__all__ = ["GraphNativeCaseMemory", "ClosedCaseMemory"]
