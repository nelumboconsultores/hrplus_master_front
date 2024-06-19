import { Box, IconButton } from '@mui/material'
import { LockedScreenDrawer } from 'core'
import { icons } from 'core/utils'
import { styles } from './filtersCatalogStyles'

export const FiltersCatalog: React.FC<{
  children: React.ReactElement
  show?: boolean
  onClose: (open: boolean) => void
}> = ({ children, show, onClose }) => {
  const handleClose = () => {
    onClose(false)
  }

  return (
    <Box sx={styles.boxContainer}>
      <LockedScreenDrawer open={show} onClose={handleClose} anchor="right">
        <Box sx={styles.container}>
          <IconButton sx={styles.close} onClick={handleClose}>
            {icons.close}
          </IconButton>
          {children}
        </Box>
      </LockedScreenDrawer>
    </Box>
  )
}
