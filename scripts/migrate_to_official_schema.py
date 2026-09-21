"""
Migrate TigerGraph graph schema to official HHGOA IEEE-CIS Fraud Investigation schema in two clean stages.
"""

import sys
import time
from pathlib import Path
from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.graph.client import get_tg_connection

load_dotenv(dotenv_path=REPO_ROOT / ".env")


def main():
    print("Connecting to TigerGraph Savanna Cloud...")
    conn = get_tg_connection()

    # Stage 1: Drop old edges and old vertices
    drop_stage_gsql = """
USE GRAPH Transaction_Fraud

CREATE SCHEMA_CHANGE JOB drop_old_schema FOR GRAPH Transaction_Fraud {
    // Drop old edges
    DROP EDGE Merchant_Merchant;
    DROP EDGE Merchant_Receive_Transaction;
    DROP EDGE Card_Send_Transaction;
    DROP EDGE Card_Card;
    DROP EDGE Merchant_Assigned;
    DROP EDGE Is_SubCategory;
    DROP EDGE Has_Interaction_With_Merchant;
    DROP EDGE Has_Address;
    DROP EDGE Is_Merchant;
    DROP EDGE Party_Has_Card;
    DROP EDGE Has_ID;
    DROP EDGE Has_IP;
    DROP EDGE Has_Device;
    DROP EDGE Has_Phone;
    DROP EDGE Has_Email;
    DROP EDGE Has_Community;
    DROP EDGE Assigned_To;
    DROP EDGE Located_In;
    DROP EDGE Has_DOB;
    DROP EDGE Has_Full_Name;
    DROP EDGE DESCRIBES;
    DROP EDGE IS_CHILD_OF;

    // Drop old vertices
    DROP VERTEX Payment_Transaction;
    DROP VERTEX Party;
    DROP VERTEX Card;
    DROP VERTEX Device;
    DROP VERTEX IP;
    DROP VERTEX Address;
    DROP VERTEX City;
    DROP VERTEX Community;
    DROP VERTEX Concept;
    DROP VERTEX DOB;
    DROP VERTEX Email;
    DROP VERTEX Full_Name;
    DROP VERTEX ID;
    DROP VERTEX Merchant;
    DROP VERTEX Merchant_Category;
    DROP VERTEX Phone;
    DROP VERTEX State;
    DROP VERTEX Zipcode;
    DROP VERTEX TestVertex;
}

RUN SCHEMA_CHANGE JOB drop_old_schema
DROP JOB drop_old_schema
"""
    print("\n--- Phase 1: Dropping Old Schema (Edges & Vertices) ---")
    res1 = conn.gsql(drop_stage_gsql)
    print("Phase 1 response:\n", res1)

    time.sleep(5)

    # Stage 2: Add official HHGOA schema
    add_stage_gsql = """
USE GRAPH Transaction_Fraud

CREATE SCHEMA_CHANGE JOB add_hhgoa_schema FOR GRAPH Transaction_Fraud {
    // 1. Add official HHGOA vertex types
    ADD VERTEX Customer (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX Card (
        PRIMARY_ID id STRING,
        customer_id STRING,
        card_network STRING,
        card_type STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX Transaction (
        PRIMARY_ID id STRING,
        ts DATETIME,
        amount DOUBLE,
        product_cd STRING,
        risk_score DOUBLE,
        channel STRING,
        dist1 DOUBLE,
        dist2 DOUBLE,
        addr1 STRING,
        addr2 STRING,
        p_emaildomain STRING,
        r_emaildomain STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX DeviceProfile (
        PRIMARY_ID id STRING,
        device_info STRING,
        device_type STRING,
        os STRING,
        browser STRING,
        screen STRING,
        is_new BOOL
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX EmailDomain (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX BillingRegion (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX ClosedCase (
        PRIMARY_ID id STRING,
        customer_id STRING,
        card_id STRING,
        opened_at DATETIME,
        closed_at DATETIME,
        outcome STRING,
        pattern STRING,
        exposure_usd DOUBLE,
        analyst_notes STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX Investigation_Case (
        PRIMARY_ID id STRING,
        verdict STRING,
        status STRING,
        pattern STRING,
        fraud_probability DOUBLE,
        exposure_usd DOUBLE,
        summary STRING,
        written_at DATETIME
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    // 2. Add official HHGOA edge types
    ADD UNDIRECTED EDGE OWNS (FROM Customer, TO Card);
    ADD DIRECTED EDGE MADE (FROM Card, TO Transaction) WITH REVERSE_EDGE="REVERSE_MADE";
    ADD DIRECTED EDGE FROM_DEVICE (FROM Transaction, TO DeviceProfile) WITH REVERSE_EDGE="REVERSE_FROM_DEVICE";
    ADD DIRECTED EDGE PURCHASER_EMAIL (FROM Transaction, TO EmailDomain) WITH REVERSE_EDGE="REVERSE_PURCHASER_EMAIL";
    ADD DIRECTED EDGE BILLED_IN (FROM Transaction, TO BillingRegion) WITH REVERSE_EDGE="REVERSE_BILLED_IN";
    ADD DIRECTED EDGE NEXT (FROM Transaction, TO Transaction) WITH REVERSE_EDGE="PREV";

    ADD DIRECTED EDGE INVOLVES (FROM ClosedCase, TO Transaction) WITH REVERSE_EDGE="REVERSE_INVOLVES";
    ADD DIRECTED EDGE ON_CARD (FROM ClosedCase, TO Card) WITH REVERSE_EDGE="REVERSE_ON_CARD";
    ADD DIRECTED EDGE CONNECTED_TO (FROM ClosedCase, TO Card) WITH REVERSE_EDGE="REVERSE_CONNECTED_TO";

    ADD DIRECTED EDGE CASE_INVOLVES_TXN (FROM Investigation_Case, TO Transaction) WITH REVERSE_EDGE="TXN_IN_CASE";
    ADD DIRECTED EDGE CASE_ON_CARD (FROM Investigation_Case, TO Card) WITH REVERSE_EDGE="CARD_IN_CASE";
    ADD DIRECTED EDGE CASE_CONNECTED_CARD (FROM Investigation_Case, TO Card) WITH REVERSE_EDGE="CARD_CONNECTED_CASE";
    ADD DIRECTED EDGE CASE_CONNECTED_DEVICE (FROM Investigation_Case, TO DeviceProfile) WITH REVERSE_EDGE="DEVICE_IN_CASE";
}

RUN SCHEMA_CHANGE JOB add_hhgoa_schema
DROP JOB add_hhgoa_schema
"""
    print("\n--- Phase 2: Adding Official HHGOA Schema ---")
    res2 = conn.gsql(add_stage_gsql)
    print("Phase 2 response:\n", res2)

    print("\n--- Verifying Catalog after Migration ---")
    ls_res = conn.gsql("ls")
    print(ls_res)


if __name__ == "__main__":
    main()
