import { useCallback, useEffect, useState } from 'react';

import { Chat } from '../../electron/types/chat';

const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = useCallback(async () => {
    const ipcChats = await window.ipcRenderer.invoke('chats:read');
    setChats(ipcChats);
  }, []);

  useEffect(() => {
    void getChats();

    const listener = (_: any, ipcChats: Chat[]) => {
      setChats(ipcChats);
    };

    window.ipcRenderer.on('chats:update', listener);
    return () => {
      window.ipcRenderer.off('chats:update', listener);
    };
  }, []);

  return chats;
};

export default useChats;
