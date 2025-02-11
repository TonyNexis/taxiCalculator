import styles from './Menu.module.scss'
import { Link } from '@tanstack/react-router'

const Menu = () => {
    return (
        <nav className={styles.menu} aria-label='меню'>
            <Link to="/" className={styles.menu__item} title="Перейти на головну сторінку">Головна</Link>
            <Link to="/history" className={styles.menu__item} title="Дізнатися історію">Історія</Link>
        </nav>
    )
}

export default Menu