import { create } from 'zustand';

export interface LayoutState {
  // isSidebarOpen: boolean;
  // setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const useLayoutStore = create<LayoutState>()((set) => ({
  // isSidebarOpen: false,
  // setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));

export default useLayoutStore;
