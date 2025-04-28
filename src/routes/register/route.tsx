import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import styles from './../index/index.module.scss'

export const Route = createFileRoute("/register")({
  component: RouteComponent,
})

function RouteComponent() {



  return <div className={styles.authPageWrapper}>
    <form  className={styles.authForm}>
        <h1>Реєстрація</h1>

      </form>
      <div className={styles.authRedirect}>
        <span>Вже зареєстрований?</span>
        <Link to="/" title="Зайти">
          Зайти на акаунт{' '}
        </Link>
      </div>
  </div>
}
