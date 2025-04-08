import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { logout } from './../../firebase/authService.ts'
import styles from './SettingsMenu.module.scss'

export const SettingsMenu = () => {
	const navigate = useNavigate()
	const [show, setShow] = useState<boolean>(false)

	const handleLogout = async () => {
		try {
			await logout()
			navigate({ to: '/' })
		} catch (error) {
			console.log(error)
		}
	}

	const toggleMenu = () => {
		setShow(prev => !prev)
	}

	return (
		<div className={styles.settingsMenu}>
			<div className={`${styles.toggleMenu} ${show ? styles.show : ''}`}>
				<button onClick={handleLogout} className={styles.menuIcon}>
					<LogoutIcon className={styles.icon} />
				</button>
				<button className={styles.menuIcon}>
					<Link to='/settings'>
						<SettingsIcon className={styles.icon} />
					</Link>
				</button>
			</div>
			<button onClick={toggleMenu} className={styles.menuIcon}>
				<MenuIcon className={styles.icon} />
			</button>
		</div>
	)
}
