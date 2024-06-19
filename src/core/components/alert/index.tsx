import React from 'react'
import { Alert, AlertProps } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { FontName } from 'core'

type MyAlertProps = AlertProps
export const AlertComponent: React.FC<MyAlertProps> = (props) => {
  return (
    <Alert
      variant="outlined"
      severity="error"
      icon={<CancelIcon sx={{ fontSize: '24px', color: '#FFB5B2', marginTop: '4px' }} />}
      sx={{ fontSize: '12px', fontFamily: FontName.RobotoRegular, ...props.sx }}
      {...props}
    />
  )
}
