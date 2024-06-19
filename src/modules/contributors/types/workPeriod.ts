export type WorkPeriod = {
  id: number
  name: string
  workPeriodType: {
    id: number
    name: string
  }
  workPeriodMaxDuration: {
    id: number
    name: string
    duration: number
    keyword: string
  }
  workPeriodMaxDailyDuration: {
    id: number
    name: string
    duration: number
    keyword: string
  }
  workTurns: {
    id: number
    timeFrom: string
    timeTo: string
    dayOfWeek: 3
    workPeriod: {
      id: number
      name: string
      workPeriodType: {
        id: number
        name: string
      }
      workPeriodMaxDuration: {
        id: number
        name: string
        duration: number
        keyword: string
      }
      workPeriodMaxDailyDuration: {
        id: number
        name: string
        duration: number
        keyword: string
      }
      active: boolean
      custom: boolean
    }
    workTurnType: {
      id: number
      name: string
    }
  }[]
  active: boolean
  custom: boolean
}
