import { Box, Paper, Typography } from '@mui/material'
import { keyImg } from 'core'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
export const CheckCard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <Paper className="btn" elevation={2} sx={styles.container} onClick={() => navigate('#')}>
      <Box sx={styles.img}>
        <img src={keyImg.IKeyImg} alt="check" height={'100%'} width={'100%'} />
      </Box>

      <Typography sx={{ color: '#FFFFFF' }}>{t('home.licenseCheck')}</Typography>
    </Paper>
  )
}
