import InputAdornment from '@mui/material/InputAdornment'
import { inputBaseClasses } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import styles from './SettingsPage.module.scss'

const SettingsPage = () => {
	return (
		<div className={styles.settingsPage}>
			<div>test</div>
			<TextField
				id='outlined-suffix-shrink'
				label='Заробіток'
				variant='outlined'
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment
								position='end'
								sx={{
									opacity: 0,
									pointerEvents: 'none',
									[`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
										opacity: 1,
									},
								}}
							>
								кг
							</InputAdornment>
						),
					},
				}}
			/>
		</div>
	)
}

export default SettingsPage
