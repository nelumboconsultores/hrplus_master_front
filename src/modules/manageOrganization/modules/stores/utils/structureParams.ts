import { StrucData } from '../pages'

export const structureParams = (
  struct: StrucData[],
  name: 'organizativeStructIds' | 'geographyStructIds',
) => {
  //exit: `${name}`=1,2,3&`${name}`=1,2,3
  if (!struct || struct?.length === 0) return ''
  return struct
    .map((item) => {
      const values = Object.values(item.data).map((data) => data?.value)
      const withoutEmptyValues = values.filter((value) => value && value !== '')
      return `${name}=${withoutEmptyValues.join('-')}`
    })
    .join('&')
}
