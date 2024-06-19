import { Box, Typography } from '@mui/material'
import { styles } from '../styles'
import { keyImg } from 'core'
import { useTranslation } from 'react-i18next'

export const InitialView = () => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.container}>
      <Box sx={styles.firstImage}>
        <img src={keyImg.chandelier} width={'100%'} />
      </Box>

      <Typography variant="grayText" sx={{ textAlign: 'center' }}>
        {t('workingDays.subtitle.youMustAddLeastOneWorking')}
      </Typography>

      <Box>
        <img src={keyImg.purpleFolder} width={'100%'} />
      </Box>
    </Box>
  )
}
