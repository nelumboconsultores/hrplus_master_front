import { TextFieldProps, InputAdornmentProps } from '@mui/material'

export interface InputRootProps extends Omit<TextFieldProps, 'variant'> {
  endAdornment?: React.ReactElement<InputAdornmentProps>
}
