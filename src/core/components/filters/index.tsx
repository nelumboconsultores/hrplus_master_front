import { Box, IconButton } from '@mui/material'
import { icons } from 'core/utils'
import { styles } from './styles'
import { useState } from 'react'
import { LockedScreenDrawer } from '..'

export const Filters: React.FC<{
  children: React.ReactElement
  show?: boolean
}> = ({ children, show = false }) => {
  const [open, setOpen] = useState(show)
  const onClose = () => setOpen(false)
  return (
    <Box>
      <IconButton sx={styles.icono} onClick={() => setOpen(true)}>
        {icons.filterAlt}
      </IconButton>
      <LockedScreenDrawer open={open} onClose={onClose} anchor="right">
        <Box sx={styles.container}>
          {!show && (
            <IconButton sx={styles.close} onClick={onClose}>
              {icons.close}
            </IconButton>
          )}
          {children}
        </Box>
      </LockedScreenDrawer>
    </Box>
  )
}
