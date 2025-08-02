import { useTheme } from '@emotion/react';
import { Link, useMatch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { transparentize } from 'color2k';

import { Chat } from '../../../../../electron/types/chat';
import useChatEmoji from '../../../../hooks/useChatEmoji';
import { getLinkStyle } from '../chat-list/chat-link/getLinkStyle';

export interface ChatLinkProps {
  chat: Chat;
  controlKey: number;
  isMetaPressed: boolean;
}

const ChatLink = ({ chat, controlKey, isMetaPressed }: ChatLinkProps) => {
  const theme = useTheme();

  const match = useMatch({ from: '/chats/$chatId', shouldThrow: false });

  const { emoji } = useChatEmoji(chat);

  const isCurrent = useMemo(
    () => match?.params.chatId === chat.id,
    [match, chat],
  );

  return (
    <Link
      to="/chats/$chatId"
      params={{ chatId: chat.id }}
      css={{
        ...getLinkStyle(isCurrent, theme, 'pinned'),
        justifyContent: 'center',
        height: 30,
        position: 'relative',
      }}
    >
      {emoji && <div>{emoji}</div>}
      {isMetaPressed && (
        <div
          css={{
            position: 'absolute',
            bottom: 0,
            right: theme.sizes.spacing.getSpacing(0.75),
            fontSize: 10,
            color: transparentize(theme.colors.tokens.icon, 0.5),
            fontWeight: 600,
          }}
        >
          {controlKey}
        </div>
      )}
    </Link>
  );
};

export default ChatLink;
