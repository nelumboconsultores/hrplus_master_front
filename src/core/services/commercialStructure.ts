import { GET } from '.'
type DetailsMacroStructureResponse = {
  data: {
    id: number
    name: string
    key: string
    status: string
  }
}

export const getDetailsMacroStructure = async (id: string) => {
  const response = await GET<DetailsMacroStructureResponse>(
    `/organization-macro-structure-status/${id}`,
  )
  return response
}
