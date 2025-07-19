import { useLocalStorage } from 'usehooks-ts';

export const IS_SIDEBAR_OPEN_KEY = 'isSidebarOpen';

export const useIsSideBarOpen = () =>
  useLocalStorage<boolean>(IS_SIDEBAR_OPEN_KEY, true);
