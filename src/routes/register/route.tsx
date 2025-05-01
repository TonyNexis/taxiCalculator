import { createFileRoute, Link } from '@tanstack/react-router'
import Button from '@mui/material/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../../components/TextInput'
import styles from './../index/index.module.scss'

export const Route = createFileRoute('/register')({
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
	} = useForm<Inputs>()

	return (
		<div className={styles.authPageWrapper}>
			<form className={styles.authForm}>
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
				</div>
        <div className={styles.fieldWrapper}>
          {' '}
          <TextInput
            {...register('password', {
              required: 'Вкажіть пароль',
            })}
            id="password"
            type="password"
            label="Пароль"
          />
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" variant="contained">
          Зареєструватись
        </Button>
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
