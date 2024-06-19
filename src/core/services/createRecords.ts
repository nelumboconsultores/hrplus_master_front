import { getListItemsResponse } from 'core'
import { GET } from '.'

export const getListOrganizationsItems = async (id: number) => {
  const response = await GET<getListItemsResponse>(`/organization-entities/${id}/fields`)
  return response
}

type getDetailsEntityResponse = {
  data: {
    id: 0
    name: 'string'
    parentId: {
      id: 0
      name: 'string'
    }
    childs: {
      id: 0
      name: 'string'
    }[]
  }
}

export const getDetailsEntity = async (id: number) => {
  const response = await GET<getDetailsEntityResponse>(`/organization-entities/${id}`)
  return response
}
