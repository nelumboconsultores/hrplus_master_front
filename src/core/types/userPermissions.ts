import { RolActions } from 'core/enum/rolActions'
import { ServicesKeys } from 'core/enum/routerEnum'

export type UserPermissions = Record<ServicesKeys, Array<RolActions>>
