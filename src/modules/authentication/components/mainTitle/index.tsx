import { Typography, TypographyProps } from '@mui/material'
import { FontName } from 'core'
type MainTitleProps = { children: React.ReactNode } & TypographyProps

export const MainTitle: React.FC<MainTitleProps> = (props) => {
  const { children } = props
  return (
    <Typography
      {...props}
      sx={{ fontSize: { lg: '1.4rem', xl: '1.7rem' }, fontFamily: FontName.RobotoMedium }}
    >
      {children}
    </Typography>
  )
}
