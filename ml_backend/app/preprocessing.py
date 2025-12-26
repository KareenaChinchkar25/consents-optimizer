# preprocessing.py (updated to match new training pipeline)

import pandas as pd
import json
from datetime import datetime

# -------------------------
# Tracker risk weights
# -------------------------
TRACKER_WEIGHTS = {
    "Google Analytics": 2.0,
    "Meta Pixel": 3.0,
    "Mixpanel": 2.5,
    "Ad Network": 4.0,
    "Analytics Partner": 1.5
}


# -------------------------
# Safe date parser
# -------------------------
def safe_date(x):
    try:
        return pd.to_datetime(x)
    except:
        return pd.NaT


# -------------------------
# Convert dataFlow list → risk-weighted score
# -------------------------
def parse_dataflow_score(x):
    if not x:
        return 0.0

    # Already a python list
    if isinstance(x, list):
        items = x
    else:
        try:
            items = json.loads(x)
        except:
            return 0.0

    if not isinstance(items, list):
        return 0.0

    score = 0.0
    for item in items:
        score += TRACKER_WEIGHTS.get(item, 1.0)

    return score


# -------------------------
# Purpose → compressed category
# -------------------------
def categorize_purpose(text):
    t = str(text).lower()

    if "location" in t:
        return "Location"
    if "camera" in t or "image" in t:
        return "Camera"
    if "microphone" in t or "audio" in t:
        return "Microphone"
    if "track" in t:
        return "Tracking"

    return "General"


# -------------------------
# MAIN function — EXACT match with training
# -------------------------
def preprocess_input(df: pd.DataFrame) -> pd.DataFrame:

    df = df.copy()

    # Ensure required columns exist
    required = [
        "website", "platform", "permission", "category",
        "purpose", "status", "dataFlow", "grantedOn",
        "retention_months"
    ]
    for col in required:
        if col not in df.columns:
            df[col] = None

    # -------------------------
    # Purpose category
    # -------------------------
    df["purpose_cat"] = df["purpose"].apply(categorize_purpose)

    # -------------------------
    # DataFlow → score
    # -------------------------
    df["dataFlow_score"] = df["dataFlow"].apply(parse_dataflow_score)

    # -------------------------
    # Datetime features
    # -------------------------
    df["grantedOn"] = df["grantedOn"].apply(safe_date)

    df["granted_year"] = df["grantedOn"].dt.year
    df["granted_month"] = df["grantedOn"].dt.month
    df["granted_day"] = df["grantedOn"].dt.day
    df["granted_hour"] = df["grantedOn"].dt.hour
    df["granted_dayOfWeek"] = df["grantedOn"].dt.dayofweek

    # recency
    df["days_since_consent"] = (
        pd.Timestamp.now() - df["grantedOn"]
    ).dt.days.fillna(0)

    # -------------------------
    # Drop unused raw columns
    # -------------------------
    df = df.drop(columns=["grantedOn", "dataFlow", "purpose"], errors="ignore")

    return df


# alias for compatibility with prediction.py
def preprocess(raw_df):
    return preprocess_input(raw_df)
