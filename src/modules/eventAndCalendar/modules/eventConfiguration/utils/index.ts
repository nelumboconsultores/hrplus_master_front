import { editEventBody, eventBody } from 'modules/eventAndCalendar/service'
import { fileArray } from '../components'
import dayjs, { Dayjs } from 'dayjs'

export type dataForm = {
  name?: string
  description?: string
  url?: string
  files?: fileArray[]
  global?: boolean
  periodicity?: number
  reminder?: number
  date?: string
  from?: string
  to?: string
  dateFrom?: string
  dateTo?: string
  eventTypeId?: number
  eventDatePeriods?: {
    startsAt: string
    endsAt: string
    daysOfWeek: number[]
  }[]
}

export const createBodyForm = (dataForm: dataForm): eventBody => {
  const arrayFiles = dataForm?.files?.map((file) => {
    const type = file.url.split('.').pop()
    return {
      id: file.id,
      name: file.name,
      description: file.description,
      url: file.url,
      type,
    }
  })
  const eventData = {
    ...(!!dataForm.name && { name: dataForm.name }),
    ...(!!dataForm.description && { description: dataForm.description }),
    ...(!!dataForm.url && { url: dataForm.url }),
    ...(!!arrayFiles && { files: arrayFiles }),
  }
  const eventDatePeriodsUnit = {
    ...(!!dataForm.from && { startsAt: dataForm.from }),
    ...(!!dataForm.to && { endsAt: dataForm.to }),
    ...(!!dataForm.from && !!dataForm.to && { daysOfWeek: [] }),
  }

  const eventDatePeriodsMany = dataForm?.eventDatePeriods?.map((e) => {
    return {
      startsAt: e.startsAt,
      endsAt: e.endsAt,
      daysOfWeek: e.daysOfWeek,
    }
  })
  return {
    ...(!!dataForm.eventTypeId && { eventTypeId: dataForm.eventTypeId }),
    eventDetailTypeId: 2,
    ...(!!dataForm.reminder && { minsReminder: dataForm.reminder }),
    ...(!!dataForm.periodicity && { periodicityId: dataForm.periodicity }),
    ...(!!dataForm.date && { dateFrom: dayjs(dataForm.date, 'DD/MM/YYYY').format('YYYY-MM-DD') }),
    ...(!!dataForm.dateFrom && { dateFrom: dayjs(dataForm.dateFrom).format('YYYY-MM-DD') }),
    ...(!!dataForm.dateTo && { dateTo: dayjs(dataForm.dateTo).format('YYYY-MM-DD') }),
    ...(Object.keys(eventData).length !== 0 && { eventData: eventData }),
    ...(!!dataForm.global && { global: dataForm.global }),
    ...(Object.keys(eventDatePeriodsUnit).length !== 0 && {
      eventDatePeriods: [eventDatePeriodsUnit],
    }),
    ...(!!eventDatePeriodsMany &&
      eventDatePeriodsMany?.length > 0 && { eventDatePeriods: eventDatePeriodsMany }),
  }
}

export const editBodyEvent = (dataForm: eventBody): editEventBody => {
  return {
    startsAt: dataForm?.eventDatePeriods?.[0]?.startsAt ?? '',
    endsAt: dataForm?.eventDatePeriods?.[0]?.endsAt ?? '',
    dateFrom: dataForm?.dateFrom ?? '',
    eventTypeId: dataForm?.eventTypeId,
    eventData: {
      description: dataForm?.eventData?.description ?? '',
      name: dataForm?.eventData?.name ?? '',
      url: dataForm?.eventData?.url ?? '',
      files: dataForm?.eventData?.files ?? [],
    },
  }
}

export const getWeekdaysBetweenDates = (startDate: Dayjs, endDate: Dayjs): number[] => {
  const weekdays: number[] = []
  let current = startDate.startOf('day')
  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    let dayOfWeek = current.day()
    if (dayOfWeek === 0) dayOfWeek = 7
    if (!weekdays.includes(dayOfWeek)) {
      weekdays.push(dayOfWeek)
    }
    current = current.add(1, 'day')
  }
  weekdays.sort((a, b) => a - b)

  return weekdays
}
