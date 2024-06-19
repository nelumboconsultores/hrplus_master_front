import { PathName, isObject } from 'core'
import { ModelResponse } from '../services/model.services'
import { statusMapping } from '../enums'
import { formatCurrency } from 'core/utils/textFormat'

type ValuesResponse = { values: any[]; titles: string[] }
const constantsValues = {
  costCenters: [
    { key: 'status', label: 'Estatus' },
    { key: 'country', label: 'País' },
    { key: 'state', label: 'Estado' },
    { key: 'city', label: 'Municipio' },
  ],
  postions: [{ key: 'status', label: 'Estatus' }],
  stores: [{ key: 'status', label: 'Estatus' }],
  taxesCategories: [{ key: 'status', label: 'Estatus' }],
  cashBenefits: [
    { key: 'status', label: 'Estatus' },
    { key: 'minAuthorizedSalary', label: 'Salario Mínimo Autorizado' },
    { key: 'maxAuthorizedSalary', label: 'Salario Máximo Autorizado' },
  ],
  jobTitles: [{ key: 'status', label: 'Estatus' }],
}

const currencyKeys = ['minAuthorizedSalary', 'maxAuthorizedSalary']

const getSectionValues = (
  section: { key: string; label: string }[],
  { data }: ModelResponse,
): ValuesResponse => {
  const entries = Object.entries(data)
  return {
    values: section.map(({ key }) => {
      const value = entries.find(([k]) => k === key)
      if (value && value[0] === 'status') return statusMapping[(value[1] as { id: number }).id]
      if (value && currencyKeys.includes(value[0])) return formatCurrency(Number(value[1]))
      if (value && isObject(value[1])) return (value[1] as { name: string }).name ?? '-'
      return value?.[1] ?? '-'
    }) as string[],
    titles: section.map(({ label }) => label),
  }
}

export const getDetailValues = (originPath: string, { data }: ModelResponse): ValuesResponse => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')
  if (isAEntity(PathName.costCenter)) {
    return getSectionValues(constantsValues.costCenters, { data })
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    return getSectionValues(constantsValues.postions, { data })
  }
  if (isAEntity(PathName.taxesCategories)) {
    return getSectionValues(constantsValues.taxesCategories, { data })
  }
  if (isAEntity(PathName.stores)) {
    return getSectionValues(constantsValues.stores, { data })
  }
  if (isAEntity(PathName.cashBenefits)) {
    return getSectionValues(constantsValues.cashBenefits, { data })
  }
  if (isAEntity(PathName.jobTitles)) {
    return getSectionValues(constantsValues.jobTitles, { data })
  }
  return { values: [], titles: [] }
}
