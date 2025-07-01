"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { time: '9 AM', value: 72 },
  { time: '10 AM', value: 75 },
  { time: '11 AM', value: 70 },
  { time: '12 PM', value: 78 },
  { time: '1 PM', value: 74 },
];

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-purple-800 mb-6">Your Dashboard</h1>
      <p className="text-gray-700 mb-4">Today you reported feeling: <span className="font-semibold">{mood || 'No mood selected'}</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-4">Heart Rate</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleData}>
              <Line type="monotone" dataKey="value" stroke="#7e22ce" strokeWidth={3} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-4">Breath Rate</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleData}>
              <Line type="monotone" dataKey="value" stroke="#7e22ce" strokeWidth={3} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 bg-purple-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">Personalized Suggestion</h2>
        <p className="text-gray-700">Based on your current mood and parameters, we recommend a short breathing exercise today.</p>
      </div>
    </main>
  );
}