import { Link } from '@tanstack/react-router'
import styles from './Menu.module.scss'

const Menu = () => {
	return (
		<nav className={styles.menu} aria-label='меню'>
			<div className={styles.menu__items}>
				{' '}
				<Link
					to='/'
					className={styles.menu__item}
					title='Перейти на головну сторінку'
				>
					Головна
				</Link>
				<Link
					to='/history'
					className={styles.menu__item}
					title='Дізнатися історію'
				>
					Історія
				</Link>
			</div>
			<button className={styles.logoutButton}>
				<svg viewBox='0 0 24 24'>
					<path d='M16 13v-2h-5V8l-5 4 5 4v-3h5zM20 3H9a2 2 0 0 0-2 2v4h2V5h11v14H9v-4H7v4a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z' />
				</svg>
			</button>
		</nav>
	)
}


export default Menu
