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

			<div className={styles.fieldWrapper}>
				<TextInput
					{...register('fuelPrice', {
						required: 'Вкажіть вартість пального',
						pattern: {
							value: /^[0-9]*\.?[0-9]+$/,
							message: 'Введіть коректне число',
						},
					})}
					id='fuel-price'
					label='Вартість пального'
					unitType='грн/л'
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
					id='depreciation'
					label='Амортизація'
					unitType='грн/км'
				/>
				{errors.depreciation && (
					<span className={styles.errorMessage}>
						{errors.depreciation.message}
					</span>
				)}
			</div>

			<Button type='submit' variant='contained'>
				Зберегти
			</Button>
		</form>
	)
}

export default SettingsPage
