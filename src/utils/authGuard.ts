import { auth } from '../firebase/firebase';
import { redirect } from '@tanstack/react-router';

export const authGuard = () =>
	new Promise<void>((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			unsubscribe()
			if (user) {
				resolve()
			} else {
				reject(redirect({ to: '/' }))
			}
		})
	})