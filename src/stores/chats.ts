import { create } from 'zustand';

export interface ChatsState {
  isDetailsPanel: boolean;
  setIsDetailsPanel: (isDetailsPanel: boolean) => void;
}

const useChatsStore = create<ChatsState>()((set) => ({
  isDetailsPanel: false,
  setIsDetailsPanel: (isDetailsPanel) => set({ isDetailsPanel }),
}));

export default useChatsStore;
