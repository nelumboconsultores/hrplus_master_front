import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { EventsAndCalendarContext } from '../context'
import { getEventsList } from '../service'
import { EventModal, EventsByDate, changeType } from '../types'
import { mapEventsByDate, formatByGeneralCalendar } from './methods'
import dayjs, { Dayjs } from 'dayjs'
import { CalendarType } from '../enum'
import { changeDateSelector } from '../utils/dateSelectorUtils'
import { EventsListGeneralCalendar } from '../service/types'
import { PathName, generateQueryParams } from 'core'
import { usePreviousRoute } from '../modules/eventConfiguration/hooks'

const EventsAndCalendarProvider = ({ children }: { children: React.ReactElement }) => {
  const [currentDateSelector, setCurrentDateSelector] = React.useState<Dayjs>(dayjs())
  const [calendarMode, setCalendarMode] = React.useState<CalendarType>(CalendarType.Year)
  const [eventList, setEventList] = React.useState<EventsByDate>({})
  const [generalCalendarEvents, setGeneralCalendarEvents] = React.useState<
    EventsListGeneralCalendar[]
  >([])
  const [modal, setModal] = React.useState<EventModal>({ open: false })
  const [loadings, setLoadings] = React.useState({ main: true })
  const previousRoute = usePreviousRoute()
  const fetchEvents = useCallback(async (eventTypeId?: string) => {
    setLoadings((prev) => ({ ...prev, main: true }))
    const body = { eventTypeId: eventTypeId }
    const { data } = await getEventsList(generateQueryParams(body))
    if (data) {
      setEventList(mapEventsByDate(data.data))
      setGeneralCalendarEvents(formatByGeneralCalendar(data.data))
    }
    setLoadings((prev) => ({ ...prev, main: false }))
  }, [])

  const changeDate = (to: changeType) => {
    const newDate = changeDateSelector(currentDateSelector, calendarMode, to)
    setCurrentDateSelector(newDate)
  }
  const openModal = () => setModal((prev) => ({ ...prev, open: true }))
  const closeModal = () => setModal((prev) => ({ ...prev, open: false }))

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useLayoutEffect(() => {
    if (
      previousRoute.pathname.includes(PathName.Events) &&
      location.pathname === PathName.EventsAndCalendar
    ) {
      localStorage.removeItem('eventBody')
    }
    const needRefresh =
      previousRoute.pathname.includes(PathName.eventDescription) ||
      previousRoute.pathname.includes(PathName.eventDateAndOccurrence) ||
      previousRoute.pathname.includes(PathName.eventGuests)

    if (needRefresh && location.pathname === PathName.EventsAndCalendar) fetchEvents()
  }, [location.pathname]) // eslint-disable-line
  return (
    <EventsAndCalendarContext.Provider
      value={{
        setCalendarMode,
        openModal,
        closeModal,
        fetchEvents,
        changeDateSelector: changeDate,
        loadings,
        modal,
        currentDateSelector,
        calendarMode,
        eventList,
        generalCalendarEvents,
        previousRoute,
      }}
    >
      {children}
    </EventsAndCalendarContext.Provider>
  )
}

export { EventsAndCalendarProvider }
