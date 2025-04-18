import { createFileRoute } from '@tanstack/react-router'
import Button from '@mui/material/Button'
import { useNavigate } from '@tanstack/react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from './../../../components/TextInput'
import useSettingsStore from './../../../store/useSettingsStore.ts'
import './../../../styles/global.scss'
import styles from './settings.module.scss'

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
})

type Inputs = {
  fuelPrice: number
  depreciation: number
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const { settings, updateSettings } = useSettingsStore()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateSettings(data)
    navigate({ to: '/' })
  }

  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsInfo}>
        <p>Вартість пального: </p>
        <p>{settings.fuelPrice} грн/л</p>
        <p>Амортизація: </p> <p>{settings.depreciation} грн</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.settingsPageForm}
      >
        <p className="infoText">
          Збережіть вартість пального та бажану суму амортизації
        </p>
        <div className={styles.fieldWrapper}>
          <TextInput
            {...register('fuelPrice', {
              required: 'Вкажіть вартість пального',
              pattern: {
                value: /^[0-9]*\.?[0-9]+$/,
                message: 'Введіть коректне число',
              },
            })}
            id="fuel-price"
            label="Вартість пального"
            unitType="грн/л"
          />
          {errors.fuelPrice && (
            <span className={styles.errorMessage}>
              {errors.fuelPrice.message}
            </span>
          )}
        </div>
        <div className={styles.fieldWrapper}>
          <TextInput
            {...register('depreciation', {
              required: 'Вкажіть амортизацію',
              pattern: {
                value: /^[0-9]*\.?[0-9]+$/,
                message: 'Введіть коректне число',
              },
            })}
            id="depreciation"
            label="Амортизація"
            unitType="грн/км"
          />
          {errors.depreciation && (
            <span className={styles.errorMessage}>
              {errors.depreciation.message}
            </span>
          )}
        </div>

        <Button type="submit" variant="contained">
          Зберегти
        </Button>
      </form>
    </div>
  )
}
