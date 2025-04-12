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
					to='/statistics'
					className={styles.menu__item}
					title='Дізнатися статистику'
				>
					Історія
				</Link>
			</div>
		</nav>
	)
}


export default Menu
