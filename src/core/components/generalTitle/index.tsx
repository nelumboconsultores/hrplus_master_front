import { Typography, TypographyProps } from '@mui/material'

type GeneralTitleProps = { children: React.ReactNode } & TypographyProps

export const GeneralTitle: React.FC<GeneralTitleProps> = ({ children, ...props }) => {
  return (
    <Typography {...props} variant="h1">
      {children}
    </Typography>
  )
}
