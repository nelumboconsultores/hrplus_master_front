import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { icons } from 'core'
import { TemplateTextBlockProps } from '../../types/componentsMap'
import { styles } from './textLinkStyles'
import { useTranslation } from 'react-i18next'

export const TextLink: React.FC<TemplateTextBlockProps> = ({ title, description }) => {
  const handleLinkClick = () => {
    if (description) {
      window.open(description, '_blank')
    }
  }
  const { t } = useTranslation()
  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>
      <Grid container>
        <Grid item xs={8} md={8} lg={10} xl={9}>
          <Paper sx={styles.paper}>
            <Typography lineHeight={1.3} sx={styles.catalogue}>
              {t('incidents.detail.link')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          {description && (
            <IconButton sx={styles.iconColor} onClick={handleLinkClick}>
              {icons.link}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
