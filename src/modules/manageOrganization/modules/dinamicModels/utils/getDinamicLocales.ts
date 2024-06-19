import { PathName } from 'core'
import { ModelLocales } from '../enums'

export const getName = (originPath: string): string => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')
  if (isAEntity(PathName.costCenter)) {
    return ModelLocales.CostCenter
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    return ModelLocales.Positions
  }
  if (isAEntity(PathName.taxesCategories)) {
    return ModelLocales.TaxesCategories
  }
  if (isAEntity(PathName.stores)) {
    return ModelLocales.Stores
  }
  if (isAEntity(PathName.cashBenefits)) {
    return ModelLocales.CashBenefits
  }
  if (isAEntity(PathName.jobTitles)) {
    return ModelLocales.JobTitles
  }
  return ''
}
