import { GET } from 'core/services'
export type GetListInputsResponse = {
  data: GetListInputsType[]
}

export type modelFieldResponsesType = {
  id: number
  modelName: {
    id: number
    name: string
    keyword: string
    createdAt: string
  }
  profileSectionId: number
  name: string
  validations: Record<string, string | number | boolean | number[]>
  placeholder: string
  catalogueId: number
  fieldType: {
    id: number
    name: string
  }
  visible: boolean
  used: boolean
  position: number
}

export type GetListInputsType = {
  id: number
  keyword: string
  name: string
  weight: number
  position: number
  isComplete: boolean
  isMultiple: boolean
  modelFieldResponses: modelFieldResponsesType[]
}

export const getListInputs = async () => {
  const response = await GET<GetListInputsResponse>('/profile-sections/base-profile')
  return response
}
