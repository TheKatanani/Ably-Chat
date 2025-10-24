'use client';

import { useState } from 'react';
import { useAblyChat } from '@/hooks/useAblyChat';

export default function ChatRoom({ roomId, username }: { roomId: string; username: string }) {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isConnected } = useAblyChat(roomId, username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Room: {roomId}</h1>
        <p className="text-sm text-gray-600">
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-3 rounded-lg ${
              msg.message.clientId === username
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-white'
            } max-w-xs`}
          >
            <p className="text-xs font-semibold mb-1">{msg.message.clientId}</p>
            <p>{msg.message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
          disabled={!isConnected}
        />
        <button
          type="submit"
          disabled={!isConnected || !input.trim()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}