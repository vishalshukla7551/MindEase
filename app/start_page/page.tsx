'use client';

import React, { useEffect, useState } from 'react';
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { useRouter } from 'next/navigation';
type UserData = {
  name: string;
  age: number;
  weight: number;
  height: number;
};

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
  });
  const [words,setWords] = useState([
    { text: "Unknown" },
  ]);
  const [storedData, setStoredData] = useState<UserData | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      const data = JSON.parse(saved) as UserData;
       let name = data.name;
       name="Hi "+name+"!";
setWords(name.split(" ").map((word, index, arr) => ({
  text: word,
  className: index === arr.length - 1 ? "text-blue-500 dark:text-blue-500" : undefined
})));
      setStoredData(data);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    setStoredData(formData);
    let name = formData.name;
    name="Hi "+name+"!";
setWords(name.split(" ").map((word, index, arr) => ({
  text: word,
  className: index === arr.length - 1 ? "text-blue-500 dark:text-blue-500" : undefined
})));
  };

  if (storedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl font-mono">
         <TypewriterEffect
              words={words}
              className="mb-6"
              onFinished={ () => {setTimeout(() => {router.push('/se');}, 2000);}}
            />
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center p-6">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src="/fitness.png" // Replace with your image path
          alt="Mental health illustration"
          className="max-w-full h-auto rounded-2xl shadow-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 bg-neutral-900 p-8 rounded-xl shadow-lg max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Welcome! 👋</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Let’s personalize your mental wellness experience.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full border border-gray-700 bg-black text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            className="w-full border border-gray-700 bg-black text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            required
            className="w-full border border-gray-700 bg-black text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            required
            className="w-full border border-gray-700 bg-black text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}
