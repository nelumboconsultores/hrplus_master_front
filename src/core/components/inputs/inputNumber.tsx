import { forwardRef } from 'react'
import { InputRootProps } from 'core/types'
import { useStyles } from './useStyles'
import { TextField } from '@mui/material'
import { onlyNumbers } from 'core/utils'

export type InputNumberProps = InputRootProps

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({ ...rest }, ref) => {
  const classes = useStyles()
  return (
    <TextField
      {...rest}
      ref={ref}
      fullWidth
      onInput={(e) => {
        const target = e.target as HTMLInputElement
        target.value = onlyNumbers(target.value)
        rest.onInput && rest.onInput(e)
      }}
      sx={{ ...classes.hideNumberInputArrows, ...(rest.sx as object) }}
    />
  )
})
