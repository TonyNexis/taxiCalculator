import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import Button from '@mui/material/Button'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../../components/TextInput'
import { FirebaseError } from 'firebase/app'
import { register as registerUser } from '../../firebase/authService'
import styles from './../index/index.module.scss'

export const Route = createFileRoute('/register')({
	component: RouteComponent,
})

type Inputs = {
	email: string
	password: string
	confirmPassword: string
}

function RouteComponent() {
	const [error, setError] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()

	const handleClickShowPassword = () => setShowPassword(show => !show)

	const handleRegisterError = (error: unknown) => {
		if (error instanceof FirebaseError) {
			if (error.code === 'auth/email-already-in-use') {
				setError('Користувач з таким email вже існує')
				return
			}
		}

		setError('Щось пішло не так. Спробуйте ще раз')
	}

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setError('')
		try {
			const registeredUser = await registerUser(data.email, data.password)
			if (registeredUser) {
				navigate({ to: '/' })
			}
		} catch (error) {
			handleRegisterError(error)
		}
	}

	return (
		<div className={styles.authPageWrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
				<h1>Реєстрація</h1>
				<div className={styles.fieldWrapper}>
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
								pattern: {
									value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/,
									message: '6–15 символів, літери і цифри',
								},
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
				<div className={styles.fieldWrapper}>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>
							Повторіть пароль
						</InputLabel>
						<OutlinedInput
							{...register('confirmPassword', {
								required: 'Вкажіть пароль',
								validate: value =>
									value === watch('password') || 'Паролі не співпадають',
							})}
							id='confirm-password'
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
							label='Повторіть пароль'
						/>
					</FormControl>
					{errors.confirmPassword && (
						<span className={styles.errorMessage}>
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				<Button type='submit' variant='contained'>
					Зареєструватись
				</Button>
				{error && <span className={styles.errorMessage}>{error}</span>}
			</form>
			<div className={styles.authRedirect}>
				<span>Вже зареєстровані?</span>
				<Link to='/' title='Зайти'>
					Зайти на акаунт{' '}
				</Link>
			</div>
		</div>
	)
}
