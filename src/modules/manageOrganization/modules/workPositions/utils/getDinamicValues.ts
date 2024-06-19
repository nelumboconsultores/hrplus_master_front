import { PathName, isObject } from 'core'
import { statusMapping } from '../enums'

type ValuesResponse = { values: string[]; titles: string[] }
const constantsValues = {
  costCenters: [
    { key: 'status', label: 'Estatus' },
    { key: 'country', label: 'País' },
    { key: 'state', label: 'Estado' },
    { key: 'city', label: 'Municipio' },
  ],
  postions: [{ key: 'status', label: 'Estatus' }],
  stores: [{ key: 'status', label: 'Estatus' }],
  taxesCategories: [
    { key: 'country', label: 'País' },
    { key: 'state', label: 'Estado' },
    { key: 'city', label: 'Municipio' },
    { key: 'address', label: 'Dirección' },
    { key: 'zipcode', label: 'Código Postal' },
    { key: 'georefDistance', label: 'Geocerca' },
    { key: 'latitude', label: 'Latitud' },
    { key: 'longitude', label: 'Longitud' },
  ],
  cashBenefits: [
    { key: 'status', label: 'Estatus' },
    { key: 'minAuthorizedSalary', label: 'Salario Mínimo Autorizado' },
    { key: 'maxAuthorizedSalary', label: 'Salario Máximo Autorizado' },
  ],
  jobTitles: [
    { key: 'status', label: 'Estatus' },
    { key: 'authorizedStaff', label: 'Plantilla Autorizada' },
  ],
}

const getSectionValues = (
  section: { key: string; label: string }[],
  {
    data,
  }: {
    data: {
      status: { id: number; name: string }
      fieldValues: Record<string, string | number | boolean>
    }
  },
): ValuesResponse => {
  const entries = Object.entries(data)
  return {
    values: section.map(({ key }) => {
      const value = entries.find(([k]) => k === key)
      if (value && value[0] === 'status') return statusMapping[(value[1] as { id: number }).id]
      if (value && isObject(value[1])) return (value[1] as unknown as { name: string }).name ?? '-'
      return value?.[1] ?? '-'
    }) as string[],
    titles: section.map(({ label }) => label),
  }
}

export const getDetailValues = (
  originPath: string,
  {
    data,
  }: {
    data: {
      status: { id: number; name: string }
      fieldValues: Record<string, string | number | boolean>
    }
  },
): ValuesResponse => {
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
