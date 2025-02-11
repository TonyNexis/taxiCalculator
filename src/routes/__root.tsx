import Menu from './../components/Menu/Menu'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Spinner from '../components/Spinner/Spinner'

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	const { isLoading } = useRouterState();

	return (
		<>
		<Menu/>
		{!isLoading && <Spinner/> }
		<Outlet />
		<TanStackRouterDevtools />
	</>
	)
}
