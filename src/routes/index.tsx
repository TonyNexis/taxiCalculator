import Button from '@mui/material/Button'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../components/TextInput'
import { login } from '../firebase/authService'
import { auth } from '../firebase/firebase'
import styles from './../styles/authPage.module.scss'

export const Route = createFileRoute('/')({
	beforeLoad: () =>
		new Promise<void>(resolve => {
			auth.onAuthStateChanged(user => {
				if (user) {
					resolve()
				}
			})
		}).then(() => redirect({ to: '/home' })),
	component: RouteComponent,
})

type Inputs = {
	email: string
	password: string
}

function RouteComponent() {
	const [error, setError] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setError('')
		try {
			const loggedUser = await login(data.email, data.password)
			console.log('success', loggedUser)
		} catch {
			setError('Невірний email або пароль')
		}
	}

	return (
		<div className={styles.authPageWrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
				<h1>Login</h1>
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
					{' '}
					<TextInput
						{...register('password', {
							required: 'Вкажіть пароль',
						})}
						id='password'
						type='password'
						label='Пароль'
					/>
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
		</div>
	)
}
