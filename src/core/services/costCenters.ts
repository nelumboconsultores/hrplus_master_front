import { GET } from '.'

type GetListSearchCostCentersType = {
  data: [
    {
      id: number
      code: string
      denomination: string
    },
  ]
}

export const getListSearchCostCenters = async (search: string) => {
  const response = await GET<GetListSearchCostCentersType>(
    `/cost-centers/simplified-search?${search}`,
  )
  return response
}
