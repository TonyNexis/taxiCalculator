import styles from './Menu.module.scss'

const Menu = () => {
    return (
        <nav className={styles.menu} aria-label='меню'>
            <a href="" className={styles.menu__item} title="Перейти на головну сторінку">Головна</a>
            <a href="" className={styles.menu__item} title="Дізнатися історію">Історія</a>
        </nav>
    )
}

export default Menu