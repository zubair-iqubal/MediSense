import React, { useState } from "react";
import HeartForm from "./components/HeartForm";
import DiabetesForm from "./components/DiabetesForm";
import CKDForm from "./components/CKDForm";

export default function App() {
  const [tab, setTab] = useState("heart");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        🩺 Medisense — AI Disease Prediction Dashboard
      </h1>

      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setTab("heart")} className={`px-4 py-2 rounded ${tab === "heart" ? "bg-red-600 text-white" : "bg-gray-300"}`}>❤️ Heart</button>
        <button onClick={() => setTab("diabetes")} className={`px-4 py-2 rounded ${tab === "diabetes" ? "bg-green-600 text-white" : "bg-gray-300"}`}>🩸 Diabetes</button>
        <button onClick={() => setTab("ckd")} className={`px-4 py-2 rounded ${tab === "ckd" ? "bg-purple-600 text-white" : "bg-gray-300"}`}>🧠 CKD</button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        {tab === "heart" && <HeartForm />}
        {tab === "diabetes" && <DiabetesForm />}
        {tab === "ckd" && <CKDForm />}
      </div>
    </div>
  );
}
