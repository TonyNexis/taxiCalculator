import { Link } from '@tanstack/react-router'
import useStore from '../../store/useSettingsStore'
import SettingsBtn from '../../components/SettingsBtn/SettingsBtn'
import styles from './HomePage.module.scss'

const HomePage = () => {
	const { settings } = useStore();

	return (
		<div className={styles.homePage}>
			<div className={styles.results}>
				<div className={styles.resultsBlock}>
					<p>Пробіг:</p>
					<p>0 км</p>
					<p>Витрати пального:</p>
					<p>0 л/100км</p>
					<p>Час:</p> <p>0 год</p>
					<p>Заробіток:</p> <p>0 грн</p>
				</div>
				<div className={styles.resultsBlock}>
					<p>Вартість пального:</p> <p>0 грн</p>
					<p>Вартість амортизації:</p> <p>0 грн</p>
				</div>
				<div className={styles.resultsBlock}>
					<p>Чистий заробіток:</p> <p>0 грн</p>
					<p>Заробіток за годину:</p> <p>0 грн/год</p>
				</div>
			</div>
			<Link to='/addEarnings' className={styles.addBtn}>
				Добавити
			</Link>
			<SettingsBtn />
		</div>
	)
}

export default HomePage
