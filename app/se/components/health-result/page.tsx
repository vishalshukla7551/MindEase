'use client';

import React, { useState } from 'react';
import Image from 'next/image';
export default function FitnessMeasurePage() {
  const [formData, setFormData] = useState({
    heart_rate: 80,
    blood_oxygen: 100,
    steps: 0,
    sleep_duration: 4.5,
    activity_level: 0,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'steps' || name === 'activity_level'
        ? parseInt(value)
        : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res =await fetch('/api/fitness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      setMessage(data?.['prediction details']?.message || 'No message found.');
    } catch (error) {
      setMessage('Error fetching prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
  {/* Heading */}
  <div className="flex items-center gap-4 mb-10">
  <Image
    src="/diet.png"
    alt="Diet icon"
    width={40}
    height={40}
    className="mb-0"
  />
  <h1 className="text-3xl md:text-4xl font-bold text-center">
    Submit Data from Wearable Device
  </h1>
</div>

  {/* Card with form */}
  <div className="w-full max-w-xl bg-neutral-900 rounded-xl p-8 shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {[
        { name: 'heart_rate', label: 'Heart Rate (bpm)' },
        { name: 'blood_oxygen', label: 'Blood Oxygen (%)' },
        { name: 'steps', label: 'Steps Count' },
        { name: 'sleep_duration', label: 'Sleep Duration (hrs)' },
        { name: 'activity_level', label: 'Activity Level (0–10)' },
      ].map((field) => (
        <div key={field.name}>
          <label className="block mb-1 text-sm text-gray-300">{field.label}</label>
          <input
            type="number"
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            step="any"
            className="w-full bg-black border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Submit Data'}
      </button>
    </form>

    {/* Message */}
    {message && (
      <div className="mt-6 text-center text-xl font-medium text-yellow-400">
        {message}
      </div>
    )}
  </div>
</div>

  );
}
