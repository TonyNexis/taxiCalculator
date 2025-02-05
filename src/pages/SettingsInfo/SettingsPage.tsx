import Button from '@mui/material/Button';
import styles from './SettingsPage.module.scss'
import TextInput from '../../components/TextInput'

const SettingsPage = () => {
	return (
		<div className={styles.settingsPage}>
			<p className={styles.infoText}>Збережіть вартість пального та бажану суму амортизації </p>
			<TextInput id = 'fuel-price' label = 'Вартість пального' unitType = 'грн/л'/>
			<TextInput id = 'depreciation' label = 'Амортизація' unitType = 'грн/км'/>
			<Button variant="contained">Зберегти</Button>
		</div>
	)
}

export default SettingsPage
