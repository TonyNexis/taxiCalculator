import './styles/global.scss'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.ts'
import HomePage from './pages/Home/HomePage'
import Menu from './components/Menu/Menu'
import SettingsPage from './pages/SettingsInfo/SettingsPage'

function App() {

  return (
    <ThemeProvider theme={theme}>
    <Menu/>
    {/* <HomePage/> */}
    <SettingsPage/>
    </ThemeProvider>
  )
}

export default App
