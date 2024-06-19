import { Typography } from '@mui/material'

type ErrorMessageProps = {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { message } = props
  return (
    <Typography
      color="error"
      sx={{
        display: message ? 'block' : 'none',
        fontSize: '0.75rem',
        letterSpacing: '0.25px',
      }}
    >
      {message}
    </Typography>
  )
}
