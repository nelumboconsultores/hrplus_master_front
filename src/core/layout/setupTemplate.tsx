import { Box } from '@mui/material'
import { AppContext, Header, RoutesProvider } from 'core'
import { styles } from './styles'
import { useContext } from 'react'
import { SnackbarComponent } from 'core/components/snackbar'

export const SetupTemplate: React.FC = () => {
  const { open } = useContext(AppContext)
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={styles.subBox}>
        <Header seeLogo={true} />
        <Box className={open ? 'open' : 'closed'} sx={styles.containerStaff}>
          <RoutesProvider />
          <SnackbarComponent />
        </Box>
      </Box>
    </Box>
  )
}
