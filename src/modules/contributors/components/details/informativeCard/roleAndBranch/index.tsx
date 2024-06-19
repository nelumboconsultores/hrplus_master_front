import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import { useContext } from 'react'
import { ProfileDetailContext } from 'modules/contributors/context'
import { t } from 'i18next'

export const RoleAndBranch: React.FC = () => {
  const { profile } = useContext(ProfileDetailContext)
  return (
    <Box padding="0 0 16px 0">
      <Typography sx={styles.role}>
        {profile?.workPosition?.denomination ?? t('contributors.detail.noWork')}
      </Typography>
      <Typography sx={styles.department}>
        {profile?.compCategory?.denomination ?? t('contributors.detail.noPost')}
      </Typography>
      <Typography sx={styles.branch}>
        {profile?.workPosition?.store?.denomination ?? t('contributors.detail.noStore')}
      </Typography>
    </Box>
  )
}
