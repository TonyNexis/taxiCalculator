import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from '../../pages/SettingsInfo/SettingsPage'

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
})
