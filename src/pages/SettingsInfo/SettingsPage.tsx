import Button from '@mui/material/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '../../components/TextInput'
import '../../styles/global.scss'
import styles from './SettingsPage.module.scss'

type Inputs = {
	fuelPrice: number
	depreciation: number
}

const SettingsPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.settingsPage}>
			<p className='infoText'>
				Збережіть вартість пального та бажану суму амортизації
			</p>

			<TextInput
				{...register('fuelPrice', {
					required: 'Вкажіть вартість пального',
					valueAsNumber: true,
					min: { value: 0, message: 'Мінімальне значення 0' },
				})}
				id='fuel-price'
				label='Вартість пального'
				unitType='грн/л'
			/>
			{errors.fuelPrice && (
				<span className={styles.error}>{errors.fuelPrice.message}</span>
			)}

			<TextInput
				{...register('depreciation', {
					required: 'Вкажіть амортизацію',
					valueAsNumber: true,
					min: { value: 0, message: 'Мінімальне значення 0' },
				})}
				id='depreciation'
				label='Амортизація'
				unitType='грн/км'
			/>
			{errors.depreciation && (
				<span className={styles.error}>{errors.depreciation.message}</span>
			)}

			<Button type='submit' variant='contained'>
				Зберегти
			</Button>
		</form>
	)
}

export default SettingsPage
