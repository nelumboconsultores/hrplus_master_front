import { Box, Icon, IconButton, Typography } from '@mui/material'
import { TemplateCardItem, icons } from 'core'
import { CardArrows } from 'modules/manageOrganization/types'
import { styles } from './styles'

type DetailCardProps = {
  structures: CardArrows
  onDelete?: (id: number) => void
  hideShadow?: boolean
  checked?: boolean
  checkedProps?: {
    active?: boolean
    click?: (id: number) => void
  }
}

export const DetailCard: React.FC<DetailCardProps> = ({
  structures,
  onDelete,
  hideShadow,
  checked,
  checkedProps,
}) => {
  const { data } = structures

  return (
    <TemplateCardItem
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      hideShadow={hideShadow}
    >
      <Box sx={styles.detailCard}>
        {checked && (
          <IconButton
            color="secondary"
            onClick={() =>
              typeof checkedProps?.click === 'function' && checkedProps.click(structures?.id ?? 1)
            }
          >
            {checkedProps?.active || structures.check
              ? icons.radioButtonChecked
              : icons.radioButtonUnchecked}
          </IconButton>
        )}
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
        {onDelete && (
          <IconButton color="error" onClick={() => onDelete && onDelete(structures.id ?? 1)}>
            {icons.close}
          </IconButton>
        )}
      </Box>
    </TemplateCardItem>
  )
}
