import { z } from 'zod'
import { useValidations } from 'core'
import { periodicityEnum } from '../enums'
import { useTranslation } from 'react-i18next'

export const useSchemaEntity = () => {
  const { val } = useValidations()
  const { t } = useTranslation()

  const schemaSingle = z.object({
    periodicity: z.literal(periodicityEnum.single),
    date: val.dateRequired,
    reminder: z.number().optional().nullable(),
    from: val.hourFrom,
    to: val.hourTo,
  })

  const schemaRepetitive = z.object({
    periodicity: z.literal(periodicityEnum.repetitive),
    reminder: z.number().optional().nullable(),
    dateFrom: val.dateFrom,
    dateTo: val.dateTo,
    eventDatePeriods: z
      .array(
        z.object({
          startsAt: z.string({ required_error: t('validations.hourFromRequired') }).min(1, {
            message: t('validations.hourFromRequired'),
          }),
          endsAt: z.string({ required_error: t('validations.hourToRequired') }).min(1, {
            message: t('validations.hourToRequired'),
          }),
          daysOfWeek: z.array(z.number()),
        }),
        { required_error: t('eventAndCalendar.errors.eventDatePeriods') },
      )
      .min(1, { message: t('eventAndCalendar.errors.eventDatePeriods') }),
  })

  const schema = z.discriminatedUnion('periodicity', [schemaSingle, schemaRepetitive]).refine(
    (data) => {
      if (data.periodicity === periodicityEnum.single) {
        const dateFrom = data.from as string
        const dateTo = data.to as string

        return dateTo > dateFrom
      }
      if (data.periodicity === periodicityEnum.repetitive) {
        const dateFrom = data.dateFrom as string
        const dateTo = data.dateTo as string

        return dateTo > dateFrom
      }
      return true
    },
    {
      message: 'La hora de inicio no puede ser igual o mayor a la hora de fin',
      path: ['dateTo', 'to'],
    },
  )

  return { schema }
}
