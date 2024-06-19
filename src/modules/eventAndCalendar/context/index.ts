import { createContext } from 'react'
import { EventModal, EventsByDate, Loadings, changeType } from '../types'
import { Dayjs } from 'dayjs'
import { CalendarType } from '../enum'
import { EventsListGeneralCalendar } from '../service/types'

export const EventsAndCalendarContext = createContext<{
  eventList: EventsByDate
  modal: EventModal
  loadings: Loadings
  currentDateSelector: Dayjs
  calendarMode: CalendarType
  generalCalendarEvents: EventsListGeneralCalendar[]
  openModal: () => void
  closeModal: () => void
  setCalendarMode: React.Dispatch<React.SetStateAction<CalendarType>>
  changeDateSelector: (to: changeType) => void
  fetchEvents: (eventTypeId?: string) => Promise<void>
  previousRoute: { hash: string; key: string; pathname: string; search: string; state: null }
}>(Object({}))
