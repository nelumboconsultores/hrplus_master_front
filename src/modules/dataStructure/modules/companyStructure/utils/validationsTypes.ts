import { FieldTypeEnumSelect } from 'core'

export const refineByFieldType = (type: FieldTypeEnumSelect, val: any): boolean => {
  switch (type) {
    case FieldTypeEnumSelect.number:
      return Number(val.max_value) >= Number(val.min_value)
    case FieldTypeEnumSelect.text:
      return Number(val.maxLength) > Number(val.minLength)
    case FieldTypeEnumSelect.catalog:
      return true
    case FieldTypeEnumSelect.date:
      return true
    case FieldTypeEnumSelect.hour:
      return true
    case FieldTypeEnumSelect.currency:
      return Number(val.upperMoney) > Number(val.lowerMoney)
    case FieldTypeEnumSelect.file:
      return true
    case FieldTypeEnumSelect.geographic_location:
      return true
    case FieldTypeEnumSelect.email:
      return true
    case FieldTypeEnumSelect.phone:
      return true
    case FieldTypeEnumSelect.binary:
      return true
    default:
      return true
  }
}

export const returnPlaceWhereValidationApplied = (val?: Record<string, unknown>): string => {
  switch (val?.type) {
    case FieldTypeEnumSelect.number:
      return Number(val.max_value) > Number(val.min_value) ? 'max_value' : 'min_value'
    case FieldTypeEnumSelect.text:
      return Number(val.maxLength) > Number(val.minLength) ? 'maxLength' : 'minLength'
    case FieldTypeEnumSelect.catalog:
    case FieldTypeEnumSelect.date:
    case FieldTypeEnumSelect.hour:
    case FieldTypeEnumSelect.currency:
      return Number(val.upperMoney) > Number(val.lowerMoney) ? 'upperMoney' : 'lowerMoney'
    case FieldTypeEnumSelect.file:
    case FieldTypeEnumSelect.geographic_location:
    case FieldTypeEnumSelect.email:
    case FieldTypeEnumSelect.phone:
    case FieldTypeEnumSelect.binary:
      return 'server'
    default:
      return 'client'
  }
}
