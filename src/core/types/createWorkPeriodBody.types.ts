export type CreateWorkPeriodBody = {
  name: string
  workPeriodTypeId: number
  workTurns: WorkTurnsType
}

export type WorkTurnsTypeGeneral = WorkTurnsItemType[]

export type WorkTurnsItemType = {
  id?: string
  dateFrom: string
  dateTo: string
  dayOfWeek: Array<number>
  workTurnTypeId: number
  durationId: number
}

export type WorkTurnsType = {
  id?: number
  dateFrom: string
  dateTo: string
  dayOfWeek: number
  workTurnTypeId: number
  durationId: number
}[]
