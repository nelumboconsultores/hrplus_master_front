import { z } from 'zod'
import { FieldTypeEnumSelect, useValidations } from 'core'
import { useTranslation } from 'react-i18next'
import { refineByFieldType, returnPlaceWhereValidationApplied } from '../utils'

export const useSchemaEntity = () => {
  const { val, requiredNumber, requiredString } = useValidations()
  const { t } = useTranslation()

  const schemaNone = z.object({
    type: z.literal(FieldTypeEnumSelect.none),
    id: z.number().optional(),
    required: z.boolean(),
    name: z.string().optional(),
    visible: z.boolean(),
    unique: z.boolean(),
  })

  const schemaText = z.object({
    type: z.literal(FieldTypeEnumSelect.text),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    maxLength: val.upperLimit,
    minLength: val.lowerLimit,
    name: val.nameRequired,
    visible: z.boolean(),
  })

  const schemaNumeric = z.object({
    type: z.literal(FieldTypeEnumSelect.number),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    max_value: requiredString(t('validations.upperLimitRequired')),
    min_value: requiredString(t('validations.lowerLimitRequired')),
    name: val.nameRequired,
    visible: z.boolean(),
  })
  const schemaSelect = z.object({
    type: z.literal(FieldTypeEnumSelect.catalog),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    catalogueId: val.catalogueReasonId,
    visible: z.boolean(),
  })
  const schemaBoolean = z.object({
    type: z.literal(FieldTypeEnumSelect.binary),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
  })

  const schemaDate = z.object({
    type: z.literal(FieldTypeEnumSelect.date),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
    rangeTime: val.rangeOptional,
    max_date: val.upperLimitStrOptional,
  })

  const schemaEmail = z.object({
    type: z.literal(FieldTypeEnumSelect.email),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
  })

  const schemaPhone = z.object({
    type: z.literal(FieldTypeEnumSelect.phone),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
  })

  const schemaHour = z.object({
    type: z.literal(FieldTypeEnumSelect.hour),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
    min_time: requiredString(t('validations.timeIsRequired')),
    max_time: requiredString(t('validations.timeIsRequired')),
  })
  const schemaCurrency = z.object({
    type: z.literal(FieldTypeEnumSelect.currency),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
    lowerMoney: val.lowerCurrency,
    upperMoney: val.upperCurrency,
  })
  const schemaFile = z.object({
    type: z.literal(FieldTypeEnumSelect.file),
    id: z.number().optional(),
    required: z.boolean(),
    unique: z.boolean(),
    name: val.nameRequired,
    visible: z.boolean(),
    max_size: requiredNumber(t('validations.maxSizeFileIsRequired')),
    fileType: z
      .array(z.string(), { required_error: t('validations.typeFileIsRequired') })
      .nonempty({ message: t('validations.typeFileIsRequired') }),
  })
  const schemaGeographic_location = z.object({
    type: z.literal(FieldTypeEnumSelect.geographic_location),
    id: z.number().optional(),
    name: val.nameRequired,
    visible: z.boolean(),
    depth: z.number({ required_error: t('validations.depthIsRequired') }),
    required: z.boolean(),
  })

  const typeIsNotNone = (val: { type: FieldTypeEnumSelect }) =>
    val.type !== FieldTypeEnumSelect.none
  const schema = z
    .discriminatedUnion('type', [
      schemaText,
      schemaSelect,
      schemaNone,
      schemaNumeric,
      schemaBoolean,
      schemaDate,
      schemaEmail,
      schemaPhone,
      schemaHour,
      schemaCurrency,
      schemaFile,
      schemaGeographic_location,
    ])
    .refine(
      (val) => refineByFieldType(val.type, val),
      (val) => ({
        message: t('validations.lowerLimitMustBeLessThanUpperLimit'),
        path: [returnPlaceWhereValidationApplied(val)],
      }),
    )
    .refine(typeIsNotNone, {
      message: 'Tipo de campo requerido',
      path: ['type'],
    })

  return {
    schema,
    schemaText,
    schemaSelect,
    schemaNone,
    schemaNumeric,
    schemaBoolean,
    schemaDate,
    schemaEmail,
    schemaPhone,
    schemaHour,
    schemaCurrency,
    schemaFile,
    schemaGeographic_location,
  }
}
