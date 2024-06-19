import { DELETE, GET, POST, PUT } from 'core/services'
import { EventDetailResponse, EventResponse, eventDetailT } from './types'

export const getEventsList = async (params: string) => {
  const response = await GET<EventResponse>(`/event-dates?${params}`)
  return response
}

export const getEventDetail = async (id: number | string) => {
  const response = await GET<EventDetailResponse>(`/event-dates/${id}`)
  return response
}
export type eventBody = {
  eventTypeId?: number
  eventDetailTypeId?: number
  minsReminder?: number
  periodicityId?: number
  dateFrom?: string
  dateTo?: string
  eventData?: {
    name?: string
    description?: string
    url?: string
    files?: {
      name?: string
      description?: string
      url?: string
      id?: number
    }[]
  }
  global?: true
  eventDatePeriods?: {
    startsAt?: string
    endsAt?: string
    daysOfWeek?: number[]
  }[]
}

type eventResponse = {
  data: {
    eventDate: {
      id: number
      startsAt: string
      endsAt: string
      eventType: {
        id: number
        name: string
        color: string
      }
      ownerId: number
      eventDetail: eventDetailT
      createdAt: string
      minsReminder: number
      name: string
      global: true
    }
    eventIdsRelated: number[]
  }
}

export const createEvent = async (body: eventBody) => {
  const response = await POST<eventResponse, eventBody>('/event-dates', body)
  return response
}

export type editEventBody = {
  startsAt: string
  endsAt: string
  dateFrom: string
  eventTypeId?: number | undefined
  eventData: {
    name: string
    description: string
    url: string
    files?: {
      name?: string
      description?: string
      url?: string
      id?: number
    }[]
  }
}

export type ditEventResponse = {
  data: {
    id: number
    startsAt: string
    endsAt: string
    eventType: {
      id: number
      name: string
      color: string
    }
    ownerId: number
    eventDetail: {
      id: number
      name: string
      eventData: {
        name: string
        description: string
        url: string
        files: {
          name: string
          description: string
          url: string
          id?: number
        }[]
      }
      eventDetailType: {
        id: number
        name: string
      }
    }
    createdAt: string
    minsReminder: number
    global: boolean
  }
}

export const editEvent = async (body: editEventBody, id: number) => {
  const response = await PUT<ditEventResponse, editEventBody>(`/event-dates/${id}`, body)
  return response
}

type getEventDetailsResponse = {
  data: {
    id: number
    startsAt: string
    endsAt: string
    eventType: {
      id: number
      name: string
      color: string
    }
    minsReminder: number
    ownerId: number
    eventDetail: {
      id: number
      name: string
      eventData: {
        name: string
        description: string
        url: string
        files: {
          name: string
          description: string
          url: string
          id?: number
        }[]
      }
      eventDetailType: {
        id: number
        name: string
      }
    }
    global: true
    createdAt: string
  }
}

export const removeEvent = async (id: number) => {
  const response = await DELETE<{ data: { success: boolean } }>(`/event-dates/${id}`)
  return response
}

export const getEventDetails = async (eventDateId: number) => {
  const response = await GET<getEventDetailsResponse>(`/event-dates/${eventDateId}`)
  return response
}
