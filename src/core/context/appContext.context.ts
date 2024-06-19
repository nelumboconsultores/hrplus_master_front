import { AlertMessType } from 'core'
import { UserPermissions } from 'core/types/userPermissions'
import { createContext } from 'react'

export const AppContext = createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  saveEmail: string
  setSaveEmail: React.Dispatch<React.SetStateAction<string>>
  actMessage: AlertMessType
  setActMessage: React.Dispatch<React.SetStateAction<AlertMessType>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingHome: boolean
  setLoadingHome: React.Dispatch<React.SetStateAction<boolean>>
  permissions: UserPermissions
  permissionsLoaded: boolean
  setPermissionsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}>(Object({}))
