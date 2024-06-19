import { WorkTurnsTypeGeneral, labelDays } from 'core'
import { durationList, typesOfShifts } from '../enums'

type ListType = Array<{
  id: number
  timeFrom: string
  timeTo: string
  dayOfWeek: number
  workPeriod: {
    id: number
    name: string
    workPeriodType: {
      id: number
      name: string
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
}>

type value = Array<{
  scheduled: Array<string>
  schedule: Array<string>
}>

export const formatDays = (list: ListType): WorkTurnsTypeGeneral => {
  const ranges: {
    range: string
    id: string
    dateFrom: string
    dateTo: string
    workTurnTypeId: number
    durationId: number
  }[] = []
  list?.forEach((item) => {
    const { timeFrom, timeTo, duration, workTurnType } = item

    let range = ''
    if (duration) range = `${durationList[duration.id]} / ${typesOfShifts[workTurnType.id]}`
    else range = `${timeFrom} - ${timeTo} / ${typesOfShifts[workTurnType.id]}`
    //const id = new Date().getTime() + index
    const id = range
    if (!ranges.find((i) => i.range === range))
      ranges.push({
        range,
        id,
        dateFrom: item?.timeFrom,
        dateTo: item?.timeTo,
        workTurnTypeId: item?.workTurnType?.id,
        durationId: item?.duration?.id,
      })
  })

  const daysGeneral = ranges.map((item) => {
    const filterArray = list.filter((i) => {
      const { timeFrom, timeTo, duration, workTurnType } = i
      let range = ''
      if (duration) range = `${durationList[duration.id]} / ${typesOfShifts[workTurnType.id]}`
      else range = `${timeFrom} - ${timeTo} / ${typesOfShifts[workTurnType.id]}`
      return range === item.range
    })
    const days = filterArray.map((i) => i.dayOfWeek)
    return {
      id: item.id,
      dateFrom: item.dateFrom,
      dateTo: item.dateTo,
      dayOfWeek: days,
      workTurnTypeId: item.workTurnTypeId,
      durationId: item.durationId,
    }
  })

  return daysGeneral
}
export const connectingWorkshops = (list: ListType) => {
  const dataInit = [...list] // array a vaciar

  const ranges: string[] = []
  dataInit.forEach((item) => {
    const { timeFrom, timeTo, duration, workTurnType } = item
    let range = ''
    if (duration) range = `${durationList[duration.id]} / ${typesOfShifts[workTurnType.id]}`
    else range = `${timeFrom} - ${timeTo} / ${typesOfShifts[workTurnType.id]}`

    if (!ranges.includes(range)) ranges.push(range)
  })

  const dataCompleted: { range: string; days: ListType }[] = []

  ranges.forEach((range) => {
    const days = dataInit.filter((item) => {
      const { timeFrom, timeTo, duration, workTurnType } = item
      let rangeItem = ''
      if (duration) rangeItem = `${durationList[duration.id]} / ${typesOfShifts[workTurnType.id]}`
      else rangeItem = `${timeFrom} - ${timeTo} / ${typesOfShifts[workTurnType.id]}`

      return range === rangeItem
    })

    dataCompleted.push({ range, days })
  })

  return orderData(dataCompleted)
}

const orderData = (
  dataCompleted: Array<{
    range: string
    days: Array<{ dayOfWeek: number; duration: { name: string }; workTurnType: { name: string } }>
  }>,
) => {
  const returnData: value = []

  dataCompleted.forEach((item) => {
    const days = item.days
      .map((day) => {
        return day.dayOfWeek
      })
      .sort()

    const daysString = days.map((day) => {
      return labelDays[day]
    })

    const body = {
      scheduled: daysString,
      schedule: [item.range],
    }
    returnData.push(body)
  })
  return returnData
}
