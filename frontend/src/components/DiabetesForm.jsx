import React, { useState } from "react";
import axios from "axios";

const diabetesFeatureInfo = {
  Age: "Age (18–90 years typical)",
  BMI: "Body Mass Index (18.5–24.9 normal)",
  GenHlth: "General Health (1 = Excellent → 5 = Poor)",
  PhysHlth: "Days of poor physical health (0–30)",
  HighBP: "High Blood Pressure (1=Yes, 0=No)",
  MentHlth: "Days of poor mental health (0–30)",
  HighChol: "High Cholesterol (1=Yes, 0=No)",
  DiffWalk: "Difficulty walking or climbing (1=Yes, 0=No)",
  HeartDiseaseorAttack: "History of heart disease (1=Yes, 0=No)",
  PhysActivity: "Physical activity in past month (1=Yes, 0=No)",
  Veggies: "Consumes vegetables regularly (1=Yes, 0=No)",
  HvyAlcoholConsump: "Heavy alcohol consumption (1=Yes, 0=No)",
  Stroke: "History of stroke (1=Yes, 0=No)",
  Smoker: "Smoked 100+ cigarettes (1=Yes, 0=No)",
  Fruits: "Consumes fruits regularly (1=Yes, 0=No)"
};

export default function DiabetesForm() {
  const [formData, setFormData] = useState(Object.fromEntries(Object.keys(diabetesFeatureInfo).map(k => [k, ""])));
  const [result, setResult] = useState(null);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict/diabetes", { features: formData });
      setResult(res.data);
    } catch {
      alert("Prediction failed. Please ensure FastAPI is running.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">🩸 Diabetes Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label className="block text-sm font-medium flex items-center gap-1">
              {key}
              <span title={diabetesFeatureInfo[key]} className="text-blue-500 cursor-help">ℹ️</span>
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
        <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
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
