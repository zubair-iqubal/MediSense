import React, { useState } from "react";
import axios from "axios";

const ckdFeatureInfo = {
  hemo: "Hemoglobin (12–17 g/dL normal)",
  sc: "Serum creatinine (0.6–1.3 mg/dL normal)",
  pcv: "Packed cell volume (37–47%)",
  sg: "Specific gravity (1.005–1.025)",
  al: "Albumin in urine (0–2 normal)",
  dm: "Diabetes mellitus (1=Yes, 0=No)",
  htn: "Hypertension (1=Yes, 0=No)",
  rc: "RBC count (4–5.5 million/cmm)",
  bu: "Blood urea (7–40 mg/dL)",
  bgr: "Blood glucose random (70–140 mg/dL)",
  sod: "Sodium (135–145 mEq/L)"
};

export default function CKDForm() {
  const [formData, setFormData] = useState(Object.fromEntries(Object.keys(ckdFeatureInfo).map(k => [k, ""])));
  const [result, setResult] = useState(null);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict/ckd", { features: formData });
      setResult(res.data);
    } catch {
      alert("Prediction failed. Please ensure FastAPI is running.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-600 mb-4">🧠 Chronic Kidney Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label className="block text-sm font-medium flex items-center gap-1">
              {key}
              <span title={ckdFeatureInfo[key]} className="text-blue-500 cursor-help">ℹ️</span>
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
        <button type="submit" className="col-span-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
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
