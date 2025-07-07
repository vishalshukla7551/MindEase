"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from 'next/image';
import remarkBreaks from "remark-breaks";
const fitnessGoals = [
  "Weight Loss",
  "Weight Gain",
  "Muscle Building",
  "Maintenance",
  "Athletic Performance",
  "General Health",
  "Strength Training",
  "Endurance Training",
];
 const activity_level=[
    "Sedentary (little/no exercise)",
    "Lightly active (light exercise 1-3 days/week)",
    "Moderately active (moderate exercise 3-5 days/week)",
    "Very active (hard exercise 6-7 days/week)",
    "Extremely active (very hard exercise, physical job)"
  ];

export default function DietPlanForm() {
    const [loading, setLoading] = useState(false);
 const [form, setForm] = useState({
  age: 13,
  gender: "",
  height: 100,
  weight: 30,
  activity_level: activity_level[0],
  fitness_goal: fitnessGoals[0],
  dietary_restrictions: [] as string[],
});

  const [newRestriction, setNewRestriction] = useState("");
  const [responsePlan, setResponsePlan] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRestriction = () => {
    if (newRestriction.trim()) {
      setForm((prev) => ({
        ...prev,
        dietary_restrictions: [...prev.dietary_restrictions, newRestriction.trim()],
      }));
      setNewRestriction("");
    }
  };

  const handleSubmit = async () => {
     setLoading(true);
     console.log(form);
    const res = await fetch("https://chatbot-fitness.onrender.com/workout-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_profile: form,
      }),
    });

    const data = await res.json();
    console.log(data);
    setResponsePlan(data.plan);
    setLoading(false);
  };

  return (
   <div className="max-w-4xl mx-auto px-4 py-10 text-white min-h-screen">
 <div className="flex justify-center items-center gap-3 mb-8">
  <Image
    src="/weightlifting.png"
    alt="Diet icon"
    width={40}
    height={40}
    className="inline-block"
  />
  <h1 className="text-4xl font-bold text-center">
    Create Your Personalized Workout Plan
  </h1>
</div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Age */}
    <div className="flex flex-col">
      <label htmlFor="age" className="mb-1 text-sm text-gray-400">Age</label>
      <input
        id="age"
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      />
    </div>

    {/* Activity Level */}
    <div className="flex flex-col">
      <label htmlFor="activity_level" className="mb-1 text-sm text-gray-400">Activity Level</label>
      <select
        id="activity_level"
        name="activity_level"
        value={form.activity_level}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      >
        {activity_level.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>

    {/* Height */}
    <div className="flex flex-col">
      <label htmlFor="height" className="mb-1 text-sm text-gray-400">Height (cm)</label>
      <input
        id="height"
        name="height"
        type="number"
        placeholder="Height (cm)"
        value={form.height}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      />
    </div>

    {/* Fitness Goal */}
    <div className="flex flex-col">
      <label htmlFor="fitness_goal" className="mb-1 text-sm text-gray-400">Fitness Goal</label>
      <select
        id="fitness_goal"
        name="fitness_goal"
        value={form.fitness_goal}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      >
        {fitnessGoals.map((goal) => (
          <option key={goal} value={goal}>{goal}</option>
        ))}
      </select>
    </div>

    {/* Weight */}
    <div className="flex flex-col">
      <label htmlFor="weight" className="mb-1 text-sm text-gray-400">Weight (kg)</label>
      <input
        id="weight"
        name="weight"
        type="number"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      />
    </div>

    {/* Gender */}
    <div className="flex flex-col">
      <label htmlFor="gender" className="mb-1 text-sm text-gray-400">Gender</label>
       <select
        id="gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="p-3 rounded bg-[#222] border border-gray-700"
      >
       
          <option key="Male" value="Male">Male</option>
          <option key="Female" value="Female">Female</option>
      </select>
    </div>

    {/* Dietary Restrictions */}
    <div className="md:col-span-2">
      <label className="block mb-1 text-sm text-gray-400">Dietary Restrictions</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Enter restriction (e.g., Gluten-Free)"
          value={newRestriction}
          onChange={(e) => setNewRestriction(e.target.value)}
          className="flex-1 p-3 rounded bg-[#222] border border-gray-700"
        />
        <button
          onClick={addRestriction}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {form.dietary_restrictions.map((r, i) => (
          <span key={i} className="bg-purple-700 px-3 py-1 rounded-full text-sm">
            {r}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Submit button */}
  <div className="mt-8 flex justify-center">
    <button
      onClick={handleSubmit}
      disabled={loading}
      className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 text-lg rounded transition ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {loading ? "Generating..." : "Generate Diet Plan"}
    </button>
  </div>

  {/* Response section */}
  {responsePlan && (
    <div className="mt-10 bg-gray-900 p-6 rounded-xl whitespace-pre-wrap border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">📄 Your Diet Plan</h2>
      <div className="text-white leading-snug space-y-2 text-sm max-w-3xl mx-auto">
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{responsePlan}</ReactMarkdown>
      </div>
    </div>
  )}
</div>
  );
}
