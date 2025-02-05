import InputAdornment from '@mui/material/InputAdornment'
import { inputBaseClasses } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import styles from './SettingsPage.module.scss'
import TextInput from '../../components/TextInput'

const SettingsPage = () => {
	return (
		<div className={styles.settingsPage}>
			<TextField
				id='fuelPrice'
				label='Вартість пального'
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
								грн/л
							</InputAdornment>
						),
					},
				}}
			/>
			<TextInput id = 'tata' label = 'toto'/>
		</div>
	)
}

export default SettingsPage
