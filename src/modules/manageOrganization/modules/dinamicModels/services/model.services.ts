import { getModelDetailsResponse } from '../types/getCostCenterDetails'
import { DELETE, GET, PATCH, POST, PUT } from 'core/services'
import { Model, getModelResponse } from '../types'
import { getService } from '../utils/getDinamicServices'
import { DynamicFormValues, FieldsTypesType } from 'core'

export const getModels = async (param: string) => {
  const path = window.location.pathname
  const response = await GET<{ data: getModelResponse }>(`/${getService(path)}?${param}`)
  return response
}

export const getModel = async (id: number | string) => {
  const path = window.location.pathname
  const response = await GET<ModelResponse>(`/${getService(path)}/${id}`)
  return response
}

export type ModelBody = {
  code: string
  denomination: string
  countryId?: number
  stateId?: number
  cityId?: number
  maxAuthorizedSalary?: number
  minAuthorizedSalary?: number
  fieldsValues: DynamicFormValues
  statusId: number
}

export type ModelResponse = {
  data: {
    id: number
    createdAt: Date | string
    code: string
    denomination: string
    country: { id: number; name: string }
    state: { id: number; name: string; countryId: number }
    city: { id: number; name: string; stateId: number }
    maxAuthorizedSalary?: number
    minAuthorizedSalary?: number
    fieldValues: DynamicFormValues
    fieldTypes: FieldsTypesType
    status: { id: number; name: string }
  }
}

export const createModel = async (data: ModelBody) => {
  const path = window.location.pathname
  const response = await POST<ModelResponse>(`/${getService(path)}`, data)
  return response
}

export const updateModel = async (id: number | string, data: ModelBody) => {
  const path = window.location.pathname
  const response = await PUT<ModelResponse>(`/${getService(path)}/${id}`, data)
  return response
}

export const deleteModel = async (id: string | number) => {
  const path = window.location.pathname
  const response = await DELETE(`/${getService(path)}/${id}`)
  return response
}

export const updateStatusModel = async (id: string | number) => {
  const path = window.location.pathname
  const response = await PATCH<{ data: Model }>(`/${getService(path)}/${id}`)
  return response
}

export const getModelDetail = async (id: string | number) => {
  const path = window.location.pathname
  const response = await GET<getModelDetailsResponse>(`/${getService(path)}/${id}/details`)
  return response
}

type saveModelDetailsBody = {
  orgEntityDetailIds: number[]
}
type saveModelDetailsResponse = {
  data: {
    id: number
    structures: structureType[]
  }
}

export type structureType = {
  id: number
  name: string
  orgEntity: { id: number; name: string; createdAt: string }
  children: structureType[]
  associatedRecords: boolean
  fieldValues: Record<string, string | number>
}

export const saveModelDetails = async (id: number, body: saveModelDetailsBody) => {
  const path = window.location.pathname
  const response = await POST<saveModelDetailsResponse>(`/${getService(path)}/${id}/details`, body)
  return response
}

export const removeDetails = async (costCenterId: number, costCenterOrgEntDetId: string) => {
  const path = window.location.pathname
  const response = await DELETE(
    `/${getService(path)}/${costCenterId}/details/${costCenterOrgEntDetId}`,
  )
  return response
}
