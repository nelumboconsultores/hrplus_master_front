import { CreateWorkPeriodBody } from 'core'
import { DELETE, GET, PATCH, POST, PUT } from '.'

type CreateWorkPeriodResponse = {
  quantityProfiles: number
  workPeriod: {
    id: number
    name: string

    workPeriodType: {
      id: number
      name: string
    }
    workPeriodMaxDuration: {
      id: number
      name: string
    }
    workPeriodMaxDailyDuration: {
      id: number
      name: string
    }
    active: boolean
    custom: boolean
  }
  workTurns: {
    id: number
    timeFrom: string
    timeTo: string
    dayOfWeek: number
    workPeriod: {
      id: number
      name: string
      workPeriodType: {
        id: number
        name: string
      }
      active: boolean
      custom: boolean
    }
    workTurnType: {
      id: number
      name: string
    }
    duration: {
      id: number
      name: string
      amount: number
    }
  }[]

  active: boolean
  custom: boolean
}

export const createWorkPeriod = async (body: CreateWorkPeriodBody) => {
  const data = await POST<CreateWorkPeriodResponse, CreateWorkPeriodBody>('/work-periods', body)
  return data
}

type GetWorkPeriodsResponse = {
  data: {
    content: Array<CreateWorkPeriodResponse>
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    numberOfElements: number
    empty: boolean
  }
}

export const getWorkPeriods = async (body: string) => {
  const response = await GET<GetWorkPeriodsResponse>('/work-periods?' + body)
  return response
}

export const getWorkPeriod = async (id: string) => {
  const response = await GET<{ data: CreateWorkPeriodResponse }>(`/work-periods/${id}`)
  return response
}

export const removeWorkPeriod = async (id: string) => {
  const response = await DELETE<CreateWorkPeriodResponse>(`/work-periods/${id}`)
  return response
}

export const updateWorkPeriod = async (body: CreateWorkPeriodBody, id: string) => {
  const response = await PUT<CreateWorkPeriodResponse, CreateWorkPeriodBody>(
    `/work-periods/${id}`,
    body,
  )
  return response
}

type UpdateStatusBody = {
  active: boolean
}

export const updateStatus = async (id: string, body: UpdateStatusBody) => {
  const response = await PATCH<CreateWorkPeriodResponse>(`/work-periods/${id}/status`, body)
  return response
}

type postAssignmentsBody = {
  profileIds: number[]
  temporal: boolean
  dateFrom?: string
  dateTo?: string
  force: boolean
  allProfiles: boolean
  filterProfiles: {
    search: string
    groupIds: number[]
  }
  excludeProfileIds: number[]
}
type postAssignmentsResponse = {
  data: {
    profilesAdded: number
    workPeriodDetails: {
      id: number
      name: string
    }
    invalidProfiles: [
      {
        id: number
        conflictDetail: string
        gender: string
        orgProfileAccess: {
          id: number
          organigrama: {
            id: number
            name: string
            description: string
            parentId: number
          }
        }
        fullName: string
      },
    ]
  }
}

export const postAssignments = async (id: string, body: postAssignmentsBody) => {
  const response = await POST<postAssignmentsResponse, postAssignmentsBody>(
    `/work-periods/${id}/work-period-assignments`,
    body,
  )
  return response
}

export const workPeriodsList = async () => {
  const response = await GET<{ data: { id: number; name: string }[] }>('/work-periods/names')
  return response
}
