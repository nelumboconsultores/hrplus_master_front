import { GET } from 'core/services'

type GetCompTabListResponse = {
  data: {
    id: number
    code: string
    denomination: string
  }[]
}

export const getCompTabList = async (search: string) => {
  const response = await GET<GetCompTabListResponse>(
    `/compensation-tabs/simplified-search?search=${search}`,
  )
  return response
}
