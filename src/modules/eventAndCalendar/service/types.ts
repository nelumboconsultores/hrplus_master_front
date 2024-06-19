import { EventTypes } from '../enum'

export type Event = {
  id: number
  startsAt: Date
  endsAt: Date
  eventType: { id: number; name: string; color: string }
  ownerId: number
  createdAt: Date
  name: string
  eventDetail: eventDetailT
  minsReminder: number
  global: boolean
}

export type eventDetailT = {
  id: number
  name: string
  eventDetailType: { id: number; name: string }
  eventData: {
    name: string
    description: string
    url: string
    files: { name: string; description: string; url: string; id: number }[]
  }
}

export type EventsListGeneralCalendar = {
  title: string
  start: Date
  end: Date
  id: string | number
  eventData: Event
}
export type EventResponse = {
  data: Event[]
}

export type EventDetailResponse = {
  data: Event
}

type EventDate = {
  id: number
  startsAt: Date
  endsAt: Date
  eventType?: Datum
  users?: Users
  description?: string
  eventDetails?: EventDetail[]
}

type EventDetail = {
  id?: number
  eventDateId?: number
  data?: Data
}

type Data = {
  name?: string
}
type Datum = {
  name: string
  key: EventTypes
  description?: string
  eventDates?: EventDate[]
  id: number
}

type Users = {
  id?: number
  email?: string
  password?: string
  userStatus?: UserStatus
  createdAt?: Date
  updatedAt?: Date
  updatedBy?: string
  usernameCode?: string
  settings?: Settings
  checkCode?: string
  codeRequestedTimes?: number
  expirationCodeDate?: Date
  requestAttemps?: number
}

type Settings = {
  id?: number
  country?: Country
  timeFormat?: Country
  usesDefaultHolidays?: boolean
  name?: string
  onboarding?: boolean
  acceptedTerms?: boolean
  acceptedTermsDate?: Date
  licenseFrom?: Date
  licenseTo?: Date
  licenseTypeName?: string
}

type Country = {
  id?: number
  name?: string
  value?: string
  type?: string
}

type UserStatus = {
  id?: number
  name?: string
}

type DataArr = {
  id: number
  name: string
  color: string
}[]

type DataNormal = {
  id: number
  name: string
  color: string
}

type GetEventTypesResponse = {
  data: DataArr | DataNormal
}

type EventTypeResponse = {
  data: {
    success: boolean
  }
}
type AddEventTypeBody = {
  name: string
  color: string
}
type AssignmentsEventBody = {
  profileIds: number[]
  delProfileIds: number[]
  serie: boolean
}
type AssignmentsEventResponse = {
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
      createdAt: string
      minsReminder: number
      global: false
    }
    profileResponses: [
      {
        id: number
        fullName: string
        firstName: string
        middleName: string
        lastName: string
        maidenName: string
        profileStatus: {
          id: number
          name: string
        }
        rol?: string
        email?: string
        branch?: string
        gender?: string
        position: string
        usernameCode: string
      },
    ]
  }
}

export type {
  EventDetail,
  GetEventTypesResponse,
  EventTypeResponse,
  AddEventTypeBody,
  AssignmentsEventBody,
  AssignmentsEventResponse,
}
