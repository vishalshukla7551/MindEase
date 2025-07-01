'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // install this with: npm install uuid

// Define message type
type Message = {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
};

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_PORT || 'http://localhost:4000');

export default function AnonymousChat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Generate anonymous user ID once
  const [userId] = useState<string>(() => uuidv4().slice(0, 8)); // Shorter ID
  console.log(userId);
  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    console.log(messages);
    if (message.trim()) {
      const msgData: Message = {
        id: uuidv4(),
        userId,
        message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', msgData);
      setMessage('');
    }
  };

  return (
    <div className="p-4 min-h-screen max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Anonymous Peer Support</h2>
     <div className="text-white text-center font-bold mb-4">User id:{userId}</div>
      <div className="h-[30rem] overflow-y-auto border p-2 mb-4 bg-white rounded shadow">
  {messages.map((msg, idx) => {
    const isOwnMessage = msg.userId === userId;

    return (
      <div key={idx} className={`mb-3 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs p-2 rounded text-sm ${isOwnMessage ? 'bg-purple-600 text-white' : 'bg-purple-100 text-black'}`}>
          <div className="text-xs opacity-70 mb-1">
            {isOwnMessage ? 'You' : `User #${msg.userId}`}
            {' • '}
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
          <div>{msg.message}</div>
        </div>
      </div>
    );
  })}
  <div ref={bottomRef} />
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
