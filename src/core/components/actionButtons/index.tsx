import { Box, IconButton, Tooltip } from '@mui/material'
import { icons } from 'core'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { MouseEvent } from 'react'

type ActionButtonsProps = {
  isActivate?: boolean
  disabled?: boolean
  onClick: {
    visualize?: () => void
    edit?: () => void
    power?: () => void
    remove?: () => void
    arrow?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    schema?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  }
}

export const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const {
    isActivate,
    disabled,
    onClick: { remove, edit, power, visualize, arrow, schema },
  } = props
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {visualize && (
        <Tooltip title={t('general.toolTip.visualize')}>
          <IconButton sx={styles.icons} onClick={visualize}>
            {icons.Visibility}
          </IconButton>
        </Tooltip>
      )}
      {edit && (
        <Tooltip title={t('general.toolTip.edit')}>
          <IconButton sx={styles.icons} onClick={edit}>
            {icons.edit}
          </IconButton>
        </Tooltip>
      )}
      {power && (
        <Tooltip title={t(isActivate ? 'general.toolTip.inactive' : 'general.toolTip.active')}>
          <IconButton
            sx={isActivate ? styles.iconsPower : styles.icons}
            onClick={power}
            disabled={disabled}
          >
            {icons.power}
          </IconButton>
        </Tooltip>
      )}

      {arrow && (
        <Tooltip title={t('general.toolTip.arrow')}>
          <IconButton sx={styles.arrowBlue} onClick={(e) => arrow(e)}>
            {icons.arrowForward}
          </IconButton>
        </Tooltip>
      )}
      {schema && (
        <Tooltip title={t('general.toolTip.schema')}>
          <IconButton sx={styles.schemaBlue} onClick={(e) => schema(e)}>
            {icons.accountTreeOutlined}
          </IconButton>
        </Tooltip>
      )}
      {remove && (
        <Tooltip title={t('general.toolTip.delete')}>
          <IconButton sx={styles.icons} onClick={remove}>
            {icons.delete}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
