import { DynamicFormValues, DynamicFormValuesType } from 'core/types'
import { arrayGenInfoType } from 'modules/manageOrganization/modules/workPositions/types'

type ArrayItem = {
  title: string
  value: DynamicFormValuesType
}

export function arrayToObject(arr: ArrayItem[]): DynamicFormValues {
  const obj: DynamicFormValues = {}
  arr.forEach((item) => {
    obj[item.title] = item.value
  })
  return obj
}

//transformer array {name:value} to [{name:name, value:value}]
export const objectToArray = (array: DynamicFormValues): ArrayItem[] => {
  const arr: ArrayItem[] = []
  for (const key in array) {
    arr.push({ title: key, value: array[key] })
  }
  return arr
}

export const isWithinRange = (time: string, valMin: string, valMax: string) => {
  const timeMin = parseInt(valMin.replace(':', ''))
  const timeMax = parseInt(valMax.replace(':', ''))
  const timeValue = parseInt(time.replace(':', ''))
  return timeValue >= timeMin && timeValue <= timeMax
}

export const isURL = (url?: string) => {
  if (!url) return false
  const bucketUrl = 'https://capital-humano-documents.s3.amazonaws.com'
  return url.includes(bucketUrl)
}

export const containsDot = (str: string) => {
  const regex = /\./
  return regex.test(str)
}

export const isEllipsisActive = (el: Element) => el.scrollWidth > el.clientWidth

export function createDataArray(data: DynamicFormValues): arrayGenInfoType[] {
  return Object.entries(data).map(([title, value]) => ({ title, value: value }))
}

// crear identificadores para objetos a base de tiempo
export const createId = () => {
  return Date.now() + performance.now()
}

//Validar que al menos uno de los valores de un objeto tengan data
export function hasAtLeastOneValue(obj: DynamicFormValues) {
  return Object.values(obj).some((value) => value)
}

//Saber si es una fecha
export function isDate(d: DynamicFormValuesType) {
  return Object.prototype.toString.call(d) === '[object Date]'
}
