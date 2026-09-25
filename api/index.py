"""
Vercel Serverless Function entry point for Zyg0s FastAPI Backend.
Exposes the FastAPI 'app' instance for Vercel's Python runtime.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Add project root directory to sys.path so 'src' and modules can be resolved
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Import the existing configured FastAPI application
from src.api.server import app

# Vercel looks for 'app' in api/index.py
