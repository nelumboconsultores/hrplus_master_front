import { Grid } from '@mui/material'
import Sticky from 'react-sticky-el'
import { InformativeCard } from '../informativeCard'
import { InformationGeneral } from '../informationGeneral'
import { styles } from './styles'

const windowHeight = window.innerHeight
export const DetailsLayout: React.FC = () => {
  const disableSticky = windowHeight < 725
  return (
    <Grid container sx={styles.grid}>
      <Grid item sx={styles.gridLeft}>
        <Sticky stickyStyle={{ top: '10px' }} disabled={disableSticky}>
          <InformativeCard />
        </Sticky>
      </Grid>
      <Grid item sx={styles.gridRight}>
        <InformationGeneral />
      </Grid>
    </Grid>
  )
}
