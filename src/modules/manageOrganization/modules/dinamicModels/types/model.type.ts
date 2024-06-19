import { DynamicFieldValues } from 'core'

export type Model = {
  id: number
  createdAt: string
  code: string
  denomination: string
  country: {
    id: number
    name: string
  }
  state: {
    id: number
    name: string
    countryId: number
  }
  city: {
    id: number
    name: string
    stateId: number
  }
  fieldValues: DynamicFieldValues
  status: { id: number; name: string }
}
