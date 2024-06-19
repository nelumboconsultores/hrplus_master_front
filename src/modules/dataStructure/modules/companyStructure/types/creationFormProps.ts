import { typeRQ } from 'core'
import { typeFields } from '../../../types'
import { FormActionsPermissions } from '.'

export type CreationFormProps = {
  services: {
    edit: ServicesConfig
    create: ServicesConfig
    remove: ServicesConfig
  }
  listFields?: typeFields[]
  removeActions?: FormActionsPermissions
  onFinish?: () => void
  // backButtonSx?: SxProps
}

export type ServicesConfig = { path: string; type: typeRQ }
