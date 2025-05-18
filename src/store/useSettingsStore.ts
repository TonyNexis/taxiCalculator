import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
// import { auth } from '../firebase/firebase'
import { getUserSettings } from '../firebase/userSettingsService'

export type Settings = {
	fuelPrice: string
	depreciation: string
}

type Store = {
	settings: Settings | null
	isLoaded: boolean
	fetchSettings: (uid: string) => Promise<void>
	updateSettings: (newSettings: Partial<Settings>) => void
}

const useSettingsStore = create<Store>()(
	devtools(
		set => ({
			settings: null,
			isLoaded: false,
			fetchSettings: async (uid: string) => {

				const data = await getUserSettings(uid)
				if (data) {
					console.log(data)
					set({ settings: data, isLoaded: true })
				} else {
					set({ settings: { fuelPrice: 0, depreciation: 0 }, isLoaded: true })
				}
			},
			updateSettings: (newSettings) =>
				set((state) => {
					if (!state.settings) return state

					return {
						settings: {
							...state.settings,
							...newSettings,
						},
					}
				}),
		}),
		{ name: 'SettingsStore' }
	)
)

export default useSettingsStore
