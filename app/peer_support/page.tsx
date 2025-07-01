'use client';

import React, { useState } from 'react';

export default function PeerSupport() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Anyone else feeling anxious lately?', reactions: [] },
    { text: 'Remember to take deep breaths today 💜', reactions: [] },
  ]);

  const handleSubmit = () => {
    if (message.trim()) {
      setMessages([{ text: message, reactions: [] }, ...messages]);
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Anonymous Peer Support</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded mb-4 text-gray-700"
        placeholder="Share how you feel..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold"
      >
        Share Anonymously
      </button>
      <div className="mt-8 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-4 bg-purple-50 rounded-xl text-gray-800">
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
