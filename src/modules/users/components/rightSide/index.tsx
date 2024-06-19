import { Box, Typography } from '@mui/material'
import { TemplatePaper, keyImg } from 'core'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'

export const RightSide = () => {
  const { t } = useTranslation()

  return (
    <TemplatePaper>
      <Box sx={styles.container}>
        <Box sx={styles.firstImage}>
          <img src={keyImg.chandelier} width={'100%'} />
        </Box>

        <Typography variant="grayText" sx={{ textAlign: 'center' }}>
          {t('users.paragraph.youMustSelectAtLeastOneGroup')}
        </Typography>

        <Box>
          <img src={keyImg.purpleFolder} width={'100%'} />
        </Box>
      </Box>
    </TemplatePaper>
  )
}
