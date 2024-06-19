import { Box, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { icons, isURL } from 'core/utils'
import { useTranslation } from 'react-i18next'
import { CapitalIconButton } from '../capitalIconButton'
import { styles } from './styles'
import { useContext } from 'react'
import { AppContext } from 'core/context'
type TitleWithArrowProps = {
  title: string
  subtitles: Array<
    | string
    | number
    | boolean
    | number[]
    | {
        name: string
        id: number
      }[]
  >
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  index: number
}

export const ItemTitleNormal: React.FC<TitleWithArrowProps> = ({ index, title, ...props }) => {
  const { open } = useContext(AppContext)
  const isFile = isURL(props.subtitles[index].toString())
  const isMobile = useMediaQuery('(max-width:1372px)')

  const { t } = useTranslation()

  const convertToTitle = (
    title: string | number | boolean | number[] | { name: string; id: number }[],
  ): string => {
    if (!title) return '-'
    if (Array.isArray(title)) {
      const newTitle = title?.map((t) => (typeof t === 'number' ? t : t.name))
      return newTitle.join(', ')
    } else if (typeof title === 'string' && isURL(title as string)) {
      return (title.split('/').pop() ?? '-').replace(/_/g, ' ')
    } else return String(title)
  }

  const value = convertToTitle(props.subtitles[index])
  const mobileSize = open ? 36 : 55
  const trimSize = isMobile ? mobileSize : 120
  const isLong = value.length > trimSize

  return (
    <Grid key={index} item xs={12} lg={3} sx={styles.gridContainer}>
      <Box sx={{ overflow: 'hidden' }}>
        <Tooltip title={isLong ? value : ''} placement="top">
          <Typography lineHeight={1} sx={styles.title}>
            <span>{isLong ? value.substring(0, trimSize) + '...' : value}</span>
          </Typography>
        </Tooltip>
        <Typography lineHeight={1} sx={styles.subtitle}>
          {title}
        </Typography>
      </Box>

      {isFile && (
        <CapitalIconButton
          title={t('general.toolTip.download')}
          component={'a'}
          href={props.subtitles[index].toString()}
          target="_blank"
          rel="noreferrer noopener"
        >
          {icons.save}
        </CapitalIconButton>
      )}
    </Grid>
  )
}
