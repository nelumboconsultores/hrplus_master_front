import { Paper, Button, List, Fade, Box } from '@mui/material'
import { useContext } from 'react'
import { menuArray } from 'core/enum'
import { keyImg } from 'core/utils'
import { AppContext } from 'core/context'
import { useStyles } from './useStyles'
import { ReturnItem } from './components'
import { usePermissions } from 'core/hooks'
export const SideMenu: React.FC = () => {
  const { setOpen, open } = useContext(AppContext)
  const { container, logo, containerMenu } = useStyles(open)
  const { getMenuItems } = usePermissions()
  return (
    <Paper sx={container}>
      <Box sx={{ display: 'flex', minHeight: '72px', width: '100%', justifyContent: 'center' }}>
        <Button onClick={() => setOpen(!open)} sx={logo} variant="text">
          {!open && <img src={keyImg.logo} alt="logo" width={44} />}
          {open && (
            <Fade in={open}>
              <img src={keyImg.nameLogo} alt="logo" width={132} />
            </Fade>
          )}
        </Button>
      </Box>

      <List sx={containerMenu}>
        {getMenuItems(menuArray).map((item, index) => (
          <ReturnItem key={index} {...item} />
        ))}
      </List>
    </Paper>
  )
}
