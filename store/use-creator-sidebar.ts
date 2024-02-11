
import { create } from "zustand";

interface CreatorSidebarStore {
    collapsed: boolean;
    onExpanded: () => void;
    onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    collapsed: false,
    onExpanded: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}))