import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-inter flex flex-col justify-between">
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-inter flex flex-col justify-between">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-700">MindEase</h1>
        <nav>
          <button className="px-4 py-2 rounded-2xl bg-purple-600 text-white shadow-md hover:bg-purple-700 transition">Get Started</button>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">Your Companion for Better Mental Health</h2>
          <p className="text-lg text-gray-600 mb-8">Track your mood, manage stress, and discover personalized self-care routines. Simple, private, and designed for positive change.</p>
           <Link href="/start_page">
          <button className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition">Start Your Journey</button>
          </Link>
        </div>
        <div className="mt-10 md:mt-0">
          <img src="https://images.unsplash.com/photo-1525097487452-6278ff080c31?fit=crop&w=600&h=600" alt="Mental Health Support" className="rounded-2xl shadow-2xl w-full max-w-sm" />
        </div>
      </section>
      <section className="px-8 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
         <Link href="/mood-checkin">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Daily Mood Check-ins</h3>
          <p className="text-gray-600">Track how you feel each day to discover patterns and improve your mental well-being.</p>
        </div>
        </Link>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Personalized Self-Care</h3>
          <p className="text-gray-600">Get AI-driven suggestions for activities like breathing exercises, journaling, and more.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Anonymous Peer Support</h3>
          <p className="text-gray-600">Connect with others, share experiences, and support each other anonymously.</p>
        </div>
      </section>

      <section className="text-center py-12 px-8 md:px-20 bg-purple-600 rounded-t-2xl mt-12">
        <h2 className="text-3xl font-bold text-white mb-4">Take the First Step Towards Better Mental Health</h2>
        <button className="px-8 py-4 mt-4 bg-white text-purple-700 font-semibold rounded-2xl shadow hover:bg-gray-100 transition">Join Now</button>
      </section>

      <footer className="text-center text-gray-500 py-6 text-sm">&copy; 2025 MindEase. All rights reserved.</footer>
    </div>
     </main>
  )
}
