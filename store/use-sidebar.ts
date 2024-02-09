
import { create } from "zustand";

interface SidebarStore {
    collapsed: boolean;
    onExpanded: () => void;
    onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpanded: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}))