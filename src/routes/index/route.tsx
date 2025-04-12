import GoogleIcon from '@mui/icons-material/Google'
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
    new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
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

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError('')
    try {
      const loggedUser = await login(data.email, data.password)
      if (loggedUser) {
        navigate({ to: '/home' })
        console.log('success')
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
            id="email"
            label="Email"
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
          Увійти
        </Button>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </form>
      <Button
        variant="contained"
        className={styles.googleButton}
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        Увійти через Google
      </Button>
      <div className={styles.authRedirect}>
        <span>Ще не маєш акаунта?</span>
        <Link to="/register" title="Зареєструватися">
          Зареєструватися{' '}
        </Link>
      </div>
    </div>
  )
}
