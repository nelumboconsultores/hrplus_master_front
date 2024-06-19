import { DynamicFormValues, FieldsTypesType } from 'core'
import { ModelFields } from 'core/types/modelFields'

export type DetailSection = {
  id: number
  keyword?: string
  profileSection: {
    id: number
    keyword: string
    name: string
    weight: number
    position: number
    isComplete: boolean
    isMultiple: boolean
    createdAt: Date
    modelFields: ModelFields[]
  }
  fieldsValues: DynamicFormValues
  fieldTypes?: FieldsTypesType
  percentage: number
  isCompleted: boolean
}

export type DetailsSectionData = {
  id: number
  keyword?: string
  profileSection: {
    id: number
    keyword: string
    name: string
    weight: number
    position: number
    isComplete: boolean
    isMultiple: boolean
    createdAt: Date
  }
  fieldsValues: { id: number; fieldsValues: DynamicFormValues }[]
  percentage: number
  isCompleted: boolean
}
