import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { TemplateCardItem, icons } from 'core'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'

type infoCardType = {
  label: string
  title: string
  clearPost: () => void
}

export const ItemCard: React.FC<infoCardType> = ({ label, title, clearPost }) => {
  const { t } = useTranslation()
  return (
    <TemplateCardItem>
      <Box sx={styles.container}>
        <Box>
          <Typography className="label">{label}</Typography>
          <Typography className="title">{title}</Typography>
        </Box>
        <Tooltip title={t('general.toolTip.delete')}>
          <IconButton color="error" onClick={() => clearPost()}>
            {icons.close}
          </IconButton>
        </Tooltip>
      </Box>
    </TemplateCardItem>
  )
}
