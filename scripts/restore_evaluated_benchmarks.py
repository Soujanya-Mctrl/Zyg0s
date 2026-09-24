"""
Restores all 20 evaluated benchmark answer JSON files from cases/evaluated_benchmarks/ to cases/.
Use this script before running official benchmark evaluations or packaging submissions.
"""

import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CASES_DIR = BASE_DIR / "cases"
ARCHIVE_DIR = CASES_DIR / "evaluated_benchmarks"

def restore_evaluated_benchmarks():
    if not ARCHIVE_DIR.exists():
        print(f"Error: Archive directory not found at {ARCHIVE_DIR}")
        return False
    
    files = sorted(ARCHIVE_DIR.glob("HHG-*.json"))
    print(f"Restoring {len(files)} evaluated benchmark JSON files to {CASES_DIR}...")
    for f in files:
        target = CASES_DIR / f.name
        shutil.copy(f, target)
        print(f"  ✓ Restored {f.name}")
    
    print(f"\nAll {len(files)} evaluated benchmark files restored successfully!")
    return True

if __name__ == "__main__":
    restore_evaluated_benchmarks()
