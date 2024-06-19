import { Paper, PaperProps, Typography } from '@mui/material'
import { styles } from './styles'

type TemplatePaperProps = {
  title?: string
} & PaperProps

export const TemplatePaper: React.FC<TemplatePaperProps> = ({ children, title, ...rest }) => {
  return (
    <Paper
      {...rest}
      elevation={3}
      sx={{
        ...styles.container,
        ...(rest.sx as object),
      }}
    >
      {title && <Typography variant="h2">{title}</Typography>}

      {children}
    </Paper>
  )
}
