import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from '../pages/SettingsInfo/SettingsPage'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})
