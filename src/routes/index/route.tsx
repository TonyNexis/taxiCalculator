import { Visibility, VisibilityOff } from '@mui/icons-material'
import GoogleIcon from '@mui/icons-material/Google'
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import Button from '@mui/material/Button'
import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../../components/TextInput'
import { login, loginWithGoogle } from '../../firebase/authService'
import { auth } from '../../firebase/firebase'
import styles from './index.module.scss'

export const Route = createFileRoute('/')({
	beforeLoad: () =>
		new Promise(resolve => {
			const unsubscribe = auth.onAuthStateChanged(user => {
				unsubscribe()
				if (user) {
					resolve(redirect({ to: '/home' }))
				} else {
					resolve(undefined)
				}
			})
		}),
	component: RouteComponent,
})

type Inputs = {
	email: string
	password: string
}

function RouteComponent() {
	const [error, setError] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setError('')
		try {
			const loggedUser = await login(data.email, data.password)
			if (loggedUser) {
				navigate({ to: '/home' })
			} else {
				setError('Щось пішло не так. Спробуйте ще раз.')
			}
		} catch {
			setError('Невірний email або пароль')
		}
	}

	const handleGoogleLogin = async () => {
		try {
			const user = await loginWithGoogle()
			if (user) {
				navigate({ to: '/home' })
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleClickShowPassword = () => setShowPassword(show => !show)

	return (
		<div className={styles.authPageWrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
				<h1>Логін</h1>
				<div className={styles.fieldWrapper}>
					{' '}
					<TextInput
						{...register('email', {
							required: 'Вкажіть email',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Введіть коректний email',
							},
						})}
						id='email'
						label='Email'
					/>
					{errors.email && (
						<span className={styles.errorMessage}>{errors.email.message}</span>
					)}
				</div>
				<div className={styles.fieldWrapper}>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>
							Пароль
						</InputLabel>
						<OutlinedInput
							{...register('password', {
								required: 'Вкажіть пароль',
							})}
							id='password'
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label={
											showPassword ? 'Сховати пароль' : 'Показати пароль'
										}
										onClick={handleClickShowPassword}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Пароль'
						/>
					</FormControl>
					{errors.password && (
						<span className={styles.errorMessage}>
							{errors.password.message}
						</span>
					)}
				</div>
				<Button type='submit' variant='contained'>
					Увійти
				</Button>
				{error && <span className={styles.errorMessage}>{error}</span>}
			</form>
			<Button
				variant='contained'
				className={styles.googleButton}
				onClick={handleGoogleLogin}
			>
				<GoogleIcon />
				Увійти через Google
			</Button>
			<div className={styles.authRedirect}>
				<span>Ще не маєш акаунта?</span>
				<Link to='/register' title='Зареєструватися'>
					Зареєструватися{' '}
				</Link>
			</div>
		</div>
	)
}
