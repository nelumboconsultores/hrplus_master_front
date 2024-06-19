import { FieldsTypesType } from 'core'

export type getModelDetailsResponse = {
  data: {
    workPosition?: {
      id: number
      createdAt: string
      code: string
      denomination: string
      fieldValues: Record<string, string | number | boolean>
      fieldTypes: FieldsTypesType
      minSalary?: number
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
        fieldValues: Record<string, string | number | boolean>
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
        fieldValues: Record<string, string | number | boolean | number[]>
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
        fieldValues: Record<string, string | number | boolean>
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
        fieldValues: Record<string, string | number | boolean>
        fieldTypes: FieldsTypesType
        status: {
          id: number
          name: string
        }
      }
      store: {
        id: number
        createdAt: string
        code: string
        denomination: string
        fieldValues: Record<string, string | number | boolean>
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
          fieldValues: Record<string, string | number | boolean>
          fieldTypes: FieldsTypesType
          status: {
            id: number
            name: string
          }
        }
      }
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
    structuresByType: structuresByType[]
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
