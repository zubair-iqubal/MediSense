# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.utils import load_artifacts, predict
from app.schemas import FeatureInput, PredictionOutput

app = FastAPI(
    title="Health Disease Predictor API",
    version="1.0",
    description="Predicts Heart Disease, Diabetes, and Chronic Kidney Disease."
)

# Allow frontend or Postman access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and scalers once
try:
    ARTIFACTS = load_artifacts()
except Exception as e:
    raise RuntimeError(f"Failed to load models: {e}")

@app.get("/")
def home():
    return {"message": "Health Disease Prediction API is running."}

# -------------------- Prediction Routes --------------------

@app.post("/predict/heart", response_model=PredictionOutput)
def predict_heart(data: FeatureInput):
    disease = "heart"
    model_data = ARTIFACTS[disease]
    try:
        pred, proba = predict(model_data["model"], model_data["scaler"], model_data["features"], data.features)
        result = "Heart Disease Detected" if pred == 1 else "No Heart Disease"
        return {"prediction": pred, "probability": round(proba, 4), "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict/diabetes", response_model=PredictionOutput)
def predict_diabetes(data: FeatureInput):
    disease = "diabetes"
    model_data = ARTIFACTS[disease]
    try:
        pred, proba = predict(model_data["model"], model_data["scaler"], model_data["features"], data.features)
        result = "Diabetic" if pred == 1 else "Not Diabetic"
        return {"prediction": pred, "probability": round(proba, 4), "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict/ckd", response_model=PredictionOutput)
def predict_ckd(data: FeatureInput):
    disease = "ckd"
    model_data = ARTIFACTS[disease]
    try:
        pred, proba = predict(model_data["model"], model_data["scaler"], model_data["features"], data.features)
        result = "Chronic Kidney Disease Detected" if pred == 1 else "No Chronic Kidney Disease"
        return {"prediction": pred, "probability": round(proba, 4), "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
