import { createTheme, ThemeOptions } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#0FB5FF',
		},
		secondary: {
			main: '#f50057',
		},
	},
}

export const theme = createTheme(themeOptions)
