# app/utils.py
import os
import joblib
import numpy as np
from typing import Dict, Any

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MODELS_DIR = os.path.join(BASE_DIR, "models")

def load_pickle(filename: str):
    path = os.path.join(MODELS_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"❌ File not found: {path}")
    return joblib.load(path)

def load_artifacts():
    """Load models, scalers, and features for all diseases."""
    artifacts = {}

    artifacts["heart"] = {
        "model": load_pickle("heart_rf.pkl"),
        "scaler": load_pickle("scaler.pkl"),
        "features": load_pickle("heart_features.pkl")
    }

    artifacts["diabetes"] = {
        "model": load_pickle("diabetes_xgboost.pkl"),
        "scaler": load_pickle("diabetes_scaler.pkl"),
        "features": load_pickle("diabetes_selected_features.pkl")
    }

    artifacts["ckd"] = {
        "model": load_pickle("ckd_rf_final_model.pkl"),
        "scaler": load_pickle("ckd_rf_scaler.pkl"),
        "features": load_pickle("ckd_rf_features.pkl")
    }

    return artifacts

def prepare_features(feature_order: list, data: Dict[str, Any]):
    values = []
    for feature in feature_order:
        if feature not in data:
            raise ValueError(f"Missing feature: {feature}")
        values.append(data[feature])
    return np.array([values], dtype=float)

def predict(model, scaler, feature_order, data: Dict[str, Any]):
    X = prepare_features(feature_order, data)
    X_scaled = scaler.transform(X)
    pred = int(model.predict(X_scaled)[0])
    proba = float(model.predict_proba(X_scaled)[0][1])
    return pred, proba
