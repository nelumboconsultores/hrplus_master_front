import * as z from 'zod'
import { TypeOfDayEnum } from '../enums'
import { useValidations } from 'core'

export const useSchemaConfiguration = () => {
  const { val } = useValidations()

  const schemaFixedHours = z.object({
    workPeriodTypeId: z.literal(TypeOfDayEnum.FixedHours),
    name: val.searchOptional,
    dateFrom: val.hourFrom,
    dateTo: val.hourTo,
    dayOfWeek: val.dayOfWeek,
    workTurnTypeId: val.workTurnTypeId,
    workPeriodMaxDurationId: val.workPeriodMaxDurationId,
    workPeriodMaxDailyDurationId: val.workPeriodMaxDailyDurationId,
  })

  const schemaShiftsVariable = z.object({
    workPeriodTypeId: z.literal(TypeOfDayEnum.ShiftsVariable),
    name: val.searchOptional,
    dayOfWeek: val.dayOfWeek,
    workTurnTypeId: val.workTurnTypeId,
    durationId: val.duration,
    workPeriodMaxDurationId: val.workPeriodMaxDurationId,
  })

  const schema = z
    .discriminatedUnion('workPeriodTypeId', [schemaFixedHours, schemaShiftsVariable])
    .refine(
      (data) => {
        if (data.workPeriodTypeId === TypeOfDayEnum.FixedHours) return data.dateFrom < data.dateTo
        return true
      },
      {
        message: 'La hora de inicio no puede ser igual o mayor a la hora de fin',
        path: ['dateTo'],
      },
    )

  return { schema }
}
