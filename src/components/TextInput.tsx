import InputAdornment from '@mui/material/InputAdornment'
import { inputBaseClasses } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'

interface TextInputProps {
    id: string;
    label: string;
  }

const TextInput: React.FC<TextInputProps> = ({id, label}) => {
 return (
    <TextField
    id={id}
    label={label}
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
                    грн/л
                </InputAdornment>
            ),
        },
    }}
/>
 )
}

export default TextInput