import { PathName } from 'core'
import { ModelKeywords } from '../enums'

export const getKeyword = (originPath: string) => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')
  if (isAEntity(PathName.costCenter)) {
    return ModelKeywords.CostCenter
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    return ModelKeywords.Positions
  }
  if (isAEntity(PathName.taxesCategories)) {
    return ModelKeywords.TaxesCategories
  }
  if (isAEntity(PathName.stores)) {
    return ModelKeywords.Stores
  }
  if (isAEntity(PathName.cashBenefits)) {
    return ModelKeywords.CashBenefits
  }
  if (isAEntity(PathName.jobTitles)) {
    return ModelKeywords.JobTitles
  }
  return ''
}
