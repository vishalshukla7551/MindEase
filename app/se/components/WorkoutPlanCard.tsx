"use client";

import { useState } from "react";

export default function WorkoutPlanCard() {
  const [form, setForm] = useState({ goal: "", level: "", equipment: "" });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    const res = await fetch("/workout-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-4">🏋️ Create Workout Plan</h2>
      {["goal", "level", "equipment"].map((field) => (
        <input
          key={field}
          className="block w-full border rounded p-2 mb-2"
          placeholder={field}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Generate Plan</button>
      {result && <pre className="mt-3 bg-gray-100 p-2 rounded text-sm">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
