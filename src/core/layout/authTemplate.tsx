import { Box, Typography } from '@mui/material'
import { RoutesProvider } from 'core'
import { styles } from './styles'
import { SnackbarComponent } from 'core/components/snackbar'

export const AuthTemplate: React.FC = () => {
  return (
    <Box sx={styles.containerAuth}>
      <Typography sx={styles.infoUp}>
        www.checkplus.com | soporte@checkplus.com | Contáctenos: 1800 1234 1234
      </Typography>
      <RoutesProvider />
      <SnackbarComponent />
    </Box>
  )
}
