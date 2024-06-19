import { GET, PUT } from 'core/services'

export type SaveConfigurationsBody = {
  orgEntityId: number[]
  hasMany: boolean
}

export type SaveConfigurationsResponse = {
  data: {
    success: boolean
  }
}

export const saveConfigurations = async (data: SaveConfigurationsBody, modelNameId: number) => {
  const response = PUT<SaveConfigurationsResponse, SaveConfigurationsBody>(
    '/organization-entity-relationships/' + modelNameId,
    data,
  )
  return response
}

export type GetRelationships = {
  data: GetRelationshipsData[]
}
export type GetRelationshipsData = {
  id: number
  name: string
  active: boolean
  orgEntityTypeId: number
  parentId: number
  completed: boolean
  hasMany: boolean
  children: GetRelationshipsData[]
  used: boolean
}

export const getRelationships = async (keyword: string) => {
  const response = GET<GetRelationships>(`/model-names/${keyword}/org-entities-relationships`)
  return response
}
