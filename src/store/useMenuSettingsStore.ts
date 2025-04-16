import { create } from 'zustand'

type MenuSettingsStore = {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export const useMenuSettingsStore = create<MenuSettingsStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
    toggle: () => set((state) => ({isOpen: !state.isOpen}))
}))