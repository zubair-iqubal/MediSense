# MediSense 🩺

**MediSense** is a comprehensive disease prediction web application that leverages machine learning to predict the risk of **Heart Disease**, **Diabetes**, and **Chronic Kidney Disease (CKD)** using patient clinical and demographic data. The project includes trained ML models, a FastAPI backend, and a responsive React + Tailwind CSS frontend.

---

## 🚀 Features

- **Three Predictive Models**:
  - Heart Disease Prediction
  - Diabetes Risk Assessment
  - Chronic Kidney Disease (CKD) Detection

- **User-Friendly Interface**:
  - Clean, form-based input via React frontend
  - Real-time predictions with confidence indicators

- **Modular & Scalable Architecture**:
  - Backend: FastAPI (`app/main.py`)
  - Frontend: React + Vite + Tailwind CSS
  - Notebooks: Full model training & EDA

---

## 📊 Model Features

| Disease | Input Features |
|--------|----------------|
| **Heart Disease** | `age`, `sex`, `cp`, `trestbps`, `chol`, `thalach`, `exang`, `oldpeak`, `ca`, `thal` |
| **Diabetes** | `Age`, `GenHlth`, `BMI`, `Income`, `Sex`, `HighBP`, `HighChol`, `Education`, `HeartDiseaseorAttack`, `MentHlth`, `PhysHlth` |
| **CKD** | `hemo`, `sc`, `pcv`, `sg`, `al`, `dm`, `htn`, `rc`, `bu`, `bgr`, `sod` |

> All models are pre-trained and saved as `.pkl` files using scikit-learn.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| **Backend** | Python, FastAPI, Uvicorn |
| **ML** | scikit-learn, pandas, numpy, joblib |
| **Frontend** | React, Vite, Tailwind CSS, Axios |
| **Deployment** | Docker-ready, local dev setup |

---

## Project Structure

```text
Medisense/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── utils.py             # Model loading & prediction logic
│   ├── schemas.py           # Pydantic models for input validation
│   ├── models/
│   │   ├── heart_model.pkl
│   │   ├── diabetes_model.pkl
│   │   └── ckd_model.pkl
│   └── static/              # (Optional: serve frontend build)
│
├── notebooks/
│   ├── heart_disease_predictor.ipynb
│   ├── diabetes_predictor.ipynb
│   └── ckd_predictor.ipynb
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── HeartForm.jsx
│   │   │   ├── DiabetesForm.jsx
│   │   │   └── CKDForm.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── requirements.txt
└── README.md


---

## ⚙️ Setup & Installation

### 1. Clone the Repository
git clone https://github.com/yourusername/Medisense.git
cd Medisense
### 2. Backend Setup
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

### 3. Run Backend (FastAPI)
uvicorn app.main:app --reload --port=8000
### 4. Frontend Setup
cd frontend
npm install
npm run dev
Frontend will run at: http://localhost:5173

