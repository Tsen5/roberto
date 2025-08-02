import { useLocalStorage } from 'usehooks-ts';

export const PINNED_CHAT_IDS_KEY = 'pinnedChatIds';

export const usePinnedChatIds = () =>
  useLocalStorage<string[]>(PINNED_CHAT_IDS_KEY, []);
