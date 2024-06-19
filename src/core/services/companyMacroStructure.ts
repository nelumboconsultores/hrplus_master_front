import { NavLinksEnum } from 'modules/dataStructure/modules/companyStructure/enums'
import { GET } from '.'

type GetgetOrganizationMacroStructureResponse = {
  data: {
    id: number
    name: string
    key: keyof typeof NavLinksEnum
    status: string
    populateStatus: string
  }[]
}

export const getOrganizationMacroStructure = async () => {
  const response = await GET<GetgetOrganizationMacroStructureResponse>(
    `/organization-macro-structure-status`,
  )
  return response
}
