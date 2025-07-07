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
  <>
  {/* Fullscreen Section with Background */}
  <div
    className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 pb-20"
    style={{
      backgroundImage: "url('/Intro.jpeg')", // Ensure the image exists in /public
    }}
  >
  
    <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white text-center mb-8">
      {`Let's Know About You`}
    </h1>

    {/* Glass Form Container */}
    <div className="relative z-10 w-full max-w-lg p-10 rounded-2xl shadow-xl bg-black/70 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-2xl font-bold text-white text-center">👋 Welcome</h2>
        <p className="text-sm text-gray-300 text-center mb-4">
          {`Let’s personalize your mental wellness experience.`}
        </p>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="w-full bg-[#111] text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          onChange={handleChange}
          className="w-full bg-[#111] text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <input
          type="text"
          name="gender"
          placeholder="Gender"
          required
          onChange={handleChange}
          className="w-full bg-[#111] text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          required
          onChange={handleChange}
          className="w-full bg-[#111] text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Height */}
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          required
          onChange={handleChange}
          className="w-full bg-[#111] text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</>



  );
}
