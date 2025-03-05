import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Settings = {
	fuelPrice: number
	depreciation: number
}

type Store = {
	settings: Settings
	updateSettings: (newSettings: Partial<Settings>) => void
}

const useSettingsStore = create<Store>()(
	devtools(
		set => ({
			settings: {
				fuelPrice: 0,
				depreciation: 0,
			},
			updateSettings: newSettings =>
				set(state => ({
					settings: { ...state.settings, ...newSettings },
				})),
		}),
		{ name: 'SettingsStore' }
	)
)

export default useSettingsStore
