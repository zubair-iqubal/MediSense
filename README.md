MediSense – Disease Prediction System

📌 Overview

MediSense is an integrated disease prediction platform capable of assessing the risk of Heart Disease, Diabetes, and Chronic Kidney Disease (CKD).
It uses trained ML models, a FastAPI backend, and a modern React-based frontend to deliver fast and interactive predictions.

📂 Project Structure
Medisense/
│
├── app/
│   ├── main.py
│   ├── utils.py
│   ├── schemas.py
│   ├── models/
│   │   ├── heart_model.pkl
│   │   ├── diabetes_model.pkl
│   │   └── ckd_model.pkl
│   └── static/
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

🧠 Machine Learning Models
Heart Disease Prediction

Features used:

age, sex, cp, trestbps, chol, thalach, exang, oldpeak, ca, thal

Diabetes Prediction

Features used:

Age, GenHlth, BMI, Income, Sex, HighBP, HighChol, Education,
HeartDiseaseorAttack, MentHlth, PhysHlth

Chronic Kidney Disease (CKD) Prediction

Features used:

hemo, sc, pcv, sg, al, dm, htn, rc, bu, bgr, sod

🛠 Tech Stack
Backend

FastAPI

Python

Scikit-Learn

Pickle

Frontend

React (Vite)

TailwindCSS

Model Development

Jupyter Notebook

Scikit-Learn

Pandas, NumPy
