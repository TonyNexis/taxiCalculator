import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { Settings } from './../store/useSettingsStore'

export type UserSettings = {
	fuelPrice: number
	depreciation: number
}

export const saveUserSettings = async (
	userId: string,
	settings: UserSettings
) => {
	await setDoc(doc(db, 'userSettings', userId), settings)
}

export const getUserSettings = async (userId: string): Promise<Settings | null> => {
	const docRef = doc(db, 'userSettings', userId)
	const docSnap = await getDoc(docRef)

if (docSnap.exists()) {
		const data = docSnap.data()
			return {
				fuelPrice: data.fuelPrice,
				depreciation: data.depreciation,
			}
	}
	return null
}
