import { Box } from '@mui/material'
import { AlertMessType } from 'core'
import Spinner from 'core/components/spinner'
import { AppContext } from 'core/context/appContext.context'
import { getUserPermissions } from 'core/services/useUserPermissions'
import { UserPermissions } from 'core/types/userPermissions'
import { useEffect, useState } from 'react'

export const AppProvider = ({ children }: { children: React.ReactElement }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [saveEmail, setSaveEmail] = useState<string>('')
  const [actMessage, setActMessage] = useState<AlertMessType>()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))
  const [permissions, setPermissions] = useState<UserPermissions>(Object({}))
  const [loadingHome, setLoadingHome] = useState(false)
  const [permissionsLoaded, setPermissionsLoaded] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setLoadingHome(true)
      const fetchPermissions = async () => {
        const response = await getUserPermissions()
        if (response.data) {
          const permissionsObject: UserPermissions = Object({})
          response.data.data.forEach((permission) => {
            permissionsObject[permission.moduleName] = permission.permissionsTypes
          })
          setPermissionsLoaded(true)
          setPermissions(permissionsObject)
          setLoadingHome(false)
        }
      }
      fetchPermissions()
    }
    setPermissionsLoaded(false)
  }, [isAuthenticated]) //eslint-disable-line

  if (loadingHome && isAuthenticated)
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    )
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        actMessage,
        setActMessage,
        saveEmail,
        setSaveEmail,
        isAuthenticated,
        setIsAuthenticated,
        permissions,
        loadingHome,
        setLoadingHome,
        permissionsLoaded,
        setPermissionsLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
