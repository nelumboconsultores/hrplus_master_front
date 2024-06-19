import { TypeJson } from 'core/components/returnInput/typeJson'
import { firstDataType } from '../../modules/manageOrganization/modules/dinamicModels/types/modelSaveData'
import { DynamicFormValuesType } from 'core'

export const valuesByNames = (
  modelFields?: TypeJson[],
  fields?: Record<string, DynamicFormValuesType>,
) => {
  if (!fields || !modelFields) return
  const entries = Object.entries(fields)
  const fieldValues: firstDataType = {}
  entries.forEach(([key, value]) => {
    const field = modelFields.find((item) => item.label === key)
    if (field) fieldValues[field.name] = value
    else fieldValues[key] = value
  })

  return fieldValues
}
