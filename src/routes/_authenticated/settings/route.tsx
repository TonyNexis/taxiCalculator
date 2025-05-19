import Button from '@mui/material/Button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { auth } from '../../../firebase/firebase.ts'
import { saveUserSettings } from '../../../firebase/userSettingsService.ts'
import TextInput from './../../../components/TextInput'
import useSettingsStore from './../../../store/useSettingsStore.ts'
import './../../../styles/global.scss'
import styles from './settings.module.scss'

export const Route = createFileRoute('/_authenticated/settings')({
	component: RouteComponent,
})

type Inputs = {
	fuelPrice: string
	depreciation: string
}

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const navigate = useNavigate()

	const { isLoaded, settings, updateSettings } = useSettingsStore()
	const [errorSaveMessage, setErrorSaveMessage] = useState<boolean>(false)

	if (!isLoaded || !settings) return <div>aaaaa</div>

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const dataNum = {
			depreciation: parseFloat(data.depreciation),
			fuelPrice: parseFloat(data.fuelPrice)
		}
		const user = auth.currentUser
		if (!user) return
		try {
			setErrorSaveMessage(false)
			await saveUserSettings(user.uid, dataNum)
			updateSettings(dataNum)
			navigate({ to: '/' })
		} catch (error) {
			setErrorSaveMessage(true)
			console.error('Failed to save settings:', error)
		}
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

					{/* <Controller
						name='depreciation'
						control={control}
						defaultValue=""
						rules={{
							required: 'Вкажіть амортизацію',
							validate: value => !isNaN(parseFloat(value)) || 'Введіть коректне число',
						}}
						render={({ field }) => (
							<TextInput
							{...field}
								id='depreciation'
								label='Амортизація'
								unitType='грн/км'
							/>
						)}
					/> */}

					{/* <FormControl variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>
							Амортизація
						</InputLabel>
						<OutlinedInput
							{...register('depreciation', {
								required: 'Вкажіть амортизацію',
								pattern: {
									value: /^[0-9]*\.?[0-9]+$/,
								message: 'Введіть коректне число',
								},
							})}
							id='depreciation'
							type='text'
							label='Амортизація'

						/>
					</FormControl> */}

					{errors.depreciation && (
						<span className={styles.errorMessage}>
							{errors.depreciation.message}
						</span>
					)}
				</div>

				<Button type='submit' variant='contained'>
					Зберегти
				</Button>
				{errorSaveMessage ? (
					<span className={styles.errorSaveMesage}>
						Виникла проблема, повторіть спробу
					</span>
				) : null}
			</form>
		</div>
	)
}
