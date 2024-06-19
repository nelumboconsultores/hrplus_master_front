import { Box, Icon, IconButton, Typography } from '@mui/material'
import { TemplateCardItem } from 'core/components'
import { styles } from './styles'
import { icons } from 'core'

type DetailCardProps = {
  structures: { id: number; data: { name: string; type: string }[] }
  onDelete?: (id: number) => void
  isDetail?: boolean
}

export const DetailCard: React.FC<DetailCardProps> = ({ structures, onDelete, isDetail }) => {
  const { data } = structures

  const isDetailClass = (className: string) => (isDetail ? `${className} detail` : className)

  return (
    <TemplateCardItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={styles.detailCard}>
        {data?.map((structure, index) => (
          <Box key={index} className="containerArrow">
            <Box>
              <Typography className={isDetailClass('name')}>{structure.name}</Typography>
              <Typography className={isDetailClass('type')}>{structure.type}</Typography>
            </Box>

            {index < data.length - 1 && (
              <Icon color="primary" className="icon">
                {icons.arrowForward}
              </Icon>
            )}
          </Box>
        ))}
      </Box>
      {onDelete && (
        <Box>
          <IconButton color="error" onClick={() => onDelete && onDelete(structures.id)}>
            {icons.close}
          </IconButton>
        </Box>
      )}
    </TemplateCardItem>
  )
}
