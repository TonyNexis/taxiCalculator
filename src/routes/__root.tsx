import Menu from './../components/Menu/Menu'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Spinner from '../components/Spinner/Spinner'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	const { isLoading } = useRouterState();

	const [showSpinner, setShowSpinner] = useState(false)

	const [user, setUser] = useState(() => auth.currentUser)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user)
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {
		let timeout: number

		if (isLoading) {
			timeout = setTimeout(() => {
				setShowSpinner(true)
			}, 300);
		} else setShowSpinner(false)

		return () => clearTimeout(timeout)
	}, [isLoading])

	return (
		<>
		{user && <Menu/>}
		{showSpinner && <Spinner/> }
		<Outlet />
		<TanStackRouterDevtools />
	</>
	)
}
