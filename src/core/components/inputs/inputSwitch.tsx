import { Box, FormControlLabel, Switch, SwitchProps } from '@mui/material'
import { forwardRef } from 'react'
import { ErrorMessage } from '..'

type InputSwitchProps = { label?: string; error?: string } & SwitchProps

export const InputSwitch = forwardRef<HTMLInputElement, InputSwitchProps>(
  ({ label, error = '', ...props }, ref) => {
    return (
      <Box
        sx={{
          height: '100%',
          position: 'relative',
        }}
      >
        <FormControlLabel
          ref={ref}
          control={<Switch {...props} />}
          label={label}
          sx={{ marginTop: '8px' }}
        />

        <Box sx={{ position: 'absolute', bottom: 1 }}>
          <ErrorMessage message={error} />
        </Box>
      </Box>
    )
  },
)
