import { Grid, Paper } from '@mui/material'
/* import { keyImg } from 'core' */
import { styles } from './styles'
type WrapperBackgroundProps = { children: React.ReactNode; img: string }

export const WrapperBackground: React.FC<WrapperBackgroundProps> = (props) => {
  const { img, children } = props
  return (
    <Paper sx={styles.container}>
      <Grid container>
        <Grid item xs={12} sm={5.5}>
          <img src={img} alt="Login" style={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6.5} sx={styles.gridMain}>
          {/*   <Box sx={styles.logo}>
            <img src={keyImg.logoCheck} alt="Logo" style={{ width: '100%', height: '100%' }} />
          </Box> */}
          {children}
        </Grid>
      </Grid>
    </Paper>
  )
}
