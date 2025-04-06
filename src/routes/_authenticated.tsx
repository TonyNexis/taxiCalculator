import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authGuard } from '../utils/authGuard'
import Menu from '../components/Menu/Menu'
import { SettingsMenu } from '../components/SettingsMenu/SettingsMenu'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: authGuard,
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <div>
      <Menu />
      <SettingsMenu />
      <Outlet />
    </div>
  )
}
