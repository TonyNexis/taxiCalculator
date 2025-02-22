import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Earnings = {
	mileage: number
	fuelConsumption: number
    timeSpent: number
    earnings: number
}

type Store = {
	earnings: Earnings
	addEarnings: (newEarnings: Partial<Earnings>) => void
}

const useStore = create<Store>()(
    devtools(
        set => ({
            earnings: {
                mileage: 0,
                fuelConsumption: 0,
                timeSpent: 0,
                earnings: 0,
            },
            addEarnings: newEarnings =>
                set(state => ({
                    earnings: { ...state.earnings, ...newEarnings },
                })),
        }),
        { name: 'EarningsStore' }
    )
)

export default useStore