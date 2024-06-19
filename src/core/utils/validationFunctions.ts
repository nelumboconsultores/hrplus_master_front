import dayjs from 'dayjs'
import { DynamicFormValuesType } from 'core/types'
import { getAge } from './getValues'

export const remLeadingSpaces = (e: React.FormEvent<HTMLElement>) => {
  const event = e as React.ChangeEvent<HTMLInputElement>
  event.target.value = event.target.value.replace(/^\s/, '')
}

export const isNull = (value: unknown) => {
  return value === null || value === undefined
}

export const validationMaxNumber = (e: React.FormEvent<HTMLElement>) => {
  const event = e as React.ChangeEvent<HTMLInputElement>
  event.target.value = event.target.value.slice(0, 75)
}

export const isObject = (value: unknown) => value !== null && typeof value === 'object'

export const isBoolean = (value: unknown) => typeof value === 'boolean'

export const isStringEquals = (a: string, b: string): boolean => {
  const toBasicString = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  if (!a || !b) return false

  return toBasicString(a) === toBasicString(b)
}

export const isEmpty = (value: unknown) => {
  if (isNull(value)) return true
  if (Array.isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value as object).length === 0
  if (typeof value === 'string') return value.trim().length === 0
  return false
}
export const isVoid = (value: string): string => {
  if (!value) return '-'
  if (typeof value === 'string' && value === '') return '-'
  return value.toString()
}

export const areObjectsEqual = (a?: Record<string, unknown>, b?: Record<string, unknown>) => {
  if (!a || !b) return false
  return JSON.stringify(a) === JSON.stringify(b)
}

//validaciones de fechas de nacimiento para los formularios dinamicos
export const hasBirthDate = (fields: { [key: string]: DynamicFormValuesType }) => {
  return Object.keys(fields).some((key) => key.toLowerCase().includes('fecha de nacimiento'))
}

export const validateIsAdult = (birthDate: string) => {
  const age = getAge(birthDate)
  return age ? age >= 18 : false
}

export const isTheSameDay = (date1: string, date2: string) => {
  const date1Formatted = dayjs(date1, 'DD/MM/YYYY').format('DD/MM/YYYY')
  const date2Formatted = dayjs(date2, 'DD/MM/YYYY').format('DD/MM/YYYY')
  return date1Formatted === date2Formatted
}
//##########################################################################################

// Función para verificar si la hora final es menor o mayor que la hora inicial
export const isInvalidTimeRange = (
  startTime: string,
  endTime: string,
  orientation: boolean = true,
): boolean => {
  // Parsear las horas con Day.js usando un formato de 24 horas
  const start = dayjs(startTime, 'HH:mm')
  const end = dayjs(endTime, 'HH:mm')

  // Comparar las horas
  if (orientation) {
    // Si endTime es antes que startTime o son iguales, el rango es inválido
    return end.isBefore(start) || end.isSame(start)
  } else {
    // Si endTime es después que startTime o son iguales, el rango es inválido
    return end.isAfter(start) || end.isSame(start)
  }
}
