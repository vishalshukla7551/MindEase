"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Start() {
  const [mood, setMood] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Ensures hydration consistency by setting initial mood only on client
    setMood('');
  }, []);

  const handleContinue = () => {
    router.push(`/dashboard?mood=${encodeURIComponent(mood)}`);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to MindEase</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">Let's begin your journey towards better mental health. Take a moment to check in with yourself and tell us how you're feeling today.</p>
      <div className="flex space-x-4 mb-8">
        {['happy', 'neutral', 'sad'].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setMood(item)}
            className={`text-3xl transition transform hover:scale-125 active:scale-90 ${mood === item ? 'ring-4 ring-purple-500 rounded-full' : ''}`}
          >
            {item === 'happy' ? '😊' : item === 'neutral' ? '😐' : '😔'}
          </button>
        ))}
      </div>
      <button onClick={handleContinue} disabled={!mood} className="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition disabled:opacity-50">Continue to Dashboard</button>
    </main>
  );
}