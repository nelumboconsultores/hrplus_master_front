import { FieldsTypesType } from 'core'

export type getModelDetailsResponse = {
  data: {
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
      fieldTypes: FieldsTypesType
      fieldValues: Record<string, string | number | boolean>
      status: {
        id: number
        name: string
      }
    }
    structuresByType: structuresByType[]
    storesRelated: number
  }
}

export type structuresByType = {
  orgEntityType: {
    id: number
    name: string
    complete: boolean
  }
  details: {
    id: number
    structures: {
      id: number
      name: string
      orgEntity: {
        id: number
        name: string
        createdAt: string
      }
      parentId?: number
      associatedRecords: boolean
      children: childrenType[]
      fieldValues: Record<string, string | number>
    }[]
  }[]
}

type childrenType = {
  id: number
  name: string
  orgEntity: {
    id: number
    name: string
    createdAt: string
  }
  parentId: number
  associatedRecords: boolean
  fieldValues: Record<string, string | number>
  children: childrenType[]
}
