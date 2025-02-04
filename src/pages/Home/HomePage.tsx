import SettingsIcon from '../../components/SettingsIcon/SettingsIcon'
import styles from './HomePage.module.scss'

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<button className={styles.addBtn} onClick={() => console.log('test')}>Добавити</button>
			<SettingsIcon/>
		</div>
	)
}

export default HomePage
