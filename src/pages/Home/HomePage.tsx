import { Link } from '@tanstack/react-router'
import useStore from '../../store/useEarningsStore.ts'
import SettingsBtn from '../../components/SettingsBtn/SettingsBtn'
import styles from './HomePage.module.scss'

const HomePage = () => {
	const { earnings } = useStore();

	return (
		<div className={styles.homePage}>
			<div className={styles.results}>
				<div className={styles.resultsBlock}>
					<p>Пробіг:</p>
					<p>{earnings.mileage} км</p>
					<p>Витрати пального:</p>
					<p>{earnings.fuelConsumption} л/100км</p>
					<p>Час:</p> <p>{earnings.timeSpent} год</p>
					<p>Заробіток:</p> <p>{earnings.earnings} грн</p>
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
