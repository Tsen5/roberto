import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

import { Chat } from '../../electron/types/chat';

export const CHAT_TITLE_STORAGE_KEY = 'chat-title';

const useChatTitle = (
  chat: Pick<Chat, 'id' | 'title'>,
): {
  title: string;
  setTitle: (title: string | null) => void;
  localStorageTitle: string | null;
} => {
  const { t } = useTranslation('global');

  const [localStorageTitle, setLocalStorageTitle] = useLocalStorage<
    string | null
  >(`${CHAT_TITLE_STORAGE_KEY}-${chat.id}`, null);

  const title = useMemo(
    () => localStorageTitle ?? chat.title ?? t('text.noTitle'),
    [localStorageTitle, chat.title, t],
  );

  return { title, setTitle: setLocalStorageTitle, localStorageTitle };
};

export default useChatTitle;
