import { ModelFields } from 'core/types/modelFields'
import { DetailSection } from '../types'
import { DynamicFormValues } from 'core'

export const formatModelData = (item: {
  id: number
  isComplete: boolean
  isMultiple: boolean
  keyword: string
  name: string
  weight: number
  position: number
  modelFields: ModelFields[]
  fieldValues: DynamicFormValues
}): DetailSection => {
  return {
    id: item.id,
    profileSection: {
      id: item.id,
      keyword: item.keyword,
      name: item.name,
      weight: item.weight,
      position: item.position,
      isComplete: item.isComplete,
      modelFields: item.modelFields,
      isMultiple: item.isMultiple,
      createdAt: new Date(''),
    },
    fieldsValues: item.fieldValues,
    percentage: item.weight,
    isCompleted: item.isComplete,
  }
}
