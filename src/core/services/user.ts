import { AsyncReturnType } from 'core'
import { GET, POST } from '.'
import { ContentDataUser } from 'modules/users/types'

type GetCatalogueGroupsResponse = {
  data: {
    id: number
    name: string
    profiles: [
      {
        id: number
        fullName: string
        phoneNumber: string
        email: string
      },
    ]
    quantityProfiles: number
  }[]
}

export const getGroups = async () => {
  const response = await GET<GetCatalogueGroupsResponse>(`/groups`)
  return response
}

type GetProfilesResponse = {
  data: {
    content: ContentDataUser[]
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    numberOfElements: number
    empty: boolean
  }
}

export const getProfiles = async (param: string) => {
  const response = await GET<GetProfilesResponse>(`/profiles?${param}`)
  return response
}

type AddCatalogueResponse = {
  data: {
    id: number
    name: string
    profiles: [
      {
        id: number
        fullName: string
        phoneNumber: string
        email: string
      },
    ]
    quantityProfiles: number
  }
}
type AddCatalogueBody = {
  name: string
}

export const addGroups = async (body: AddCatalogueBody): AsyncReturnType<AddCatalogueResponse> => {
  const response = await POST<AddCatalogueResponse, AddCatalogueBody>('/groups', body)
  return response
}

type AddAssignmentsResponse = {
  data: {
    id: number
    name: string
    profiles: [
      {
        id: number
        fullName: string
        phoneNumber: string
        email: string
      },
    ]
    quantityProfiles: number
  }[]
}
type AddAssignmentsBody = {
  groupIds: number[]
  profileIds: number[]
  temporal: boolean
  dateFrom?: string
  dateTo?: string
  allProfiles: boolean
  filterProfiles: {
    search: string
    groupIds: number[]
  }
  excludeProfileIds: number[]
}

export const addAssignments = async (
  body: AddAssignmentsBody,
): AsyncReturnType<AddAssignmentsResponse> => {
  const response = await POST<AddAssignmentsResponse, AddAssignmentsBody>(
    '/groups/group-assignments',
    body,
  )
  return response
}
