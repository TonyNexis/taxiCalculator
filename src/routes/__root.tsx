import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/Spinner/Spinner'

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	const { isLoading } = useRouterState()

	const [showSpinner, setShowSpinner] = useState(false)

	useAuth()

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>

		if (isLoading) {
			timeout = setTimeout(() => {
				setShowSpinner(true)
			}, 300)
		} else setShowSpinner(false)

		return () => clearTimeout(timeout)
	}, [isLoading])

	return (
		<>
			{showSpinner && <Spinner />}
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}
