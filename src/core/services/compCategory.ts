import { GET } from './requests'

type GetCompCategoryResponse = {
  data: {
    id: number
    code: string
    denomination: string
  }[]
}

export const getCompCategory = async (param: string) => {
  const response = await GET<GetCompCategoryResponse>(
    `/compensation-categories/simplified-search?${param}`,
  )
  return response
}
