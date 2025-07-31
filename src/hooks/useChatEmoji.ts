import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

import { Chat } from '../../electron/types/chat';

export const CHAT_EMOJI_STORAGE_KEY = 'chat-emoji';

const useChatEmoji = (
  chat: Pick<Chat, 'id' | 'emoji'>,
): {
  emoji: string | null;
  setEmoji: (emoji: string | null) => void;
  localStorageEmoji: string | null;
} => {
  const { t } = useTranslation('global');

  const [localStorageEmoji, setLocalStorageEmoji] = useLocalStorage<
    string | null
  >(`${CHAT_EMOJI_STORAGE_KEY}-${chat.id}`, null);

  const emoji = useMemo(
    () => localStorageEmoji ?? chat.emoji ?? null,
    [localStorageEmoji, chat.emoji, t],
  );

  return { emoji, setEmoji: setLocalStorageEmoji, localStorageEmoji };
};

export default useChatEmoji;
