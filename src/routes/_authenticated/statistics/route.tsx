import { createFileRoute } from '@tanstack/react-router'
import styles from './statistics.module.scss'

export const Route = createFileRoute('/_authenticated/statistics')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className={styles.statWrapper}> Statistics Page</div>
}
