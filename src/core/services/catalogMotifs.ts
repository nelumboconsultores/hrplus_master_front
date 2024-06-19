import { AsyncReturnType } from 'core'
import { POST, PUT, GET, DELETE, PATCH } from '.'

type AddCatalogueResponse = {
  data: {
    id: number
    name: string
    isActive: boolean
    isLocked?: boolean
    subcategories: [
      {
        id: number
        name: string
      },
    ]
  }
}
type AddCatalogueBody = {
  name: string
  catalogueTypeId: number
  subcategories: string[]
}

export const addCatalogue = async (
  body: AddCatalogueBody,
): AsyncReturnType<AddCatalogueResponse> => {
  const response = await POST<AddCatalogueResponse, AddCatalogueBody>('/catalogues', body)
  return response
}

type GetCatalogueResponse = {
  data: {
    totalPages: number
    totalElements: number
    size: number
    content: {
      id: number
      name: string
      isActive?: boolean
      solicitationCatalogs: {
        id: number
        name: string
      }[]
      subcategories: {
        id: number
        name: string
      }[]
      isLocked?: boolean
    }[]
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
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
    numberOfElements: number
    first: boolean
    last: boolean
    empty: boolean
  }
}

export const getCatalogue = async (param: string) => {
  const response = await GET<GetCatalogueResponse>(`/catalogues?${param}`)
  return response
}

type UpdateCatalogueResponse = {
  data: {
    id: 0
    name: string
    isActive: boolean
    isLocked?: boolean
    catalogueType: {
      id: number
      name: string
    }
    subcategories: [
      {
        id: number
        name: string
      },
    ]
  }
}
type UpdateCatalogueBody = {
  name: string

  subcategories: string[]
}
export const UpdateCatalogue = async (catalogueReasonId: number, body: UpdateCatalogueBody) => {
  const response = await PUT<UpdateCatalogueResponse, UpdateCatalogueBody>(
    `/catalogues/${catalogueReasonId}`,
    body,
  )
  return response
}

type DeleteCatalogue = {
  data: boolean
}

export const deleteCatalogue = async (catalogueReasonId: number) => {
  const response = await DELETE<DeleteCatalogue>(`/catalogues/${catalogueReasonId}`)
  return response
}

type ActivateCatalogueResponse = {
  data: {
    id: number
    name: string
    isActive: boolean
  }
}
type ActivateCatalogueBody = {
  active: boolean
}

export const activateCatalogue = async (catalogueReasonId: number, body: ActivateCatalogueBody) => {
  const response = await PATCH<ActivateCatalogueResponse, ActivateCatalogueBody>(
    `/catalogues/${catalogueReasonId}/status`,
    body,
  )
  return response
}

type GetCatalogueListResponse = {
  data: {
    id: number
    name: string
  }[]
}
export const getCatalogueList = async (param: string) => {
  const response = await GET<GetCatalogueListResponse>(`/catalogues/names?${param}`)
  return response
}
