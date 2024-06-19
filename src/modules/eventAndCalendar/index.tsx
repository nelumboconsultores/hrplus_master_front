import { EventsAndCalendarProvider } from './providers'
import { RoutesProvider } from './routes'

const ScheduleHolidaysModule = () => {
  return (
    <EventsAndCalendarProvider>
      <RoutesProvider />
    </EventsAndCalendarProvider>
  )
}

export default ScheduleHolidaysModule
