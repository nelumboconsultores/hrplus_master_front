import { GET } from '.'

export type getGenInfoFieldsResponse = {
  data: {
    id: number
    modelName: { id: number; name: string; keyword: string; createdAt?: string }
    name: string
    label: string
    validations: {
      unique: boolean
      required: boolean
      max_value: number
      min_value: number
      max_chars: number
      min_chars: number
    }
    placeholder?: string
    catalogueId?: number
    fieldType: { id: number; name: string; hibernateLazyInitializer: object }
    visible: boolean
    used: boolean
    position: number
  }[]
}

export const getGenInfoFields = async (keyWord: string) => {
  const response = await GET<getGenInfoFieldsResponse>(`/model-names/${keyWord}/model-fields`)
  return response
}
type getOrgEntitiesResponse = {
  data: interGetOrgEntitiesResponse
}
export type interGetOrgEntitiesResponse = {
  id: number
  name: string
  active: boolean
  orgEntityTypeId: number
  parentId: number
  completed: boolean
  required: boolean
  children: interGetOrgEntitiesResponse
  hasMany: boolean
}[]
export const getOrgEntities = async (keyWord: string) => {
  const response = await GET<getOrgEntitiesResponse>(
    `/model-names/${keyWord}/org-entities-relationships`,
  )
  return response
}
