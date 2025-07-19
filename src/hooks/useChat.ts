import { useCallback, useEffect, useState } from 'react';

import { Chat } from '../../electron/types/chat';

const useChat = (chatId: string) => {
  const [chat, setChat] = useState<Chat | null>(null);

  const getChat = useCallback(async () => {
    const ipcChat = await window.ipcRenderer.invoke('chat:read', chatId);
    setChat(ipcChat);
  }, [chatId]);

  useEffect(() => {
    void getChat();

    const listener = (_: any, ipcChatId: string, ipcChat: Chat) => {
      if (chatId === ipcChatId) {
        setChat(ipcChat);
      }
    };

    window.ipcRenderer.on('chat:update', listener);
    return () => {
      window.ipcRenderer.off('chat:update', listener);
    };
  }, [chatId]);

  return chat;
};

export default useChat;
