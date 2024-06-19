import { Grid } from '@mui/material'
import { DynamicFormValuesType } from 'core/types'
import { ItemMap } from './itemMap'

type MapGridProps = {
  arrayInfo: Array<{
    title: string
    value: DynamicFormValuesType
  }>
}

export const MapGrid: React.FC<MapGridProps> = ({ arrayInfo }) => {
  return (
    <Grid container spacing={1} rowGap={2}>
      {arrayInfo.map((item, key) => {
        return <ItemMap title={item.title} value={item.value} key={key} />
      })}
    </Grid>
  )
}
