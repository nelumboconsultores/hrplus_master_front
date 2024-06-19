import { PathName } from 'core'
import { ModelServices } from '../enums'

export const getService = (originPath: string): string => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')

  if (isAEntity(PathName.costCenter)) {
    return ModelServices.CostCenter
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    return ModelServices.Positions
  }
  if (isAEntity(PathName.taxesCategories)) {
    return ModelServices.TaxesCategories
  }
  if (isAEntity(PathName.stores)) {
    return ModelServices.Stores
  }
  if (isAEntity(PathName.cashBenefits)) {
    return ModelServices.CashBenefits
  }
  if (isAEntity(PathName.jobTitles)) {
    return ModelServices.JobTitles
  }
  return ''
}
