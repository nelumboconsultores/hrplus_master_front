import { PathName, TypeView } from 'core'

export const returnNavigationModalInit = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.creationDataEntity + `/${id}`
  if (id === TypeView.organizationalStructure)
    return PathName.creationDataEntityOrganization + `/${id}`
  return ''
}

export const returnNavigationEdit = (id: string, idEntity: string): string => {
  if (id === TypeView.operatingStructure) return PathName.operatingEdit + `/${id}/${idEntity}`
  if (id === TypeView.organizationalStructure)
    return PathName.organizationalLevelFormEdit + `/${id}/${idEntity}`
  return ''
}

export const returnTitle = (id: string): string => {
  if (id === TypeView.operatingStructure) return 'operatingStructure.title.operatingStructure'
  if (id === TypeView.organizationalStructure)
    return 'operatingStructure.title.organizationalStructure'
  return ''
}

export const returnTitleModal = (id: string): string => {
  if (id === TypeView.operatingStructure)
    return 'operatingLevel.modals.creationOperationalStructure'
  if (id === TypeView.organizationalStructure)
    return 'operatingLevel.modals.creationOrganizationalStructure'
  return ''
}

export const returnBodyModal = (id: string): string => {
  if (id === TypeView.operatingStructure) return 'operatingLevel.modals.theOperationalStructure'
  if (id === TypeView.organizationalStructure)
    return 'operatingLevel.modals.theOrganizationalStructure'
  return ''
}

export const returnPathDataCreation = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.listDataCreation
  if (id === TypeView.organizationalStructure) return PathName.listOrganizationalStructure
  return ''
}

export const returnFishHierarchy = (id: string): string => {
  if (id === TypeView.operatingStructure)
    return 'operatingLevel.modals.finishedOperationalStructure'
  if (id === TypeView.organizationalStructure)
    return 'operatingLevel.modals.finishedOrganizationalStructure'
  return ''
}

export const returnPathHierarchySummaryView = (id: string): string => {
  if (id === TypeView.operatingStructure) return PathName.hierarchySummaryView
  if (id === TypeView.organizationalStructure) return PathName.hierarchySummaryOrganizationStructure
  return ''
}

export const returnTitleTable = (id: string): string => {
  if (id === TypeView.operatingStructure) return 'operatingLevel.title.operatingLevel'
  if (id === TypeView.organizationalStructure) return 'operatingLevel.title.organizationalLevel'
  return ''
}

export const returnModalTextTree = (id: string): string => {
  if (id === TypeView.operatingStructure) return 'operatingLevel.modals.saveHierarchyDescriptionGeo'
  if (id === TypeView.organizationalStructure)
    return 'operatingLevel.modals.saveHierarchyDescriptionOrg'
  return ''
}

export const returnBreadCrumbs = (id: string): string[] => {
  if (id === TypeView.operatingStructure) return [PathName.DataStructure, PathName.listDataCreation]
  if (id === TypeView.organizationalStructure)
    return [PathName.DataStructure, PathName.listOrganizationalStructure]
  return []
}
