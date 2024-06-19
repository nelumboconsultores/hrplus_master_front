import { Box, IconButton, Avatar } from '@mui/material'
import { icons, keyImg } from 'core/utils'
import { styles } from './styles'
import { useContext, useState } from 'react'
import { WrapperSelect } from '../popovers'
import { useNavigate } from 'react-router-dom'
import { AppContext, PathName, Variant } from 'core'
import { logout } from 'core/services'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  seeLogo: boolean
}
export const Header: React.FC<HeaderProps> = ({ seeLogo }) => {
  const { setIsAuthenticated, setActMessage } = useContext(AppContext)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const LogoutProfile = async () => {
    const response = await logout()
    if (response.data) {
      localStorage.clear()
      setIsAuthenticated(false)
      navigate(PathName.Login)
    } else setActMessage({ type: Variant.error, message: t('general.logout.error') })
  }
  const listProfile = [
    { name: 'Profile', function: () => {} },
    { name: 'Settings', function: () => {} },
    { name: 'Logout', function: LogoutProfile },
  ]
  return (
    <Box sx={styles.container}>
      <Box>
        {seeLogo && <img src={keyImg.checkLogo} alt="Logo" style={{ width: 32, height: 32 }} />}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton sx={styles.icon}>{icons.bell}</IconButton>

        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar
            sx={{ width: 29, height: 29 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </IconButton>

        <WrapperSelect list={listProfile} onClose={() => setAnchorEl(null)} anchorEl={anchorEl} />
      </Box>
    </Box>
  )
}
