import { Model } from './model.type'

export type getModelResponse = {
  totalPages: number
  totalElements: number
  size: number
  content: Model[]
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
