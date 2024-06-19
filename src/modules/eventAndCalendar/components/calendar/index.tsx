import { useContext } from 'react'
import { EventsAndCalendarContext } from 'modules/eventAndCalendar/context'
import { CalendarPaper } from './calendarPaper'
import { GeneralCalendar } from './generalCalendar'
import { AnualCalendar } from './anualCalendar'
import { CalendarType } from 'modules/eventAndCalendar/enum'
import { useEventCalendarContext } from 'modules/eventAndCalendar/hooks'
import Spinner from 'core/components/spinner'

export const Calendar: React.FC = () => {
  const { calendarMode } = useContext(EventsAndCalendarContext)
  const { loadings } = useEventCalendarContext()

  if (loadings.main) return <Spinner />

  return (
    <CalendarPaper>
      {calendarMode === CalendarType.Year ? <AnualCalendar /> : <GeneralCalendar />}
    </CalendarPaper>
  )
}
