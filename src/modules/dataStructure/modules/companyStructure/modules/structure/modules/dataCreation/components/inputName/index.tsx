import { Box, CircularProgress, Icon, TextField, TextFieldProps } from '@mui/material'
import { icons } from 'core'
import { forwardRef } from 'react'
import { styles } from './styles'
import { ResponseStates } from '../../enums'

type InputNameProps = { loading?: ResponseStates; showIcons?: boolean } & TextFieldProps

export const InputName = forwardRef<HTMLInputElement, InputNameProps>(
  ({ loading, showIcons = true, ...props }, ref) => {
    return (
      <Box sx={styles.container}>
        <TextField {...props} ref={ref} fullWidth variant="standard" sx={styles.input} />
        {showIcons && (
          <Box sx={styles.containerButton}>
            {(loading === ResponseStates.init && (
              <Icon
                sx={{
                  color: 'primary.main',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.3rem',
                  },
                }}
              >
                {icons.edit}
              </Icon>
            )) ||
              (loading === ResponseStates.loading && <CircularProgress size={28} />) ||
              (loading === ResponseStates.success && (
                <Icon sx={{ color: 'secondary.main' }}>{icons.check}</Icon>
              )) ||
              (loading === ResponseStates.error && (
                <Icon sx={{ color: 'error.500' }}>{icons.close}</Icon>
              ))}
          </Box>
        )}
      </Box>
    )
  },
)
