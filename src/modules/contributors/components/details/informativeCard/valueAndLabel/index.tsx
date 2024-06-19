import { Typography } from '@mui/material'
import { FontName } from 'core'

export const ValueAndLabel: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <>
      <Typography
        sx={{ fontFamily: FontName.RobotoBold, textAlign: 'center', lineHeight: '1.2rem' }}
      >
        {value}
      </Typography>
      <Typography sx={{ color: '#828282', textAlign: 'center', lineHeight: '1.2rem' }}>
        {label}
      </Typography>
    </>
  )
}
