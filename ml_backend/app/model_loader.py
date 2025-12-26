# model_loader.py (updated for new CatBoost pipeline)

import os
import joblib
from catboost import CatBoostRegressor

# Path to model directory
BASE = os.path.join(os.path.dirname(__file__), "..", "models")

MODEL_FILE = os.path.join(BASE, "consent_risk_model.cbm")
CAT_FILE = os.path.join(BASE, "categorical_columns.pkl")
FEAT_FILE = os.path.join(BASE, "feature_order.pkl")


def load_model_assets():
    """
    Loads:
    - CatBoost model
    - categorical columns list
    - feature order list
    NOTE: No encoders needed anymore (raw strings used directly)
    """

    # Load CatBoost model
    model = CatBoostRegressor()
    model.load_model(MODEL_FILE)

    # Load metadata
    categorical_cols = joblib.load(CAT_FILE)
    feature_order = joblib.load(FEAT_FILE)

    return model, categorical_cols, feature_order
