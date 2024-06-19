import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalendarWithEvents } from './calendarWithEvents'
import { useEventCalendarContext } from 'modules/eventAndCalendar/hooks'
import { Grid } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from 'core'
import { DateSelector } from '../dateSelector'

const drawer = {
  close: {
    xl: 3,
    lg: 3,
    laptop: 4,
    md: 4,
    sm: 6,
    mobile: 12,
    xs: 12,
  },
  open: {
    xl: 3,
    lg: 4,
    laptop: 6,
    md: 6,
    sm: 12,
    mobile: 12,
    xs: 12,
  },
}
const monthsArray = new Array(12).fill(1)
const AnualCalendar = () => {
  const { open } = useContext(AppContext)
  const { currentDateSelector, changeDateSelector } = useEventCalendarContext()
  const year = currentDateSelector.year()

  const toForward = () => changeDateSelector('forward')
  const toBackward = () => changeDateSelector('backward')
  return (
    <>
      <DateSelector onBackward={toBackward} onForward={toForward} />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Grid container spacing={4}>
          {monthsArray.map((_, month) => (
            <Grid item key={`${year}-${month}`} {...(open ? drawer.open : drawer.close)}>
              <CalendarWithEvents month={month} />
            </Grid>
          ))}
        </Grid>
      </LocalizationProvider>
    </>
  )
}

export { AnualCalendar }
