import { WorkDayMaxDurations, WorkPeriodMaxDurations } from 'modules/workingDays/enums'
import { GET } from '.'

type TypeResponse<T = unknown> = {
  data: {
    id: number
    name: string
    keyword: T
  }[]
}

export const getWorkTurnType = async () => {
  const response = await GET<TypeResponse>('/work-turn-types')
  return response.data
}

export const getWorkPeriodType = async () => {
  const response = await GET<TypeResponse>('/work-period-types')
  return response.data
}
export const getDurations = async () => {
  const response = await GET<TypeResponse>('/durations')
  return response.data
}

export const getWorkPeriodsNames = async () => {
  const response = await GET<TypeResponse>('/work-periods/names')
  return response.data
}

export const getGroupNames = async () => {
  const response = await GET<TypeResponse>('/groups/names')
  return response.data
}

export const getCatalogueReasons = async () => {
  const response = await GET<TypeResponse>('/catalogues/names')
  return response.data
}

export const getWorkPeriodMaxDuration = async () => {
  const response = await GET<TypeResponse<WorkPeriodMaxDurations>>('/work-period-max-durations')
  return response.data
}

export const getDailyPeriodsMaxDuration = async () => {
  const response = await GET<TypeResponse<WorkDayMaxDurations>>('/work-period-max-daily-durations')
  return response.data
}

type getCataloguesResponse = {
  data: {
    id: number
    name: string
    isActive: true
    catalogueType: {
      id: number
      name: string
    }
    subcategories: {
      id: number
      name: string
    }[]
  }
}
export const getCatalogues = async (id: number) => {
  const response = await GET<getCataloguesResponse>(`/catalogues/${id}`)
  return response.data
}

export const getDinamicOptions = async (url: string) => {
  const response = await GET<{
    data: { id: number; name: string; [key: string]: string | number }[]
  }>(url)
  return response.data
}

export const getFieldsTypes = async () => {
  const response = await GET<TypeResponse>('/field-types')
  return response
}
