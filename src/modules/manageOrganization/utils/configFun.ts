import { PathName, TypeView } from 'core'

export const returnBreadCrumbs = (id: string): string[] => {
  if (id === TypeView.operatingStructure)
    return [PathName.organizationManagement, PathName.listDataCreation]
  if (id === TypeView.organizationalStructure)
    return [PathName.organizationManagement, PathName.listOrganizationalStructure]
  return []
}

export const returnPathList = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.listGeographicalStructure
  if (id === TypeView.organizationalStructure) return PathName.listOrganizationalStr
  return ''
}
export const returnPathRouteCreate = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.creationInsGeoManagementView
  if (id === TypeView.organizationalStructure) return PathName.creationInsOrnManagementView
  return ''
}

export const returnPathEdit = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.editInsGeoManagementView
  if (id === TypeView.organizationalStructure) return PathName.editInsOrnManagementView
  return ''
}

export const returnPathTree = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.treeGeoManagementview
  if (id === TypeView.organizationalStructure) return PathName.treeOrgManagementview
  return ''
}
