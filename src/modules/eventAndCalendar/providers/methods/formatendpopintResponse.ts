import dayjs from 'dayjs'
import { Event, EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { EventsByDate } from 'modules/eventAndCalendar/types'

export const mapEventsByDate = (eventList: Event[]): EventsByDate => {
  const dates = eventList.reduce<EventsByDate>((acc, event) => {
    const date = dayjs(event.startsAt).format('YYYY-MM-DD')
    acc[date] = [...(acc[date] ?? []), event]
    return acc
  }, {})
  return dates
}

export const formatByGeneralCalendar = (eventList: Event[]): EventsListGeneralCalendar[] => {
  const events = eventList.map((event) => {
    return {
      title: event.name,
      start: new Date(event.startsAt),
      end: new Date(event.endsAt),
      id: event.id,
      eventData: event,
    }
  })
  return events
}
