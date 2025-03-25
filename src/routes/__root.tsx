import Menu from './../components/Menu/Menu'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Spinner from '../components/Spinner/Spinner'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	const { isLoading } = useRouterState();

	const [showSpinner, setShowSpinner] = useState(false)

	const [user, setUser] = useState(() => auth.currentUser)

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
