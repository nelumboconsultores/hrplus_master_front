import { FieldTypeEnumSelect, PathName } from 'core'
import { TypeJson } from 'core/components/returnInput/typeJson'

export const costCenterFields: TypeJson[] = [
  {
    type: FieldTypeEnumSelect.text,
    name: 'code',
    label: 'Código',
    placeholder: 'Ingrese el código',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'denomination',
    label: 'Denominación',
    placeholder: 'Ingrese denominación',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'statusId',
    label: 'Estatus',
    optionsOut: [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ],
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'countryId',
    label: 'País',
    optionsUrl: '/countries',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'stateId',
    label: 'Estado',
    parents: ['countryId'],
    optionsUrl: '/countries/{id}/states',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'cityId',
    label: 'Municipio',
    parents: ['countryId', 'stateId'],
    optionsUrl: '/countries/{id}/states/{id}/cities',
    validations: {
      required: true,
    },
  },
]

export const taxesCategoriesFields: TypeJson[] = [
  {
    type: FieldTypeEnumSelect.text,
    name: 'code',
    label: 'Código',
    placeholder: 'Ingrese el código',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'denomination',
    label: 'Denominación',
    placeholder: 'Ingrese denominación',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'statusId',
    label: 'Estatus',
    optionsOut: [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ],
    validations: {
      required: true,
    },
  },
]
export const cashBenefitsFields: TypeJson[] = [
  {
    type: FieldTypeEnumSelect.text,
    name: 'code',
    label: 'Nivel Macropay',
    placeholder: 'Ingrese el código',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'denomination',
    label: 'Posición',
    placeholder: 'Ingrese denominación',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'statusId',
    label: 'Estatus',
    optionsOut: [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ],
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.currency,
    name: 'minAuthorizedSalary',
    label: 'Salario Mínimo Autorizado',
    placeholder: 'Ingrese el salario mínimo autorizado',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.currency,
    name: 'maxAuthorizedSalary',
    label: 'Salario Máximo Autorizado',
    placeholder: 'Ingrese el salario máximo autorizado',
    validations: {
      required: true,
    },
  },
]
export const storeFields: TypeJson[] = taxesCategoriesFields
export const jobTitlesFields: TypeJson[] = taxesCategoriesFields
export const positionsFields: TypeJson[] = taxesCategoriesFields

export const StaticJson = (originPath: string): TypeJson[] => {
  const isAEntity = (path: PathName) => originPath.includes(path)
  const isNotTaxesCategories = !originPath.includes('categorias-de-puestos')
  if (isAEntity(PathName.costCenter)) {
    return costCenterFields
  }
  if (isAEntity(PathName.positions) && isNotTaxesCategories) {
    return positionsFields
  }
  if (isAEntity(PathName.taxesCategories)) {
    return taxesCategoriesFields
  }
  if (isAEntity(PathName.stores)) {
    return storeFields
  }
  if (isAEntity(PathName.cashBenefits)) {
    return cashBenefitsFields
  }
  if (isAEntity(PathName.jobTitles)) {
    return jobTitlesFields
  }
  return []
}
