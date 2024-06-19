import { WorkPeriod } from './workPeriod.type'

export type Model = {
  id: number
  createdAt: string
  code: string
  denomination: string
  address: string
  zipcode: string
  georefDistance: number
  latitude: number
  longitude: number
  country: { id: number; name: string }
  state: { id: number; name: string; countryId: number }
  city: { id: number; name: string; stateId: number }
  fieldValues: Record<string, string | number | boolean | number[]>
  status: { id: number; name: string }
  costCenter: {
    id: number
    createdAt: string
    code: string
    denomination: string
    country: { id: number; name: string }
    state: { id: number; name: string; countryId: number }
    city: { id: number; name: string; stateId: number }
    fieldValues: Record<string, string | number | boolean | number[]>
    status: { id: number; name: string }
  }
  workPeriods?: WorkPeriod[]
}
