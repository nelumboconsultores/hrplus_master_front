import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import { t } from 'i18next'
import { getStatusInfo } from 'modules/contributors/enums/statusUsers'
import { useContext } from 'react'
import { ProfileDetailContext } from 'modules/contributors/context'

export const TitleAndStatus: React.FC = () => {
  const { profile } = useContext(ProfileDetailContext)
  const statusInfo = getStatusInfo(profile?.profileStatus?.id)
  const statusColor = statusInfo ? statusInfo.color : ''

  return (
    <Box>
      <Typography sx={styles.title}>{t('contributors.detail.profile')}</Typography>
      <Typography variant="body1" sx={{ ...styles.status, background: statusColor }}>
        {statusInfo?.name}
      </Typography>
    </Box>
  )
}
