import { Grid } from '@mui/material'
import {
  FieldTypeEnumSelect,
  InputAutocomplete,
  InputCurrency,
  InputDate,
  InputNumber,
  InputPhoneComponent,
  InputRoot,
  InputSwitch,
  ItemsSelectType,
  isWithinRange,
  militaryRank,
} from 'core'
import { FileInput, GeoInputs } from 'core/components/returnInput/components'
import { getCatalogues } from 'core/services'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type ResponseFieldsType = {
  type: FieldTypeEnumSelect
  validations: {
    required: boolean
    max_chars?: number
    min_chars?: number
    max_value?: number
    min_value?: number
    max_currency?: number
    min_currency?: number
    max_time?: string
    min_time?: string
    max_size?: number
    file_type?: string
    max_range?: number
    max_date?: string
    depth?: number
  }
  name: string
  label: string
  catId: number
  xs?: number
}

export const ReturnField: React.FC<ResponseFieldsType> = (props) => {
  const { type, name, validations, catId, xs, label } = props
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext()
  const watchedValue = watch(name)
  const { t } = useTranslation()
  const date1 = dayjs().add(validations?.max_range ?? 1, 'month')
  const date2 = dayjs(validations?.max_date, 'DD/MM/YYYY')
  const validateMaxDate = date1.isBefore(date2) || date1.isSame(date2) ? date1 : date2
  const [catalog, setCatalog] = useState<ItemsSelectType[]>([])
  const optionCat = async () => {
    const response = await getCatalogues(catId)
    const newData = response?.data.subcategories?.map((item) => ({
      value: item.name,
      label: item.name,
    }))
    setCatalog(newData ?? [])
  }
  useEffect(() => {
    if (catalog.length === 0 && type === FieldTypeEnumSelect.catalog) optionCat()
  }, []) // eslint-disable-line
  const getValueCatalog = useMemo(
    () => catalog.find((item) => item.value === watchedValue),
    [watchedValue, catalog], // eslint-disable-line
  )
  const getValueMilitaryRank = useMemo(
    () => militaryRank.find((item) => item.value === watchedValue),
    [watchedValue], // eslint-disable-line
  )

  const validateDate = (
    date: Dayjs | null,
    minDate?: Dayjs,
    maxDate?: Dayjs,
    customErrorMessage?: string,
  ): string | null => {
    if (!date) return null
    if (!minDate && !maxDate) return null
    if (minDate && maxDate) {
      if (date.isBefore(minDate, 'day') || date.isAfter(maxDate, 'day')) {
        return (
          customErrorMessage ||
          `El rango de fecha permitido es ${minDate.format('DD/MM/YYYY')} - ${maxDate.format(
            'DD/MM/YYYY',
          )}.`
        )
      }
    } else if (minDate && date.isBefore(minDate, 'day')) {
      return (
        customErrorMessage || `La fecha no puede ser inferior a ${minDate.format('DD/MM/YYYY')}.`
      )
    } else if (maxDate && date.isAfter(maxDate, 'day')) {
      return (
        customErrorMessage || `La fecha no puede ser superior a ${maxDate.format('DD/MM/YYYY')}.`
      )
    }
    return null
  }
  const customDateValidation = (dateString: Dayjs) => {
    const date = dayjs(dateString, 'DD/MM/YYYY')
    const minDate = validations?.max_range
      ? dayjs().subtract(validations?.max_range, 'month')
      : undefined
    const errorMessage = validateDate(date, minDate, validateMaxDate)

    return errorMessage || true
  }

  switch (type) {
    case FieldTypeEnumSelect.text:
      return (
        <Grid item xs={xs ?? 4}>
          <InputRoot
            {...register(name, {
              required: {
                value: validations.required,
                message: t('creationRecords.validations.required', { campo: name }),
              },
              minLength: {
                value: validations?.min_chars ?? 0,
                message: t('creationRecords.validations.minChart', { min: validations.min_chars }),
              },
              maxLength: {
                value: validations?.max_chars ?? 2000,
                message: t('creationRecords.validations.maxChart', { max: validations.max_chars }),
              },
            })}
            placeholder={label}
            error={!!errors[name]}
            label={label}
            helperText={errors[name]?.message as string}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.number:
      return (
        <Grid item xs={xs ?? 4}>
          <InputNumber
            {...register(name, {
              required: {
                value: validations.required,
                message: t('creationRecords.validations.required', { campo: name }),
              },
              min: {
                value: Number(validations.min_value),
                message: t('creationRecords.validations.minValue', { min: validations.min_value }),
              },
              max: {
                value: Number(validations.max_value),
                message: t('creationRecords.validations.maxValue', { max: validations.max_value }),
              },
              valueAsNumber: true,
            })}
            placeholder={label}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            label={label}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.binary:
      return (
        <Grid item xs={xs ?? 4}>
          <InputSwitch {...register(name)} label={label} error={errors[name]?.message as string} />
        </Grid>
      )
    case FieldTypeEnumSelect.catalog:
      return (
        <Grid item xs={xs ?? 4}>
          <InputAutocomplete
            control={control}
            value={getValueCatalog ?? ''}
            controlProps={{
              rules: {
                required: {
                  value: validations.required,
                  message: t('creationRecords.validations.required', { campo: name }),
                },
              },
            }}
            name={name}
            label={label}
            options={catalog}
            errors={errors[name]?.message as string}
            helpertext={errors[name]?.message as string}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.email:
      return (
        <Grid item xs={xs ?? 4}>
          <InputRoot
            {...register(name, {
              required: {
                value: validations?.required ?? false,
                message: t('general.validations.requiredName', { name: name }),
              },
              pattern: {
                value: new RegExp(
                  "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$",
                ),
                message: t('validations.youMustEnterValid'),
              },
            })}
            name={name}
            label={label}
            placeholder={label}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.phone:
      return (
        <Grid item xs={xs ?? 4}>
          <InputPhoneComponent
            control={control}
            name={name}
            label={label}
            placeholder={label}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: name }),
                },
              },
            }}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.currency:
      return (
        <Grid item xs={xs ?? 4}>
          <InputCurrency
            InputProps={{
              name: name,
              label: label,
              placeholder: label,
              error: !!errors[name],
              helperText: errors[name]?.message as string,
            }}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: name }),
                },
                min: {
                  value: validations?.min_currency ?? 0,
                  message: t('creationRecords.validations.minValue', {
                    min: validations.min_currency,
                  }),
                },
                max: {
                  value: validations?.max_currency ?? 0,
                  message: t('creationRecords.validations.maxValue', {
                    max: validations.max_currency,
                  }),
                },
              },
            }}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.hour:
      return (
        <Grid item xs={xs ?? 4}>
          <InputAutocomplete
            control={control}
            value={getValueMilitaryRank ?? ''}
            controlProps={{
              rules: {
                required: {
                  value: validations.required ?? false,
                  message: t('creationRecords.validations.required', { campo: name }),
                },
              },
            }}
            name={name}
            label={label}
            options={militaryRank}
            errors={errors[name]?.message as string}
            helpertext={errors[name]?.message as string}
            getOptionDisabled={(option) =>
              !isWithinRange(
                option.value.toString(),
                validations.min_time ?? '',
                validations.max_time ?? '',
              )
            }
            disableClearable={validations.required ?? false}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.file:
      return (
        <Grid item xs={xs ?? 4}>
          <FileInput
            field={{
              name: name,
              label: label,
              validations: {
                required: validations?.required,
                max_size: validations?.max_size,
                file_type: validations?.file_type,
              },
            }}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.date:
      return (
        <Grid item xs={xs ?? 4}>
          <InputDate
            name={name}
            label={label + (validations?.required ? ' *' : '')}
            error={!!errors[name]}
            helpertext={errors[name]?.message as string}
            maxDate={validateMaxDate}
            minDate={
              validations?.max_range ? dayjs().subtract(validations?.max_range, 'month') : undefined
            }
            value={watch(name) ? dayjs(watch(name), 'DD/MM/YYYY') : null}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: label }),
                },
                validate: customDateValidation,
              },
            }}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.geographic_location:
      return (
        <GeoInputs
          field={{
            label: label,
            name: name,
            validations: { depth: validations.depth },
            type: type,
          }}
        />
      )
    default:
      return <></>
  }
}
