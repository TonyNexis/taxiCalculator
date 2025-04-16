import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import Navigation from '../components/Navigation/Navigation'
import { SettingsMenu } from '../components/SettingsMenu/SettingsMenu'
import { useMenuSettingsStore } from '../store/useMenuSettingsStore'
import { authGuard } from '../utils/authGuard'

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: authGuard,
	component: ProtectedLayout,
})

function ProtectedLayout() {
	const pathname = useRouterState({ select: s => s.location.pathname })
	const closeMenu = useMenuSettingsStore(state => state.close)

	useEffect(() => {
		closeMenu()
	}, [pathname, closeMenu])
	
	return (
		<div>
			<Navigation />
			<SettingsMenu />
			<Outlet />
		</div>
	)
}
