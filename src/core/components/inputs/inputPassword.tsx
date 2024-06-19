import React, { useState, forwardRef } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputRootProps } from 'core/types'
import { InputRoot } from '.'
import { noBlanks } from 'modules/users/utils'

type InputPasswordProps = InputRootProps & { helpMessage?: boolean }

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
      event.preventDefault()

    return (
      <InputRoot
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        onInput={noBlanks}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )
  },
)
