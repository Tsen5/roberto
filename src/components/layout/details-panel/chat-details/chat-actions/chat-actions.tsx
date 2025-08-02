import { Pin, Trash2 } from 'lucide-react';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';
import { useNavigate } from '@tanstack/react-router';

import { Chat } from '../../../../../../electron/types/chat';
import usePinnedChats from '../../../../../hooks/usePinnedChats';
import Button from '../../../../ui/button/button';
import Flex from '../../../../ui/flex/flex';

export interface ChatActionsProps {
  chat: Chat;
}

const ChatActions = ({ chat }: ChatActionsProps) => {
  const { t } = useTranslation('chats');
  const navigate = useNavigate();

  const { checkIsPinned, addPinnedChat, removePinnedChat } = usePinnedChats();

  const [isConfirmDeleteChatOpen, setIsConfirmDeleteChatOpen] =
    useState<boolean>(false);

  const isPinnedChat = useMemo(
    () => checkIsPinned(chat.id),
    [chat.id, checkIsPinned],
  );

  const handlePinChat = useCallback(() => {
    if (isPinnedChat) {
      removePinnedChat(chat.id);
    } else {
      addPinnedChat(chat.id);
    }
  }, [isPinnedChat, chat.id, addPinnedChat, removePinnedChat]);

  const handleOpenConfirmDeleteChat = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (!isConfirmDeleteChatOpen) {
        setIsConfirmDeleteChatOpen(true);
      } else {
        setIsConfirmDeleteChatOpen(false);
        navigate({ to: '/' });
        window.ipcRenderer.invoke('chat:delete', chat.id);
      }
    },
    [isConfirmDeleteChatOpen, chat.id, navigate],
  );

  const handleCancelConfirmDeleteChat = useCallback(() => {
    setIsConfirmDeleteChatOpen(false);
  }, []);

  useEventListener('click', handleCancelConfirmDeleteChat);

  return (
    <Flex direction="column">
      <Button
        variant="plain"
        color="info"
        css={{ fontSize: 16, fontWeight: 500 }}
        size="large"
        onClick={handlePinChat}
      >
        <Flex direction="row" align="center" gap={1}>
          <Pin
            fill={isPinnedChat ? 'currentColor' : 'none'}
            css={{
              transform: isPinnedChat ? 'rotate(0deg)' : 'rotate(30deg)',
              transition: 'transform 0.125s ease-in-out',
            }}
            size={18}
          />
          <span>
            {isPinnedChat ? t('button.unpinChat') : t('button.pinChat')}
          </span>
        </Flex>
      </Button>
      <Button
        variant={isConfirmDeleteChatOpen ? 'soft' : 'plain'}
        color="error"
        size="large"
        css={{ fontSize: 16, fontWeight: 500 }}
        onClick={handleOpenConfirmDeleteChat}
      >
        <Flex direction="row" align="center" gap={1}>
          <Trash2 size={18} />
          <span>
            {isConfirmDeleteChatOpen
              ? t('button.confirmDeleteChat')
              : t('button.deleteChat')}
          </span>
        </Flex>
      </Button>
    </Flex>
  );
};

export default ChatActions;
