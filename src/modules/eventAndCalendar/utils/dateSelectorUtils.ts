import { Dayjs } from 'dayjs'
import { CalendarType } from '../enum'
import { changeType } from '../types'

export const changeDateSelector = (date: Dayjs, calendarType: CalendarType, to: changeType) => {
  switch (calendarType) {
    case CalendarType.Year:
      return to === 'forward' ? date.add(1, 'year') : date.subtract(1, 'year')
    case CalendarType.Month:
      return to === 'forward' ? date.add(1, 'month') : date.subtract(1, 'month')
    case CalendarType.week:
      return to === 'forward' ? date.add(1, 'week') : date.subtract(1, 'week')
    case CalendarType.Day:
      return to === 'forward' ? date.add(1, 'day') : date.subtract(1, 'day')
    default:
      return date
  }
}

export const getByCalendarType = (calendarType: CalendarType, date: Dayjs) => {
  switch (calendarType) {
    case CalendarType.Year:
      return date.year()
    case CalendarType.Month:
      return date.month()
    case CalendarType.week:
      return `${date.startOf('week').date()}-${date.endOf('week').date()} ${date
        .month()
        .toLocaleString()} ${date.year}`
    case CalendarType.Day:
      return date.date()
    default:
      return date.toString()
  }
}
