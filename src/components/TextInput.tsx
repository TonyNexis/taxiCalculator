import InputAdornment from '@mui/material/InputAdornment'
import { inputBaseClasses } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import React, { forwardRef } from 'react'

interface TextInputProps {
	id: string
	label: string
	unitType?: string
	type?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ id, label, unitType, onChange, type, ...props }, ref) => {
		return (
			<TextField
				id={id}
				label={label}
				onChange={onChange}
				variant='outlined'
				inputRef={ref}
				type={type}
				{...props}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position='end'
							sx={{
								opacity: 0,
								pointerEvents: 'none',
								[`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
									opacity: 1,
								},
							}}
						>
							{unitType}
						</InputAdornment>
					),
				}}
			/>
		)
	}
)

export default TextInput
