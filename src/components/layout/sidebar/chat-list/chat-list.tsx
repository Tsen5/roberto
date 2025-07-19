import { useCallback, useMemo } from 'react';

import { useMatch, useNavigate } from '@tanstack/react-router';
import { useEventListener } from 'usehooks-ts';

import useChats from '../../../../hooks/useChats';
import Flex from '../../../ui/flex/flex';
import ChatLink from './chat-link/chat-link';

const ChatList = () => {
  const navigate = useNavigate();

  const match = useMatch({ from: '/chats/$chatId', shouldThrow: false });

  const chats = useChats();

  const currentChatId = useMemo(() => match?.params.chatId ?? null, [match]);

  const sortedChats = useMemo(
    () =>
      [...chats].sort(
        (chatA, chatB) => chatB.updatedAt.getTime() - chatA.updatedAt.getTime(),
      ),
    [chats],
  );

  const sortedChatIds = useMemo(
    () => sortedChats.map((chat) => chat.id),
    [sortedChats],
  );

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.altKey && event.key === 'ArrowDown') {
        const currentIndex = currentChatId
          ? sortedChatIds.indexOf(currentChatId)
          : -1;
        const nextIndex = currentIndex + 1;
        const targetIndex = nextIndex >= sortedChatIds.length ? 0 : nextIndex;
        navigate({ to: `/chats/${sortedChatIds[targetIndex]}` });
      }
      if (event.metaKey && event.altKey && event.key === 'ArrowUp') {
        const currentIndex = currentChatId
          ? sortedChatIds.indexOf(currentChatId)
          : -1;
        const prevIndex = currentIndex - 1;
        const targetIndex =
          prevIndex < 0 ? sortedChatIds.length - 1 : prevIndex;
        navigate({ to: `/chats/${sortedChatIds[targetIndex]}` });
      }
      if (currentChatId && event.key === 'w' && event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        const currentIndex = sortedChatIds.indexOf(currentChatId);
        const nextIndex =
          currentIndex !== sortedChatIds.length - 1
            ? currentIndex + 1
            : currentIndex - 1;
        const nextChatId = sortedChatIds[nextIndex] ?? null;
        if (nextChatId) {
          navigate({ to: `/chats/${nextChatId}` });
        } else {
          navigate({ to: '/' });
        }
        window.ipcRenderer.invoke('chat:delete', currentChatId);
      }
    },
    [sortedChatIds, currentChatId, navigate],
  );

  useEventListener('keydown', handleGlobalKeyDown);

  return (
    <>
      {sortedChats.length > 0 && (
        <Flex direction="column" gap={0.5}>
          {sortedChats.map((chat) => (
            <ChatLink key={chat.id} chat={chat} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default ChatList;
