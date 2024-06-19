import { Grid } from '@mui/material'
import { Calendar, CalendarHeader, EventDetailModal } from 'modules/eventAndCalendar/components'

const ScheduleHolidays = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CalendarHeader />
        </Grid>

        <Grid item xs={12}>
          <Calendar />
        </Grid>
      </Grid>

      <EventDetailModal />
    </>
  )
}

export { ScheduleHolidays }
