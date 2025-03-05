import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import useSettingsStore from './useSettingsStore'

type Earnings = {
	mileage: number
	fuelConsumption: number
	timeSpent: number
	earnings: number
}

type CalculatedData = {
	fuelCost: number
	depreciationCost: number
	netEarnings: number
	hourlyEarnings: number
}

type Store = {
	earnings: Earnings
    calculatedData: CalculatedData;
    isCalculated: boolean;
	addEarnings: (newEarnings: Partial<Earnings>) => void
    recalculate: () => void
}

const useEarningsStore = create<Store>()(
	devtools(
		(set, get) => ({
			earnings: {
				mileage: 0,
				fuelConsumption: 0,
				timeSpent: 0,
				earnings: 0,
			},
			calculatedData: {
				fuelCost: 0,
				depreciationCost: 0,
				netEarnings: 0,
				hourlyEarnings: 0,
			},
            isCalculated: false,
			addEarnings: newEarnings => {
				set(state => ({
					earnings: { ...state.earnings, ...newEarnings },
				}))
				get().recalculate()
			},
			recalculate: () => {
				const { fuelPrice, depreciation } = useSettingsStore.getState().settings
				const { mileage, fuelConsumption, timeSpent, earnings } = get().earnings

				const fuelCost = Math.round(((mileage * fuelConsumption) / 100) * fuelPrice)
				const depreciationCost = Math.round(mileage * depreciation)
				const netEarnings = Math.round(earnings - (fuelCost + depreciationCost))

                const timeInHours = Math.floor(timeSpent) + Math.round((timeSpent - Math.floor(timeSpent)) * 100) / 60;
				const hourlyEarnings = timeSpent > 0 ? Math.round(netEarnings / timeInHours) : 0

				set({
					calculatedData: {
						fuelCost,
						depreciationCost,
						netEarnings,
						hourlyEarnings,
					},
                    isCalculated: true,
				})
			},
		}),
		{ name: 'EarningsStore' }
	)
)

export default useEarningsStore
