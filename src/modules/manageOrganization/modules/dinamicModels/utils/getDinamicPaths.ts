import { PathName, getPath } from 'core'

export const getDinamicDetailsPaths = (originPath: string, complete: boolean = true) => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')
  if (isAEntity(PathName.costCenter)) {
    if (!complete) return getPath(PathName.instanceCostCenterDetail)
    return PathName.instanceCostCenterDetail
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    if (!complete) return getPath(PathName.instancePositionsDetail)
    return PathName.instancePositionsDetail
  }
  if (isAEntity(PathName.stores)) {
    if (!complete) return getPath(PathName.instanceStoresDetail)
    return PathName.instanceStoresDetail
  }
  if (isAEntity(PathName.taxesCategories)) {
    if (!complete) return getPath(PathName.instanceTaxesCategoriesDetail)
    return PathName.instanceTaxesCategoriesDetail
  }
  if (isAEntity(PathName.cashBenefits)) {
    if (!complete) return getPath(PathName.instanceCashBenefitsDetail)
    return PathName.instanceCashBenefitsDetail
  }
  if (isAEntity(PathName.jobTitles)) {
    if (!complete) return getPath(PathName.instanceJobTitlesDetail)
    return PathName.instanceJobTitlesDetail
  }
}

export const getDinamicCreatePaths = (originPath: string, complete: boolean = true) => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')

  if (isAEntity(PathName.costCenter)) {
    if (!complete) return getPath(PathName.instanceCostCenterCreation)
    return PathName.instanceCostCenterCreation
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    if (!complete) return getPath(PathName.instancePositionsCreation)
    return PathName.instancePositionsCreation
  }
  if (isAEntity(PathName.stores)) {
    if (!complete) return getPath(PathName.instanceStoresCreation)
    return PathName.instanceStoresCreation
  }
  if (isAEntity(PathName.taxesCategories)) {
    if (!complete) return getPath(PathName.instanceTaxesCategoriesCreation)
    return PathName.instanceTaxesCategoriesCreation
  }
  if (isAEntity(PathName.cashBenefits)) {
    if (!complete) return getPath(PathName.instanceCashBenefitsCreation)
    return PathName.instanceCashBenefitsCreation
  }
  if (isAEntity(PathName.jobTitles)) {
    if (!complete) return getPath(PathName.instanceJobTitlesCreation)
    return PathName.instanceJobTitlesCreation
  }
}

export const getDinamicEditPaths = (originPath: string, complete: boolean = true) => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')

  if (isAEntity(PathName.costCenter)) {
    if (!complete) return getPath(PathName.instanceCostCenterEdit)
    return PathName.instanceCostCenterEdit
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    if (!complete) return getPath(PathName.instancePositionsEdit)
    return PathName.instancePositionsEdit
  }
  if (isAEntity(PathName.stores)) {
    if (!complete) return getPath(PathName.instanceStoresEdit)
    return PathName.instanceStoresEdit
  }
  if (isAEntity(PathName.taxesCategories)) {
    if (!complete) return getPath(PathName.instanceTaxesCategoriesEdit)
    return PathName.instanceTaxesCategoriesEdit
  }
  if (isAEntity(PathName.cashBenefits)) {
    if (!complete) return getPath(PathName.instanceCashBenefitsEdit)
    return PathName.instanceCashBenefitsEdit
  }
  if (isAEntity(PathName.jobTitles)) {
    if (!complete) return getPath(PathName.instanceJobTitlesEdit)
    return PathName.instanceJobTitlesEdit
  }
}

export const getDinamicViewPaths = (originPath: string, complete: boolean = true) => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')

  if (isAEntity(PathName.costCenter)) {
    if (!complete) return getPath(PathName.instanceCostCenterView)
    return PathName.instanceCostCenterView
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    if (!complete) return getPath(PathName.instancePositionsView)
    return PathName.instancePositionsView
  }
  if (isAEntity(PathName.stores)) {
    if (!complete) return getPath(PathName.instanceStoresView)
    return PathName.instanceStoresView
  }
  if (isAEntity(PathName.taxesCategories)) {
    if (!complete) return getPath(PathName.instanceTaxesCategoriesView)
    return PathName.instanceTaxesCategoriesView
  }
  if (isAEntity(PathName.cashBenefits)) {
    if (!complete) return getPath(PathName.instanceCashBenefitsView)
    return PathName.instanceCashBenefitsView
  }
  if (isAEntity(PathName.jobTitles)) {
    if (!complete) return getPath(PathName.instanceJobTitlesView)
    return PathName.instanceJobTitlesView
  }
}
