import { forwardRef } from 'react'
import { InputRoot } from '.'
import { IconButton, InputAdornment } from '@mui/material'
import { icons } from 'core/utils'
import { InputSearchProps } from 'core'

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(({ ...rest }, ref) => {
  return (
    <InputRoot
      {...rest}
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={rest.clickDelete}
              sx={{
                '&.MuiButtonBase-root': {
                  padding: '0px',
                  marginRight: '4px',
                },
              }}
            >
              {rest.value ? icons.close : icons.search}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyUp={(event) => {
        if (event?.key === 'Enter') rest.enter
      }}
      fullWidth
    />
  )
})
