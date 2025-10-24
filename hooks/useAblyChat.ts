import { useState, useEffect, useCallback } from 'react';
import * as Ably from 'ably';
import { ChatClient, ChatMessageEvent, Room } from '@ably/chat';

export function useAblyChat(roomId: string, username: string) {
  const [messages, setMessages] = useState<ChatMessageEvent[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ablyClient = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_KEY!,
      clientId: username,
    });

    const chatClient = new ChatClient(ablyClient);

    const initChat = async () => {
      const chatRoom = await chatClient.rooms.get(roomId);
      
      chatRoom.messages.subscribe((message: ChatMessageEvent) => {
        setMessages((prev) => [...prev, message]);
      });

      await chatRoom.attach();
      setRoom(chatRoom);
      setIsConnected(true);
    };

    initChat();

    return () => {
      if (room) {
        chatClient.rooms.release(room.name);
      }
      ablyClient.close();
    };
  }, [roomId, username]);

  const sendMessage = useCallback(async (text: string) => {
    if (room && text.trim()) {
      await room.messages.send({ text });
    }
  }, [room]);

  return { messages, sendMessage, isConnected };
}