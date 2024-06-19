import { AppContext, MenuMainItemsType } from 'core'
import { RolActions } from 'core/enum/rolActions'
import { ServicesKeys } from 'core/enum/routerEnum'
import { useContext } from 'react'

export const usePermissions = () => {
  const { permissions, isAuthenticated } = useContext(AppContext)

  const hasUpdatePermission = (serviceKey: ServicesKeys): boolean => {
    if (!isAuthenticated || !permissions[serviceKey]) {
      return false
    }
    return permissions[serviceKey].includes(RolActions.Update)
  }

  const hasDeletePermission = (serviceKey: ServicesKeys): boolean => {
    if (!isAuthenticated || !permissions[serviceKey]) {
      return false
    }
    return permissions[serviceKey].includes(RolActions.Delete)
  }

  const hasCreatePermission = (serviceKey: ServicesKeys): boolean => {
    if (!isAuthenticated || !permissions[serviceKey]) {
      return false
    }
    return permissions[serviceKey].includes(RolActions.Create)
  }

  const hasAssignWorkPeriodPermission = (serviceKey: ServicesKeys): boolean => {
    if (!isAuthenticated || !permissions[serviceKey]) {
      return false
    }
    return permissions[serviceKey].includes(RolActions.AssignWorkPeriod)
  }

  const canSeePage = (page: ServicesKeys[]) => {
    if (!isAuthenticated) return false
    let hasPermission = false
    page.forEach((service) => {
      if (permissions[service]?.includes(RolActions.Read)) hasPermission = true
    })
    return hasPermission
  }

  const getMenuItems = (menuItems: MenuMainItemsType[]) => {
    const items = menuItems.filter((item) => {
      if (!item.permissions) return true
      return canSeePage(item.permissions)
    })
    return items
  }
  return {
    canSeePage,
    getMenuItems,
    hasUpdatePermission,
    hasDeletePermission,
    hasCreatePermission,
    hasAssignWorkPeriodPermission,
  }
}
