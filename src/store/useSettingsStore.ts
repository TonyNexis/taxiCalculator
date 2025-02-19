import { create } from 'zustand'

type Settings = {
    fuelPrice: number
    depreciation: number
}

type Store = {
    settings: Settings
    updateSettings: (newSettings: Partial<Settings>) => void
}

const useStore = create<Store>((set) => ({
    settings: {
        fuelPrice: 0,
        depreciation: 0,
    },
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),
}))

export default useStore
