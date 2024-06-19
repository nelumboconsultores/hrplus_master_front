import {
  FormActionsPermissions,
  ServicesConfig,
} from 'modules/dataStructure/modules/companyStructure/types'
import { Dispatch, SetStateAction } from 'react'

export type DynamicFieldsDADProps<T> = {
  fields: T[]
  setFields: Dispatch<SetStateAction<T[]>>
  click: {
    edit: (id: number) => void
    view: (id: number) => void
    remove: (id: number) => void
  }
  serviceEdit: ServicesConfig
  removeActions?: FormActionsPermissions
}

export type orgEntityRes = {
  data: {
    id: number
    name: string
    validations: {
      required: boolean
      unique: boolean
    }
    fieldType: {
      id: number
      name: string
    }
    catalogueReasonId: number
    position: number
    visible: boolean
  }
}
