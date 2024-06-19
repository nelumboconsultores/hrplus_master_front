import { getModelDetailsResponse, structuresType } from '../types/getCostCenterDetails'
import { DELETE, GET, PATCH, POST, PUT } from 'core/services'
import { Model, WorkPeriodBody, getModelResponse } from '../types'
import { DynamicFormValues, DynamicFormValuesType, FieldsTypesType } from 'core'

export type ModelResponse = {
  data: {
    id: number
    createdAt: Date | string
    code: string
    denomination: string
    address: string
    zipcode: string
    georefDistance: number
    latitude: number
    longitude: number
    country: { id: number; name: string }
    state: { id: number; name: string; countryId: number }
    city: { id: number; name: string; stateId: number }
    fieldValues: DynamicFormValues
    fieldTypes: FieldsTypesType
    status: { id: number; name: string }
    costCenter: {
      id: number
      createdAt: Date | string
      code: string
      denomination: string
      country: { id: number; name: string }
    }
  }
}

export const getModels = async (param: string) => {
  const response = await GET<{ data: getModelResponse }>(`/stores?${param}`)
  return response
}

export const getModel = async (id: number | string) => {
  const response = await GET<ModelResponse>(`/stores/${id}`)
  return response
}

export type ModelBody = {
  address: string
  zipcode: string
  georefDistance: number
  latitude: number
  longitude: number
  code: string
  denomination: string
  countryId?: number
  stateId?: number
  cityId?: number
  fieldsValues: Record<string, DynamicFormValuesType>
  statusId: number
  costCenterId?: number
}

export const createModel = async (data: ModelBody) => {
  const response = await POST<ModelResponse>(`/stores`, data)
  return response
}

export const updateModel = async (id: number | string, data: ModelBody) => {
  const response = await PUT<ModelResponse>(`/stores/${id}`, data)
  return response
}

export const deleteModel = async (id: string | number) => {
  const response = await DELETE(`/stores/${id}`)
  return response
}

export const updateStatusModel = async (id: string | number) => {
  const response = await PATCH<{ data: Model }>(`/stores/${id}`)
  return response
}

export const getModelDetail = async (id: string | number) => {
  const response = await GET<getModelDetailsResponse>(`/stores/${id}/details`)
  return response
}

type saveModelDetailsBody = {
  orgEntityDetailIds: number[]
}
type saveModelDetailsResponse = {
  data: {
    id: number
    structures: structuresType[]
  }
}

export const saveModelDetails = async (id: number, body: saveModelDetailsBody) => {
  const response = await POST<saveModelDetailsResponse>(`/stores/${id}/details`, body)
  return response
}

export const removeDetails = async (costCenterId: number, costCenterOrgEntDetId: string) => {
  const response = await DELETE(`/stores/${costCenterId}/details/${costCenterOrgEntDetId}`)
  return response
}
type GetAllStoresResponse = {
  data: {
    id: number
    code: string
    denomination: string
  }[]
}
export const getAllStores = async (params: string) => {
  const response = await GET<GetAllStoresResponse>(`/stores/simplified-search?` + params)
  return response
}

type WorkPeriodResponse = {
  data: {
    workPeriods: [
      {
        id: number
        workPeriod: {
          workPeriod: WorkPeriodBody
          quantityProfiles: number
          active: boolean
          custom: boolean
        }
      },
    ]
  }
}

export const getWorkPeriods = async (id: number | string) => {
  const response = await GET<WorkPeriodResponse>(`/stores/${id}/work-periods`)
  return response
}

export const setWorkPeriod = async (
  id: number | string,
  body: { workPeriodId: number | string },
) => {
  const response = await POST<WorkPeriodResponse>(`/stores/${id}/work-periods`, body)
  return response
}

export const deleteWorkPeriod = async (id: number | string, workPeriodId: number | string) => {
  const response = await DELETE<{ data: { success: boolean } }>(
    `/stores/${id}/work-periods/${workPeriodId}`,
  )
  return response
}

export const getCostCenterNames = async (params: string) => {
  const response = await GET<{ data: { id: number; code: string; denomination: string }[] }>(
    `/cost-centers/simplified-search?` + params,
  )
  return response
}

export const getCostCenter = async () => {
  const response = await GET<{
    data: { content: { id: number; code: string; denomination: string }[] }
  }>(`/cost-centers`)
  return response
}

export const setCostCenter = async (
  id: number | string,
  body: { costCenterId?: number | string; deletedCostCenter?: boolean },
) => {
  const response = await PUT<{
    data: { costCenter: { id: number; code: string; denomination: string } }
  }>(`/stores/${id}`, body)
  return response
}

export type StoreLocation = {
  id: number
  code: string
  denomination: string
  address: string
  latitude: number
  longitude: number
}
export const getLocations = async () => {
  const response = await GET<{
    data: StoreLocation[]
  }>(`/stores/reference-locations`)
  return response
}
