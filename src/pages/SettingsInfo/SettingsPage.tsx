import Button from '@mui/material/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextInput from '../../components/TextInput'
import styles from './SettingsPage.module.scss'

type Inputs = {
	fuelPrice: number
	depreciation: number
}

const SettingsPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.settingsPage}>
			<p className={styles.infoText}>
				Збережіть вартість пального та бажану суму амортизації{' '}
			</p>
			<TextInput
				{...register('fuelPrice', { required: true })}
				id='fuel-price'
				label='Вартість пального'
				unitType='грн/л'
			/>
			<TextInput
				{...register('depreciation')}
				id='depreciation'
				label='Амортизація'
				unitType='грн/км'
			/>
			{errors.fuelPrice && <span>This field is required</span>}
			<Button type='submit' variant='contained'>
				Зберегти
			</Button>
		</form>
	)
}

export default SettingsPage
