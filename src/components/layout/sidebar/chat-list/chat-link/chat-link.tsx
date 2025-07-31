import { useTheme } from '@emotion/react';
import { Link, useMatch } from '@tanstack/react-router';
import { ChevronRight, MessageCircleMore } from 'lucide-react';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Chat, ChatStatus } from '../../../../../../electron/types/chat';
import useChatTitle from '../../../../../hooks/useChatTitle';

import useChatEmoji from '../../../../../hooks/useChatEmoji';
import { getLinkStyle } from './getLinkStyle';
import Title from './title';
import TitleInput from './title-input';

export const CHAT_LINK_ICON_CLASS = 'chat-link-icon';

export interface ChatLinkProps {
  chat: Chat;
}

const ChatLink = ({ chat }: ChatLinkProps) => {
  const theme = useTheme();
  const { t } = useTranslation('global');

  const match = useMatch({ from: '/chats/$chatId', shouldThrow: false });

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [titleInputValue, setTitleInputValue] = useState<string>('');

  const { title, setTitle } = useChatTitle(chat);
  const { emoji } = useChatEmoji(chat);

  const inputPlaceholder = useMemo(() => {
    if (chat.title) {
      return `${chat.title} (${t('text.auto')})`;
    }
    return t('text.noTitle');
  }, [chat.title, t]);

  const isCurrent = useMemo(
    () => match?.params.chatId === chat.id,
    [match, chat],
  );

  const handleEditTitle = useCallback(() => {
    if (isCurrent) {
      setTitleInputValue(title);
      setIsEditingTitle(true);
    }
  }, [isCurrent, title]);

  const handleChangeTitleInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitleInputValue(event.target.value);
    },
    [],
  );

  const handleKeyDownInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsEditingTitle(false);
        if (titleInputValue.length === 0) {
          setTitle(null);
        }
        const trimmedTitle = titleInputValue.trim();
        if (trimmedTitle.length > 0) {
          setTitle(trimmedTitle);
        }
      } else if (event.key === 'Escape') {
        setIsEditingTitle(false);
      }
    },
    [titleInputValue],
  );

  const handleBlurInput = useCallback(() => {
    setIsEditingTitle(false);
  }, []);

  return (
    <Link
      to="/chats/$chatId"
      params={{ chatId: chat.id }}
      css={getLinkStyle(isCurrent, theme)}
    >
      {emoji && <div>{emoji}</div>}
      {!isEditingTitle && (
        <Title
          onClick={handleEditTitle}
          css={{ cursor: isCurrent ? 'text' : 'pointer' }}
        >
          {title}
        </Title>
      )}
      {isEditingTitle && (
        <TitleInput
          autoFocus
          type="text"
          value={titleInputValue}
          onChange={handleChangeTitleInputValue}
          onKeyDown={handleKeyDownInput}
          onBlur={handleBlurInput}
          placeholder={inputPlaceholder}
        />
      )}

      {chat.status === ChatStatus.RESPONDING && !isEditingTitle && (
        <MessageCircleMore
          size={16}
          css={{ color: theme.colors.tokens.info }}
        />
      )}

      <ChevronRight
        className={CHAT_LINK_ICON_CLASS}
        color={theme.colors.tokens.text}
        size={18}
        css={{ flexShrink: 0, marginLeft: 'auto' }}
      />
    </Link>
  );
};

export default ChatLink;
