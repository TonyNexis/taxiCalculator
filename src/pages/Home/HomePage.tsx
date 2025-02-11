import SettingsBtn from '../../components/SettingsBtn/SettingsBtn'
import styles from './HomePage.module.scss'
import { Link } from '@tanstack/react-router'

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<Link to='/addEarnings' className={styles.addBtn}>
				Добавити
			</Link>
			<SettingsBtn />
		</div>
	)
}

export default HomePage
