'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Message type
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
  const [nickname, setNickname] = useState<string>('');
  const [showNicknamePrompt, setShowNicknamePrompt] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const [userId, setUserId] = useState<string>('');

useEffect(() => {
  const storedId = localStorage.getItem('anon-id');
  if (storedId) {
    setUserId(storedId);
  } else {
    const newId = uuidv4().slice(0, 8);
    localStorage.setItem('anon-id', newId);
    setUserId(newId);
  }
}, []);


  useEffect(() => {
    const savedNickname = localStorage.getItem('anon-nickname');
    if (savedNickname) {
      setNickname(savedNickname);
    } else {
      setShowNicknamePrompt(true);
    }
  }, []);

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
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData: Message = {
        id: uuidv4(),
        userId: nickname || userId,
        message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', msgData);
      setMessage('');
    }
  };

  return (
   <div className="min-h-screen max-w-xl mx-auto flex flex-col items-center justify-start space-y-2 p-2">
  <h2 className="text-xl font-bold text-center">Anonymous Peer Support</h2>

  <div className="text-xl font-semibold text-purple-800 text-center">
  Name: {nickname || 'Anonymous'}
  </div>
 {/* Nickname Prompt Modal goes here */}
    {showNicknamePrompt && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow w-72 space-y-3 text-center">
          <h3 className="text-lg font-semibold text-purple-700">Enter a nickname</h3>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. CalmPanda"
            className="w-full border p-2 rounded text-black"
          />
          <button
            onClick={() => {
              if (nickname.trim()) {
                localStorage.setItem('anon-nickname', nickname.trim());
                setShowNicknamePrompt(false);
              }
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full text-sm"
          >
            Join Chat
          </button>
        </div>
      </div>
    )}
  <div
    ref={chatBoxRef}
    className="h-[30rem] w-full overflow-y-auto border bg-white p-2 rounded shadow"
  >
    {messages.map((msg, idx) => {
      const isOwnMessage = msg.userId === (nickname || userId);
      return (
        <div key={idx} className={`mb-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-xs p-2 rounded text-sm ${
              isOwnMessage ? 'bg-purple-600 text-white' : 'bg-purple-100 text-black'
            }`}
          >
            <div className="text-[10px] opacity-70 mb-1">
              {isOwnMessage ? 'You' : `${msg.userId}`} •{' '}
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div>{msg.message}</div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="flex w-full">
    <input
      className="flex-1 border p-2 rounded-l text-sm"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      disabled={showNicknamePrompt}
    />
    <button
      onClick={sendMessage}
      className="bg-purple-600 text-white px-4 rounded-r text-sm"
      disabled={showNicknamePrompt}
    >
      Send
    </button>
  </div>
</div>
  );
}
