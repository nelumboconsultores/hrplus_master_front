import { Grid } from '@mui/material'
import { styles } from './styles'

import { ItemTitleNormal } from './itemTitleNormal'

type TitleWithArrowProps = {
  titles: string[]
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
}

export const TitleNormal: React.FC<TitleWithArrowProps> = (props) => {
  return (
    <Grid container spacing={3} sx={styles.container}>
      {props.titles.map((title, index) => {
        return <ItemTitleNormal {...props} key={index} index={index} title={title} />
      })}
    </Grid>
  )
}
