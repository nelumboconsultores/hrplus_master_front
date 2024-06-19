export type ParameterHolidays = {
  id: number
  value: {
    date: string
    name: string
  }[]
}[]

export type ParameterCountry = {
  id: 1
  value: {
    name: string
    code: string
    flag: string
  }
}[]

export type ParameterTimeFormat = {
  id: number
  value: number
}[]
