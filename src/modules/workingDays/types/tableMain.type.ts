export type TableMainType = Array<{
  name: string
  scheduled_Shifts: Array<{
    scheduled: Array<string>
    schedule: Array<string>
  }>
  quantityProfiles: number
  state: boolean
  sex: string
  position: string
  status?: number
}>
