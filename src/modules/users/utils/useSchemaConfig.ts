import { useValidations } from 'core'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export enum TypeOfDayEnum {
  FixedHours = '1',
  ShiftsVariable = '2',
}

export const useSchemaConfiguration = () => {
  const { val } = useValidations()
  const { t } = useTranslation()
  const currentDate = dayjs()
  let startDates = dayjs()

  const validateStartNextDate = (startDate: dayjs.Dayjs) => {
    startDates = startDate
    const tomorrow = currentDate
    return startDate && startDate >= tomorrow
  }

  const validateStartDate = (startDate: dayjs.Dayjs) => {
    startDates = startDate
    const tomorrow = dayjs().subtract(1, 'day')
    return startDate && startDate >= tomorrow
  }

  const validateEndDate = (endDate: dayjs.Dayjs, startDate: dayjs.Dayjs) => {
    return endDate && startDate && endDate >= startDate
  }

  const dateRange = z.object({
    type: z.literal(TypeOfDayEnum.FixedHours),
    workingDay: val.workTurnTypeId,
    startDate: val.dateFrom.refine((startDate) => validateStartNextDate(startDate as dayjs.Dayjs), {
      message: t('users.msg.errorStartNextDate'),
    }),
    endDate: val.dateTo.refine(
      (endDate) => {
        return validateEndDate(endDate as dayjs.Dayjs, startDates)
      },
      {
        message: t('users.msg.errorEndDate'),
      },
    ),
  })

  const notDateRange = z.object({
    type: z.literal(TypeOfDayEnum.ShiftsVariable),
    workingDay: val.workTurnTypeId,
  })

  const groupRange = z.object({
    type: z.literal(TypeOfDayEnum.FixedHours),
    groupIds: val.groupIds,
    startDate: val.dateFrom.refine((startDate) => validateStartDate(startDate as dayjs.Dayjs), {
      message: t('users.msg.errorStartDate'),
    }),
    endDate: val.dateTo.refine(
      (endDate) => {
        return validateEndDate(endDate as dayjs.Dayjs, startDates)
      },
      {
        message: t('users.msg.errorEndDate'),
      },
    ),
  })

  const groupNotRange = z.object({
    type: z.literal(TypeOfDayEnum.ShiftsVariable),
    groupIds: val.groupIds,
  })

  const groupSchema = z.discriminatedUnion('type', [groupRange, groupNotRange])
  const schema = z.discriminatedUnion('type', [dateRange, notDateRange])

  return { schema, groupSchema }
}
