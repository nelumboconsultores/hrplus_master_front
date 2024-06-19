import { useFormContext } from 'react-hook-form'
import { InputAutocomplete, InputCurrency, InputDate, InputPhoneComponent, InputRoot } from '..'
import {
  FieldTypeEnumSelect,
  ItemsSelectType,
  ReturnInputFields,
  isWithinRange,
  militaryRank,
} from 'core'
import { getCatalogues, getDinamicOptions } from 'core/services'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { BinaryInput, FileInput, GeoInputs, NumberInput, TextInput } from './components'
import { Grid } from '@mui/material'
type ReturnInputProps = {
  field: ReturnInputFields
  obtainHierarchyOptions?: (options: ItemsSelectType[], name: string) => void
  xs?: number
}

export const ReturnInput: React.FC<ReturnInputProps> = ({ field, obtainHierarchyOptions, xs }) => {
  const { type, name, label, placeHolder, optionsId, optionsOut, validations, value } = field
  const date1 = validations?.max_range ? dayjs().add(validations?.max_range, 'month') : undefined
  const date2 = field?.validations?.max_date
    ? dayjs(field?.validations?.max_date, 'DD/MM/YYYY')
    : undefined
  const validateMaxDate = validations?.max_range
    ? date1?.isBefore(date2) || date1?.isSame(date2) || typeof date2 === 'undefined'
      ? date1
      : date2
    : date2

  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const parentValue = field.optionsUrl ? watch(field.parents?.[field.parents.length - 1] ?? '') : ''
  const valueFromNested =
    field.optionsUrl || field.type === FieldTypeEnumSelect.catalog ? watch(name) : ''
  const [options, setOptions] = useState<ItemsSelectType[]>()
  const [parentId, setParentId] = useState<number>()
  const [disabled, setDisabled] = useState(true)
  const { t } = useTranslation()
  const getOptionsAutoComplete = async () => {
    const response = await getCatalogues(optionsId ?? 1)
    const newOpt = response?.data.subcategories.map((item) => {
      return {
        value: item.name,
        label: item.name,
      }
    })
    setOptions(newOpt ?? [])
  }

  const getHierarchyOptions = async () => {
    if (!field.optionsUrl) return

    // sin padres
    const hasParents = Boolean(field.parents?.length)
    if (!hasParents && field.optionsUrl) {
      const response = await getDinamicOptions(field.optionsUrl)
      const options = response?.data.map((item) => ({ value: item.id, label: item.name }))
      setOptions(options)
      if (obtainHierarchyOptions) obtainHierarchyOptions(options ?? [], name)
    } else if (hasParents && field.optionsUrl) {
      /* con padres */
      setDisabled(true)
      const parentValues = getValues(field.parents ?? [])
      if (parentValues.some((e) => !e)) return

      let url = field.optionsUrl
      parentValues.forEach((parent) => {
        url = url.replace('{id}', parent)
      })
      const response = await getDinamicOptions(url)
      const options = response?.data.map((item) => ({ value: item.id, label: item.name }))
      setParentId(parentValues[parentValues.length - 1])
      setOptions(options)
      setDisabled(false)
      if (obtainHierarchyOptions) obtainHierarchyOptions(options ?? [], name)
    }
  }
  const resetAutoComplete = () => {
    if (options && valueFromNested) {
      setOptions([])
      setValue(name, '')
    }
  }
  useEffect(() => {
    if (value) setValue(name, value)
    if (optionsId && !field.optionsUrl) getOptionsAutoComplete()
  }, []) // eslint-disable-line

  useEffect(() => {
    const needGetOptions = parentId && parentValue !== parentId
    if (field.optionsUrl && (!options?.length || needGetOptions)) {
      resetAutoComplete()
      getHierarchyOptions()
    }
  }, [parentId, parentValue]) // eslint-disable-line

  const getValueAutoComplete = useMemo(() => {
    let optionsArray = optionsOut || (optionsId ? options : undefined)
    if (field.optionsUrl) optionsArray = options
    return optionsArray?.find((item) => item.value === valueFromNested)
  }, [options, optionsOut, valueFromNested, parentValue]) // eslint-disable-line

  const getValueMilitaryRank = useMemo(
    () => militaryRank.find((item) => item.value === watch(name)),
    [watch(name)], // eslint-disable-line
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
    case FieldTypeEnumSelect.number:
      return (
        <Grid item xs={xs ?? 4}>
          <NumberInput field={field} />
        </Grid>
      )
    case FieldTypeEnumSelect.text:
      return (
        <Grid item xs={xs ?? 4}>
          <TextInput field={field} />
        </Grid>
      )
    case FieldTypeEnumSelect.catalog:
      return (
        <Grid item xs={xs ?? 4}>
          <InputAutocomplete
            name={name}
            control={control}
            options={options ?? optionsOut ?? []}
            label={label + (validations?.required ? ' *' : '')}
            placeholder={placeHolder}
            value={getValueAutoComplete ?? null}
            disabled={(!!field.parents?.length && disabled) || field.disabled}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: label }),
                },
              },
            }}
            errors={errors[name]?.message as string}
            helpertext={errors[name]?.message as string}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.binary:
      return (
        <Grid item xs={xs ?? 4}>
          <BinaryInput field={field} />
        </Grid>
      )
    case FieldTypeEnumSelect.email:
      return (
        <Grid item xs={xs ?? 4}>
          <InputRoot
            {...register(name, {
              required: {
                value: validations?.required ?? false,
                message: t('general.validations.requiredName', { name: label }),
              },
              pattern: {
                value: new RegExp(
                  "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$",
                ),
                message: t('validations.youMustEnterValid'),
              },
            })}
            name={name}
            label={label + (validations?.required ? ' *' : '')}
            placeholder={placeHolder}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            disabled={field.disabled}
            value={watch(name) ?? ''}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.phone:
      return (
        <Grid item xs={xs ?? 4}>
          <InputPhoneComponent
            control={control}
            name={name}
            label={label + (validations?.required ? ' *' : '')}
            placeholder={placeHolder}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            disabled={field.disabled}
            value={watch(name) ?? ''}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: label }),
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
              placeholder: placeHolder,
              error: !!errors[name],
              helperText: errors[name]?.message as string,
              disabled: field.disabled,
            }}
            controlProps={{
              rules: {
                required: {
                  value: validations?.required ?? false,
                  message: t('general.validations.requiredName', { name: label }),
                },
                max: validations?.max_currency
                  ? {
                      value: validations?.max_currency,
                      message: t('general.validations.maxValue', {
                        max: validations?.max_currency,
                      }),
                    }
                  : undefined,
                min: validations?.min_currency
                  ? {
                      value: validations?.min_currency,
                      message: t('general.validations.minValue', {
                        min: validations?.min_currency,
                      }),
                    }
                  : undefined,
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
                  value: validations?.required ?? false,
                  message: t('creationRecords.validations.required', { campo: name }),
                },
              },
            }}
            name={name}
            label={label + (validations?.required ? ' *' : '')}
            options={militaryRank}
            errors={errors[name]?.message as string}
            helpertext={errors[name]?.message as string}
            getOptionDisabled={(option) => {
              return !isWithinRange(
                option.value.toString(),
                validations?.min_time ?? '',
                validations?.max_time ?? '',
              )
            }}
            disableClearable={validations?.required ?? false}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.file:
      return (
        <Grid item xs={xs ?? 4}>
          <FileInput field={field} />
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
            onBlur={field.onBlur}
            onClose={field.onBlur}
          />
        </Grid>
      )
    case FieldTypeEnumSelect.geographic_location:
      return <GeoInputs field={field} xs={xs} />
    default:
      return <></>
  }
}
