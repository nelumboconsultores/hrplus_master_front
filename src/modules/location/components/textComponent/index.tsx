import { Grid, Typography } from '@mui/material'
import { styles } from './textComponentStyles'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Textcomponet: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography lineHeight={1.1} color="text.primary" sx={styles.text}>
          {t('location.title.text')}
        </Typography>
        <Typography lineHeight={1.1} color="text.primary" sx={styles.subText}>
          {t('location.title.subText')}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={styles.description}>
        {t('location.description')}
      </Grid>
    </Grid>
  )
}
