import { DinamicFields } from 'core'
import { typeFields } from '../types'

export const dinamicFieldsMapper = (fields: DinamicFields[]): typeFields[] => {
  const mappedData: typeFields[] = fields.map((item) => ({
    type: item.fieldType.id,
    id: item.id,
    required: item.validations.required,
    unique: item.validations.unique ?? false,
    name: item.label ?? item.name,
    label: item.label ?? item.name,
    visible: item.visible,
    maxLength: item.validations.max_chars ?? 0,
    minLength: item.validations.min_chars ?? 0,
    min_value: item.validations.min_value,
    max_value: item.validations.max_value,
    catalogueId: item.catalogueId,
    newPosition: item.position,
    used: item.used,
    max_date: item.validations.max_date,
    max_time: item.validations.max_time,
    min_time: item.validations.min_time,
    upperMoney: item.validations.max_currency,
    lowerMoney: item.validations.min_currency,
    rangeTime: item.validations.max_range,
    max_size: item.validations.max_size,
    fileType: item.validations.file_type,
    depth: item.validations.depth,
    locked: item.locked,
  }))

  return mappedData
}
