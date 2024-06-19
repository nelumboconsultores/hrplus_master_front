import { Event, EventsListGeneralCalendar } from '../service/types'

export type PopoverEventProps = {
  anchorEl: HTMLElement | null
  open: boolean
  events?: EventsListGeneralCalendar[]
  eventsByDays?: Event[]
}
