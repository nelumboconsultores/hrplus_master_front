import { DynamicFormValuesType, FieldsTypesType } from 'core'
import { CardArrows } from 'modules/manageOrganization/types'

export type BodyAllInfo = {
  title: string
  code: string
  generalInfo: {
    main: Array<arrayGenInfoType>
    storesId: number
    stores: Array<arrayGenInfoType>
    geo?: CardArrows[]
    selectOrg: number[]
    org?: Array<CardArrows>
    authorizedStaff?: number
    workPositionId: number
    positions: Array<arrayGenInfoType>
    cost_centerId: number
    costCenter: Array<arrayGenInfoType>
  }
  jobConfig?: {
    id: number
    title: string
    description: {
      title: string
      value: string
      code?: string
      denomination?: string
    }
    fields: Array<{
      title: string
      value: DynamicFormValuesType
    }>
  }
  tab?: {
    tabId: number
    minSalary?: number
    title: string
    fields: Array<{
      title: string
      value: DynamicFormValuesType
    }>
    code: string
  }
  levelGeoStr?: {
    orgManager: number
    approvalManager: number
  }
  typesInputs: {
    generalInfo: {
      main: FieldsTypesType
      dataStores: FieldsTypesType
    }
    jobConfig: FieldsTypesType
    tab: FieldsTypesType
  }
}
export type arrayGenInfoType = {
  title: string
  value: DynamicFormValuesType
}
