'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-custom.css'; // We'll override styles here

const sampleData: Record<string, { mood: string; note: string }[]> = {
  '2025-06-25': [
    { mood: '😊', note: 'Felt great and productive' },
    { mood: '😐', note: 'Afternoon was average' },
  ],
  '2025-06-28': [{ mood: '😔', note: 'Feeling low' }],
};

export default function MoodCheckIn() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (mood) {
      console.log('Mood Submitted:', { mood, note });
      // You can connect to backend/API here
    }
  };

  const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
  const moodsForDate = formattedDate && sampleData[formattedDate];

  return (
    <div className="flex bg-black text-white w-screen h-screen">
      {/* Mood Form */}
      <div className="flex-1 p-8">
        <h2 className="text-4xl font-extrabold text-purple-500 mb-6">Daily Mood Check-in</h2>
        <p className="text-gray-300 mb-6 text-lg">How are you feeling today?</p>
        <div className="flex justify-around mb-6 text-5xl">
          {['😊', '😐', '😔'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`hover:scale-125 transition ${
                mood === emoji ? 'ring-4 ring-purple-500 rounded-full' : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Add a note or tag your feelings (e.g., anxious, excited)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 bg-[#111] text-gray-200 placeholder-gray-500 rounded-md mb-6"
        />
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition text-lg font-semibold"
        >
          Submit Mood
        </button>
      </div>

      {/* Mood History */}
      <div className="flex-1 p-8 bg-[#111] overflow-y-auto">
        <h3 className="text-3xl font-bold mb-4 text-purple-500">Mood History</h3>
        <Calendar
          onClickDay={(value) => setSelectedDate(value)}
          className="mb-6 react-calendar-dark"
        />
        {selectedDate && (
          <div>
            <h4 className="text-xl font-bold mb-2 text-purple-400">Moods on {formattedDate}</h4>
            {moodsForDate ? (
              <ul className="space-y-2">
                {moodsForDate.map((entry, index) => (
                  <li key={index} className="p-3 bg-[#222] rounded shadow text-gray-200">
                    {entry.mood} - {entry.note}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No moods recorded on this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
