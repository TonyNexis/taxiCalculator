import Button from '@mui/material/Button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../../../components/TextInput.tsx'
import useEarningsStore from '../../../store/useEarningsStore.ts'
import styles from './addEarningsPage.module.scss'

export const Route = createFileRoute("/_authenticated/add")({
  component: RouteComponent,
})

type Inputs = {
  mileage: number
  fuelConsumption: number
  timeSpent: number
  earnings: number
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const { addEarnings, earnings } = useEarningsStore()

  useEffect(() => {
    if (earnings.earnings > 0) {
      setValue('mileage', earnings.mileage)
      setValue('fuelConsumption', earnings.fuelConsumption)
      setValue('timeSpent', earnings.timeSpent)
      setValue('earnings', earnings.earnings)
    }
  }, [earnings, setValue])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addEarnings(data)
    navigate({ to: '/' })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.addEarningsWrapper}
    >
      <p className="infoText">Введіть дані </p>
      <div className={styles.fieldWrapper}>
        <TextInput
          {...register('mileage', {
            required: 'Вкажіть пробіг',
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: 'Введіть коректне число',
            },
          })}
          id="mileage"
          label="Пробіг"
          unitType="км"
        />
        {errors.mileage && (
          <span className={styles.errorMessage}>{errors.mileage.message}</span>
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <TextInput
          {...register('fuelConsumption', {
            required: 'Вкажіть витрати пального',
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: 'Введіть коректне число',
            },
          })}
          id="fuelConsumption"
          label="Витрати пального"
          unitType="л/100км"
        />
        {errors.fuelConsumption && (
          <span className={styles.errorMessage}>
            {errors.fuelConsumption.message}
          </span>
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <TextInput
          {...register('timeSpent', {
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: 'Введіть коректне число',
            },
          })}
          id="timeSpent"
          label="Час"
          unitType="год"
        />
        {errors.timeSpent && (
          <span className={styles.errorMessage}>
            {errors.timeSpent.message}
          </span>
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <TextInput
          {...register('earnings', {
            required: 'Вкажіть ваш заробіток',
            pattern: {
              value: /^[1-9][0-9]*\.?[0-9]+$/,
              message: 'Введіть коректне число',
            },
          })}
          id="earnings"
          label="Заробіток"
          unitType="грн"
        />
        {errors.earnings && (
          <span className={styles.errorMessage}>{errors.earnings.message}</span>
        )}
      </div>
      <Button type="submit" variant="contained">
        Порахувати
      </Button>
    </form>
  )
}
