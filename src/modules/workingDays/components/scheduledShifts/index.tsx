import { Box, Grid, Typography } from '@mui/material'
import { styles } from './styles'

type ScheduledShiftsProps = {
  value: Array<{
    scheduled: Array<string>
    schedule: Array<string>
  }>
}

export const ScheduledShifts: React.FC<ScheduledShiftsProps> = ({ value }) => {
  return (
    <Box sx={styles.container}>
      {value.map((item, index: number) => (
        <Grid container key={index} justifyContent={'space-between'}>
          <Grid item xs={6}>
            <Typography sx={styles.days}>{item.scheduled.join(', ')}</Typography>
          </Grid>

          <Grid item xs={6}>
            {item.schedule.map((item, index: number) => (
              <Box key={index} sx={{ display: 'flex' }}>
                <Typography sx={styles.hour}>{item}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
