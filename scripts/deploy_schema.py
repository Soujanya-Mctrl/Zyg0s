"""
Deploy official HHGOA Fraud graph schema to TigerGraph Savanna Cloud.
Wipes the obsolete demo template and creates the clean HHGOA_Fraud graph.
"""

import os
import sys
import time
from pathlib import Path
from dotenv import load_dotenv

# Ensure repo root is on python path
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.graph.client import get_tg_connection

load_dotenv(dotenv_path=REPO_ROOT / ".env")


def main():
    print("Connecting to TigerGraph Savanna Cloud...")
    conn = get_tg_connection()
    
    print("\n--- Current Graphs & Catalog ---")
    ls_result = conn.gsql("ls")
    print(ls_result)
    
    confirm = input("Are you sure you want to execute DROP ALL to wipe the obsolete demo template? (y/N): ") if sys.stdin.isatty() else "y"
    if confirm.lower() not in ("y", "yes"):
        print("Aborted.")
        return

    print("\nExecuting DROP ALL (wiping obsolete demo solution kit)...")
    drop_res = conn.gsql("DROP ALL")
    print("DROP ALL result:", drop_res)
    
    time.sleep(3)
    
    schema_file = REPO_ROOT / "src" / "graph" / "schema.gsql"
    print(f"\nReading schema from {schema_file}...")
    with open(schema_file, "r", encoding="utf-8") as f:
        schema_gsql = f.read()
        
    print("Deploying schema and creating graph HHGOA_Fraud...")
    create_res = conn.gsql(schema_gsql)
    print("Schema deployment result:\n", create_res)
    
    print("\n--- Verifying Catalog after Deployment ---")
    ls_after = conn.gsql("ls")
    print(ls_after)
    
    print("\nUpdating .env TG_GRAPHNAME to HHGOA_Fraud...")
    env_path = REPO_ROOT / ".env"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
        with open(env_path, "w", encoding="utf-8") as f:
            for line in lines:
                if line.startswith("TG_GRAPHNAME="):
                    f.write("TG_GRAPHNAME=HHGOA_Fraud\n")
                else:
                    f.write(line)
        print(".env updated: TG_GRAPHNAME=HHGOA_Fraud")
        
    print("\n[SUCCESS] Schema deployment completed!")


if __name__ == "__main__":
    main()
