import { DynamicFormValues } from 'core'
import { GET, PATCH } from 'core/services'
import { ModelFields } from 'core/types/modelFields'

export type ModelResponse = {
  data: {
    id: number
    isComplete: boolean
    isMultiple: boolean
    keyword: string
    name: string
    weight: number
    position: number
    fieldValues: DynamicFormValues
    modelFields: ModelFields[]
  }[]
}

export const getModels = async () => {
  const response = await GET<ModelResponse>(`/profile-sections`)
  return response
}

export type SetChangeWeightBody = {
  keyword: string
  weight: number
}[]

export const setChangeWeight = async (body: SetChangeWeightBody) => {
  const response = await PATCH(`/profile-sections`, body)
  return response
}
