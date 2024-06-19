import { FieldTypeEnumSelect } from 'core/enum'
import { DynamicFormValues, DynamicFormValuesType, FieldsTypesType } from 'core/types'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { getAge } from './getValues'
dayjs.extend(timezone)
dayjs.extend(utc)

export const transformTextInaSpanishParragraph = (text: string) => {
  text = text.charAt(0).toUpperCase() + text.slice(1)

  const sentences = text.split(/[.!?]/)

  const transformedText = sentences.map((sentence) => {
    sentence = sentence.trim()
    if (sentence.length === 0) return ''
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
    return sentence
  })

  return transformedText.join('. ').trim()
}

export const capitalizeEachWord = (string: string) => {
  return string.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
}
//2024-03-11T21:16:29.21 to 11/03/2024
export const dateToSpanish = (date: string | Date | undefined) => {
  if (!date) return '-'
  const isDate = date.toString().includes('T')
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return dayjs(date).utc(isDate).tz(currentTimeZone).format('DD/MM/YYYY')
}

export const formatCurrency = (number: number): string => {
  return number.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
}

export const formatValueWithType = (
  fieldTypes: FieldsTypesType,
  fieldValues: DynamicFormValues,
): Array<{ key: string; value: DynamicFormValuesType; type: number }> => {
  const fields = Object.entries(fieldValues)

  const formattedFields = fields.map(([key, value]) => {
    if (!value) return { key, value, type: fieldTypes[key] }
    const fieldType = fieldTypes[key]
    return { key, value, type: fieldType }
  })
  return formattedFields
}
export const formatFieldsWithTheirType = (
  fieldTypes: FieldsTypesType,
  fieldValues: DynamicFormValues,
): Array<{ key: string; value: DynamicFormValuesType; type: number }> => {
  const fields = Object.entries(fieldValues)

  const formattedFields = fields.map(([key, value]) => {
    if (!value) return { key, value: 'N/A', type: fieldTypes[key] }

    const fieldType = fieldTypes[key]
    let formattedValue = value
    if (FieldTypeEnumSelect.binary === fieldType) formattedValue = value ? 'Sí' : 'No'
    if (FieldTypeEnumSelect.currency === fieldType) formattedValue = formatCurrency(Number(value))
    if (FieldTypeEnumSelect.phone === fieldType) formattedValue = formatPhone(value?.toString())
    if (key?.toLowerCase() === 'fecha de nacimiento')
      formattedValue = fotmatBirthday(value.toString())
    return { key, value: formattedValue, type: fieldType }
  })
  return formattedFields
}

//birdthday fotmat dd/mm/yyyy (## años)
const fotmatBirthday = (date: string | Date | undefined) => {
  if (!date) return 'N/A'
  const isDate = date.toString().includes('T')
  if (isDate) {
    return `${dayjs(date).format('DD/MM/YYYY')} (${getAge(date)} años)`
  }
  return `${date} (${getAge(date)} años)`
}

export const formatArrayToDynamicFormValues = (
  array: Array<{ key: string; value: DynamicFormValuesType }>,
): DynamicFormValues => {
  const transformedObject = array.reduce<Record<string, DynamicFormValuesType>>((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {})
  return transformedObject
}
export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

export const toNumber = (value?: string | number | boolean) => {
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'string') return parseInt(value)
  return value
}
