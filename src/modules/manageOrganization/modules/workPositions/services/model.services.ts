import { getModelDetailsResponse } from '../types/getCostCenterDetails'
import { DELETE, GET, PATCH, POST, PUT } from 'core/services'
import { getModelResponse } from '../types'
import { structuresType } from '../../stores/types/getCostCenterDetails'
import { DynamicFormValues, FieldsTypesType } from 'core'

export const getModels = async (param: string) => {
  const response = await GET<{ data: getModelResponse }>(`/work-positions?${param}`)
  return response
}

export const getWorkPositions = async (id: number | string) => {
  const response = await GET<ModelResponse>(`/work-positions/${id}`)
  return response
}

export type ModelBody = {
  code?: string
  denomination?: string
  statusId?: number
  fieldsValues?: DynamicFormValues
  fieldTypes?: FieldsTypesType
  authorizedStaff?: number
  workPosCatId?: number
  storeOrganizativeId?: number
  storeId?: number
  costCenterId?: number
  compTabId?: number
  compCategoryId?: number
  minSalary?: number
  orgManagerId?: number
  approvalManagerId?: number
}

export type ModelResponse = {
  data: {
    workPosition: {
      id: number
      createdAt: string
      code: string
      denomination: string
      fieldValues: DynamicFormValues
      fieldTypes: FieldsTypesType
      status: {
        id: number
        name: string
      }
      authorizedStaff: number
      workPositionCategory: {
        id: number
        createdAt: string
        code: string
        denomination: string
        fieldValues: DynamicFormValues
        fieldTypes: FieldsTypesType
        status: {
          id: number
          name: string
        }
      }
      compTab: {
        id: number
        createdAt: string
        code: string
        denomination: string
        fieldValues: DynamicFormValues
        fieldTypes: FieldsTypesType
        status: {
          id: number
          name: string
        }
        minAuthorizedSalary: number
        maxAuthorizedSalary: number
      }
      compCategory: {
        id: number
        createdAt: string
        code: string
        denomination: string
        fieldValues: DynamicFormValues
        fieldTypes: FieldsTypesType
        status: {
          id: number
          name: string
        }
      }
      costCenter: {
        id: number
        createdAt: string
        code: string
        denomination: string
        country: {
          id: number
          name: string
        }
        state: {
          id: number
          name: string
          countryId: number
        }
        city: {
          id: number
          name: string
          stateId: number
        }
        fieldValues: DynamicFormValues
        fieldTypes: FieldsTypesType
        status: {
          id: 0
          name: 'string'
        }
      }
      store: {
        id: number
        createdAt: string
        code: string
        denomination: string
        fieldValues: DynamicFormValues
        fieldTypes: FieldsTypesType
        status: {
          id: number
          name: string
        }
        address: string
        zipcode: string
        georefDistance: number
        latitude: number
        longitude: number
        country: {
          id: number
          name: string
        }
        state: {
          id: number
          name: string
          countryId: number
        }
        city: {
          id: number
          name: string
          stateId: number
        }
        costCenter: {
          id: number
          createdAt: string
          code: string
          denomination: string
          country: {
            id: number
            name: string
          }
          state: {
            id: number
            name: string
            countryId: number
          }
          city: {
            id: number
            name: string
            stateId: number
          }
          fieldValues: DynamicFormValues
          fieldTypes: FieldsTypesType
          status: {
            id: number
            name: string
          }
        }
      }
      minSalary: number
      orgManager: {
        id: number
        code: string
        denomination: string
      }
      approvalManager: {
        id: number
        code: string
        denomination: string
      }
    }
    structuresByType: [
      {
        orgEntityType: {
          id: number
          name: string
          complete: boolean
        }
        details: [
          {
            id: number
            structures: structuresType[]
          },
        ]
      },
    ]
  }
}

export const createModel = async (data: ModelBody) => {
  const response = await POST<ModelResponse>(`/work-positions`, data)
  return response
}

export const updateWorksPositions = async (id: number | string, data: ModelBody) => {
  const response = await PUT<ModelResponse>(`/work-positions/${id}`, data)
  return response
}

export const deleteModel = async (id: string | number) => {
  const response = await DELETE(`/work-positions/${id}`)
  return response
}

export const updateStatusModel = async (id: string | number) => {
  const response = await PATCH<getModelDetailsResponse>(`/work-positions/${id}`)
  return response
}

export const getModelDetail = async (id: string | number) => {
  const response = await GET<getModelDetailsResponse>(`/work-positions/${id}`)
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
  const response = await POST<saveModelDetailsResponse>(`/work-positions/${id}/details`, body)
  return response
}

export const removeDetails = async (workPositionId: number, workPositionOrgEntDetId: string) => {
  const response = await DELETE(
    `/work-positions/${workPositionId}/details/${workPositionOrgEntDetId}`,
  )
  return response
}

type GetWorkPositionResponse = {
  data: {
    id: number
    code: string
    denomination: string
  }[]
}

export const getSearchWorkPositions = async (param: string) => {
  const response = await GET<GetWorkPositionResponse>(
    `/work-position-categories/simplified-search?${param}`,
  )
  return response
}

export const getCatWorkPositions = async (param: string) => {
  const response = await GET<GetWorkPositionResponse>(
    `/work-position-categories/simplified-search?${param}`,
  )
  return response
}

export const getListWorkPositions = async (param: string = '') => {
  const response = await GET<GetWorkPositionResponse>(`/work-positions/simplified-search?${param}`)
  return response
}

export const getListWorkPositionsSearch = async (search: string) => {
  const response = await GET<GetWorkPositionResponse>(
    `/work-positions/simplified-search?search=${search}`,
  )
  return response
}
