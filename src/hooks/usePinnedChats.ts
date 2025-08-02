import { useCallback, useMemo } from 'react';

import { Chat } from '../../electron/types/chat';

import useChats from './useChats';
import { usePinnedChatIds } from './usePinnedChatIds';

const usePinnedChats = () => {
  const chats = useChats();

  const [pinnedChatIds, setPinnedChatIds] = usePinnedChatIds();

  const chatsById = useMemo(
    () =>
      chats.reduce<Record<string, Chat>>((result, chat) => {
        result[chat.id] = chat;
        return result;
      }, {}),
    [chats],
  );

  const addPinnedChat = useCallback(
    (newPinnedChatId: string) => {
      setPinnedChatIds((state) => {
        if (state.includes(newPinnedChatId)) {
          return state;
        }
        return [...state, newPinnedChatId];
      });
    },
    [setPinnedChatIds],
  );

  const removePinnedChat = useCallback(
    (pinnedChatId: string) => {
      setPinnedChatIds((state) => state.filter((id) => id !== pinnedChatId));
    },
    [setPinnedChatIds],
  );

  const checkIsPinned = useCallback(
    (chatId: string) => pinnedChatIds.includes(chatId),
    [pinnedChatIds],
  );

  const pinnedChats = useMemo(
    () =>
      pinnedChatIds.reduce<Chat[]>((result, pinnedChatId) => {
        const chat = chatsById[pinnedChatId];
        if (chat) {
          result.push(chat);
        }
        return result;
      }, []),
    [pinnedChatIds, chatsById],
  );

  return {
    pinnedChats,
    addPinnedChat,
    removePinnedChat,
    checkIsPinned,
  };
};

export default usePinnedChats;
