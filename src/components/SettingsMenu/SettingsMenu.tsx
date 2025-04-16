import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link, useNavigate } from '@tanstack/react-router'
import { logout } from './../../firebase/authService.ts'
import { useMenuSettingsStore } from '../../store/useMenuSettingsStore.ts'
import styles from './SettingsMenu.module.scss'

export const SettingsMenu = () => {
	const navigate = useNavigate()
	const isOpen = useMenuSettingsStore((state) => state.isOpen)
	const toggleMenu = useMenuSettingsStore((state) => state.toggle)

	const handleLogout = async () => {
		try {
			await logout()
			navigate({ to: '/' })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.settingsMenu}>
			<div className={`${styles.toggleMenu} ${isOpen ? styles.show : ''}`}>
				<button onClick={handleLogout} className={styles.menuIcon}>
					<LogoutIcon className={styles.icon} />
				</button>
				<button className={styles.menuIcon}>
					<Link to='/settings'>
						<SettingsIcon className={styles.icon} />
					</Link>
				</button>
			</div>
			<button onClick={() => toggleMenu()} className={styles.menuIcon}>
				<MenuIcon className={styles.icon} />
			</button>
		</div>
	)
}
