'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define message type
type Message = {
  id: string;
  message: string;
  timestamp: string;
};

// Create a typed Socket instance
const socket: Socket = io('http://localhost:4000'); // 🔁 Replace with your backend URL

export default function AnonymousChat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message });
      setMessage('');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Anonymous Peer Support</h2>

     <div className="h-[24rem] overflow-y-auto border p-2 mb-4 bg-white rounded shadow">
  {messages.map((msg, idx) => (
    <div key={idx} className="mb-2">
      <div className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
      <div className="bg-purple-100 p-2 rounded text-black">{msg.message}</div>
    </div>
  ))}
</div>


      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-purple-600 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}
