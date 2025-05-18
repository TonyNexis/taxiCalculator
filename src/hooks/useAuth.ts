import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../firebase/firebase'
import useSettingsStore from '../store/useSettingsStore'

export function useAuth() {
	const fetchSettings = useSettingsStore(state => state.fetchSettings)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				fetchSettings(user.uid)
			}
		})
		return () => unsubscribe()
	}, [fetchSettings])
}
