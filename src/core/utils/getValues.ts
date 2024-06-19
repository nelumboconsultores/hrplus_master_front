import dayjs from 'dayjs'
import { ItemsSelectType } from 'core'

export const getMultiselecValues = (values: (number | string)[], options: ItemsSelectType[]) => {
  if (!values) return []

  return options.filter(({ value }) => values.includes(value))
}

export const getAutocompleteValue = (value: number | string, options: ItemsSelectType[]) => {
  if (!value) return null

  return options.find(({ value: itemValue }) => value === itemValue)
}

export const getAge = (date: string | Date | number | null | undefined) => {
  if (!date) return null
  const diff = dayjs(new Date()).diff(dayjs(date, 'DD/MM/YYYY'), 'year', true)
  return Math.floor(diff)
}

export function generateUniqueId(): string {
  const timePart = new Date().getTime().toString(36) // Tiempo actual en milisegundos convertido a base 36
  const randomPart = Math.random().toString(36).substring(2, 15) // Genera una cadena aleatoria
  return `${timePart}-${randomPart}`
}
