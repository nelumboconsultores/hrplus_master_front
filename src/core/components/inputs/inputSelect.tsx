import { MenuItem } from '@mui/material'
import { SelectProps } from 'core/types'
import { forwardRef } from 'react'
import { useStyles } from './useStyles'
import { InputRoot } from '.'

export const InputSelect = forwardRef<HTMLInputElement, SelectProps>(({ list, ...rest }, ref) => {
  const { stPlaceHolder } = useStyles(rest.placeholder)
  return (
    <InputRoot
      {...rest}
      ref={ref}
      select
      fullWidth
      focused={Boolean(rest.placeholder)}
      sx={stPlaceHolder}
    >
      {list.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </InputRoot>
  )
})
