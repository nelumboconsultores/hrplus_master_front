import { ListHolidays } from 'modules/location/types'
import { GET, PATCH, PUT } from '.'

type GetCatalogueResponse = {
  data: {
    id: number
    country: {
      id: number
      name: string
      value: { name: string; code: string; flag: string }
      type: string
    }
    timeFormat: {
      id: number
      name: string
      value: number
      type: string
    }
    usesDefaultHolidays: boolean
    holidays: {
      id: number
      date: string
      name: string
    }[]

    ownerId: number
    name: string
    onboarding: string
    acceptedTerms: string
    acceptedTermsDate: string
    licenseFrom: string
    licenseTo: string
    licenseTypeName: string
  }
}

export const getSetting = async () => {
  const response = await GET<GetCatalogueResponse>(`/setting`)
  return response
}

type BodySetting = {
  column: string
  value: string
}

export const saveSettings = async (body: BodySetting) => {
  const response = await PATCH<BodySetting>('/setting', body)
  return response
}

type BodyUpdateSetting = {
  timeFormatId: number
  countryId: number
  usesDefaultHoliday: boolean
  holidays: ListHolidays[]
}

type UpdateSettingResponse = {
  data: {
    success: boolean
  }
}

export const updateSetting = async (body: BodyUpdateSetting) => {
  const response = await PUT<UpdateSettingResponse, BodyUpdateSetting>('/setting', body)
  return response
}

export const getCatalogOptions = async <TResponse = unknown>(param: string) => {
  const response = await GET<TResponse>(`/setting-parameter/values?${param}`)
  return response
}
