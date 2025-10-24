'use client';

import { useState } from 'react';
import ChatRoom from '@/components/ChatRoom';

export default function Home() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full mb-4"
          />
          <button
            onClick={() => username.trim() && setJoined(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return <ChatRoom roomId="getting-started" username={username} />;
}