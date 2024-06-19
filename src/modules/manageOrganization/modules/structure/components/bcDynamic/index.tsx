import { Breadcrumbs, Typography } from '@mui/material'
import { styles } from './styles'
import { RouteRoad } from '../../types'

export const BCDynamic = ({ list }: { list: RouteRoad[] }) => {
  const validateLabel = (label: string) => {
    if (label === undefined) return ''

    return label
  }
  if (list.length > 4) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={styles.text}>
          {validateLabel(list[1]?.entityName) + ' ' + validateLabel(list[1]?.instanceName)}
        </Typography>
        <Typography sx={styles.text}>...</Typography>
        <Typography sx={styles.text}>
          {validateLabel(list[list.length - 2]?.entityName) +
            ' ' +
            validateLabel(list[list.length - 2]?.instanceName)}
        </Typography>
        <Typography sx={styles.text}>
          {validateLabel(list[list.length - 1]?.entityName) +
            ' ' +
            validateLabel(list[list.length - 1]?.instanceName)}
        </Typography>
      </Breadcrumbs>
    )
  }
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {list?.map(
        (item, index) =>
          validateLabel(item?.entityName) &&
          validateLabel(item?.instanceName) && (
            <Typography key={index} sx={styles.text}>
              {validateLabel(item?.entityName) + ' ' + validateLabel(item?.instanceName)}
            </Typography>
          ),
      )}
    </Breadcrumbs>
  )
}
