import { TextField } from '@mui/material'
import { InputRootProps } from 'core/types'
import { remLeadingSpaces } from 'core/utils'
import { forwardRef } from 'react'

export const InputRoot = forwardRef<HTMLInputElement, InputRootProps>((props, ref) => {
  const { endAdornment, ...rest } = props
  return (
    <TextField
      {...rest}
      inputRef={ref}
      fullWidth
      InputProps={{
        ...rest.InputProps,
        endAdornment: endAdornment ?? rest.InputProps?.endAdornment,
      }}
      onInput={(e) => {
        remLeadingSpaces(e)
        props.onInput && props.onInput(e)
      }}
    />
  )
})
