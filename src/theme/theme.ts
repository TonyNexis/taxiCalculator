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
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					width: '300px',
					boxShadow: '0px 14px 20px rgba(0, 0, 0, 0.3)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: '0px 14px 20px rgba(0, 0, 0, 0.3)',
					letterSpacing: '2px',
				},
			},
		},
	},
}

export const theme = createTheme(themeOptions)
