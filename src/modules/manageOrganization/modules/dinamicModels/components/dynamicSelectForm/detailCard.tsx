import { Box, Icon, IconButton, Tooltip, Typography } from '@mui/material'
import { TemplateCardItem } from '../../../../../../core/components'
import { styles } from './styles'
import { icons } from 'core'
import { t } from 'i18next'

type DetailCardProps = {
  structures: { id: number; data: { name: string; type: string }[] }
  onDelete?: (id: number) => void
}

export const DetailCard: React.FC<DetailCardProps> = ({ structures, onDelete }) => {
  const { data } = structures

  return (
    <TemplateCardItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={styles.detailCard}>
        {data?.map((structure, index) => (
          <Box key={index} className="containerArrow">
            <Box>
              <Typography className="name">{structure.name}</Typography>
              <Typography className="type">{structure.type}</Typography>
            </Box>

            {index < data.length - 1 && (
              <Icon color="primary" className="icon">
                {icons.arrowForward}
              </Icon>
            )}
          </Box>
        ))}
      </Box>
      <Box>
        <IconButton color="error" onClick={() => onDelete && onDelete(structures.id)}>
          <Tooltip title={t('general.toolTip.delete')}>{icons.close}</Tooltip>
        </IconButton>
      </Box>
    </TemplateCardItem>
  )
}
