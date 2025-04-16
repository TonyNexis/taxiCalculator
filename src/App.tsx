import { ThemeProvider } from '@mui/material'
import SettingsPage from './pages/SettingsInfo/SettingsPage'
import './styles/global.scss'
import { theme } from './theme/theme.ts'

function App() {
	return (
		<ThemeProvider theme={theme}>
			{/* <Menu/> */}
			{/* <HomePage/> */}
			<SettingsPage />
		</ThemeProvider>
	)
}

export default App
