import { Pin } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import IconButton from '../../../../ui/icon-button/icon-button';
import { Chat } from '../../../../../../electron/types/chat';
import usePinnedChats from '../../../../../hooks/usePinnedChats';

import { CHAT_LINK_PIN_BUTTON_CLASS } from './chat-link';

export interface PinButtonProps {
  chat: Chat;
}

const PinButton = ({ chat }: PinButtonProps) => {
  const { checkIsPinned, addPinnedChat, removePinnedChat } = usePinnedChats();

  const isPinned = useMemo(
    () => checkIsPinned(chat.id),
    [chat.id, checkIsPinned],
  );

  const handleClick = useCallback(() => {
    if (isPinned) {
      removePinnedChat(chat.id);
    } else {
      addPinnedChat(chat.id);
    }
  }, [isPinned, chat.id, addPinnedChat, removePinnedChat]);

  return (
    <IconButton
      size="small"
      className={CHAT_LINK_PIN_BUTTON_CLASS}
      variant="plain"
      onClick={handleClick}
      css={{
        flexShrink: 0,
        marginLeft: 'auto',
      }}
    >
      <Pin
        size={16}
        fill={isPinned ? 'currentColor' : 'none'}
        css={{
          transform: isPinned ? 'rotate(0deg)' : 'rotate(30deg)',
          transition: 'transform 0.125s ease-in-out',
        }}
      />
    </IconButton>
  );
};

export default PinButton;
