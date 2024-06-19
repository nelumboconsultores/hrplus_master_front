import { ServicesKeys } from 'core/enum/routerEnum'
import { GET } from '.'
import { RolActions } from 'core/enum/rolActions'

type GetUserPermissionsResponse = {
  data: {
    id: 0
    moduleName: ServicesKeys
    permissionsTypes: RolActions[]
  }[]
}

export const getUserPermissions = async () => {
  const response = await GET<GetUserPermissionsResponse>(`/auth/permissions`)
  return response
}
