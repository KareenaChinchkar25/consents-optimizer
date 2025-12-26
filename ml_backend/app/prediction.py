import pandas as pd
import json
from .utils import risk_to_category
from .model_loader import load_model_assets

TRACKER_WEIGHTS = {
    "Google Analytics": 2.0,
    "Meta Pixel": 3.0,
    "Mixpanel": 2.5,
    "Ad Network": 4.0,
    "Analytics Partner": 1.5,
}

def parse_dataflow_score(x):
    if not x:
        return 0.0
    try:
        arr = json.loads(x) if isinstance(x, str) else x
        if not isinstance(arr, list):
            return 0.0
        s = 0.0
        for i in arr:
            s += TRACKER_WEIGHTS.get(i, 1.0)
        return s
    except:
        return 0.0

def categorize_purpose(p):
    p = str(p).lower()
    if "location" in p:
        return "Location"
    if "camera" in p or "image" in p:
        return "Camera"
    if "audio" in p or "microphone" in p:
        return "Microphone"
    if "track" in p:
        return "Tracking"
    return "General"

def preprocess(df: pd.DataFrame, reference_date: pd.Timestamp) -> pd.DataFrame:
    for col in [
        "website","platform","permission","category",
        "purpose","status","dataFlow","grantedOn","retention_months"
    ]:
        if col not in df.columns:
            df[col] = None

    df["dataFlow_score"] = df["dataFlow"].apply(parse_dataflow_score)
    df["purpose_cat"] = df["purpose"].apply(categorize_purpose)

    df["grantedOn"] = pd.to_datetime(df["grantedOn"], errors="coerce")

    df["granted_year"] = df["grantedOn"].dt.year
    df["granted_month"] = df["grantedOn"].dt.month
    df["granted_day"] = df["grantedOn"].dt.day
    df["granted_hour"] = df["grantedOn"].dt.hour
    df["granted_dayOfWeek"] = df["grantedOn"].dt.dayofweek

    df["days_since_consent"] = (reference_date - df["grantedOn"]).dt.days.fillna(0)

    return df.drop(columns=["grantedOn", "dataFlow", "purpose"], errors="ignore")

def predict_single_consent(consent: dict) -> dict:
    model, cat_cols, feature_order = load_model_assets()

    raw_df = pd.DataFrame([consent])

    reference_date = pd.Timestamp("2024-12-31")

    df = preprocess(raw_df, reference_date)

    for col in feature_order:
        if col not in df.columns:
            df[col] = 0

    df = df[feature_order]

    score = float(model.predict(df)[0])
    score = max(0.0, min(10.0, score))

    return {
        "risk_score": round(score, 3),
        "risk_category": risk_to_category(score)
    }
