import React, { useState } from "react";
import axios from "axios";

const heartFeatureInfo = {
  age: "Age of the person (20–90 years)",
  sex: "Sex (1 = Male, 0 = Female)",
  cp: "Chest pain type (0–3)",
  trestbps: "Resting blood pressure (90–140 mmHg normal)",
  chol: "Serum cholesterol (125–200 mg/dL normal)",
  thalach: "Maximum heart rate achieved (100–200 bpm normal)",
  exang: "Exercise-induced angina (1 = Yes, 0 = No)",
  oldpeak: "ST depression induced by exercise (0–6 normal)",
  ca: "Number of major vessels colored (0–3)",
  thal: "Thalassemia (1=Normal, 2=Fixed defect, 3=Reversible defect)"
};

export default function HeartForm() {
  const [formData, setFormData] = useState(Object.fromEntries(Object.keys(heartFeatureInfo).map(k => [k, ""])));
  const [result, setResult] = useState(null);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict/heart", { features: formData });
      setResult(res.data);
    } catch {
      alert("Prediction failed. Please ensure FastAPI is running.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">❤️ Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label className="block text-sm font-medium flex items-center gap-1">
              {key}
              <span title={heartFeatureInfo[key]} className="text-blue-500 cursor-help">ℹ️</span>
            </label>
            <input
              name={key}
              type="number"
              value={formData[key]}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        ))}
        <button type="submit" className="col-span-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Predict
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p>{result.result}</p>
          <p className="text-gray-600">Probability: {result.probability}</p>
        </div>
      )}
    </div>
  );
}
