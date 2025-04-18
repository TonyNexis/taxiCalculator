import { createFileRoute, Link } from '@tanstack/react-router'
import useEarningsStore from '../../../store/useEarningsStore.ts'
import styles from './home.module.scss'

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
})

function RouteComponent() {
  const { earnings, calculatedData, isCalculated } = useEarningsStore()

  return (
    <div className={styles.homePage}>
      <div className={styles.results}>
        <div className={styles.resultsBlock}>
          <p>Пробіг:</p>
          <p>{earnings.mileage} км</p>
          <p>Витрати пального:</p>
          <p>{earnings.fuelConsumption} л/100км</p>
          {(!isCalculated || earnings.timeSpent > 0) && (
            <>
              <p>Час:</p>
              <p>{earnings.timeSpent} год</p>
            </>
          )}
          <p>Заробіток:</p> <p>{earnings.earnings} грн</p>
        </div>
        <div className={styles.resultsBlock}>
          <p>Вартість пального:</p> <p>{calculatedData.fuelCost} грн</p>
          <p>Вартість амортизації:</p>
          <p>{calculatedData.depreciationCost} грн</p>
        </div>
        <div className={styles.resultsBlock}>
          <p>Чистий заробіток:</p> <p>{calculatedData.netEarnings} грн</p>
          {(!isCalculated || earnings.timeSpent > 0) && (
            <>
              <p>Заробіток за годину:</p>
              <p>{calculatedData.hourlyEarnings} грн/год</p>
            </>
          )}
        </div>
      </div>
      <Link to="/add" className={styles.addBtn}>
        Добавити
      </Link>
    </div>
  )
}
