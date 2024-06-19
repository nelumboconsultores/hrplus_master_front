import { DELETE, GET, PATCH, POST, PUT } from '.'

export type getListResponse = {
  data: {
    totalPages: number
    totalElements: number
    size: number
    content: {
      id: number
      name: string
      parentId: number
      recordCount: number
      sublevels: number
      createdAt: string
      orgEntityType: {
        id: number
        name: string
        complete: boolean
      }
    }[]

    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    pageable: {
      offset: number
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      pageNumber: number
      pageSize: number
      paged: boolean
      unpaged: boolean
    }
    first: boolean
    last: boolean
    empty: boolean
  }
}

export type Organization = {
  data?: Datum[]
}

export type Datum = {
  id?: number
  name?: string
  active?: boolean
  orgEntityTypeId?: number
  children?: Datum[]
  completed: boolean
  parentId?: number
}

export type OrganizationHierarchyBody = {
  id: number | null
  parentId: number | null
}

export type FinallyOrganizationHierarchyBody = {
  orgMacroStructureId: string
}
export type createOrUpdateOrganizationHierarchyResponse = { data: { success: boolean } }
export type NestedEntity = {
  id?: number
  name?: string
  parentId?: number | null
  orgEntity?: OrgEntity
  orgEntityType?: OrgEntityType
  childs?: NestedEntity[]
}

export type OrgEntity = {
  id?: number
  name?: string
}

export type OrgEntityType = {
  id?: number
  name?: string
  isComplete?: boolean
}

export const getHerarchyLevels = async (payload: { id: string }) =>
  await GET<Organization>(`/organization-entities/nested-entities-by-type/${payload.id}`)

export const getNestedEntityHerarchyLevels = async (payload: { id: string }, params: string) =>
  await GET<{ data: NestedEntity[] }>(
    `/organization-entities/nested-entity-values-by-type/${payload.id}?${params}`,
  )

export const createOrUpdateOrganizationHierarchy = async (body: OrganizationHierarchyBody[]) =>
  await PATCH<createOrUpdateOrganizationHierarchyResponse>(
    '/organization-entities/hierarchy-config',
    body,
  )

export const finallyOrganizationHierarchy = async (payload: {
  id: string
  body: FinallyOrganizationHierarchyBody
}) => await POST(`/organization-entities/${payload.id}/confirmation`, payload.body)

export const getListOrganizations = async (params: string) => {
  const response = await GET<getListResponse>(`/organization-entities?${params}`)
  return response
}

type createOrganizationEntitiesBody = {
  name: string
  parentId?: number | null
  orgEntityTypeId: number
  fields?: {
    id?: number
    name: string
    fieldTypeId: number
    catalogueReasonId?: number
    validations: { required: boolean; maxLenght?: number; minLength?: number }
  }[]
}

type createOrganizationEntitiesResponse = {
  data: {
    success: boolean
  }
}

export const createOrganizationEntities = async (body: createOrganizationEntitiesBody) => {
  const response = await POST<createOrganizationEntitiesResponse, createOrganizationEntitiesBody>(
    '/organization-entities',
    body,
  )
  return response
}

export const editOrganizationEntities = async (
  id: string,
  body: createOrganizationEntitiesBody,
) => {
  const response = await PUT<createOrganizationEntitiesResponse, createOrganizationEntitiesBody>(
    `/organization-entities/${id}`,
    body,
  )
  return response
}

type removeOrganizationResponse = {
  data: {
    success: boolean
  }
}
export const removeOrganization = async (id: string) => {
  const response = await DELETE<removeOrganizationResponse>(`/organization-entities/${id}`)
  return response
}

export const getInstances = async (id: number, entities: number, query: string) => {
  const response = await GET<getListResponse>(
    `/organization-entities/${id}/get-instances/${entities}?${query}`,
  )
  return response
}

type createInstancesBody = {
  parentId: number | null
  fieldValues: {
    [key: string]: string | number | boolean | number[] | { name: string; id: number }[]
  }
  name: string | number | boolean | number[] | { name: string; id: number }[]
}
type createInstancesResponse = {
  data: {
    success: boolean
  }
}

export const saveInstances = async (id: number, body: createInstancesBody) => {
  const response = await POST<createInstancesResponse, createInstancesBody>(
    `/organization-entities/${id}/organization-entity-details`,
    body,
  )
  return response
}
