import Button from '@mui/material/Button'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import TextInput from '../components/TextInput'
import styles from './../styles/authPage.module.scss'

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

type Inputs = {
	email: string
	password: string
}

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<Inputs>()

	return (
		<>
			<form className={styles.authPageWrapper} action=''>
				<h1>Login</h1>
				<TextInput
					{...register('email', {
						required: 'Вкажіть пробіг',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Введіть коректний email',
						},
					})}
					id='email'
					label='Email'
				/>

				<TextInput
					{...register('password', {
						required: 'Вкажіть пробіг',
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message: 'Мінімум 8 символів, одна літера і одне число',
						},
					})}
					id='outlined-password-input'
          type='password'
					label='Password'
				/>
				<Button type='submit' variant='contained'>
					Увійти
				</Button>
			</form>
		</>
	)
}
