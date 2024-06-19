import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export const useValidations = () => {
  const { t } = useTranslation()
  const val = {
    catalogueReasonId: z
      .number({ required_error: t('validations.catalogueReasonIdIsRequired') })
      .min(1, { message: t('validations.catalogueReasonIdIsRequired') }),
    searchOptional: z.string().optional().nullable().default(''),
    groupOptional: z.array(z.number()).optional(),
    roleOptional: z.string().optional().nullable().default(''),
    nameRequired: z
      .string({ required_error: t('validations.nameIsRequired') })
      .min(1, { message: t('validations.nameIsRequired') }),
    hourFrom: z
      .string({
        required_error: t('validations.timeIsRequired'),
        invalid_type_error: t('validations.timeIsRequired'),
      })
      .min(1, { message: t('validations.timeIsRequired') }),
    hourTo: z
      .string({
        required_error: t('validations.timeIsRequired'),
        invalid_type_error: t('validations.timeIsRequired'),
      })
      .min(1, { message: t('validations.timeIsRequired') }),

    dateFrom: z.custom((val) => dayjs.isDayjs(val) && val.isValid(), {
      message: t('validations.dateIsRequired'),
    }),
    dateTo: z.custom((val) => dayjs.isDayjs(val) && val.isValid(), {
      message: t('validations.dateIsRequired'),
    }),
    upperLimit: z
      .string({
        required_error: t('validations.upperLimitRequired'),
        invalid_type_error: t('validations.upperLimitRequired'),
      })
      .min(1, { message: t('validations.upperLimitRequired') }),
    lowerLimit: z
      .string({
        required_error: t('validations.lowerLimitRequired'),
        invalid_type_error: t('validations.lowerLimitRequired'),
      })
      .min(1, { message: t('validations.lowerLimitRequired') }),
    duration: z
      .number({
        required_error: t('validations.durationIsRequired'),
        invalid_type_error: t('validations.durationIsRequired'),
      })
      .min(1, { message: t('validations.durationIsRequired') }),
    dayOfWeek: z
      .array(z.number({ required_error: t('validations.dayOfWeekIsRequired') }))
      .refine((val) => val.length >= 1, {
        message: t('validations.dayOfWeekIsRequired'),
      }),
    workingDay: z
      .string({ required_error: t('validations.workingDayIsRequired') })
      .min(1, { message: t('validations.workingDayIsRequired') }),
    workTurnTypeId: z
      .number({
        required_error: t('validations.workTurnTypeIdIsRequired'),
        invalid_type_error: t('validations.workTurnTypeIdIsRequired'),
      })
      .min(1, {
        message: t('validations.workTurnTypeIdIsRequired'),
      }),
    workPeriodMaxDurationId: z
      .number({
        required_error: t('validations.workPeriodMaxDurationId'),
        invalid_type_error: t('validations.workPeriodMaxDurationId'),
      })
      .min(1, {
        message: t('validations.workPeriodMaxDurationId'),
      }),
    workPeriodMaxDailyDurationId: z
      .number({
        required_error: t('validations.workPeriodMaxDailyDurationId'),
        invalid_type_error: t('validations.workPeriodMaxDailyDurationId'),
      })
      .min(1, {
        message: t('validations.workPeriodMaxDailyDurationId'),
      }),
    email: z
      .string()
      .min(1, { message: t('validations.emailIsRequired') })
      .email({ message: t('validations.youMustEnterValid') })
      .trim(),

    idMacroPay: z
      .number()
      .min(1, { message: t('validations.idMacroPay') })
      .min(6, { message: t('validations.minMacroPay') }),

    e: z.string().superRefine((val, ctx) => {
      const isEmail = new RegExp(
        "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$",
      ).test(val)
      if (isNaN(Number(val))) {
        if (val.length < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 1,
            inclusive: true,
            type: 'string',
            message: t('validations.emailIsRequired'),
          })
        }

        if (!isEmail) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validations.youMustEnterValid'),
          })
        }
      } else {
        if (val.length < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 1,
            type: 'string',
            inclusive: true,
            message: t('validations.idMacroPay'),
          })
        }
        if (val.length < 6) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 6,
            type: 'string',
            inclusive: true,
            message: t('validations.minMacroPay'),
          })
        }
      }
    }),
    groupIds: z.array(z.number()).refine((val) => val.length >= 1, {
      message: t('validations.groupIdsIsRequired'),
    }),
    password: z
      .string()
      .min(1, { message: t('validations.passwordIsRequired') })
      .regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), {
        message: t('validations.thePasswordMustContain'),
      }),
    range: z
      .number({ required_error: t('validations.rangeIsRequired') })
      .min(1, { message: t('validations.rangeIsRequired') }),
    rangeOptional: z.number().optional().nullable(),
    upperLimitStr: z
      .string({ required_error: t('validations.upperLimitRequired') })
      .min(1, { message: t('validations.upperLimitRequired') }),
    upperLimitStrOptional: z.string().optional().nullable(),
    upperHour: z.string().datetime({ message: t('validations.upperLimitRequired') }),
    lowerCurrency: z.number({ required_error: t('validations.lowerLimitRequired') }),
    upperCurrency: z.number({ required_error: t('validations.upperLimitRequired') }).gt(0, {
      message: t('validations.upperLimitMustBeMoreThanZero'),
    }),
    document: z
      .string({ required_error: t('validations.documentIsRequired') })
      .min(1, { message: t('validations.documentIsRequired') }),
    documentOptional: z.string().optional().nullable(),
    docDesOptional: z.string().optional().nullable(),
    descriptionRequired: z
      .string({ required_error: t('validations.descriptionIsRequired') })
      .min(1, { message: t('validations.descriptionIsRequired') }),
    dateRequired: z
      .string({
        required_error: t('validations.dateIsRequired'),
        invalid_type_error: t('validations.dateIsRequired'),
      })
      .min(1, { message: t('validations.dateIsRequired') }),
  }

  const requiredArray = (error: string) =>
    z
      .array(
        z.object({
          value: z.string(),
        }),
      )
      .refine((val) => val.length >= 1, { message: error })

  const requiredNumberArray = (error: string) =>
    z.array(z.number()).refine((val) => val.length >= 1, { message: error })

  const optionalArray = () => z.array(z.number().optional())

  const requiredNumber = (error: string) =>
    z.number({ required_error: error, invalid_type_error: error }).min(1, { message: error })
  const requiredString = (error: string) =>
    z.string({ required_error: error }).min(1, { message: error })
  const optionalString = () => z.string().optional()
  const optionalNumber = () => z.number().optional()
  const arrayRequired = (error: string) => z.array(z.number()).min(1, { message: error })

  return {
    requiredNumber,
    requiredString,
    optionalString,
    optionalNumber,
    requiredArray,
    requiredNumberArray,
    optionalArray,
    arrayRequired,
    val,
  }
}
