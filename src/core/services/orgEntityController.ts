import { DELETE, GET, POST, PUT } from '.'
type createOrgEntityBody = {
  name: string
  parentId: number | null
  orgEntityTypeId: number
}
type createOrgEntityResponse = {
  data: {
    id: number
    name: string
    parentId: {
      id: number
      name: string
    }
    childs: [
      {
        id: number
        name: string
      },
    ]
  }
}
export const createOrgEntity = async (body: createOrgEntityBody) => {
  const response = await POST<createOrgEntityResponse, createOrgEntityBody>(
    '/organization-entities',
    body,
  )
  return response
}

type editCreateOrgEntityResponse = {
  data: {
    success: boolean
    id: number
  }
}

export const editCreateOrgEntity = async (body: createOrgEntityBody, id: number) => {
  const response = await PUT<editCreateOrgEntityResponse, createOrgEntityBody>(
    `/organization-entities/${id}`,
    body,
  )
  return response
}

type createOrgEntityFieldsBody = {
  name: string
  fieldTypeId: number
  catalogueId?: number
  validations: {
    required?: boolean
    unique?: boolean
    max_value?: number
    min_value?: number
    max_chars?: number
    min_chars?: number
  }
  visible: boolean
  newPosition?: number
}
type createOrgEntityFieldsResponse = {
  data: {
    id: number
    name: string
    validations: {
      required: boolean
      unique: boolean
    }
    fieldType: {
      id: number
      name: string
    }
    catalogueReasonId: number
    position: number
    visible: boolean
  }
}

export const createOrgEntityFields = async (body: createOrgEntityFieldsBody, id: number) => {
  const response = await POST<createOrgEntityFieldsResponse, createOrgEntityFieldsBody>(
    `/organization-entities/${id}/fields`,
    body,
  )
  return response
}

export const editOrgEntityFields = async (
  body: createOrgEntityFieldsBody,
  id: number,
  fielId: number,
) => {
  const response = await PUT<createOrgEntityFieldsResponse, createOrgEntityFieldsBody>(
    `/organization-entities/${id}/fields/${fielId}`,
    body,
  )
  return response
}

export const removeOrgEntityFields = async (id: number, fieldId: number) => {
  const response = await DELETE(`/organization-entities/${id}/fields/${fieldId}`)
  return response
}
type getOrgEntityFieldsResponse = {
  data: {
    id: number
    name: string
    orgEntityId: number
    parentId: number
    associatedRecords: true
    fieldValues: {
      max_chars: number
      min_chars: number
      max_value: number
      min_value: number
      required: boolean
      unique: boolean
    }
  }
}

export const getDetailsInstance = async (orgEntityId: number, orgEntityDetailId: number) => {
  const response = await GET<getOrgEntityFieldsResponse>(
    `/organization-entities/${orgEntityId}/organization-entity-details/${orgEntityDetailId}`,
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
type editInstanceResponse = {
  data: {
    success: boolean
  }
}
export const editDetailsInstance = async (
  orgEntityId: number,
  orgEntityDetailId: number,
  body: createInstancesBody,
) => {
  const response = await PUT<editInstanceResponse, createInstancesBody>(
    `/organization-entities/${orgEntityId}/organization-entity-details/${orgEntityDetailId}`,
    body,
  )
  return response
}

export const removeInstance = async (orgEntityId: number, orgEntityDetailId: number) => {
  const response = await DELETE<getOrgEntityFieldsResponse>(
    `/organization-entities/${orgEntityId}/organization-entity-details/${orgEntityDetailId}`,
  )
  return response
}

type getFatherResponse = {
  data: {
    id: number
    name: string
    parentId: {
      id: number
      name: string
    }
    childs: [
      {
        id: number
        name: string
      },
    ]
  }
}
export const getFather = async (orgEntityTypeId: number) => {
  const response = await GET<getFatherResponse>(
    `/organization-entity-types/${orgEntityTypeId}/get_parent_entity`,
  )
  return response
}
