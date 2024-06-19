export const generateQueryParams = (data: {
  [key: string]:
    | string
    | (string | number | undefined | { name: string; id: number })[]
    | number
    | undefined
    | boolean
    | null
}) => {
  const withoutEmptyValues = Object.keys(data).filter((key) => data[key] && data[key] !== '')
  return withoutEmptyValues
    .map((key) => {
      const value = data[key]
      if (Array.isArray(value)) return key + '=' + value.join(',')
      return key + '=' + value
    })
    .join('&')
}
