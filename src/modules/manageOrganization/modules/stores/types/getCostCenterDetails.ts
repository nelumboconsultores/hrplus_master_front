import { DynamicFormValues, FieldsTypesType } from 'core'

export type CostCenterDetails = {
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
  status: {
    id: number
    name: string
  }
}

export type getModelDetailsResponse = {
  data: {
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
      costCenter: CostCenterDetails
    }
    costCenter?: {
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
      fieldValues: Record<string, string | number | boolean>
      fieldTypes: FieldsTypesType
      status: {
        id: number
        name: string
      }
    }
    structuresByType: structuresByType[]
  }
}
export type structuresByType = {
  orgEntityType: {
    id: number
    name: string
    complete: true
  }
  details: detailsStrType[]
}

export type detailsStrType = {
  id: number
  structures: structuresType[]

  structure: {
    id: number
    name: string
    orgEntity: {
      id: number
      name: string
      parentId: {
        id: number
        name: string
      }
      recordCount: number
      childs: {
        id: number
        name: string
      }[]

      createdAt: string
      sublevels: number
    }
    parentId: number
    associatedRecords: boolean
    fieldValues: DynamicFormValues
  }
}

export type structuresType = {
  id: number
  name: string
  orgEntity: {
    id: number
    name: string
    parentId: {
      id: number
      name: string
    }
    recordCount: number

    createdAt: string
    sublevels: number
  }
  children?: structuresType[]
  parentId: number
  associatedRecords: boolean
  fieldValues: DynamicFormValues
}
