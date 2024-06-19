import { Box } from '@mui/material'
import { AppContext, Header, RoutesProvider, SideMenu } from 'core'
import { styles } from './styles'
import { SnackbarComponent } from 'core/components/snackbar'
import { useContext } from 'react'
import Spinner from 'core/components/spinner'

export const StaffTemplate: React.FC = () => {
  const { open, loadingHome } = useContext(AppContext)
  return (
    <Box sx={{ display: 'flex' }}>
      {loadingHome && (
        <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      )}
      {!loadingHome && (
        <>
          <SideMenu />
          <Box sx={styles.subBox}>
            <Header seeLogo={false} />
            <Box className={open ? 'open' : 'closed'} sx={styles.containerStaff}>
              <RoutesProvider />
              <SnackbarComponent />
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
