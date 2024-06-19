export type WorkPeriodBody = {
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

export type WorkPeriod = {
  id: number
  workPeriod: {
    workPeriod: WorkPeriodBody
    workTurns: {
      id: number
      timeFrom: {
        hour: number
        minute: number
        second: number
        nano: number
      }
      timeTo: {
        hour: number
        minute: number
        second: number
        nano: number
      }
      dayOfWeek: number
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
      duration: {
        id: number
        name: string
        amount: number
      }
    }[]

    quantityProfiles: number
    active: boolean
    custom: boolean
  }
}
