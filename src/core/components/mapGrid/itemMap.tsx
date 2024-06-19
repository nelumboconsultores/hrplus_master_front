import { Box, Grid, Tooltip, Typography } from '@mui/material'
import { DynamicFormValuesType } from 'core/types'
import { icons, isEllipsisActive, isURL, isVoid } from 'core/utils'
import { styles } from './styles'
import { useEffect, useRef, useState } from 'react'
import { CapitalIconButton } from '../capitalIconButton'
import { useTranslation } from 'react-i18next'

type ItemMapProps = {
  title: string
  value: DynamicFormValuesType
}

export const ItemMap: React.FC<ItemMapProps> = ({ title, value }) => {
  const [isOver, setIsOver] = useState(false)
  const { t } = useTranslation()
  const ref = useRef(null)

  const paint = (value: DynamicFormValuesType): string => {
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'object') return item.name
          return item
        })
        .join(', ')
    }
    if (typeof value === 'boolean') return value ? 'Sí' : 'No'
    if (typeof value === 'string' && isURL(value as string)) {
      return (value.split('/').pop() ?? '').replace(/_/g, ' ')
    }

    return value?.toString()
  }
  useEffect(() => {
    const el = ref.current
    if (el) setIsOver(isEllipsisActive(el))
  }, [])
  const valueString = isVoid(paint(value))
  return (
    <Grid item xs={3} sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Tooltip title={isOver ? valueString : ''} placement="top">
          <Typography
            ref={ref}
            lineHeight={1.1}
            sx={{ ...styles.value, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {valueString}
          </Typography>
        </Tooltip>
        <Typography lineHeight={1.1} sx={{ ...styles.title }}>
          {title}
        </Typography>
      </Box>

      {isURL(value?.toString()) && (
        <Box>
          <CapitalIconButton
            title={t('general.toolTip.download')}
            component={'a'}
            href={value.toString()}
            target="_blank"
            rel="noreferrer noopener"
          >
            {icons.save}
          </CapitalIconButton>
        </Box>
      )}
    </Grid>
  )
}
