# app/schemas.py
from pydantic import BaseModel
from typing import Dict, Any

class FeatureInput(BaseModel):
    features: Dict[str, Any]

class PredictionOutput(BaseModel):
    prediction: int
    probability: float
    result: str
