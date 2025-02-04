import SettingsBtn from '../../components/SettingsBtn/SettingsBtn'
import styles from './HomePage.module.scss'

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<button className={styles.addBtn} onClick={() => console.log('test')}>
				Добавити
			</button>
			<SettingsBtn />
		</div>
	)
}

export default HomePage
