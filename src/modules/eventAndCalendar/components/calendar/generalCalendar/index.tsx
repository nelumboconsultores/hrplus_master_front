import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import React, { useContext, useMemo } from 'react'
import { Box } from '@mui/material'
import { EventsAndCalendarContext } from 'modules/eventAndCalendar/context'
import { EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { EventListPopover } from '../../popovers'
import { CustomToolbar } from './customToolbar'
import { CustomEvent } from './customEvents'
import { CalendarType } from 'modules/eventAndCalendar/enum'
import { EventViewer } from './eventViewer'
dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)

type EventsInfo = {
  events: EventsListGeneralCalendar[]
  date: dayjs.Dayjs
}
const eventsInfo: EventsInfo = { events: [], date: dayjs() }

const ShowMoreComponent: React.FC<{ total: number }> = ({ total }) => {
  const [anchorEl, setAnchorEl] = React.useState<{ anchorEl: HTMLElement | null; open: boolean }>({
    anchorEl: null,
    open: false,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl({ anchorEl: event.currentTarget as HTMLElement, open: true })
  }
  return (
    <>
      <Box onClick={handleClick}>{`+${total} más`}</Box>

      <EventListPopover
        popoverInfo={anchorEl}
        onClose={() => setAnchorEl({ anchorEl: null, open: false })}
        events={eventsInfo.events}
        date={eventsInfo.date}
      />
    </>
  )
}

const rangeByMode: Record<CalendarType, dayjs.OpUnitType> = {
  [CalendarType.Month]: 'month',
  [CalendarType.Year]: 'year',
  [CalendarType.week]: 'week',
  [CalendarType.Day]: 'day',
}

const eventsByRange = (events: EventsListGeneralCalendar[], start: Date, end: Date) => {
  return events.filter((event) => {
    return event.start >= start && event.end <= end
  })
}

export const GeneralCalendar: React.FC = () => {
  const { currentDateSelector, generalCalendarEvents, calendarMode } =
    useContext(EventsAndCalendarContext)

  const eventsByDate = useMemo(() => {
    return eventsByRange(
      generalCalendarEvents,
      currentDateSelector.startOf(rangeByMode[calendarMode]).toDate(),
      currentDateSelector.endOf(rangeByMode[calendarMode]).toDate(),
    )
  }, [generalCalendarEvents, currentDateSelector, calendarMode])

  console.log('eventsByDate', eventsByDate)

  return (
    <Box sx={{ height: '700px', mt: 1 }}>
      <Calendar
        localizer={localizer}
        events={eventsByDate as never[]}
        culture="es"
        messages={{
          showMore: (total) => (<ShowMoreComponent total={total} />) as unknown as string,
        }}
        doShowMoreDrillDown={false}
        onShowMore={(events, date) => {
          eventsInfo.events = events
          eventsInfo.date = dayjs(date)
        }}
        components={{
          toolbar: CustomToolbar,
          eventWrapper: CustomEvent,
          event: EventViewer,
        }}
        defaultDate={currentDateSelector.toDate()}
      />
    </Box>
  )
}
