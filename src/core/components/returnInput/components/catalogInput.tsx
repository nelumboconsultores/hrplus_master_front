import { InputAutocomplete } from 'core/components/inputs'
import { FieldTypeEnumSelect } from 'core/enum'
import { getCatalogues } from 'core/services'
import { ItemsSelectType, ReturnInputFields } from 'core/types'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type CatalogInputProps = {
  field: ReturnInputFields
}

export const CatalogInput: React.FC<CatalogInputProps> = ({ field }) => {
  const { name, label, placeHolder, optionsOut, validations, optionsId, disabled, value } = field
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const valueFromNested =
    field.optionsUrl || field.type === FieldTypeEnumSelect.catalog ? watch(name) : ''
  const parentValue = field.optionsUrl ? watch(field.parents?.[field.parents.length - 1] ?? '') : ''
  const { t } = useTranslation()

  const [options, setOptions] = useState<ItemsSelectType[]>()
  const getValueAutoComplete = useMemo(() => {
    let optionsArray = optionsOut || (optionsId ? options : undefined)
    if (field.optionsUrl) optionsArray = options
    return optionsArray?.find((item) => item.value === valueFromNested)
  }, [options, optionsOut, valueFromNested, parentValue]) // eslint-disable-line

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
  useEffect(() => {
    if (value) setValue(name, value)
    if (optionsId && !field.optionsUrl) getOptionsAutoComplete()
  }, []) // eslint-disable-line
  return (
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
  )
}
