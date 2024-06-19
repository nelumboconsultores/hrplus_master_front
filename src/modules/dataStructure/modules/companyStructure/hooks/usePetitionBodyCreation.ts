import { z } from 'zod'
import { useSchemaEntity } from '.'
import { FieldTypeEnumSelect } from 'core'
export const usePetitionBodyCreation = () => {
  const {
    schema,
    schemaText,
    schemaBoolean,
    schemaNumeric,
    schemaSelect,
    schemaDate,
    schemaEmail,
    schemaPhone,
    schemaHour,
    schemaCurrency,
    schemaFile,
    schemaGeographic_location,
  } = useSchemaEntity()
  type baseType = { newPosition?: number; visible?: boolean; id?: number }
  type SchemaType = z.infer<typeof schema> & baseType
  type SchemaTextType = z.infer<typeof schemaText> & baseType
  type SchemaBooleanType = z.infer<typeof schemaBoolean> & baseType
  type SchemaNumericType = z.infer<typeof schemaNumeric> & baseType
  type SchemaSelectType = z.infer<typeof schemaSelect> & baseType
  type SchemaDateType = z.infer<typeof schemaDate> & baseType
  type schemaEmailType = z.infer<typeof schemaEmail> & baseType
  type schemaPhoneType = z.infer<typeof schemaPhone> & baseType
  type schemaHourType = z.infer<typeof schemaHour> & baseType
  type schemaCurrencyType = z.infer<typeof schemaCurrency> & baseType
  type schemaFileType = z.infer<typeof schemaFile> & baseType
  type SchemaGeographic_LocationType = z.infer<typeof schemaGeographic_location> & baseType

  const createNumericField = (field: SchemaNumericType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
      max_value: field.max_value,
      min_value: field.min_value,
    },
    newPosition: field.newPosition,
  })

  const createTextField = (field: SchemaTextType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
      max_chars: field.maxLength,
      min_chars: field.minLength,
    },
    newPosition: field.newPosition,
  })

  const createSelectField = (field: SchemaSelectType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    catalogueId: field.catalogueId,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
    },
    newPosition: field.newPosition,
  })

  const createDefaultField = (field: SchemaBooleanType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
    },
    newPosition: field.newPosition,
  })

  const createPhoneAndEmailField = (field: schemaEmailType | schemaPhoneType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
    },
    newPosition: field.newPosition,
  })

  const createDateField = (field: SchemaDateType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
      max_range: field.rangeTime,
      max_date: field.max_date,
    },
    newPosition: field.newPosition,
  })

  const createHourField = (field: schemaHourType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
      min_time: field.min_time,
      max_time: field.max_time,
    },
    newPosition: field.newPosition,
  })

  const createCurrencyField = (field: schemaCurrencyType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      required: field.required ? true : field.required,
      unique: field.unique,
      min_currency: field.lowerMoney,
      max_currency: field.upperMoney,
    },
    newPosition: field.newPosition,
  })
  const createFileField = (field: schemaFileType) => {
    const fileType = field.fileType.toString().replace('[', '').replace(']', '')
    return {
      name: field?.name ?? '',
      fieldTypeId: field.type,
      visible: field.visible,
      validations: {
        required: field.required ? true : field.required,
        unique: field.unique,
        file_type: fileType,
        max_size: field.max_size,
      },
      newPosition: field.newPosition,
    }
  }
  const createGeographicLocationField = (field: SchemaGeographic_LocationType) => ({
    name: field?.name ?? '',
    fieldTypeId: field.type,
    visible: field.visible,
    validations: {
      depth: field.depth,
      required: false,
    },
    newPosition: field.newPosition,
  })
  const returnBody = (field: SchemaType) => {
    switch (field.type) {
      case FieldTypeEnumSelect.number:
        return createNumericField(field)

      case FieldTypeEnumSelect.text:
        return createTextField(field)

      case FieldTypeEnumSelect.catalog:
        return createSelectField(field)

      case FieldTypeEnumSelect.date:
        return createDateField(field)

      case FieldTypeEnumSelect.hour:
        return createHourField(field)

      case FieldTypeEnumSelect.currency:
        return createCurrencyField(field)

      case FieldTypeEnumSelect.file:
        return createFileField(field)
      case FieldTypeEnumSelect.geographic_location:
        return createGeographicLocationField(field)

      case FieldTypeEnumSelect.email:
      case FieldTypeEnumSelect.phone:
        return createPhoneAndEmailField(field)

      case FieldTypeEnumSelect.binary:
        return createDefaultField(field)
    }
  }

  return { returnBody, schema }
}
