import { Data } from 'modules/incidents/types'
import { DELETE, GET, PATCH, POST } from '.'

type GetCatalogueResponse = {
  data: {
    totalPages: number
    totalElements: number
    size: number
    content: [
      {
        id: number
        name: string
        isActive: true
        description: string
        amountAssociations: number
        amountRegisters: number
      },
    ]
    number: number
    sort: {
      empty: true
      sorted: true
      unsorted: true
    }
    pageable: {
      offset: number
      sort: {
        empty: true
        sorted: true
        unsorted: true
      }
      pageNumber: number
      pageSize: number
      paged: true
      unpaged: true
    }
    numberOfElements: number
    first: true
    last: true
    empty: true
  }
}

export const getCatalogue = async (param: string) => {
  const response = await GET<GetCatalogueResponse>(`/solicitation-catalog?${param}`)
  return response
}

type GetCatalogueByIdResponse = {
  data: Data
}

export const getCatalogueById = async (solicitationCatalogId: number) => {
  const response = await GET<GetCatalogueByIdResponse>(
    `/solicitation-catalog/${solicitationCatalogId}`,
  )
  return response
}

type GetCatalogueIncidentsResponse = {
  data: {
    id: number
    name: string
  }[]
}

export const getCatalogueIncidents = async (url: string) => {
  const response = await GET<GetCatalogueIncidentsResponse>(`/${url}`)
  return response
}

type SolicitationCatalogResponse = {
  data: Data
}
type SolicitationCatalogBody = {
  id: number
  column: string | undefined
}

export const solicitationCatalog = async (
  solicitationCatalogId: number,
  url: string,
  body: SolicitationCatalogBody,
) => {
  const response = await PATCH<SolicitationCatalogResponse, SolicitationCatalogBody>(
    `/solicitation-catalog/${solicitationCatalogId}/${url}`,
    body,
  )
  return response
}

type ActivateCatalogueBody = {
  active: boolean
}

export const toggleStatusCatalogue = async (
  solicitationCatalogId: number,
  body: ActivateCatalogueBody,
) => {
  const response = await PATCH(`/solicitation-catalog/${solicitationCatalogId}/status`, body)
  return response
}

type GetCatalogueListResponse = {
  data: {
    id: number
    name: string
  }[]
}
export const getCatalogueListIncidents = async () => {
  const response = await GET<GetCatalogueListResponse>(`/solicitation-catalog/names`)
  return response
}

type BodyConfigEvidences = {
  id: number
  required: boolean
  textHelp: string
  config: {
    sizes: number
    types: Array<string>
    amounts: number
  }
  evidenceTypeId: number
  solicitationCatalogId: number
}[]

type ConfigEvidencesResponse = {
  data: {
    id: number
    textHelp: string
    required: boolean
    evidenceType: {
      id: number
      description: string
      key: string
    }
    config: {
      sizes: number
      types: Array<string>
      amounts: number
    }
    solicitationCatalog: number
  }[]
}

export const configEvidences = async (body: BodyConfigEvidences) => {
  const response = await POST<ConfigEvidencesResponse, BodyConfigEvidences>(
    '/config-evidence',
    body,
  )
  return response
}

export const removeIncidence = async (configEvidenceId: number) => {
  const response = await DELETE<string>(`/config-evidence/${configEvidenceId}`)
  return response
}
