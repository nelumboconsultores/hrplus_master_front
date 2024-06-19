import { DELETE, GET, POST, PUT } from 'core/services'
import {
  AddEventTypeBody,
  AssignmentsEventBody,
  AssignmentsEventResponse,
  EventTypeResponse,
  GetEventTypesResponse,
} from './types'
import { AsyncReturnType } from 'core'

export const getEventsTypes = async () => {
  const response = await GET<GetEventTypesResponse>(`/event-types`)
  return response
}
export const getEventType = async (eventTypeId: number) => {
  const response = await GET<GetEventTypesResponse>(`/event-types/${eventTypeId}`)
  return response
}

export const getAssignmentsEvent = async (
  eventId: number,
): AsyncReturnType<AssignmentsEventResponse> => {
  const response = await GET<AssignmentsEventResponse>(
    `/event-dates/${eventId}/profile-assignments`,
  )
  return response
}

export const addEventType = async (body: AddEventTypeBody): AsyncReturnType<EventTypeResponse> => {
  const response = await POST<EventTypeResponse, AddEventTypeBody>('/event-types', body)
  return response
}

export const assignmentsEvent = async (
  eventId: number,
  body: AssignmentsEventBody,
): AsyncReturnType<EventTypeResponse> => {
  const response = await POST<EventTypeResponse, AssignmentsEventBody>(
    `/event-dates/${eventId}/profile-assignments`,
    body,
  )
  return response
}

export const UpdateEventType = async (eventTypeId: number, body: AssignmentsEventBody) => {
  const response = await PUT<EventTypeResponse, AssignmentsEventBody>(
    `/event-types/${eventTypeId}`,
    body,
  )
  return response
}

export const deleteEventType = async (eventTypeId: number) => {
  const response = await DELETE<EventTypeResponse>(`/event-types/${eventTypeId}`)
  return response
}
