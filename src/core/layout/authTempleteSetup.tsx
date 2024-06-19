import { Box } from '@mui/material'
import { RoutesProvider } from 'core'
import { styles } from './styles'
import { SnackbarComponent } from 'core/components/snackbar'

export const AuthSetupTemplate: React.FC = () => {
  return (
    <Box sx={styles.containerAuth}>
      <RoutesProvider />
      <SnackbarComponent />
    </Box>
  )
}
