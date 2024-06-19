import { Box, Typography } from '@mui/material'
import { GeneralAccordion, TitleNormal } from 'core'
import { styles } from './styles'

type StoreInfoProps = {
  accordionTitle: string
  titles: string[]
  values: (string | boolean | number | undefined | null)[]
  titleSegundary?: string
  subtitile?: string
}

export const StoreInfo: React.FC<StoreInfoProps> = ({
  accordionTitle,
  titles,
  values,
  titleSegundary,
  subtitile,
}) => {
  const renderValue = (value: string | boolean | number | undefined | null): string => {
    if (value === undefined || value === null || value === '') {
      return '-'
    } else if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No'
    } else if (Array.isArray(value)) {
      return value.map((v) => v.name).join(', ')
    }
    return String(value)
  }

  const subtitlesWithPlaceholder = values.map((value) => renderValue(value))
  return (
    <GeneralAccordion
      title={accordionTitle}
      props={{
        accordionProps: {
          defaultExpanded: true,
        },
      }}
    >
      {titleSegundary && (
        <Box sx={{ paddingBottom: subtitile ? '0px' : '12px' }}>
          <Typography sx={styles.titleDenom}>{titleSegundary}</Typography>
        </Box>
      )}
      {subtitile && (
        <Box sx={{ paddingBottom: '12px' }}>
          <Typography sx={styles.titleCode}>{subtitile}</Typography>
        </Box>
      )}
      <TitleNormal titles={titles} subtitles={subtitlesWithPlaceholder} />
    </GeneralAccordion>
  )
}
