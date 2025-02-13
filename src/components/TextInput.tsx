import InputAdornment from '@mui/material/InputAdornment'
import { inputBaseClasses } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'

interface TextInputProps {
    id: string;
    label: string;
    unitType: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const TextInput: React.FC<TextInputProps> = ({id, label, unitType, onChange}) => {
 return (
    <TextField
    id={id}
    label={label}
    onChange={onChange}
    variant='outlined'
    slotProps={{
        input: {
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
        },
    }}
/>
 )
}

export default TextInput